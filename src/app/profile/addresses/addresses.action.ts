"use server";

import { AddAddressPayload } from "./addresses.interface";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://ecommerce.routemisr.com';

/**
 * Get logged user addresses
 */
export async function getLoggedUserAddressesAction(token: string) {
  const res = await fetch(`${BASE_URL}/api/v1/addresses`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: token,
    },
    cache: "no-store",
  });
  return res.json();
}

/**
 * Add address to user profile
 */
export async function addAddressAction(payload: AddAddressPayload, token: string) {
  const res = await fetch(`${BASE_URL}/api/v1/addresses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: token,
    },
    body: JSON.stringify(payload),
  });
  return res.json();
}

/**
 * Remove address from user profile
 */
export async function removeAddressAction(addressId: string, token: string) {
  const res = await fetch(`${BASE_URL}/api/v1/addresses/${addressId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      token: token,
    },
  });
  return res.json();
}
