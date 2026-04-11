import { ShoppingBag } from "lucide-react";

export default function BrandEmptyState({ brandName }: { brandName: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center mb-6 text-[#9E65FF]">
        <ShoppingBag size={40} />
      </div>
      <h3 className="text-2xl font-extrabold text-gray-900 mb-2">Oops! No products yet</h3>
      <p className="text-gray-500 max-w-md mx-auto text-base">
        It looks like we don't have any products listing specifically for <span className="font-bold text-[#8433FF]">{brandName}</span> right now. Try exploring other top brands!
      </p>
    </div>
  );
}
