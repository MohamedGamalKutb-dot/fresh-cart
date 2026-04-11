"use client";

import { Filter, X, Layers, Tags } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const ICON_MAP = {
  layers: Layers,
  tags: Tags,
};

interface FilterPill {
  id: string;
  name: string;
  iconName?: keyof typeof ICON_MAP;
  onRemove?: () => void;
  removeHref?: string;
}

interface ActiveFiltersProps {
  pills: FilterPill[];
  clearHref?: string;
  onClearAll?: () => void;
  productCount: number;
  className?: string;
  pillClassName?: string;
  iconColorClassName?: string;
  accentColorClassName?: string;
}

export default function ActiveFilters({
  pills,
  clearHref,
  onClearAll,
  productCount,
  className,
  pillClassName,
  iconColorClassName = "text-[#16A34A]",
  accentColorClassName = "text-[#16A34A]"
}: ActiveFiltersProps) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="flex items-center flex-wrap gap-4">
        <div className="flex items-center gap-2 text-[#212529] font-bold text-lg">
          <Filter size={20} className={accentColorClassName} />
          <span>Active Filters:</span>
        </div>
        
        <div className="flex flex-wrap gap-2 items-center">
            {pills.map((pill) => {
              const Icon = pill.iconName ? ICON_MAP[pill.iconName] : null;
              return (
                <div 
                  key={pill.id}
                  className={cn(
                    "flex items-center gap-2 bg-[#F0FAF4] border border-[#DCF7E9] text-[#16A34A] px-4 py-2 rounded-full text-sm font-bold shadow-sm",
                    pillClassName
                  )}
                >
                  {Icon && <Icon size={14} className={iconColorClassName} />}
                  <span>{pill.name}</span>
                  
                  {pill.onRemove ? (
                    <button 
                      onClick={pill.onRemove}
                      className="ml-1 hover:text-red-500 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  ) : pill.removeHref ? (
                    <Link 
                      href={pill.removeHref} 
                      className="ml-1 hover:text-red-500 transition-colors"
                    >
                      <X size={14} />
                    </Link>
                  ) : null}
                </div>
              );
            })}

          {(clearHref || onClearAll) && pills.length > 0 && (
            <>
              {clearHref ? (
                <Link 
                  href={clearHref}
                  className={cn(
                    "text-sm font-bold text-[#212529] underline underline-offset-4 transition-colors ml-2 hover:opacity-80",
                    `hover:${accentColorClassName}`
                  )}
                >
                  Clear all
                </Link>
              ) : (
                <button 
                  onClick={onClearAll}
                  className={cn(
                    "text-sm font-bold text-[#212529] underline underline-offset-4 transition-colors ml-2 hover:opacity-80",
                    `hover:${accentColorClassName}`
                  )}
                >
                  Clear all
                </button>
              )}
            </>
          )}
        </div>
      </div>

      <div className="text-[17px] font-medium text-[#6c757d]">
        Showing <span className="text-[#212529] font-bold">{productCount}</span> products
      </div>
    </div>
  );
}
