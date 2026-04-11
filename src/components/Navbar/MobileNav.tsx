import { useSession, signOut } from "next-auth/react";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Menu, 
  X, 
  Home, 
  ShoppingBag, 
  Layers, 
  Award, 
  Heart, 
  ShoppingCart, 
  User, 
  LogOut, 
  Search, 
  LifeBuoy,
  ShoppingCartIcon,
  CircleUserRound
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const userName = session?.user?.name || "Guest";
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  useEffect(() => {
    // Prevent scrolling when menu is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/login" });
    toast.success("Signed out successfully");
    setIsOpen(false);
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "Categories", href: "/category" },
    { label: "Brands", href: "/brands" },
  ];

  return (
    <>
      {/* Burger Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-green-600 text-white shadow-lg active:scale-95 transition-all outline-none"
        aria-label="Open menu"
      >
        <Menu size={20} strokeWidth={2.5} />
      </button>

      {/* Overlay */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/60 z-[100] transition-opacity duration-300 md:hidden",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar Drawer */}
      <div 
        className={cn(
          "fixed top-0 right-0 w-[85%] max-w-[320px] h-full bg-white z-[101] shadow-2xl transition-transform duration-300 ease-out md:hidden flex flex-col",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2">
            <ShoppingCartIcon size={24} className="text-green-600" />
            <span className="font-bold text-xl text-gray-900 pt-0.5 tracking-tight">FreshCart</span>
          </Link>
          <button 
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Search Bar */}
          <div className="p-6 pb-2">
            <div className="relative flex items-center">
               <Input 
                 placeholder="Search products..."
                 className="bg-gray-100/80 border-none rounded-xl h-11 pr-12 focus:ring-2 focus:ring-green-500/20"
               />
               <button className="absolute right-1 top-1 w-9 h-9 flex items-center justify-center bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                 <Search size={16} />
               </button>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="px-6 py-4 flex flex-col">
            {navLinks.map((link) => (
              <Link 
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="py-3.5 text-[15px] font-bold text-gray-700 hover:text-green-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="mx-6 border-t border-dashed border-blue-200 my-2" />

          {/* User Section Links */}
          <div className="px-6 space-y-1">
             <Link 
                href="/wishlist" 
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-4 py-3.5 text-[15px] font-bold text-gray-700 hover:text-green-600 transition-colors group"
             >
                <div className="relative">
                    <Heart size={20} className="text-gray-400 group-hover:text-green-600 transition-colors" />
                    {wishlistCount > 0 && (
                        <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#fb2d37] text-[10px] font-extrabold text-white">
                            {wishlistCount}
                        </span>
                    )}
                </div>
                <span>Wishlist</span>
             </Link>
             <Link 
                href="/cart" 
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-4 py-3.5 text-[15px] font-bold text-gray-700 hover:text-green-600 transition-colors group"
             >
                <div className="relative">
                    <ShoppingCart size={20} className="text-gray-400 group-hover:text-green-600 transition-colors" />
                    {cartCount > 0 && (
                        <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#16A34A] text-[10px] font-extrabold text-white">
                            {cartCount}
                        </span>
                    )}
                </div>
                <span>Cart</span>
             </Link>
          </div>

          {/* Profile Section */}
          <div className="px-6 mt-2 pb-6">
             {userName !== "Guest" ? (
               <div className="space-y-1">
                 <Link 
                    href="/profile/addresses" 
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-4 py-3.5 text-[15px] font-bold text-gray-700 hover:text-green-600 transition-colors"
                 >
                    <CircleUserRound size={20} className="text-green-600" />
                    <span className="truncate">{userName}</span>
                 </Link>
                 <button 
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-4 py-3.5 text-[15px] font-bold text-red-500 hover:bg-red-50 rounded-xl transition-all text-left"
                 >
                    <LogOut size={20} />
                    <span>Sign Out</span>
                 </button>
               </div>
             ) : (
               <Link 
                  href="/login" 
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-4 py-3.5 text-[15px] font-bold text-green-600 transition-colors"
               >
                  <User size={20} />
                  <span>Sign In / Join</span>
               </Link>
             )}
          </div>
        </div>

        {/* Support Box */}
        <div className="p-6 bg-gray-50 border-t border-gray-100 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white shadow-sm flex items-center justify-center rounded-xl text-green-600">
                 <LifeBuoy size={20} />
              </div>
              <div className="leading-tight">
                <p className="text-[13px] font-bold text-gray-900">Need Help?</p>
                <p className="text-[11px] font-medium text-gray-500">Contact Support</p>
              </div>
            </div>
            <Link 
               href="/contact" 
               onClick={() => setIsOpen(false)}
               className="text-center py-2.5 bg-white border border-gray-100 rounded-xl text-[12px] font-bold text-gray-700 hover:bg-gray-100 transition-colors"
            >
               Go to Contact
            </Link>
        </div>
      </div>
    </>
  );
}
