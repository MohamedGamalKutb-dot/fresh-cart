"use server";

import {
  AuthErrorResponse,
  LoginPayload,
  LoginResult,
  LoginSuccessResponse,
} from "./login.interface";
import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://ecommerce.routemisr.com';

function extractAuthError(payload: AuthErrorResponse): string {
  if (payload.errors?.[0]?.msg) return payload.errors[0].msg;
  if (payload.message) return payload.message;
  if (payload.statusMsg) return payload.statusMsg;
  return "Something went wrong. Please try again.";
}

export async function loginAction(payload: LoginPayload): Promise<LoginResult> {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorPayload: AuthErrorResponse = await response.json();
      return {
        success: false,
        error: extractAuthError(errorPayload),
      };
    }

    const data: LoginSuccessResponse = await response.json();
    
    return {
      success: true,
      data,
    };
  } catch {
    return {
      success: false,
      error: "Network error. Please check your connection and try again.",
    };
  }
}



