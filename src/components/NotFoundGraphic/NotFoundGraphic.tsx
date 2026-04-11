import { ShoppingCart } from "lucide-react";

export default function NotFoundGraphic() {
  return (
    <div className="relative mb-8 mt-4 animate-in fade-in zoom-in duration-700">
      <div className="bg-white rounded-[2rem] p-10 shadow-[0_10px_40px_-5px_rgba(30,186,87,0.15)] border border-gray-50 relative z-10 w-36 h-36 flex items-center justify-center">
        <ShoppingCart size={65} className="text-[#1EBA57] opacity-90" strokeWidth={1.5} />

        {/* Badge 404 */}
        <div className="absolute -top-3 -right-3 bg-[#1EBA57] text-white font-black text-[22px] w-16 h-16 flex items-center justify-center rounded-full border-[5px] border-white shadow-lg transform rotate-[10deg]">
          404
        </div>
      </div>

      {/* Footer decoration */}
      <div className="flex justify-center gap-2 mt-5 opacity-70">
        <div className="w-2 h-2 rounded-full bg-[#1EBA57]" />
        <div className="w-8 h-2 rounded-full bg-[#1EBA57]" />
        <div className="w-2 h-2 rounded-full bg-[#1EBA57]" />
      </div>
    </div>
  );
}
