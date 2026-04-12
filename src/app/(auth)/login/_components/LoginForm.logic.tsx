import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { ShieldCheck, Star, Users } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// ─── Trust badges ──────────────────────────────────────────────────────────────
export const TRUST_BADGES = [
  { icon: ShieldCheck, label: "SSL Secured" },
  { icon: Users, label: "50K+ Users" },
  { icon: Star, label: "4.9 Rating" },
];

export function useLoginLogic() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      setError("Please fill in both email and password.");
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading("Verifying your credentials...");
    
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: trimmedEmail,
        password: trimmedPassword,
      });

      setIsSubmitting(false);
      toast.dismiss(toastId);

      if (result?.error) {
        setError(result.error);
        toast.error(result.error);
        return;
      }

      toast.success("Welcome back!");
     location.assign("/");
    } catch (err) {
      setIsSubmitting(false);
      toast.dismiss(toastId);
      setError("An unexpected error occurred. Please try again.");
      toast.error("An unexpected error occurred.");
    }
  }

  async function handleGoogleSignIn(e?: any) {
    if (e && e.preventDefault) e.preventDefault();
    const toastId = toast.loading("Connecting to Google...");
    try {
      await signIn("google", { callbackUrl: "/" });
    } catch (err) {
      toast.dismiss(toastId);
      toast.error("Google sign in failed. Please try again.");
    }
  }

  async function handleFacebookSignIn(e?: any) {
    if (e && e.preventDefault) e.preventDefault();
    const toastId = toast.loading("Connecting to Facebook...");
    try {
      await signIn("facebook", { callbackUrl: "/" });
    } catch (err) {
      toast.dismiss(toastId);
      toast.error("Facebook sign in failed. Please try again.");
    }
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    keepSignedIn,
    setKeepSignedIn,
    error,
    isSubmitting,
    handleSubmit,
    handleGoogleSignIn,
    handleFacebookSignIn,
  };
}
