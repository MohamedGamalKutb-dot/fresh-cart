import { CategoriesData } from "@/app/category/category.interface";
import Image from "next/image";
import Link from "next/link";

interface CategoryCircleProps {
  category: CategoriesData;
}

export default function CategoryCircle({ category }: CategoryCircleProps) {
  return (
    <Link 
      href={`/category/${category._id}`} 
      className="flex flex-col items-center justify-center gap-4 group bg-[#F8F9FA] border border-[#E9ECEF] rounded-xl hover:shadow transition-all duration-300 hover:shadow-sm"
      style={{ minHeight: "150px" }}
    >
      {/* Circle Image Wrapper */}
      <div className="relative w-[72px] h-[72px] rounded-full overflow-hidden bg-[#e8f5e9] flex items-center justify-center">
        <Image
          src={category.image}
          alt={category.name}
          fill
          className="object-cover transition-transform duration-300"
          sizes="72px"
        />
      </div>
      {/* Name */}
      <span className="text-base text-center text-[#212529] font-medium transition-colors duration-200 line-clamp-1 px-2">
        {category.name}
      </span>
    </Link>
  );
}
