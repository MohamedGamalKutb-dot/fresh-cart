import { AllproductsData } from "@/app/home.interface";
import { BrandsData } from "@/app/brands/brands.interface";
import { getBrandDetailsAction, getProductsByBrandAction } from "./brands-id.action";

export async function getBrandDetails(id: string): Promise<BrandsData> {
  return await getBrandDetailsAction(id);
}

export async function getProductsByBrand(id: string): Promise<AllproductsData[]> {
  return await getProductsByBrandAction(id);
}
