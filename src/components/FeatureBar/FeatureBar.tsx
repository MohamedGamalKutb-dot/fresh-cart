"use client";

import { Truck, ShieldCheck, RotateCcw, Headset } from "lucide-react";
import { useFeatureBarLogic } from "./FeatureBar.logic";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: <Truck size={24} className="text-[#3b82f6]" />,
    iconBg: "bg-[#eff6ff]",
    title: "Free Shipping",
    subtitle: "On orders over 500 EGP",
  },
  {
    icon: <ShieldCheck size={24} className="text-[#10b981]" />,
    iconBg: "bg-[#ecfdf5]",
    title: "Secure Payment",
    subtitle: "100% secure transactions",
  },
  {
    icon: <RotateCcw size={24} className="text-[#f97316]" />,
    iconBg: "bg-[#fff7ed]",
    title: "Easy Returns",
    subtitle: "14-day return policy",
  },
  {
    icon: <Headset size={24} className="text-[#AD46FF]" />,
    iconBg: "bg-[#FAF5FF]",
    title: "24/7 Support",
    subtitle: "Dedicated support team",
  },
];

export default function FeatureBar() {
  const { isVisible, containerRef } = useFeatureBarLogic();

  return (
    <div className="container mx-auto px-4 max-w-7xl mt-12 mb-8 overflow-hidden" ref={containerRef}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {features.map((f, index) => (
          <div
            key={f.title}
            style={{ 
                transitionDelay: isVisible ? `${index * 150}ms` : '0ms' 
            }}
            className={cn(
              "flex items-center gap-4 py-4 px-6 bg-[#f8f9fa] border border-[#e9ecef] rounded-2xl hover:shadow-md transition-all duration-1000 ease-[cubic-bezier(0.33,1,0.68,1)] transform cursor-default group",
              isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-20 opacity-0 scale-95"
            )}
          >
            <div className={cn(
                "shrink-0 w-14 h-14 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 duration-300",
                f.iconBg
            )}>
              {f.icon}
            </div>
            <div>
              <p className="text-[16px] font-bold text-[#212529] mb-0.5">
                {f.title}
              </p>
              <p className="text-[13px] text-[#6c757d] leading-tight font-medium">
                {f.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
