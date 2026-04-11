"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { registerUser } from "@/app/(auth)/register/register.services";
import { toast } from "sonner";

// ─── Zod Schema ───────────────────────────────────────────────────────────────
export const registerSchema = z
  .object({
    name: z.string().min(1, "Full name is required."),
    email: z.string().min(1, "Email is required.").email("Please enter a valid email address."),
    phone: z
      .string()
      .min(1, "Phone number is required.")
      .regex(/^01[0125][0-9]{8}$/, "Please enter a valid Egyptian phone number (e.g., 01028920847)."),
    password: z.string().min(1, "Password is required.").min(8, "Password must be at least 8 characters."),
    confirmPassword: z.string().min(1, "Please confirm your password."),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: "You must accept the Terms of Service and Privacy Policy.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;

// ─── Password Strength ────────────────────────────────────────────────────────
export type StrengthLevel = "empty" | "weak" | "fair" | "strong";

export function getPasswordStrength(password: string): StrengthLevel {
  if (!password) return "empty";
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  if (score <= 1) return "weak";
  if (score === 2 || score === 3) return "fair";
  return "strong";
}

export const STRENGTH_CONFIG: Record<StrengthLevel, { label: string; color: string; bars: number }> = {
  empty: { label: "", color: "#E9ECEF", bars: 0 },
  weak: { label: "Weak", color: "#DC3545", bars: 1 },
  fair: { label: "Fair", color: "#FFC107", bars: 2 },
  strong: { label: "Strong", color: "#0AAD0A", bars: 3 },
};

// ─── Hook logic ───────────────────────────────────────────────────────────────
export function useRegisterLogic() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  const passwordValue = watch("password");

  async function onSubmit(data: RegisterFormValues) {
    setServerError(null);
    const toastId = toast.loading("Creating your account...");
    const result = await registerUser({
      name: data.name.trim(),
      email: data.email.trim(),
      phone: data.phone.trim(),
      password: data.password,
      rePassword: data.confirmPassword,
    });
    toast.dismiss(toastId);
    if (!result.success) {
      setServerError(result.error);
      toast.error(result.error);
      return;
    }
    toast.success("Account created successfully!");
    window.location.assign("/login");
  }

  return {
    control,
    handleSubmit,
    errors,
    isSubmitting,
    passwordValue,
    showPassword,
    setShowPassword,
    showConfirm,
    setShowConfirm,
    serverError,
    onSubmit,
  };
}
