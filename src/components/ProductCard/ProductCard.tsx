"use client";

import { AllproductsData } from "@/app/home.interface";
import Image from "next/image";
import Link from "next/link";
import { Heart, RefreshCw, Eye, Plus, Star } from "lucide-react";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AppButton from "@/components/shared/AppButton/AppButton";
import WishlistButton from "@/components/shared/WishlistButton/WishlistButton";
import AddToCartButton from "@/components/shared/AddToCartButton/AddToCartButton";
import { cn } from "@/lib/utils";

export default function ProductCard({ prod }: { prod: AllproductsData }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const {
    id,
    category,
    imageCover,
    price,
    title,
    ratingsAverage,
    ratingsQuantity,
    priceAfterDiscount,
  } = prod;

  const discountPercent = priceAfterDiscount
    ? Math.round(((price - priceAfterDiscount) / price) * 100)
    : null;

  const displayPrice = priceAfterDiscount ?? price;
  const fullStars = Math.floor(ratingsAverage);
  const hasHalf = ratingsAverage - fullStars >= 0.5;

  return (
    <div className="group perspective-1000 w-full">
      <Card 
        className={cn(
          "relative w-full rounded-[10px] border bg-white p-0 gap-0 transition-all duration-700 ease-in-out transform-style-3d hover:-translate-y-2 hover:shadow-xl overflow-visible h-[420px]",
          isFlipped ? "rotate-y-180" : ""
        )}
      >
        
        {/* ── FRONT FACE ── */}
        <div className="absolute inset-0 backface-hidden flex flex-col">
          {/* Image area */}
          <div className="relative w-full h-56 bg-[#F8F9FA] rounded-t-[10px]">
            <Image
              src={imageCover}
              alt={title}
              fill
              className="object-contain p-4"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 25vw, 20vw"
            />

            {/* Discount badge */}
            {discountPercent && (
              <Badge
                variant="destructive"
                className="absolute top-3 left-3 bg-red-500 text-white border-0 rounded px-2 py-0.5 text-xs font-bold h-auto"
              >
                -{discountPercent}%
              </Badge>
            )}

            {/* Action buttons */}
            <div className="absolute top-3 right-3 flex flex-col gap-2 z-20">
              <WishlistButton product={prod} />

              {/* Compare / Flip Button */}
              <AppButton
                onClick={(e) => {
                  e.preventDefault();
                  setIsFlipped(!isFlipped);
                }}
                aria-label="Compare"
                variant="outline"
                size="icon-sm"
                className="rounded-full bg-white border-[#E9ECEF] text-[#6C757D] hover:text-[#16A34A] shadow-sm transform transition-transform active:rotate-180"
              >
                <RefreshCw size={15} />
              </AppButton>

              <Link
                href={`/productDetails/${id}`}
                aria-label="Quick view"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-[#E9ECEF] text-[#6C757D] hover:text-[#16A34A] shadow-sm transition-colors"
              >
                <Eye size={15} />
              </Link>
            </div>
          </div>

          <CardHeader className="px-4 pt-3 pb-0 gap-0.5">
            <Badge variant="ghost" className="w-fit text-xs text-[#6C757D] px-0 font-normal h-auto">
              {category.name}
            </Badge>
            <p className="text-sm font-semibold text-[#212529] line-clamp-1">{title}</p>
          </CardHeader>

          <CardContent className="px-4 pt-2 pb-0">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={13}
                  className={i < fullStars ? "fill-[#FFC107] text-[#FFC107]" : i === fullStars && hasHalf ? "fill-[#FFC107]/50 text-[#FFC107]" : "fill-white text-[#FFC107]"}
                />
              ))}
              <span className="text-xs text-[#6C757D] ml-1">{ratingsAverage} ({ratingsQuantity})</span>
            </div>
          </CardContent>

          <CardFooter className="px-4 pt-3 pb-4 flex items-center justify-between mt-auto">
            <div className="flex items-baseline gap-2">
              <span className={`text-base font-extrabold ${priceAfterDiscount ? "text-[#16A34A]" : "text-[#212529]"}`}>
                {displayPrice} EGP
              </span>
              {priceAfterDiscount && <span className="text-xs text-[#6C757D] line-through">{price} EGP</span>}
            </div>
            <AddToCartButton product={prod} />
          </CardFooter>
        </div>

        {/* ── BACK FACE ── */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 flex flex-col items-center justify-center bg-[#F8F9FA] rounded-[10px] p-8">
            {/* Action buttons (always visible or just flip back) */}
            <div className="absolute top-3 right-3 flex flex-col gap-2 z-20">
              <AppButton
                onClick={(e) => {
                  e.preventDefault();
                  setIsFlipped(!isFlipped);
                }}
                aria-label="Back"
                variant="outline"
                size="icon-sm"
                className="rounded-full bg-white border-[#E9ECEF] text-[#16A34A] shadow-sm transform transition-transform active:-rotate-180"
              >
                <RefreshCw size={15} />
              </AppButton>
            </div>

            <div className="relative w-full h-[320px]">
                <Image
                src={imageCover}
                alt={title}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 25vw"
                />
            </div>
            
            <p className="mt-4 text-xs font-bold text-[#6C757D] uppercase tracking-wider">{title}</p>
        </div>

      </Card>
    </div>
  );
}
