"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { forgotPasswordService, verifyResetCodeService, resetPasswordService } from "../forget-password.services";

type FlowStep = "forgot" | "verify" | "reset";

export const useForgetPasswordLogic = () => {
    const [step, setStep] = useState<FlowStep>("forgot");
    const [email, setEmail] = useState("");
    const [resetCode, setResetCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    
    const router = useRouter();
    
    // Step 1: Send Reset Code
    const handleForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return toast.error("Please enter your email");
        
        setIsLoading(true);
        const result = await forgotPasswordService({ email });
        setIsLoading(false);
        
        if (result.success) {
            toast.success(result.message || "Reset code sent to your email");
            setStep("verify");
        } else {
            toast.error(result.message || "Failed to send reset code");
        }
    };
    
    // Step 2: Verify Reset Code
    const handleVerifyCode = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!resetCode) return toast.error("Please enter the reset code");
        
        setIsLoading(true);
        const result = await verifyResetCodeService({ resetCode });
        setIsLoading(false);
        
        if (result.success) {
            toast.success("Code verified successfully");
            setStep("reset");
        } else {
            toast.error(result.message || "Invalid reset code");
        }
    };
    
    // Step 3: Reset Password
    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newPassword || !confirmPassword) return toast.error("Please fill in both password fields");
        if (newPassword !== confirmPassword) return toast.error("Passwords do not match");
        if (newPassword.length < 6) return toast.error("Password must be at least 6 characters");
        
        setIsLoading(true);
        const result = await resetPasswordService({ email, newPassword });
        setIsLoading(false);
        
        if (result.success) {
            toast.success("Password reset successful. Logging you in...");
            router.push("/");
            // Optionally, refresh page to sync cookie
            setTimeout(() => window.location.reload(), 1000);
        } else {
            toast.error(result.message || "Failed to reset password");
        }
    };
    
    const handleResendCode = async () => {
         setIsLoading(true);
         const result = await forgotPasswordService({ email });
         setIsLoading(false);
         if (result.success) {
            toast.success("New code sent to your email");
         } else {
            toast.error("Failed to resend code");
         }
    };

    return {
        step,
        email,
        setEmail,
        resetCode,
        setResetCode,
        newPassword,
        setNewPassword,
        confirmPassword,
        setConfirmPassword,
        isLoading,
        showPassword,
        setShowPassword,
        handleForgotPassword,
        handleVerifyCode,
        handleResetPassword,
        handleResendCode,
        setStep
    };
};
