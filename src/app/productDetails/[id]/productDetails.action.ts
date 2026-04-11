"use server";

import { ProductDetailsData, ProductDetailsResponse } from "./productDetails.interface";
import { AllproductsData, AllproductsResponse } from "@/app/home.interface";

export async function getProductDetailsAction(id: string): Promise<ProductDetailsData> {
  const response = await fetch(
    `/api/v1/products/${id}`,
    { next: { revalidate: 86400 } }
  );
  const data: ProductDetailsResponse = await response.json();
  return data.data;
}

export async function getRelatedProductsAction(
  categoryId: string,
  currentProductId: string
): Promise<AllproductsData[]> {
  const response = await fetch(
    `/api/v1/products?category[in]=${categoryId}&limit=10`,
    { next: { revalidate: 86400 } }
  );
  const data: AllproductsResponse = await response.json();
  return data.data.filter((p) => p.id !== currentProductId);
}
