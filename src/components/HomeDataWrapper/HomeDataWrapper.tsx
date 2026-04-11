import { getAllProducts } from "@/app/home.services";
import { getAllCategories } from "@/app/category/category.services";
import CategorySlider from "@/components/shared/CategorySlider/CategorySlider";
import ProductCard from "@/components/ProductCard/ProductCard";
import Link from "next/link";
import AdBanners from "../AdBanners/AdBanners";


/**
 * Fetches categories AND products in parallel via Promise.all.
 * This halves the total data-loading time on the home page compared
 * to two sequential Suspense boundaries each making their own fetch.
 */
export default async function HomeDataWrapper() {
  const [productsList, categoriesList] = await Promise.all([
    getAllProducts(),
    getAllCategories(),
  ]);

  return (
    <>
      {/* Categories Slider */}
      {categoriesList && categoriesList.length > 0 && (
        <div className="mb-8">
          <CategorySlider categories={categoriesList} />
        </div>
      )}


 {/* Ad Banners */}
      <AdBanners />
      {/* Featured Products — title + grid */}
      <div className="flex items-center justify-between mb-6 mt-10">
        <h2 className="flex items-center gap-2 text-xl font-bold text-[#212529]">
          <span className="w-1 h-6 bg-[#0aad0a] rounded-full inline-block" />
          <span>
            Featured <span className="text-[#0aad0a]">Products</span>
          </span>
        </h2>
        <Link
          href="/shop"
          prefetch={true}
          className="text-sm text-[#0aad0a] font-semibold hover:underline flex items-center gap-1"
        >
          View All Products →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 xl:grid-cols-5 gap-5 mb-12">
        {productsList.map((e) => (
          <ProductCard key={e.id} prod={e} />
        ))}
      </div>
    </>
  );
}
