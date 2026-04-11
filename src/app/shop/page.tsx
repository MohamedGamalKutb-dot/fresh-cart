import { getAllProducts } from "./shop.services";
import ProductCard from "@/components/ProductCard/ProductCard";
import HeroBanner from "@/components/shared/HeroBanner/HeroBanner";
import {Package } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop - Fresh Cart",
  description: "Browse all Fresh Cart products",
};

export default async function ShopPage() {
  const products = await getAllProducts();

  return (
    <div className="min-h-screen bg-white pb-16">
      <HeroBanner
        title="Shop"
        subtitle="Explore our wide range of fresh products"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Shop" },
        ]}
        icon={<Package size={32} strokeWidth={2} />}
        bgClassName="bg-[#1EBA57]"
        iconBgClassName="bg-[#49C577]"
      />

      <div className="w-full lg:container lg:mx-auto px-4 py-8">
        <div className="grid grid-cols-2   lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} prod={product} />
          ))}
        </div>
      </div>
    </div>
  );
}