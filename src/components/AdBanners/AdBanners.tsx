"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useAdBannersLogic } from "./AdBanners.logic";
import { cn } from "@/lib/utils";

export default function AdBanners() {
  const { isVisible, containerRef } = useAdBannersLogic();

  return (
    <div className="container mx-auto px-4 max-w-7xl my-16 overflow-hidden" ref={containerRef}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Banner 1: Fresh Organic Fruits - Slides from LEFT */}
        <div 
          className={cn(
            "relative overflow-hidden rounded-[2.5rem] bg-[#0aad0a] flex flex-col justify-center px-10 min-h-[300px] md:min-h-[340px] transition-all duration-[1200ms] ease-[cubic-bezier(0.33,1,0.68,1)]",
            isVisible ? "translate-x-0 opacity-100 scale-100" : "-translate-x-32 opacity-0 scale-95"
          )}
        >
          {/* Decorative elements */}
          <div className="absolute -top-16 -right-16 w-52 h-52 bg-black/5 rounded-full" />
          <div className="absolute -bottom-10 left-1/4 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
          
          <div className="relative z-10">
            <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-4 py-2 rounded-full w-fit mb-5 uppercase tracking-wider">
              🔥 Deal of the Day
            </span>

            <h3 className="text-3xl md:text-[38px] font-black text-white mb-3 leading-tight tracking-tight">
              Fresh Organic Fruits
            </h3>

            <p className="text-lg font-medium text-white/90 mb-6 max-w-sm">
              Get up to 40% off on selected organic fruits from local farms
            </p>

            <div className="flex flex-wrap items-end gap-4 mb-8">
              <span className="text-4xl md:text-5xl font-black text-white leading-none">
                40% OFF
              </span>
              <div className="flex flex-col mb-1">
                 <span className="text-xs font-bold text-white/70 uppercase">Promo Code</span>
                 <span className="text-sm font-bold text-white bg-white/10 px-2 py-0.5 rounded border border-white/20">ORGANIC40</span>
              </div>
            </div>

            <Link
              href="/shop"
              className="group inline-flex items-center gap-2 bg-white text-[#0aad0a] text-base font-bold px-8 py-3.5 rounded-full w-fit hover:bg-gray-50 transition-all hover:scale-105 shadow-md active:scale-95"
            >
              Shop Now <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Banner 2: Exotic Vegetables - Slides from RIGHT */}
        <div 
          className={cn(
            "relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#f97316] to-[#ef4444] flex flex-col justify-center px-10 min-h-[300px] md:min-h-[340px] transition-all duration-[1200ms] delay-100 ease-[cubic-bezier(0.33,1,0.68,1)]",
            isVisible ? "translate-x-0 opacity-100 scale-100" : "translate-x-32 opacity-0 scale-95"
          )}
        >
          {/* Decorative elements */}
          <div className="absolute -top-16 -right-16 w-52 h-52 bg-white/10 rounded-full" />
          <div className="absolute -bottom-12 left-10 w-40 h-40 bg-black/5 rounded-full blur-xl" />
          
          <div className="relative z-10">
            <span className="inline-flex items-center gap-1.5 bg-black/10 backdrop-blur-sm text-white text-xs font-bold px-4 py-2 rounded-full w-fit mb-5 uppercase tracking-wider">
              ✨ New Arrivals
            </span>

            <h3 className="text-3xl md:text-[38px] font-black text-white mb-3 leading-tight tracking-tight">
              Exotic Vegetables
            </h3>

            <p className="text-lg font-medium text-white/90 mb-6 max-w-sm">
              Discover our latest collection of premium vegetables directly harvested for you
            </p>

            <div className="flex flex-wrap items-end gap-4 mb-8">
              <span className="text-4xl md:text-5xl font-black text-white leading-none">
                25% OFF
              </span>
               <div className="flex flex-col mb-1">
                 <span className="text-xs font-bold text-white/70 uppercase">Promo Code</span>
                 <span className="text-sm font-bold text-white bg-white/10 px-2 py-0.5 rounded border border-white/20">FRESH25</span>
              </div>
            </div>

            <Link
              href="/shop"
              className="group inline-flex items-center gap-2 bg-white text-[#ea580c] text-base font-bold px-8 py-3.5 rounded-full w-fit hover:bg-gray-50 transition-all hover:scale-105 shadow-md active:scale-95"
            >
              Explore Now <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
