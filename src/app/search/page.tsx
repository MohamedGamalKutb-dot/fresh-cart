import { Metadata } from "next";
import { searchProducts } from "./search.services";
import SearchClient from "./_components/SearchClient";

export const metadata: Metadata = {
  title: "Search Results - Fresh Cart",
  description: "Find the products you're looking for on Fresh Cart.",
};

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q = "" } = await searchParams;
  // Fetch all products once, so the SearchClient can do instant partial filtering on the full list
  const allProducts = await searchProducts(""); 

  return <SearchClient initialProducts={allProducts} initialQuery={q} />;
}
