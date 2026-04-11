import { getAllProducts } from "@/app/home.services";
import ProductCard from "@/components/ProductCard/ProductCard";

export default async function ProductsWrapper() {
  const productsList = await getAllProducts();
  return (
    <div className="grid grid-cols-1  sm:grid-cols-4 xl:grid-cols-5 gap-5">
      {productsList.map((e) => (
        <ProductCard key={e.id} prod={e} />
      ))}
    </div>
  );
}
