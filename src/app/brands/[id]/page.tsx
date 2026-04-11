import { Metadata } from "next";
import Image from "next/image";
import { Tags } from "lucide-react";
import Link from "next/link";
import ActiveFilters from "@/components/shared/ActiveFilters/ActiveFilters";
import HeroBanner from "@/components/shared/HeroBanner/HeroBanner";
import ProductCard from "@/components/ProductCard/ProductCard";
import { getBrandDetails, getProductsByBrand } from "./brands-id.services";
import { BrandsIdPageProps } from "./brands-id.interface";
import BrandEmptyState from "./_components/BrandEmptyState";

export async function generateMetadata({ params }: BrandsIdPageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const brand = await getBrandDetails(id);
    return {
      title: `${brand.name} Products - Fresh Cart`,
      description: `Shop the latest ${brand.name} products at Fresh Cart. Quality and style guaranteed.`,
    };
  } catch (error) {
    return {
      title: "Brand Products - Fresh Cart",
    };
  }
}

export default async function BrandsIdPage({ params }: BrandsIdPageProps) {
  const { id } = await params;
  
  const [brand, products] = await Promise.all([
    getBrandDetails(id),
    getProductsByBrand(id),
  ]);

  return (
    <div className="min-h-screen bg-white pb-16">
      {/* Brand Specific Hero Banner with Dynamic Brand LOGO */}
      <HeroBanner
        title={brand.name}
        subtitle={`Discover the exclusive collection from our partner brand ${brand.name}`}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Brands", href: "/brands" },
          { label: brand.name },
        ]}
        icon={
          <div className="relative w-12 h-12">
            <Image 
              src={brand.image} 
              alt={brand.name} 
              fill 
              className="object-contain" 
              sizes="48px"
            />
          </div>
        }
        bgClassName="bg-[#8433FF]"
        iconBgClassName="bg-white" // White background for the logo box looks better for brands
        iconColorClassName="text-[#8433FF]" // Fallback color
      />

      <div className="container mx-auto px-4 max-w-7xl mt-8">
        {/* Reusable Active Filters Bar with Brand Theme */}
        <ActiveFilters
          className="mb-8"
          productCount={products?.length || 0}
          clearHref="/brands"
          accentColorClassName="text-[#8433FF]"
          iconColorClassName="text-[#8433FF]"
          pillClassName="bg-[#F3E8FF] border-[#E9D5FF] text-[#8433FF]"
          pills={[
            {
              id: "brand",
              name: brand.name,
              iconName: "tags",
              removeHref: "/brands",
            }
          ]}
        />

        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 gap-y-12">
            {products.map((product) => (
              <ProductCard key={product.id} prod={product} />
            ))}
          </div>
        ) : (
          <BrandEmptyState brandName={brand.name} />
        )}
      </div>
    </div>
  );
}
