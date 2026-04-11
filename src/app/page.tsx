import img1 from "@/assets/home-slider-1-d79601a8.png";
import Link from "next/link";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";
import FeatureBar from "@/components/FeatureBar/FeatureBar";
import AdBanners from "@/components/AdBanners/AdBanners";
import NewsletterSection from "@/components/NewsletterSection/NewsletterSection";
import SectionSkeleton from "@/components/SectionSkeleton/SectionSkeleton";
import HomeDataWrapper from "@/components/HomeDataWrapper/HomeDataWrapper";

const HeroSlider = dynamic(
  () => import("@/components/shared/HeroSlider/HeroSlider"),
  {
    loading: () => (
      <div className="container mx-auto px-4 max-w-7xl h-[300px] md:h-[400px] bg-gray-100 rounded-[2rem] animate-pulse my-6 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
      </div>
    ),
  }
);

const heroSlides = [
  {
    image: img1.src,
    title: "Fresh Products Delivered\nto your Door",
    subtitle: "Get 20% off your first order",
  },
  {
    image: img1.src,
    title: "Organic Fruits &\nVegetables",
    subtitle: "Healthy living starts with the freshest ingredients.",
  },
  {
    image: img1.src,
    title: "Quality You\nCan Taste",
    subtitle: "Order today and enjoy same-day delivery.",
  },
];

export default function Page() {
  return (
    <>
      {/* Hero Slider */}
      <HeroSlider slides={heroSlides} />

      {/* Feature Bar */}
      <FeatureBar />

      {/* Shop By Category */}
      <section className="container mx-auto px-4 max-w-7xl mt-10 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="flex items-center gap-2 text-xl font-bold text-[#212529]">
            <span className="w-1 h-6 bg-[#0aad0a] rounded-full inline-block" />
            <span>
              Shop By <span className="text-[#0aad0a]">Category</span>
            </span>
          </h2>
          <Link
            href="/category"
            prefetch={true}
            className="text-sm text-[#0aad0a] font-semibold hover:underline flex items-center gap-1"
          >
            View All Categories →
          </Link>
        </div>
       

       
     

        {/* Single Suspense — HomeDataWrapper fetches categories + products in parallel */}
        <Suspense fallback={<SectionSkeleton />}>
          <HomeDataWrapper />
        </Suspense>
      </section>

      {/* Divider */}
      <div className="container mx-auto px-4 max-w-7xl">
        <hr className="border-[#E9ECEF]" />
      </div>

      

      {/* Newsletter & App */}
      <NewsletterSection />
    </>
  );
}
