"use client";

import { Controller } from "react-hook-form";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import AppButton from "@/components/shared/AppButton/AppButton";
import { UserPlus, Eye, EyeOff } from "lucide-react";
import { useRegisterLogic, STRENGTH_CONFIG, getPasswordStrength } from "./RegisterForm.logic";

function PasswordStrengthBar({ password }: { password: string }) {
  const { label, color, bars } = STRENGTH_CONFIG[getPasswordStrength(password)];
  if (!password) return null;
  return (
    <div className="mt-2">
      <div className="flex gap-1 mb-1">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-1 flex-1 rounded-full transition-all duration-300"
            style={{ backgroundColor: i <= bars ? color : "#E9ECEF" }}
          />
        ))}
      </div>
      <p className="text-xs font-medium" style={{ color }}>{label}</p>
    </div>
  );
}

export default function RegisterForm() {
  const {
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
  } = useRegisterLogic();

  return (
    <div className="bg-white rounded-2xl border border-[#E9ECEF] shadow-sm p-7 md:p-8">
      {/* Header */}
      <div className="mb-7">
        <h2 className="text-2xl font-bold text-[#212529] mb-1">Create Your Account</h2>
        <p className="text-sm text-[#6C757D]">Start your fresh journey with us today</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* Name */}
        <div className="space-y-1.5">
          <Label htmlFor="register-name" className="text-sm font-medium text-[#212529]">
            Full Name
          </Label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="register-name"
                type="text"
                placeholder="Ali"
                className="h-11 rounded-xl border-[#E9ECEF] bg-[#F8F9FA] focus-visible:bg-white placeholder:text-[#ADB5BD]"
              />
            )}
          />
          {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <Label htmlFor="register-email" className="text-sm font-medium text-[#212529]">
            Email Address
          </Label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="register-email"
                type="email"
                placeholder="ali@example.com"
                className="h-11 rounded-xl border-[#E9ECEF] bg-[#F8F9FA] focus-visible:bg-white placeholder:text-[#ADB5BD]"
              />
            )}
          />
          {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <Label htmlFor="register-password" className="text-sm font-medium text-[#212529]">
            Password
          </Label>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <div className="relative">
                <Input
                  {...field}
                  id="register-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="create a strong password"
                  className="h-11 rounded-xl border-[#E9ECEF] bg-[#F8F9FA] focus-visible:bg-white pr-10 placeholder:text-[#ADB5BD]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#ADB5BD] hover:text-[#6C757D] transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            )}
          />
          <PasswordStrengthBar password={passwordValue} />
          {errors.password ? (
            <p className="text-xs text-red-500">{errors.password.message}</p>
          ) : (
            <p className="text-xs text-[#6C757D]">Must be at least 8 characters with numbers and symbols.</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-1.5">
          <Label htmlFor="register-confirm" className="text-sm font-medium text-[#212529]">
            Confirm Password
          </Label>
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <div className="relative">
                <Input
                  {...field}
                  id="register-confirm"
                  type={showConfirm ? "text" : "password"}
                  placeholder="confirm your password"
                  className="h-11 rounded-xl border-[#E9ECEF] bg-[#F8F9FA] focus-visible:bg-white pr-10 placeholder:text-[#ADB5BD]"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  aria-label={showConfirm ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#ADB5BD] hover:text-[#6C757D] transition-colors"
                >
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            )}
          />
          {errors.confirmPassword && (
            <p className="text-xs text-red-500">{errors.confirmPassword.message}</p>
          )}
        </div>

        {/* Phone */}
        <div className="space-y-1.5">
          <Label htmlFor="register-phone" className="text-sm font-medium text-[#212529]">
            Phone Number
          </Label>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="register-phone"
                type="tel"
                placeholder="+1 234 567 8900"
                className="h-11 rounded-xl border-[#E9ECEF] bg-[#F8F9FA] focus-visible:bg-white placeholder:text-[#ADB5BD]"
              />
            )}
          />
          {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
        </div>

        {/* Terms checkbox */}
        <div className="space-y-1.5">
          <div className="flex items-start gap-3 pt-1">
            <Controller
              name="acceptTerms"
              control={control}
              render={({ field }) => (
                <input
                  id="accept-terms"
                  type="checkbox"
                  checked={field.value === true}
                  onChange={(e) => field.onChange(e.target.checked)}
                  className="mt-0.5 size-4 rounded border-[#E9ECEF] accent-[#0AAD0A] cursor-pointer flex-shrink-0"
                />
              )}
            />
            <label htmlFor="accept-terms" className="text-xs text-[#6C757D] leading-relaxed cursor-pointer">
              I agree to the{" "}
              <Link href="/terms" className="text-[#0AAD0A] hover:underline font-medium">Terms of Service</Link>
              {" "}and{" "}
              <Link href="/privacy" className="text-[#0AAD0A] hover:underline font-medium">Privacy Policy</Link>
            </label>
          </div>
          {errors.acceptTerms && (
            <p className="text-xs text-red-500">{errors.acceptTerms.message}</p>
          )}
        </div>

        {/* Server error */}
        {serverError && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
            {serverError}
          </div>
        )}

        {/* Submit */}
        <AppButton
          type="submit"
          disabled={isSubmitting}
          className="w-full h-11 rounded-xl bg-[#0AAD0A] hover:bg-[#09960A] text-white font-semibold text-sm mt-2"
        >
          {isSubmitting ? (
            <span className="inline-flex items-center gap-2">
              <Spinner className="size-4" />
              Creating account...
            </span>
          ) : (
            <span className="inline-flex items-center gap-2">
              <UserPlus size={16} />
              Create My Account
            </span>
          )}
        </AppButton>
      </form>

      {/* Sign in link */}
      <p className="text-sm text-[#6C757D] mt-5 text-center">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-[#0AAD0A] hover:text-[#09960A]">
          Sign In
        </Link>
      </p>
    </div>
  );
}
