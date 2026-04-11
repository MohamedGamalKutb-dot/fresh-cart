import { getProductDetails, getRelatedProducts } from "./productDetails.services";
import ProductDetailsClient from "./_components/ProductDetailsClient";
import { getAllProducts } from "@/app/home.services";

interface Props {
  params: Promise<{ id: string }>;
}

// Pre-build all product pages at build time → served as static HTML instantly
export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ id: p.id }));
}

export const revalidate = 86400; // re-generate pages every 24h (ISR)

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const product = await getProductDetails(id);
  return {
    title: `${product.title} | Fresh Cart`,
    description: product.description.slice(0, 150),
  };
}

export default async function ProductDetailsPage({ params }: Props) {
  const { id } = await params;
  // Fetch product once, then fetch related products in parallel
  const product = await getProductDetails(id);
  const relatedProducts = await getRelatedProducts(product.category._id, product.id);

  return <ProductDetailsClient product={product} relatedProducts={relatedProducts} />;
}

