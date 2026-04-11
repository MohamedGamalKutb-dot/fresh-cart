"use server";

import { AllproductsData, AllproductsResponse } from "@/app/home.interface";
import { BrandsData } from "@/app/brands/brands.interface";

export async function getBrandDetailsAction(id: string): Promise<BrandsData> {
  const response = await fetch(`/api/v1/brands/${id}`, {
    next: { revalidate: 3600 },
  });
  if (!response.ok) throw new Error("Failed to fetch brand details");
  const data = await response.json();
  return data.data;
}

export async function getProductsByBrandAction(id: string): Promise<AllproductsData[]> {
  const response = await fetch(`/api/v1/products?brand=${id}`, {
    next: { revalidate: 3600 },
  });
  if (!response.ok) throw new Error("Failed to fetch products for brand");
  const data: AllproductsResponse = await response.json();
  return data.data;
}
