import { AllproductsData } from "@/app/shop/shop.interface";
import { searchProductsAction } from "./search.action";

export async function searchProducts(query: string): Promise<AllproductsData[]> {
  return await searchProductsAction(query);
}
