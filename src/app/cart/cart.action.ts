"use server";

import { CartResponse } from "./cart.interface";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

/**
 * Get logged user cart
 */
export async function getLoggedUserCartAction(token: string): Promise<CartResponse> {
  const res = await fetch(`${BASE_URL}/api/v1/cart`, {
    method: "GET",
    headers: {
      token: token,
    },
  });
  return res.json();
}

/**
 * Add product to cart (v2)
 */
export async function addProductToCartAction(productId: string, token: string): Promise<CartResponse | any> {
  const res = await fetch(`${BASE_URL}/api/v1/cart`,{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: token,
    },
    body: JSON.stringify({ productId }),
  });
  
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    return { status: "error", message: errorData.message || "Failed to add to cart" };
  }

  return res.json();
}

/**
 * Update cart product quantity
 */
export async function updateCartProductQuantityAction(productId: string, count: number, token: string): Promise<CartResponse> {
  const res = await fetch(`${BASE_URL}/api/v1/cart/${productId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      token: token,
    },
    body: JSON.stringify({ count }),
  });
  return res.json();
}

/**
 * Remove specific cart item
 */
export async function removeSpecificCartItemAction(productId: string, token: string): Promise<CartResponse> {
  const res = await fetch(`${BASE_URL}/api/v1/cart/${productId}`, {
    method: "DELETE",
    headers: {
      token: token,
    },
  });
  return res.json();
}

/**
 * Clear user cart
 */
export async function clearUserCartAction(token: string) {
  const res = await fetch(`${BASE_URL}/api/v1/cart`, {
    method: "DELETE",
    headers: {
      token: token,
    },
  });
  return res.json();
}
