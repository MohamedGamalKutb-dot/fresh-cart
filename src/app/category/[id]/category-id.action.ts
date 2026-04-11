"use server";

import { AllproductsData, AllproductsResponse } from "@/app/home.interface";
import { CategoriesData } from "@/app/category/category.interface";

export async function getCategoryDetailsAction(id: string): Promise<CategoriesData> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'https://ecommerce.routemisr.com'}/api/v1/categories/${id}`, {
    next: { revalidate: 3600 },
  });
  if (!response.ok) throw new Error("Failed to fetch category details");
  const data = await response.json();
  return data.data;
}

export async function getProductsByCategoryAction(id: string): Promise<AllproductsData[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'https://ecommerce.routemisr.com'}/api/v1/products?category[in]=${id}`, {
    next: { revalidate: 3600 },
  });
  if (!response.ok) throw new Error("Failed to fetch products for category");
  const data: AllproductsResponse = await response.json();
  return data.data;
}
