"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { getAllCategories } from "@/app/category/category.services";
import { CategoriesData } from "@/app/category/category.interface";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";

export function useNavbarLogic() {
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [dynamicCategories, setDynamicCategories] = useState<CategoriesData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const { wishlistCount } = useWishlist();
  const { cartCount } = useCart();
  const router = useRouter();

  useEffect(() => {
    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId !== null) return; // throttle via rAF
      rafId = requestAnimationFrame(() => {
        rafId = null;
        setScrolled((prev) => {
          const y = window.scrollY;
          // Hysteresis: hide top-bar after 80px, show again only below 20px
          if (!prev && y > 80) return true;
          if (prev && y < 20) return false;
          return prev; // no change — avoids re-render
        });
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Fetch categories for the dropdown
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories();
        setDynamicCategories(data);
      } catch (error) {
        console.error("Failed to fetch navbar categories:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCategories();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  const handleSearch = () => {
    const q = searchQuery.trim();
    if (q) router.push(`/search?q=${encodeURIComponent(q)}`);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  // Static labels mapping to IDs fetched from API
  const navCategories = useMemo(() => {
    const requiredLabels = [
      "Electronics",
      "Women's Fashion",
      "Men's Fashion",
      "Beauty & Health"
    ];

    const mapped = requiredLabels.map(label => {
      // Find the category that matches the label (case insensitive and loose match for '&' vs 'and')
      const found = dynamicCategories.find(cat => 
        cat.name.toLowerCase() === label.toLowerCase() ||
        cat.name.replace("'", "").toLowerCase() === label.replace("'", "").toLowerCase()
      );
      
      if (found) {
        return { label: label, href: `/category/${found._id}` };
      }
      return null;
    }).filter(Boolean) as { label: string; href: string }[];

    return [
      { label: "All Categories", href: "/category" },
      ...mapped
    ];
  }, [dynamicCategories]);

  return {
    scrolled,
    searchQuery,
    setSearchQuery,
    handleSearch,
    handleSearchKeyDown,
    navCategories,
    isLoading,
    wishlistCount,
    cartCount
  };
}
