import { getAllCategories } from "./category.services";
import CategoryCard from "@/components/CategoryCard/CategoryCard";
import { Metadata } from "next";
import { Layers } from "lucide-react";
import HeroBanner from "@/components/shared/HeroBanner/HeroBanner";

export const metadata: Metadata = {
  title: "Categories - Fresh Cart",
  description: "Browse all Fresh Cart product categories",
};

export default async function CategoryPage() {
  const categoriesList = await getAllCategories();

  return (
    <div className="min-h-screen bg-white pb-16">
      {/* Dynamic Reusable Hero Banner */}
      <HeroBanner
        title="All Categories"
        subtitle="Browse our wide range of product categories"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Categories" },
        ]}
        icon={<Layers size={32} strokeWidth={2} />}
        bgClassName="bg-[#1EBA57]"
        iconBgClassName="bg-[#009966]"
      />

      {/* Categories Grid */}
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 lg:gap-8">
          {categoriesList.map((cat) => (
            <CategoryCard key={cat._id} category={cat} />
          ))}
        </div>
      </div>
    </div>
  );
}