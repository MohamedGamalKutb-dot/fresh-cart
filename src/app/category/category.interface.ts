export interface AllCategoriesResponse {
  results: number;
  metadata: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
  };
  data: CategoriesData[];
}

export interface CategoriesData {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}
