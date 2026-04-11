import { getAllCategories } from "@/app/category/category.services";
import CategorySlider from "@/components/shared/CategorySlider/CategorySlider";

export default async function CategoriesWrapper() {
  const categoriesList = await getAllCategories();
  
  if (!categoriesList || categoriesList.length === 0) return null;

  return (
    <CategorySlider categories={categoriesList} />
  );
}
