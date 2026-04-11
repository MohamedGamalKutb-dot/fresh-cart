"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import AppButton from "@/components/shared/AppButton/AppButton";
import { Plus, Loader2 } from "lucide-react";
import { AllproductsData } from "@/app/home.interface";

export default function AddToCartButton({ product }: { product: AllproductsData }) {
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(false);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      await addToCart(product);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppButton
      aria-label="Add to cart"
      size="icon"
      disabled={loading}
      className="rounded-full bg-[#16A34A] hover:bg-[#15803D] text-white w-9 h-9 shadow-md border-0 flex-shrink-0 disabled:opacity-70 disabled:cursor-not-allowed"
      onClick={handleClick}
    >
      {loading
        ? <Loader2 size={16} className="animate-spin" />
        : <Plus size={18} strokeWidth={2.5} />
      }
    </AppButton>
  );
}
