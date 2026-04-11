import { AllproductsData } from "@/app/shop/shop.interface";

export interface SearchResponse {
  results: number;
  metadata: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
  };
  data: AllproductsData[];
}
