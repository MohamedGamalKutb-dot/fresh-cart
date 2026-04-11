import { BrandsData } from "@/app/brands/brands.interface";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface BrandCardProps {
  brand: BrandsData;
}

export default function BrandCard({ brand }: BrandCardProps) {
  return (
    <Link
      href={`/brands/${brand._id}`}
      className="group block h-full w-full"
    >
      <div className="bg-white rounded-[1.5rem] p-5 h-full flex flex-col items-center justify-between border border-[#E9ECEF] transition-all duration-300 hover:border-[#8433FF] hover:shadow-[0_12px_25px_rgba(132,51,255,0.15)] overflow-hidden relative group-hover:-translate-y-1">
        
        {/* Brand Image Container */}
        <div className="w-full aspect-[4/3] relative flex items-center justify-center mb-5 bg-[#F8F9FA] rounded-[1rem] overflow-hidden">
          <Image
            src={brand.image}
            alt={brand.name}
            fill
            className="object-contain p-6 group-hover:scale-105 transition-transform duration-500 mix-blend-multiply"
            sizes="(max-width: 768px) 50vw, 200px"
          />
        </div>

        {/* Brand Name Text Area */}
        <div className="text-center w-full flex flex-col items-center flex-1 justify-end">
          <h3 className="text-[#212529] font-bold text-[17px] tracking-tight group-hover:text-[#8433FF] transition-colors line-clamp-1 mb-1">
            {brand.name}
          </h3>
          
          <div className="flex items-center justify-center gap-1.5 text-[#8433FF] font-semibold text-[13px] opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            View Products <ArrowRight size={14} strokeWidth={2.5} />
          </div>
        </div>
      </div>
    </Link>
  );
}
