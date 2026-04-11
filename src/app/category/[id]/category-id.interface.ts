import { AllproductsData } from "@/app/home.interface";
import { CategoriesData } from "@/app/category/category.interface";

export interface CategoryIdPageProps {
  params: Promise<{ id: string }>;
}

export type { AllproductsData, CategoriesData };
