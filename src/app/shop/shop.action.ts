"use server";

import { AllproductsData, AllproductsResponse } from "./shop.interface";

export async function getAllProductsAction(): Promise<AllproductsData[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'https://ecommerce.routemisr.com'}/api/v1/products`, {
      next: { revalidate: 3600 },
    });
    if (!response.ok) return [];
    const data: AllproductsResponse = await response.json();
    return data?.data || [];
  } catch (error) {
    return [];
  }
}
