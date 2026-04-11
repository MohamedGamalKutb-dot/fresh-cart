"use server";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// 1. Create Cash Order From Cart (v2)
export async function createCashOrderFromCartV2Action(cartId: string, shippingAddress: { details: string, phone: string, city: string }, token: string) {
  const response = await fetch(`${BASE_URL}/api/v2/orders/${cartId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: token,
    },
    body: JSON.stringify({
      shippingAddress
    })
  });
  
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to create cash order (v2)");
  }
  return data;
}

// 2. Create Cash Order (v1)
export async function createCashOrderAction(cartId: string, shippingAddress: { details: string, phone: string, city: string }, token: string) {
  const response = await fetch(`${BASE_URL}/api/v1/orders/${cartId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: token,
    },
    body: JSON.stringify({
      shippingAddress
    })
  });
  
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to create order");
  }
  return data;
}

// 3. Checkout Session
export async function createCheckoutSessionAction(cartId: string, shippingAddress: { details: string, phone: string, city: string }, token: string, returnUrl: string) {
  const response = await fetch(`${BASE_URL}/api/v1/orders/checkout-session/${cartId}?url=${encodeURIComponent(returnUrl)}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: token,
    },
    body: JSON.stringify({
      shippingAddress
    })
  });
  
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to create checkout session");
  }
  return data;
}
