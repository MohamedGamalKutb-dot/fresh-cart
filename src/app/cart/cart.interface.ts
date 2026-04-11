import { Category, Brand } from "@/app/home.interface";

export interface CartProduct {
  _id: string;
  title: string;
  quantity: number;
  imageCover: string;
  category: Category;
  brand: Brand;
  ratingsAverage: number;
  id: string;
}

export interface CartItem {
  count: number;
  _id: string;
  product: CartProduct;
  price: number;
}

export interface CartData {
  _id: string;
  cartOwner: string;
  products: CartItem[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  totalCartPrice: number;
}

export interface CartResponse {
  status: string;
  numOfCartItems: number;
  cartId: string;
  data: CartData;
}
