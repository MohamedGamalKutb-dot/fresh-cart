import { AllproductsData } from "./home.interface";
import { getAllProductsAction } from "./home.action";

export async function getAllProducts(): Promise<AllproductsData[]> {
  return await getAllProductsAction();
}