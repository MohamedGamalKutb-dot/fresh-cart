import { getProductDetails, getRelatedProducts } from "./productDetails.services";
import ProductDetailsClient from "./_components/ProductDetailsClient";
import { getAllProducts } from "@/app/home.services";

import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

// Pre-build all product pages at build time → served as static HTML instantly
export async function generateStaticParams() {
  try {
    const products = await getAllProducts();
    return products.map((p) => ({ id: p.id }));
  } catch (error) {
    console.error("Error in generateStaticParams:", error);
    return [];
  }
}

export const revalidate = 86400; // re-generate pages every 24h (ISR)

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  try {
    const product = await getProductDetails(id);
    if (!product) return { title: "Product Not Found | Fresh Cart" };
    return {
      title: `${product.title} | Fresh Cart`,
      description: product.description.slice(0, 150),
    };
  } catch (error) {
    return { title: "Product Details | Fresh Cart" };
  }
}

export default async function ProductDetailsPage({ params }: Props) {
  const { id } = await params;
  
  try {
    const product = await getProductDetails(id);

    if (!product || !product.category) {
      return notFound();
    }

    const relatedProducts = await getRelatedProducts(product.category._id, product.id);

    return <ProductDetailsClient product={product} relatedProducts={relatedProducts} />;
  } catch (error) {
    console.error("Build error for product ID:", id, error);
    return notFound();
  }
}

