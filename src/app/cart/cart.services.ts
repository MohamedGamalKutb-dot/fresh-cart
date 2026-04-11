import { CartResponse } from "./cart.interface";
import { 
  getLoggedUserCartAction, 
  addProductToCartAction, 
  updateCartProductQuantityAction, 
  removeSpecificCartItemAction, 
  clearUserCartAction 
} from "./cart.action";

export async function getLoggedUserCart(token: string): Promise<CartResponse> {
  return await getLoggedUserCartAction(token);
}

export async function addProductToCart(productId: string, token: string): Promise<CartResponse | any> {
  return await addProductToCartAction(productId, token);
}

export async function updateCartProductQuantity(productId: string, count: number, token: string): Promise<CartResponse> {
  return await updateCartProductQuantityAction(productId, count, token);
}

export async function removeSpecificCartItem(productId: string, token: string): Promise<CartResponse> {
  return await removeSpecificCartItemAction(productId, token);
}

export async function clearUserCart(token: string) {
  return await clearUserCartAction(token);
}
