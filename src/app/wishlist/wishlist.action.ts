"use server";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://ecommerce.routemisr.com';

/**
 * Add product to user wishlist
 */
export async function addProductToWishlistAction(productId: string, token: string) {
  const res = await fetch(`${BASE_URL}/api/v1/wishlist`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: token,
    },
    body: JSON.stringify({ productId }),
  });
  return res.json();
}

/**
 * Remove product from user wishlist
 */
export async function removeProductFromWishlistAction(productId: string, token: string) {
  const res = await fetch(`${BASE_URL}/api/v1/wishlist/${productId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      token: token,
    },
  });
  return res.json();
}

/**
 * Get logged user wishlist
 */
export async function getLoggedUserWishlistAction(token: string) {
  const res = await fetch(`${BASE_URL}/api/v1/wishlist`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: token,
    },
    cache: "no-store"
  });
  return res.json();
}
