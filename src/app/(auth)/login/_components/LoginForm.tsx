"use client";

import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import AppButton from "@/components/shared/AppButton/AppButton";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useLoginLogic, TRUST_BADGES } from "./LoginForm.logic";

export default function LoginForm() {
  const {
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
  } = useLoginLogic();

  return (
    <div className="flex flex-col items-center w-full">
      {/* Logo */}
      <div className="mb-5 text-center">
        <span className="text-2xl font-bold">
          <span className="text-[#0AAD0A]">Fresh</span>
          <span className="text-[#212529]">Cart</span>
        </span>
      </div>

      {/* Heading */}
      <h1 className="text-2xl font-bold text-[#212529] mb-1 text-center">Welcome Back!</h1>
      <p className="text-sm text-[#6C757D] mb-6 text-center">
        Sign in to continue your fresh shopping experience
      </p>

      {/* Social login buttons */}
      <div className="flex flex-col gap-3 w-full mb-5">
        <button
          type="button"
          onClick={(e) => handleGoogleSignIn(e)}
          className="flex items-center justify-center gap-2.5 h-11 rounded-xl border border-[#E9ECEF] bg-white hover:bg-[#F8F9FA] transition-colors text-sm font-medium text-[#212529] w-full"
        >
          <svg className="size-4 flex-shrink-0" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Continue with Google
        </button>

        <button
          type="button"
          onClick={(e) => handleFacebookSignIn(e)}
          className="flex items-center justify-center gap-2.5 h-11 rounded-xl border border-[#E9ECEF] bg-white hover:bg-[#F8F9FA] transition-colors text-sm font-medium text-[#212529] w-full"
        >
          <svg className="size-4 flex-shrink-0" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="#1877F2" d="M24 12.073C24 5.404 18.627 0 12 0S0 5.404 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
          </svg>
          Continue with Facebook
        </button>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3 w-full mb-5">
        <div className="flex-1 h-px bg-[#E9ECEF]" />
        <span className="text-xs text-[#6C757D] font-semibold tracking-widest uppercase whitespace-nowrap">
          or continue with email
        </span>
        <div className="flex-1 h-px bg-[#E9ECEF]" />
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="w-full space-y-4">
        {/* Email */}
        <div className="space-y-1.5">
          <Label htmlFor="login-email" className="text-sm font-medium text-[#212529]">
            Email Address
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#ADB5BD] pointer-events-none" />
            <input
              id="login-email"
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#E9ECEF] bg-[#F8F9FA] text-sm text-[#212529] placeholder:text-[#ADB5BD] focus:outline-none focus:bg-white focus:border-[#0AAD0A] transition-colors"
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="login-password" className="text-sm font-medium text-[#212529]">
              Password
            </Label>
            <Link href="/forget-password" title="Forgot Password?" className="text-xs font-semibold text-[#0AAD0A] hover:text-[#09960A]">
              Forgot Password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#ADB5BD] pointer-events-none" />
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              required
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-11 pl-10 pr-10 rounded-xl border border-[#E9ECEF] bg-[#F8F9FA] text-sm text-[#212529] placeholder:text-[#ADB5BD] focus:outline-none focus:bg-white focus:border-[#0AAD0A] transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#ADB5BD] hover:text-[#6C757D] transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {/* Keep me signed in */}
        <div className="flex items-center gap-2.5">
          <input
            id="keep-signed-in"
            type="checkbox"
            checked={keepSignedIn}
            onChange={(e) => setKeepSignedIn(e.target.checked)}
            className="size-4 rounded border-[#E9ECEF] accent-[#0AAD0A] cursor-pointer"
          />
          <label htmlFor="keep-signed-in" className="text-sm text-[#6C757D] cursor-pointer">
            Keep me signed in
          </label>
        </div>

        {/* Error */}
        {error && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
            {error}
          </div>
        )}

        {/* Submit */}
        <AppButton
          type="submit"
          disabled={isSubmitting}
          className="w-full h-11 rounded-xl bg-[#0AAD0A] hover:bg-[#09960A] text-white font-semibold text-sm"
        >
          {isSubmitting ? (
            <span className="inline-flex items-center gap-2">
              <Spinner className="size-4" />
              Signing in...
            </span>
          ) : (
            "Sign In"
          )}
        </AppButton>
      </form>

      {/* Sign up link */}
      <p className="text-sm text-[#6C757D] mt-5 text-center">
        New to FreshCart?{" "}
        <Link href="/register" className="font-semibold text-[#0AAD0A] hover:text-[#09960A]">
          Create an account
        </Link>
      </p>

      {/* Trust badges */}
      <div className="flex items-center justify-center gap-5 mt-5 pt-4 border-t border-[#E9ECEF] w-full">
        {TRUST_BADGES.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-1.5 text-[#ADB5BD]">
            <Icon className="size-3.5" />
            <span className="text-xs font-medium">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
