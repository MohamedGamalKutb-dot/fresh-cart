import { CategoriesData } from "@/app/category/category.interface";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CategoryCardProps {
  category: CategoriesData;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/category/${category._id}`}
      className="group block h-full w-full"
    >
      {/* 
        Outer Card container matches design:
        Off-white background #F8F9FA.
        Solid gray border, turns green on hover w/ shadow.
      */}
      <div className="bg-[#F8F9FA] rounded-[1.5rem] p-4 h-full flex flex-col items-center border border-[#E9ECEF] transition-all duration-300 hover:bg-white hover:border-[#1EBA57] hover:shadow-[0_12px_25px_rgba(0,0,0,0.06)] overflow-hidden relative group-hover:-translate-y-1">
        
        {/* Image Box Container */}
        <div className="w-full aspect-[4/4.5] relative rounded-[1rem] overflow-hidden mb-5 bg-[#eef1f4]">
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 50vw, 300px"
          />
        </div>

        {/* Text and Hover Link Area */}
        <div className="text-center w-full flex flex-col items-center justify-between flex-1 relative min-h-[50px]">
          {/* Title */}
          <h3 className="text-[#212529] font-bold text-[18px] tracking-tight group-hover:text-[#1EBA57] transition-colors line-clamp-2">
            {category.name}
          </h3>
          
          {/* Subcategories link showing only on hover */}
          <div className="flex items-center justify-center gap-1.5 text-[#1EBA57] font-semibold text-[13px] opacity-0 group-hover:opacity-100 transition-all duration-300 absolute -bottom-5 group-hover:bottom-[-2px]">
            Browse Products <ArrowRight size={14} strokeWidth={2.5} />
          </div>
        </div>
      </div>
    </Link>
  );
}
