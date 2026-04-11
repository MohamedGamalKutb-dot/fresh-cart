import { 
  addProductToWishlistAction, 
  removeProductFromWishlistAction, 
  getLoggedUserWishlistAction 
} from "./wishlist.action";

export async function addProductToWishlist(productId: string, token: string) {
  return await addProductToWishlistAction(productId, token);
}

export async function removeProductFromWishlist(productId: string, token: string) {
  return await removeProductFromWishlistAction(productId, token);
}

export async function getLoggedUserWishlist(token: string) {
  return await getLoggedUserWishlistAction(token);
}
