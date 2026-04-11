"use client";

import { Navigation, Pagination, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { Swiper as SwiperType } from "swiper";

interface HeroSlide {
  image: string;
  title: string;
  subtitle: string;
}

interface HeroSliderProps {
  slides: HeroSlide[];
}

export default function HeroSlider({ slides }: HeroSliderProps) {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="w-full relative group">
      {/* Custom Navigation Arrows */}
      <button
        onClick={() => swiperRef.current?.slidePrev(500)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-white/90 hover:bg-white text-gray-800 rounded-full shadow-md transition-all opacity-0 group-hover:opacity-100 disabled:opacity-50"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={() => swiperRef.current?.slideNext(500)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-white/90 hover:bg-white text-gray-800 rounded-full shadow-md transition-all opacity-0 group-hover:opacity-100 disabled:opacity-50"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      <Swiper
        modules={[Navigation, Pagination, A11y]}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{
          clickable: true,
          renderBullet: function (index, className) {
            return `<span class="${className} custom-bullet"></span>`;
          },
        }}
        loop
        className="w-full h-[380px] md:h-[420px] lg:h-[460px]"
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <div className="relative w-full h-full">
              {/* Background Image */}
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover object-right"
                priority={idx === 0}
                sizes="100vw"
              />

              {/* Strict Green Gradient overlay mimicking Figma */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#0aad0a] via-[#0aad0a]/90 to-[#0aad0a]/10 sm:to-transparent pointer-events-none" />

              {/* Text Content aligned with container */}
              <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-4 max-w-7xl">
                  {/* Inner text wrapper, constrained width for responsiveness */}
                  <div className="max-w-[450px] md:max-w-[500px]">
                    {/* Heading */}
                    <h1 className="text-3xl md:text-[40px] font-bold text-white leading-[1.15] mb-4">
                      {/* Split title by newline if there's any, else line breaks naturally */}
                      {slide.title.split('\n').map((line, i) => (
                        <span key={i} className="block">{line}</span>
                      ))}
                    </h1>
                    
                    {/* Subtitle */}
                    <p className="text-[15px] md:text-base text-white/95 mb-7">
                      {slide.subtitle}
                    </p>
                    
                    {/* Buttons */}
                    <div className="flex items-center gap-3">
                      {/* Shop Now — white bg, green text */}
                      <Link
                        href="/shop"
                        className="inline-flex items-center justify-center bg-white text-[#0aad0a] font-bold px-7 py-2.5 rounded disabled:opacity-50 text-[15px] shadow-sm hover:bg-gray-50 transition-colors"
                      >
                        Shop Now
                      </Link>
                      {/* View Deals — outline white */}
                      <Link
                        href="/shop"
                        className="inline-flex items-center justify-center border border-white text-white font-bold px-7 py-2.5 rounded hover:bg-white/10 transition-colors text-[15px]"
                      >
                        View Deals
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
     
    </div>
  );
}
