import { ProductDetailsData } from "./productDetails.interface";
import { AllproductsData } from "@/app/home.interface";
import { getProductDetailsAction, getRelatedProductsAction } from "./productDetails.action";

export async function getProductDetails(id: string): Promise<ProductDetailsData> {
  return await getProductDetailsAction(id);
}

export async function getRelatedProducts(
  categoryId: string,
  currentProductId: string
): Promise<AllproductsData[]> {
  return await getRelatedProductsAction(categoryId, currentProductId);
}
