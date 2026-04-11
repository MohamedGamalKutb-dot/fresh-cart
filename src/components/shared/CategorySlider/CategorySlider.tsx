"use client";

import { Navigation, A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { CategoriesData } from "@/app/category/category.interface";
import CategoryCircle from "@/components/CategoryCircle/CategoryCircle";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AppButton from "@/components/shared/AppButton/AppButton";
import { useCategorySliderLogic } from "./CategorySlider.logic";

interface CategorySliderProps {
  categories: CategoriesData[];
}

export default function CategorySlider({ categories }: CategorySliderProps) {
  const { onBeforeInit, slidePrev, slideNext } = useCategorySliderLogic();

  return (
    <div className="relative group w-full px-1">
      {/* Navigation Buttons using AppButton as per README rules */}
      <AppButton
        onClick={slidePrev}
        variant="outline"
        size="icon"
        className="absolute -left-2 md:-left-5 top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-white border border-gray-200 text-[#0aad0a] rounded-full shadow-sm transition-all opacity-0 group-hover:opacity-100 disabled:opacity-0"
        aria-label="Previous Category"
      >
        <ChevronLeft size={20} />
      </AppButton>
      
      <AppButton
        onClick={slideNext}
        variant="outline"
        size="icon"
        className="absolute -right-2 md:-right-5 top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-white border border-gray-200 text-[#0aad0a] rounded-full shadow-sm transition-all opacity-0 group-hover:opacity-100 disabled:opacity-0"
        aria-label="Next Category"
      >
        <ChevronRight size={20} />
      </AppButton>

      <Swiper
        modules={[Navigation, A11y, Autoplay]}
        onBeforeInit={onBeforeInit}
        spaceBetween={15}
        slidesPerView={2}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }}
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 6 },
          1280: { slidesPerView: 7 },
        }}
        loop={categories.length > 7}
        className="py-4"
      >
        {categories.map((cat) => (
          <SwiperSlide key={cat._id}>
            <CategoryCircle category={cat} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
