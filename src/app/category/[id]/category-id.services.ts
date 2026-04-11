import { AllproductsData } from "@/app/home.interface";
import { CategoriesData } from "@/app/category/category.interface";
import { getCategoryDetailsAction, getProductsByCategoryAction } from "./category-id.action";

export async function getCategoryDetails(id: string): Promise<CategoriesData> {
  return await getCategoryDetailsAction(id);
}

export async function getProductsByCategory(id: string): Promise<AllproductsData[]> {
  return await getProductsByCategoryAction(id);
}
