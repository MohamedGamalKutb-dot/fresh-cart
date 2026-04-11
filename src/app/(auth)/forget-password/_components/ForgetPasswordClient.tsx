"use client";

import React from "react";
import Link from "next/link";
import { 
  Mail, 
  Key, 
  Lock, 
  ArrowLeft, 
  Eye, 
  EyeOff, 
  ShoppingCartIcon,
  CheckCircle2,
  ShieldCheck,
  Check,
} from "lucide-react";
import AppButton from "@/components/shared/AppButton/AppButton";
import { useForgetPasswordLogic } from "./ForgetPasswordClient.logic";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export default function ForgetPasswordClient() {
  const {
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
  } = useForgetPasswordLogic();

  const isStep1 = step === "forgot";
  const isStep2 = step === "verify";
  const isStep3 = step === "reset";

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4">
      <div className="w-full max-w-[1100px] bg-white rounded-[32px] overflow-hidden shadow-2xl flex flex-col md:flex-row border border-gray-50">
        
        {/* Left Side: Illustration & Features */}
        <div className="hidden md:flex w-1/2 bg-[#F0FDF4] p-12 lg:p-16 flex-col justify-between items-center relative overflow-hidden">
          {/* Decorative depth circles */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-green-200/30 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-green-200/30 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3" />

          {/* New Illustration: Floating Cards System */}
          <div className="flex-1 flex flex-col items-center justify-center w-full z-10">
            <div className="relative w-full max-w-[420px] aspect-[16/10] flex items-center justify-center mb-12">
              
              {/* Decorative blobs in background */}
              <div className="absolute top-4 left-4 w-12 h-12 bg-green-200/40 rounded-full blur-xl" />
              <div className="absolute top-12 right-20 w-16 h-16 bg-green-200/40 rounded-full blur-xl" />
              <div className="absolute bottom-8 right-4 w-24 h-24 bg-green-200/40 rounded-full blur-xl" />

              {/* Card Group */}
              <div className="relative flex items-center justify-center gap-0">
                
                {/* Left Card (Mail) */}
                <div className="bg-white rounded-[20px] p-5 shadow-lg border border-white/50 -rotate-[15deg] -translate-x-8 z-0 transition-transform hover:scale-105 duration-500">
                  <div className="w-10 h-10 flex items-center justify-center text-[#16A34A]">
                    <Mail size={24} strokeWidth={2.5} />
                  </div>
                </div>

                {/* Center Large Card (Lock) */}
                <div className="bg-white rounded-[32px] p-2 shadow-2xl border border-white z-20 transition-transform hover:scale-105 duration-500">
                  <div className="bg-[#DCFCE7] rounded-[24px] p-10 flex items-center justify-center text-[#16A34A]">
                    <Lock size={56} strokeWidth={2.5} />
                  </div>
                </div>

                {/* Right Card (Shield) */}
                <div className="bg-white rounded-[20px] p-5 shadow-lg border border-white/50 rotate-[15deg] translate-x-8 z-0 transition-transform hover:scale-105 duration-500">
                  <div className="w-10 h-10 flex items-center justify-center text-[#16A34A]">
                    <ShieldCheck size={24} strokeWidth={2.5} />
                  </div>
                </div>

              </div>

              {/* Dots / Sequential Loading Animation */}
              <div className="absolute -bottom-4 flex gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#86EFAC] animate-pulse [animation-duration:1.5s] [animation-delay:0s]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#4ADE80] animate-pulse [animation-duration:1.5s] [animation-delay:0.3s]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#16A34A] animate-pulse [animation-duration:1.5s] [animation-delay:0.6s]" />
              </div>

            </div>

            {/* Typography Section */}
            <div className="text-center space-y-5 max-w-sm">
                <h2 className="text-[32px] lg:text-[38px] font-extrabold text-gray-900 leading-[1.1] tracking-tight">
                  Reset Your Password
                </h2>
                <p className="text-gray-500 font-medium text-base lg:text-lg leading-relaxed">
                  Don&apos;t worry, it happens to the best of us. We&apos;ll help you get back into your account in no time.
                </p>
            </div>
          </div>

          {/* Bottom Features List */}
          <div className="flex flex-wrap justify-center gap-6 lg:gap-10 mt-12 z-10">
             <div className="flex items-center gap-2.5 text-sm lg:text-base font-bold text-gray-700 bg-white/60 backdrop-blur-sm pl-2 pr-4 py-1.5 rounded-full border border-white shadow-sm transition-all hover:bg-white">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-[#16A34A]">
                   <Mail size={18} strokeWidth={2.5} />
                </div>
                Email Verification
             </div>
             <div className="flex items-center gap-2.5 text-sm lg:text-base font-bold text-gray-700 bg-white/60 backdrop-blur-sm pl-2 pr-4 py-1.5 rounded-full border border-white shadow-sm transition-all hover:bg-white">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-[#16A34A]">
                   <ShieldCheck size={18} strokeWidth={2.5} />
                </div>
                Secure Reset
             </div>
             <div className="flex items-center gap-2.5 text-sm lg:text-base font-bold text-gray-700 bg-white/60 backdrop-blur-sm pl-2 pr-4 py-1.5 rounded-full border border-white shadow-sm transition-all hover:bg-white">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-[#16A34A]">
                   <Lock size={18} strokeWidth={2.5} />
                </div>
                Encrypted
             </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col items-center">
          
          <div className="mb-10 text-center animate-in fade-in slide-in-from-top-4 duration-500 w-full">
             <Link href="/" className="inline-flex items-center gap-2 mb-8 group">
                <span className="font-bold text-[28px] tracking-tighter"><span className="text-[#16A34A]">Fresh</span>Cart</span>
             </Link>
             
             <div className="space-y-1.5">
                <h1 className="text-[28px] font-bold text-gray-900">
                    {isStep1 ? "Forgot Password?" : isStep2 ? "Check Your Email" : "Create New Password"}
                </h1>
                <p className="text-gray-500 font-medium italic">
                    {isStep1 ? "No worries, we'll send you a reset code" : isStep2 ? `Enter the 6-digit code sent to ${email || "your email"}` : "Your new password must be different from previous passwords"}
                </p>
             </div>
          </div>

          {/* Stepper */}
          <div className="flex items-center w-full max-w-[280px] mb-12 justify-between relative px-2">
             <div className={cn(
                "absolute top-1/2 left-0 right-1/2 h-0.5 -translate-y-1/2 z-0",
                isStep2 || isStep3 ? "bg-green-500" : "bg-gray-100"
             )} />
             <div className={cn(
                "absolute top-1/2 left-1/2 right-0 h-0.5 -translate-y-1/2 z-0",
                isStep3 ? "bg-green-500" : "bg-gray-100"
             )} />
             
             <div className={cn(
               "w-12 h-12 rounded-full flex items-center justify-center z-10 transition-all duration-500 border-2 shadow-sm",
               isStep1 ? "bg-[#16A34A] text-white border-[#16A34A]" : "bg-green-500 text-white border-green-500"
             )}>
                {isStep2 || isStep3 ? <Check size={20} strokeWidth={3} /> : <Mail size={18} strokeWidth={3} />}
             </div>
             
             <div className={cn(
               "w-12 h-12 rounded-full flex items-center justify-center z-10 transition-all duration-500 border-2 shadow-sm",
               isStep2 ? "bg-[#16A34A] text-white border-[#16A34A]" : (isStep3 ? "bg-green-500 text-white border-green-500" : "bg-white border-gray-100 text-gray-400")
             )}>
                {isStep3 ? <Check size={20} strokeWidth={3} /> : <Key size={18} strokeWidth={isStep2 ? 3 : 2} />}
             </div>
             
             <div className={cn(
               "w-12 h-12 rounded-full flex items-center justify-center z-10 transition-all duration-500 border-2 shadow-sm",
               isStep3 ? "bg-[#16A34A] text-white border-[#16A34A]" : "bg-white border-gray-100 text-gray-400"
             )}>
                <Lock size={18} strokeWidth={isStep3 ? 3 : 2} />
             </div>
          </div>

          <div className="w-full max-w-[400px]">
            {isStep1 && (
              <form onSubmit={handleForgotPassword} className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                <div className="space-y-2.5 text-left">
                  <Label htmlFor="email" className="font-bold text-gray-700 ml-1">Email Address</Label>
                  <div className="relative group">
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="h-14 rounded-2xl border-gray-100 bg-gray-50 focus:bg-white focus:border-[#16A34A] ring-0 focus:ring-4 focus:ring-green-500/10 transition-all px-12"
                    />
                    <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 transition-colors" />
                  </div>
                </div>
                <AppButton type="submit" disabled={isLoading} className="w-full h-14 bg-[#16A34A] hover:bg-[#15803D] rounded-2xl font-bold text-lg shadow-lg shadow-green-600/20">
                   {isLoading ? "Sending..." : "Send Reset Code"}
                </AppButton>
              </form>
            )}

            {isStep2 && (
              <form onSubmit={handleVerifyCode} className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                <div className="space-y-2.5 text-left">
                  <Label htmlFor="verificationCode" className="font-bold text-gray-700 ml-1">Verification Code</Label>
                  <div className="relative group">
                    <Input
                      id="verificationCode"
                      value={resetCode}
                      onChange={(e) => setResetCode(e.target.value)}
                      placeholder="••••••"
                      className="h-14 rounded-2xl border-gray-100 bg-gray-50 focus:bg-white focus:border-[#16A34A] ring-0 focus:ring-4 focus:ring-green-500/10 transition-all text-center text-xl tracking-[0.5em] font-bold"
                      maxLength={6}
                    />
                  </div>
                </div>
                <AppButton type="submit" disabled={isLoading} className="w-full h-14 bg-[#16A34A] hover:bg-[#15803D] rounded-2xl font-bold text-lg shadow-lg shadow-green-600/20">
                   {isLoading ? "Verifying..." : "Verify Code"}
                </AppButton>
                <div className="text-center pt-2">
                    <p className="text-sm text-gray-500 font-medium">
                        Didn't receive the code?{" "}
                        <button type="button" onClick={handleResendCode} className="font-bold text-[#16A249] hover:underline">
                            Resend Code
                        </button>
                    </p>
                </div>
              </form>
            )}

            {isStep3 && (
              <form onSubmit={handleResetPassword} className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                <div className="space-y-5">
                  <div className="space-y-2 text-left">
                    <Label htmlFor="pass" className="font-bold text-gray-700 ml-1">New Password</Label>
                    <div className="relative group">
                        <Input
                            id="pass"
                            type={showPassword ? "text" : "password"}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="h-14 rounded-2xl border-gray-100 bg-gray-50 focus:bg-white focus:border-[#16A34A] ring-0 focus:ring-4 focus:ring-green-500/10 transition-all px-12"
                            placeholder="Enter new password"
                        />
                        <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 transition-colors" />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-600 transition-colors">
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                  </div>
                  <div className="space-y-2 text-left">
                    <Label htmlFor="confirm" className="font-bold text-gray-700 ml-1">Confirm Password</Label>
                    <div className="relative group">
                        <Input
                            id="confirm"
                            type={showPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="h-14 rounded-2xl border-gray-100 bg-gray-50 focus:bg-white focus:border-[#16A34A] ring-0 focus:ring-4 focus:ring-green-500/10 transition-all px-12"
                            placeholder="Confirm new password"
                        />
                        <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 transition-colors" />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-600 transition-colors">
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                  </div>
                </div>
                <AppButton type="submit" disabled={isLoading} className="w-full h-14 bg-[#16A34A] hover:bg-[#15803D] rounded-2xl font-bold text-lg shadow-lg shadow-green-600/20">
                   {isLoading ? "Resetting..." : "Reset Password"}
                </AppButton>
              </form>
            )}

            <div className="mt-8 flex flex-col gap-4 items-center w-full">
              {isStep2 ? (
                <button 
                  onClick={() => setStep("forgot")}
                  className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#16A34A] transition-colors group"
                >
                  <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                  Change email address
                </button>
              ) : (
                <Link href="/login" className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#16A34A] transition-colors group">
                   <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                   Back to Sign In
                </Link>
              )}
              
              {isStep1 && (
                 <p className="text-sm text-gray-500 font-medium">
                    Remember your password? <Link href="/login" className="text-[#16A34A] font-bold hover:underline" title="Sign In">Sign In</Link>
                 </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
