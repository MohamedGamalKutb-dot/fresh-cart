"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { AllproductsData } from "@/app/home.interface";
import {
  addProductToCart,
  removeSpecificCartItem,
  getLoggedUserCart,
  updateCartProductQuantity,
  clearUserCart,
} from "@/app/cart/cart.services";
import { CartData } from "@/app/cart/cart.interface";
import { toast } from "sonner";

// Polyfill CartItem for Local Storage (Guest)
export interface GuestCartItem {
  count: number;
  product: AllproductsData;
  price: number;
}

interface CartContextType {
  cart: CartData | null;
  guestCart: GuestCartItem[];
  addToCart: (product: AllproductsData) => Promise<void>;
  updateCount: (productId: string, count: number) => Promise<void>;
  removeProduct: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  cartCount: number;
  isMounted: boolean;
  isInCart: (productId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [cart, setCart] = useState<CartData | null>(null);
  const [guestCart, setGuestCart] = useState<GuestCartItem[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  // Retrieve token prioritizing NextAuth session, fallback to localStorage if available
  const sessionToken = (session as any)?.accessToken;
  const localToken = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const token = sessionToken || localToken;
  // Computed property safely checking for arrays
  const cartCount = cart 
    ? (Array.isArray(cart.products) ? cart.products.reduce((acc, item) => acc + (item?.count || 0), 0) : 0)
    : (Array.isArray(guestCart) ? guestCart.reduce((acc, item) => acc + (item?.count || 0), 0) : 0);

  useEffect(() => {
    setIsMounted(true);

    if (token) {
      // Sync token to localStorage for backward compatibility with legacy logic
      localStorage.setItem("token", token);
      
      getLoggedUserCart(token)
        .then((res) => {
          if (res.status === "success" && res.data) {
            setCart(res.data);
          }
        })
        .catch((err) => console.error("Failed to load user cart from API", err));
    } else {
      // Only clear if we were previously logged in or intended to be guest
      // localStorage.removeItem("token"); // Optional: depend on logout logic
      
      const stored = localStorage.getItem("guestCart");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            setGuestCart(parsed);
          } else {
            console.warn("Guest cart is not an array, resetting.");
            setGuestCart([]);
            localStorage.removeItem("guestCart");
          }
        } catch (e) {
          console.error("Failed to parse local cart", e);
          setGuestCart([]);
          localStorage.removeItem("guestCart");
        }
      }
    }
  }, [status, token]);

  const addToCart = async (product: AllproductsData) => {
    if (token) {
      const toastId = toast.loading(`Adding ${product.title} to cart...`);
      try {
        const res = await addProductToCart(product.id, token);
        if (res.status === "success" || res.message === "success") {
          toast.success(`${product.title} added to cart`);
          // Refresh the cart state from the server
          const newCartRes = await getLoggedUserCart(token);
          if (newCartRes.status === "success" && newCartRes.data) {
            setCart(newCartRes.data);
          }
        } else {
          toast.error(res.message || "Failed to add to cart");
        }
      } catch (err: any) {
        toast.error(err.message || "An error occurred");
        console.error(err);
      } finally {
        toast.dismiss(toastId);
      }
    } else {
      setGuestCart((prev) => {
        const existing = prev.find((item) => item.product.id === product.id);
        let updated;
        if (existing) {
          updated = prev.map((item) => 
            item.product.id === product.id ? { ...item, count: item.count + 1 } : item
          );
        } else {
          updated = [...prev, { count: 1, product, price: product.priceAfterDiscount || product.price }];
        }
        localStorage.setItem("guestCart", JSON.stringify(updated));
        toast.success(`${product.title} added to cart`);
        return updated;
      });
    }
  };

  const updateCount = async (productId: string, count: number) => {
    if (count < 1) return;

    if (token) {
      try {
        const res = await updateCartProductQuantity(productId, count, token);
        if (res.status === "success" && res.data) {
          setCart(res.data);
          toast.success("Quantity updated");
        }
      } catch (err: any) {
        toast.error(err.message || "Failed to update quantity");
        console.error(err);
      }
    } else {
      setGuestCart((prev) => {
        const updated = prev.map((item) => 
          item.product.id === productId ? { ...item, count } : item
        );
        localStorage.setItem("guestCart", JSON.stringify(updated));
        toast.success("Quantity updated");
        return updated;
      });
    }
  };

  const removeProduct = async (productId: string) => {
    if (token) {
      try {
        const res = await removeSpecificCartItem(productId, token);
        if (res.status === "success" && res.data) {
          setCart(res.data);
          toast.success("Item removed from cart");
        }
      } catch (err: any) {
        toast.error(err.message || "Failed to remove item");
        console.error(err);
      }
    } else {
      setGuestCart((prev) => {
        const updated = prev.filter((item) => item.product.id !== productId);
        localStorage.setItem("guestCart", JSON.stringify(updated));
        toast.success("Item removed from cart");
        return updated;
      });
    }
  };

  const clearCart = async () => {
    if (token) {
      try {
        const res = await clearUserCart(token);
        if (res.message === "success") {
          setCart(null);
          toast.success("Cart cleared");
        }
      } catch (err: any) {
        toast.error("Failed to clear cart");
        console.error(err);
      }
    } else {
      setGuestCart([]);
      localStorage.removeItem("guestCart");
      toast.success("Cart cleared");
    }
  };

  const isInCart = (productId: string) => {
    if (token && cart && Array.isArray(cart.products)) {
        return cart.products.some((item) => String(item.product.id) === String(productId));
    }
    return guestCart.some((item) => String(item.product.id) === String(productId));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        guestCart,
        addToCart,
        updateCount,
        removeProduct,
        clearCart,
        cartCount: isMounted ? cartCount : 0,
        isMounted,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
