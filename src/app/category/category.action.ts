"use server";

import { AllCategoriesResponse, CategoriesData } from "./category.interface";

export async function getAllCategoriesAction(): Promise<CategoriesData[]> {
  const categoriesRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/categories`,
    { next: { revalidate: 3600 } }
  );

  if (!categoriesRes.ok) {
    throw new Error("Failed to fetch categories");
  }

  const categoriesData: AllCategoriesResponse = await categoriesRes.json();
  return categoriesData.data;
}
