"use client";

import { useWishlist } from "@/context/WishlistContext";
import AppButton from "@/components/shared/AppButton/AppButton";
import { Heart } from "lucide-react";
import { AllproductsData } from "@/app/home.interface";

export default function WishlistButton({ product }: { product: AllproductsData }) {
  const { isInWishlist, toggleWishlist, isMounted } = useWishlist();
  
  if (!isMounted) {
    return (
      <AppButton
        aria-label="Wait for wishlist"
        variant="outline"
        size="icon-sm"
        className="rounded-full bg-white border-[#E9ECEF] text-[#6C757D] shadow-sm relative z-10"
      >
        <Heart size={15} />
      </AppButton>
    );
  }

  const active = isInWishlist(product.id);

  return (
    <AppButton
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
      variant="outline"
      size="icon-sm"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(product);
      }}
      className="rounded-full bg-white border-[#E9ECEF] transition-all hover:scale-110 shadow-sm relative z-10"
    >
      <Heart 
        size={15} 
        className={active ? "fill-red-500 text-red-500" : "text-[#6C757D] hover:text-red-500"} 
      />
    </AppButton>
  );
}
