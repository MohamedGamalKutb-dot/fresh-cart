"use server";

import { AllBrandsResponse, BrandsData } from "./brands.interface";

export async function getAllBrandsAction(): Promise<BrandsData[]> {
  const brandsRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/brands`,
    { next: { revalidate: 3600 } }
  );

  const brandsResponse: AllBrandsResponse = await brandsRes.json();
  return brandsResponse.data;
}
