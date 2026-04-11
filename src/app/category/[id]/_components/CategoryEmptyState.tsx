import { ShoppingBag } from "lucide-react";

export default function CategoryEmptyState({ categoryName }: { categoryName: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400">
        <ShoppingBag size={40} />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
      <p className="text-gray-500 max-w-md mx-auto">
        We couldn't find any products in the {categoryName} category at the moment. Please check back later.
      </p>
    </div>
  );
}
