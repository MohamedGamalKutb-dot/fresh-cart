"use server";

import { Order } from "./orders.interface";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://ecommerce.routemisr.com';

export async function getUserOrdersAction(userId: string): Promise<Order[]> {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/orders/user/${userId}`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch orders");
    }
    
    return data;
  } catch (error) {
    console.error("Error fetching user orders:", error);
    throw error;
  }
}

export async function getAllOrdersAction(): Promise<Order[]> {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/orders`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch all orders");
    }
    
    return data;
  } catch (error) {
    console.error("Error fetching all orders:", error);
    throw error;
  }
}
