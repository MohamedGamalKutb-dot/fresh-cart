import { CategoriesData } from "./category.interface";
import { getAllCategoriesAction } from "./category.action";

export async function getAllCategories(): Promise<CategoriesData[]> {
  return await getAllCategoriesAction();
}
