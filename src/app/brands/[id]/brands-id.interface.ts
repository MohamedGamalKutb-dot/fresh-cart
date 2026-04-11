import { AllproductsData } from "@/app/home.interface";
import { BrandsData } from "@/app/brands/brands.interface";

export interface BrandsIdPageProps {
  params: Promise<{ id: string }>;
}

export type { AllproductsData, BrandsData };
