"use server";

import {
  RegisterErrorResponse,
  RegisterPayload,
  RegisterResult,
  RegisterSuccessResponse,
} from "./register.interface";
import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://ecommerce.routemisr.com';|| 'https://ecommerce.routemisr.com';

function extractRegisterError(payload: RegisterErrorResponse): string {
  if (payload.errors?.[0]?.msg) return payload.errors[0].msg;
  if (payload.message) return payload.message;
  if (payload.statusMsg) return payload.statusMsg;
  return "Something went wrong. Please try again.";
}

export async function registerAction(payload: RegisterPayload): Promise<RegisterResult> {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorPayload: RegisterErrorResponse = await response.json();
      return {
        success: false,
        error: extractRegisterError(errorPayload),
      };
    }

    const data: RegisterSuccessResponse = await response.json();
    
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
