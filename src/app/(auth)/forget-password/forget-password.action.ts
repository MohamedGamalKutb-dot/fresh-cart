"use server";

import {
  ForgotPasswordPayload,
  ForgotPasswordResponse,
  VerifyResetCodePayload,
  VerifyResetCodeResponse,
  ResetPasswordPayload,
  ResetPasswordResponse,
} from "./forget-password.interface";
import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function forgotPasswordAction(payload: ForgotPasswordPayload): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/auth/forgotPasswords`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data: ForgotPasswordResponse = await response.json();

    if (!response.ok) {
      return { success: false, message: data.message || "Email not found" };
    }

    return { success: true, message: data.message };
  } catch {
    return { success: false, message: "Network error. Please try again." };
  }
}

export async function verifyResetCodeAction(payload: VerifyResetCodePayload): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/auth/verifyResetCode`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data: VerifyResetCodeResponse = await response.json();

    if (!response.ok) {
        // Handle potential error messages from API
        return { success: false, message: "Invalid or expired reset code." };
    }

    return { success: true, message: "Code verified successfully." };
  } catch {
    return { success: false, message: "Verification failed. Please try again." };
  }
}

export async function resetPasswordAction(payload: ResetPasswordPayload): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/auth/resetPassword`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data: ResetPasswordResponse = await response.json();

    if (!response.ok) {
      return { success: false, message: "Failed to reset password. Please try again." };
    }

    // Usually, the reset password endpoint returns a new token
    // But we handle all auth via NextAuth, so we don't set cookies manually here.

    return { success: true, message: "Password reset successfully." };
  } catch {
    return { success: false, message: "Network error during password reset." };
  }
}
