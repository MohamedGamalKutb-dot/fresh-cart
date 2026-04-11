"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AllproductsData } from "@/app/home.interface";
import ProductCard from "@/components/ProductCard/ProductCard";
import { Search, SlidersHorizontal, X, LayoutGrid, List, Layers, Tags } from "lucide-react";
import ActiveFilters from "@/components/shared/ActiveFilters/ActiveFilters";

// ─── Sidebar filter data ──────────────────────────────────────────────────────
const CATEGORIES = ["Music", "Men's Fashion", "Women's Fashion", "SuperMarket", "Baby & Toys", "Home", "Books", "Beauty & Health","Mobiles","Electronics"];
const BRANDS = ["Samsung", "Apple", "Xiaomi", "Huawei", "OPPO", "Canon", "Dell", "Lenovo", "SONY", "Infinix", "Realme", "HONOR", "Nokia", "LC Waikiki", "Jack & Jones"];
const PRICE_PRESETS = [
  { label: "Under 500", max: 500 },
  { label: "Under 1k", max: 1000 },
  { label: "Under 5k", max: 5000 },
  { label: "Under 10k", max: 10000 },
];

// ─── Main Component ───────────────────────────────────────────────────────────
export default function SearchClient({
  initialProducts,
  initialQuery,
}: {
  initialProducts: AllproductsData[];
  initialQuery: string;
}) {
  const router = useRouter();

  const [localQuery, setLocalQuery] = useState(initialQuery);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [gridView, setGridView] = useState(true);

  // Synchronize URL with the search query (Live URL Update)
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const searchParams = new URLSearchParams(window.location.search);
      if (localQuery.trim()) {
        searchParams.set("q", localQuery);
      } else {
        searchParams.delete("q");
      }
      router.replace(`${window.location.pathname}?${searchParams.toString()}`, { scroll: false });
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [localQuery, router]);

  function handleSearch() {
    const q = localQuery.trim();
    if (q) router.push(`/search?q=${encodeURIComponent(q)}`);
  }

  function toggleCategory(cat: string) {
    setSelectedCategories((prev) => prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]);
  }

  function toggleBrand(brand: string) {
    setSelectedBrands((prev) => prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]);
  }

  function applyPricePreset(max: number) {
    setMinPrice("0");
    setMaxPrice(String(max));
  }

  const filtered = useMemo(() => {
    let list = initialProducts;
    
    // Live Search Filter
    if (localQuery.trim() !== "") {
      const q = localQuery.toLowerCase();
      list = list.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.description?.toLowerCase().includes(q) ||
        p.category?.name?.toLowerCase().includes(q)
      );
    }

    const hasCategoryFilter = selectedCategories.length > 0;
    const hasBrandFilter = selectedBrands.length > 0;

    if (hasCategoryFilter || hasBrandFilter) {
      list = list.filter((p) => {
        const matchesCategory = hasCategoryFilter && selectedCategories.some(
          (c) => p.category?.name?.toLowerCase() === c.toLowerCase()
        );
        const matchesBrand = hasBrandFilter && selectedBrands.some(
          (b) => p.brand?.name?.toLowerCase() === b.toLowerCase()
        );
        
        // Use OR across different filter types as requested
        if (hasCategoryFilter && hasBrandFilter) {
          return matchesCategory || matchesBrand;
        }
        // If only one is active, just use that one
        return matchesCategory || matchesBrand;
      });
    }

    if (minPrice !== "") {
      list = list.filter((p) => (p.priceAfterDiscount ?? p.price) >= Number(minPrice));
    }
    if (maxPrice !== "") {
      list = list.filter((p) => (p.priceAfterDiscount ?? p.price) <= Number(maxPrice));
    }
    return list;
  }, [initialProducts, localQuery, selectedCategories, selectedBrands, minPrice, maxPrice]);

  const sidebarContent = (
    <div className="flex flex-col gap-6">
      {/* Categories */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-[#212529]">Categories</h3>
          {selectedCategories.length > 0 && (
            <span className="text-[11px] font-bold text-[#0AAD0A] bg-[#0AAD0A]/10 px-2 py-0.5 rounded-full">
              {selectedCategories.length} selected
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2.5 max-h-52 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200">
          {CATEGORIES.map((cat) => (
            <label key={cat} className="flex items-center gap-2.5 cursor-pointer group">
              <input type="checkbox" checked={selectedCategories.includes(cat)} onChange={() => toggleCategory(cat)} className="size-4 rounded border-[#E9ECEF] accent-[#0AAD0A]" />
              <span className="text-sm text-[#495057] group-hover:text-[#0AAD0A] transition-colors">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-sm font-bold text-[#212529] mb-3">Price Range</h3>
        <div className="flex gap-2 mb-3">
          <div className="flex-1">
            <label className="text-xs text-[#6C757D] mb-1 block">Min (EGP)</label>
            <input type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} placeholder="0" className="w-full h-9 px-3 rounded-lg border border-[#E9ECEF] bg-[#F8F9FA] text-sm focus:outline-none focus:border-[#0AAD0A]" />
          </div>
          <div className="flex-1">
            <label className="text-xs text-[#6C757D] mb-1 block">Max (EGP)</label>
            <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} placeholder="No limit" className="w-full h-9 px-3 rounded-lg border border-[#E9ECEF] bg-[#F8F9FA] text-sm focus:outline-none focus:border-[#0AAD0A]" />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {PRICE_PRESETS.map(({ label, max }) => (
            <button key={label} onClick={() => applyPricePreset(max)} className="px-3 py-1.5 text-xs font-medium rounded-lg border border-[#E9ECEF] bg-white hover:bg-[#E8F5E9] hover:border-[#0AAD0A] hover:text-[#0AAD0A] transition-colors">
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-[#212529]">Brands</h3>
          {selectedBrands.length > 0 && (
            <span className="text-[11px] font-bold text-[#0AAD0A] bg-[#0AAD0A]/10 px-2 py-0.5 rounded-full">
              {selectedBrands.length} selected
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2.5 max-h-52 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200">
          {BRANDS.map((brand) => (
            <label key={brand} className="flex items-center gap-2.5 cursor-pointer group">
              <input type="checkbox" checked={selectedBrands.includes(brand)} onChange={() => toggleBrand(brand)} className="size-4 rounded border-[#E9ECEF] accent-[#0AAD0A]" />
              <span className="text-sm text-[#495057] group-hover:text-[#0AAD0A] transition-colors">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Clear All Button */}
      <button 
        onClick={() => {
          setSelectedCategories([]);
          setSelectedBrands([]);
          setMinPrice("");
          setMaxPrice("");
          setLocalQuery("");
        }}
        className="w-full mt-6 py-2.5 px-4 border border-[#E9ECEF] rounded-xl text-[#6C757D] font-semibold text-sm hover:border-[#0AAD0A] hover:text-[#0AAD0A] hover:bg-green-50/50 transition-all duration-200 active:scale-[0.98]"
      >
        Clear All Filters
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Top Search Header */}
      <div className="bg-[#F8F9FA] border-b border-[#E9ECEF]">
        <div className="container mx-auto px-4 max-w-7xl py-4">
          <nav className="flex items-center gap-2 text-sm text-[#6C757D] mb-3">
            <Link href="/" className="hover:text-[#0AAD0A] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#212529] font-semibold">Search Results</span>
          </nav>
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#ADB5BD] pointer-events-none" />
            <input
              type="text"
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Search for products..."
              className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#E9ECEF] bg-white text-sm text-[#212529] placeholder:text-[#ADB5BD] focus:outline-none focus:border-[#0AAD0A] transition-colors shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 max-w-7xl py-6">
        <div className="flex gap-6 items-start">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-[#E9ECEF] p-5 sticky top-24">{sidebarContent}</div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
              <div className="flex items-center gap-3">
                <button onClick={() => setSidebarOpen(true)} className="lg:hidden flex items-center gap-2 h-9 px-3 rounded-xl border border-[#E9ECEF] bg-white text-sm font-medium text-[#212529] hover:bg-gray-50">
                  <SlidersHorizontal className="size-4" /> Filters
                </button>
                <div className="flex items-center gap-1 bg-white border border-[#E9ECEF] rounded-xl p-1">
                  <button title="Grid view" onClick={() => setGridView(true)} className={`w-7 h-7 flex items-center justify-center rounded-lg transition-colors ${gridView ? "bg-[#0AAD0A] text-white" : "text-[#6C757D] hover:bg-gray-100"}`}>
                    <LayoutGrid className="size-4" />
                  </button>
                  <button title="List view" onClick={() => setGridView(false)} className={`w-7 h-7 flex items-center justify-center rounded-lg transition-colors ${!gridView ? "bg-[#0AAD0A] text-white" : "text-[#6C757D] hover:bg-gray-100"}`}>
                    <List className="size-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-[#6C757D]">
                Sort by:
                <select className="h-9 px-3 rounded-xl border border-[#E9ECEF] bg-white text-sm text-[#212529] focus:outline-none focus:border-[#0AAD0A]">
                  <option>Relevance</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Highest Rated</option>
                </select>
              </div>
            </div>

            {/* Reusable Active Filters & Count */}
            {(selectedCategories.length > 0 || selectedBrands.length > 0) ? (
              <ActiveFilters
                className="mb-6"
                productCount={filtered.length}
                accentColorClassName="text-[#0AAD0A]"
                iconColorClassName="text-[#0AAD0A]"
                pillClassName="bg-[#E8F5E9] border-[#C8E6C9] text-[#0AAD0A]"
                onClearAll={() => {
                  setSelectedCategories([]);
                  setSelectedBrands([]);
                }}
                pills={[
                  ...selectedCategories.map(cat => ({
                    id: cat,
                    name: cat,
                    iconName: "layers" as const,
                    onRemove: () => toggleCategory(cat)
                  })),
                  ...selectedBrands.map(brand => ({
                    id: brand,
                    name: brand,
                    iconName: "tags" as const,
                    onRemove: () => toggleBrand(brand)
                  }))
                ]}
              />
            ) : (
                <div className="text-[17px] font-medium text-[#6c757d] mb-4">
                    Showing <span className="text-[#212529] font-bold">{filtered.length}</span> {filtered.length === 1 ? "result" : "results"}
                    {initialQuery && (<> for <span className="font-semibold text-[#212529]">&ldquo;{initialQuery}&rdquo;</span></>)}
                </div>
            )}

            {filtered.length === 0 && (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <Search className="size-16 text-[#E9ECEF] mb-4" />
                <h2 className="text-xl font-bold text-[#212529] mb-2">No products found</h2>
                <p className="text-[#6C757D] text-sm max-w-sm">We couldn&apos;t find anything matching your search. Try different keywords or remove some filters.</p>
              </div>
            )}

            {filtered.length > 0 && (
              <div className={gridView ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4" : "flex flex-col gap-4"}>
                {filtered.map((product) => (
                  <ProductCard key={product.id} prod={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Sidebar Drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-white shadow-xl overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-[#E9ECEF]">
              <h2 className="font-bold text-[#212529]">Filters</h2>
              <button onClick={() => setSidebarOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">
                <X className="size-4 text-[#6C757D]" />
              </button>
            </div>
            <div className="p-5">{sidebarContent}</div>
          </div>
        </div>
      )}
    </div>
  );
}
