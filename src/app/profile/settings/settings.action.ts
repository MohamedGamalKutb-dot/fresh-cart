"use server";

import { UpdateUserDataPayload, UpdatePasswordPayload, UpdateUserDataResponse, UpdatePasswordResponse } from "./settings.interface";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://ecommerce.routemisr.com';

/**
 * Update user basic data (name, email, phone)
 */
export async function updateUserDataAction(payload: UpdateUserDataPayload, token: string): Promise<UpdateUserDataResponse> {
  const res = await fetch(`${BASE_URL}/api/v1/users/updateMe/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      token: token,
    },
    body: JSON.stringify(payload),
  });
  return res.json();
}

/**
 * Update user password
 */
export async function updateUserPasswordAction(payload: UpdatePasswordPayload, token: string): Promise<UpdatePasswordResponse> {
  const res = await fetch(`${BASE_URL}/api/v1/users/changeMyPassword`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      token: token,
    },
    body: JSON.stringify(payload),
  });
  
  const data = await res.json();
  return data;
}
