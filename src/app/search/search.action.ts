"use server";

import { AllproductsData } from "@/app/home.interface";
import { SearchResponse } from "./search.interface";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://ecommerce.routemisr.com';

export async function searchProductsAction(query: string): Promise<AllproductsData[]> {
  const q = query ? query.trim().toLowerCase() : "";

  try {
    // Attempt 1: Using the keyword param (if supported)
    const res = await fetch(
      `${BASE_URL}/api/v1/products?keyword=${encodeURIComponent(q)}`,
      { next: { revalidate: 60 } }
    );

    if (res.ok) {
      const data: SearchResponse = await res.json();
      if (data.data && data.data.length > 0) {
        return data.data;
      }
    }
    
    // Attempt 2: Fallback - Fetch all and filter (for older API versions where keyword is not supported)
    // This ensures that "nothing is appearing" doesn't happen if they have products.
    const allRes = await fetch(`${BASE_URL}/api/v1/products`, { next: { revalidate: 3600 } });
    if (allRes.ok) {
      const allData: SearchResponse = await allRes.json();
      return allData.data.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.description?.toLowerCase().includes(q) ||
        p.category?.name?.toLowerCase().includes(q)
      );
    }
  } catch (error) {
    console.error("Search Action Error:", error);
  }

  return [];
}
