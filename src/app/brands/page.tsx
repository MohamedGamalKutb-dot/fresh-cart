import { getAllBrands } from "./brands.services";
import BrandCard from "@/components/BrandCard/BrandCard";
import { Metadata } from "next";
import { Star, Tags } from "lucide-react";
import HeroBanner from "@/components/shared/HeroBanner/HeroBanner";

export const metadata: Metadata = {
  title: "Brands - Fresh Cart",
  description: "Explore top brands and trusted partners on Fresh Cart.",
};

export default async function BrandsPage() {
  const brandsList = await getAllBrands();

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-16">
      {/* Dynamic Reusable Hero Banner */}
      <HeroBanner
        title="Top Brands"
        subtitle="Shop from your favorite brands"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Brands" },
        ]}
        icon={<Tags size={32} strokeWidth={2} />}
        bgClassName="bg-[#8433FF]"
        iconBgClassName="bg-[#9E65FF]"
      />

      {/* Brands Grid */}
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6 lg:gap-8">
          {brandsList.map((brand) => (
            <BrandCard key={brand._id} brand={brand} />
          ))}
        </div>
      </div>
    </div>
  );
}
