import { AllproductsData } from "./shop.interface";
import { getAllProductsAction } from "./shop.action";

export async function getAllProducts(): Promise<AllproductsData[]> {
  return await getAllProductsAction();
}
