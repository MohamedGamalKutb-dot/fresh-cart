import { Metadata } from "next";
import Image from "next/image";
import HeroBanner from "@/components/shared/HeroBanner/HeroBanner";
import ProductCard from "@/components/ProductCard/ProductCard";
import { getCategoryDetails, getProductsByCategory } from "./category-id.services";
import { CategoryIdPageProps } from "./category-id.interface";
import CategoryEmptyState from "./_components/CategoryEmptyState";

export async function generateMetadata({ params }: CategoryIdPageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const category = await getCategoryDetails(id);
    return {
      title: `${category.name} - Fresh Cart`,
      description: `Explore our collection of ${category.name} products.`,
    };
  } catch (error) {
    return {
      title: "Category Products - Fresh Cart",
    };
  }
}

import { Layers } from "lucide-react";
import ActiveFilters from "@/components/shared/ActiveFilters/ActiveFilters";

export default async function CategoryIdPage({ params }: CategoryIdPageProps) {
  const { id } = await params;
  
  const [category, products] = await Promise.all([
    getCategoryDetails(id),
    getProductsByCategory(id),
  ]);

  return (
    <div className="min-h-screen bg-white pb-16">
      {/* Category Specific Hero Banner with Dynamic Category Image */}
      <HeroBanner
        title={category.name}
        subtitle={`Discover our unique collection of ${category.name}`}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Categories", href: "/category" },
          { label: category.name },
        ]}
        icon={
          <div className="relative w-12 h-12">
            <Image 
              src={category.image} 
              alt={category.name} 
              fill 
              className="object-contain" 
              sizes="48px"
            />
          </div>
        }
        bgClassName="bg-[#1EBA57]" // Same green as categories
        iconBgClassName="bg-white" // White background looks premium and clear
        iconColorClassName="text-[#1EBA57]"
      />

      <div className="container mx-auto px-4 max-w-7xl mt-8">
        {/* Reusable Active Filters Bar */}
        <ActiveFilters
          className="mb-8"
          productCount={products?.length || 0}
          clearHref="/category"
          pills={[
            {
              id: "category",
              name: category.name,
              iconName: "layers",
              removeHref: "/category",
            }
          ]}
        />

        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} prod={product} />
            ))}
          </div>
        ) : (
          <CategoryEmptyState categoryName={category.name} />
        )}
      </div>
    </div>
  );
}
