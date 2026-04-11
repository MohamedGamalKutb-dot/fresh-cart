import { useRef } from "react";
import { Swiper as SwiperType } from "swiper";

export function useCategorySliderLogic() {
  const swiperRef = useRef<SwiperType | null>(null);

  const slidePrev = () => swiperRef.current?.slidePrev();
  const slideNext = () => swiperRef.current?.slideNext();
  const onBeforeInit = (swiper: SwiperType) => {
    swiperRef.current = swiper;
  };

  return { onBeforeInit, slidePrev, slideNext };
}
