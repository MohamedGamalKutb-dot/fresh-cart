"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { AllproductsData } from "@/app/home.interface";
import {
  addProductToWishlist,
  removeProductFromWishlist,
  getLoggedUserWishlist,
} from "@/app/wishlist/wishlist.services";
import { toast } from "sonner";

interface WishlistContextType {
  wishlist: AllproductsData[];
  toggleWishlist: (product: AllproductsData) => void;
  isInWishlist: (productId: string) => boolean;
  wishlistCount: number;
  isMounted: boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [wishlist, setWishlist] = useState<AllproductsData[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  // Retrieve token prioritizing NextAuth session, fallback to localStorage if available
  const sessionToken = (session as any)?.accessToken;
  const localToken = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const token = sessionToken || localToken;

  useEffect(() => {
    setIsMounted(true);
    
    if (token) {
      // API call if logged in
      getLoggedUserWishlist(token)
        .then((res) => {
          if (res.status === "success" && res.data) {
            setWishlist(res.data);
          }
        })
        .catch((err) => console.error("Failed to load user wishlist from API", err));
    } else {
      // Fallback to local storage for guests
      const stored = localStorage.getItem("wishlist");
      if (stored) {
        try {
          setWishlist(JSON.parse(stored));
        } catch (e) {
          console.error("Failed to parse local wishlist", e);
        }
      }
    }
  }, [status, token]);

  const toggleWishlist = async (product: AllproductsData) => {
    const exists = wishlist.some((p) => p.id === product.id);

    // Optimistic UI Update
    setWishlist((prev) => {
      let updated;
      if (exists) {
        updated = prev.filter((p) => p.id !== product.id);
      } else {
        updated = [...prev, product];
      }

      // Keep guest cart synced locally
      if (!token) {
        localStorage.setItem("wishlist", JSON.stringify(updated));
      }

      const message = exists 
        ? `${product.title} removed from wishlist` 
        : `${product.title} added to wishlist`;
      
      toast.success(message);

      return updated;
    });

    // Remote Sync
    if (token) {
      try {
        if (exists) {
          await removeProductFromWishlist(product.id, token);
        } else {
          await addProductToWishlist(product.id, token);
        }
      } catch (err) {
        console.error("Failed to sync wishlist to API", err);
      }
    }
  };

  const isInWishlist = (productId: string) => {
    if (!isMounted) return false;
    return wishlist.some((p) => p.id === productId);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isInWishlist,
        wishlistCount: isMounted ? wishlist.length : 0,
        isMounted,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used within WishlistProvider");
  return context;
}

