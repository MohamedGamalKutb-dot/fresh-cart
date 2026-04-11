"use server";

import { AllproductsData, AllproductsResponse } from "./home.interface";

export async function getAllProductsAction(): Promise<AllproductsData[]> {
  const response = await fetch(`/api/v1/products`, {
    next: { revalidate: 3600 },
  });
  const data: AllproductsResponse = await response.json();
  return data.data;
}
