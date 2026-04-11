import { BrandsData } from "./brands.interface";
import { getAllBrandsAction } from "./brands.action";

export async function getAllBrands(): Promise<BrandsData[]> {
  return await getAllBrandsAction();
}
