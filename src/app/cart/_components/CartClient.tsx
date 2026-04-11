"use client";

import { useCart } from "@/context/CartContext";
import AppButton from "@/components/shared/AppButton/AppButton";
import Link from "next/link";
import Image from "next/image";
import { useRef, useCallback, useState } from "react";
import {
  ShoppingBag,
  Trash2,
  ArrowLeft,
  ShoppingCart,
  Minus,
  Plus,
  Truck,
  ShieldCheck,
  Loader2
} from "lucide-react";
import { Input } from "@/components/ui/input";

// Map of productId → optimistic count (local overrides before API confirms)
type QuantityOverrides = Record<string, number>;

export default function CartClient() {
  const { cart, guestCart, updateCount, removeProduct, clearCart, isMounted } = useCart();
  // Optimistic local quantity overrides (shown immediately, API called after debounce)
  const [quantityOverrides, setQuantityOverrides] = useState<QuantityOverrides>({});
  // Debounce timers per product
  const debounceTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});
  // Loading state per product for +/- buttons
  const [updatingIds, setUpdatingIds] = useState<Record<string, boolean>>({});
  // Loading state per product for remove button
  const [removingIds, setRemovingIds] = useState<Record<string, boolean>>({});
  const [clearingCart, setClearingCart] = useState(false);

  const handleQuantityChange = useCallback(
    (productId: string, currentCount: number, delta: number) => {
      const newCount = currentCount + delta;
      if (newCount < 1) return;

      // Update optimistic state immediately
      setQuantityOverrides((prev) => ({ ...prev, [productId]: newCount }));

      // Clear existing timer for this product
      if (debounceTimers.current[productId]) {
        clearTimeout(debounceTimers.current[productId]);
      }

      // Set new debounced API call
      debounceTimers.current[productId] = setTimeout(async () => {
        setUpdatingIds((prev) => ({ ...prev, [productId]: true }));
        try {
          await updateCount(productId, newCount);
        } finally {
          // Clear the optimistic override — real cart state is now updated
          setQuantityOverrides((prev) => {
            const next = { ...prev };
            delete next[productId];
            return next;
          });
          setUpdatingIds((prev) => ({ ...prev, [productId]: false }));
        }
      }, 600);
    },
    [updateCount]
  );

  const handleRemove = useCallback(
    async (productId: string) => {
      setRemovingIds((prev) => ({ ...prev, [productId]: true }));
      try {
        await removeProduct(productId);
      } finally {
        setRemovingIds((prev) => ({ ...prev, [productId]: false }));
      }
    },
    [removeProduct]
  );

  const handleClearCart = useCallback(async () => {
    setClearingCart(true);
    try {
      await clearCart();
    } finally {
      setClearingCart(false);
    }
  }, [clearCart]);


  if (!isMounted) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#16A34A] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const isAuth = !!token;

  // Ensure items is always a valid array
  const rawItems = isAuth ? cart?.products : guestCart;
  const items = Array.isArray(rawItems) ? rawItems : [];

  const itemCount = items.reduce((acc, item) => acc + (item?.count || 0), 0);
  const totalPrice = isAuth
    ? (cart?.totalCartPrice || 0)
    : items.reduce((total, item) => total + ((item?.price || 0) * (item?.count || 0)), 0);

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 max-w-7xl pt-12">
        <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-2xl border border-[#E9ECEF] p-8 mt-8 shadow-sm">
          <div className="w-24 h-24 bg-[#F8F9FA] rounded-full flex items-center justify-center mb-6">
            <ShoppingCart size={48} className="text-[#6C757D]" strokeWidth={1.5} />
          </div>
          <h2 className="text-2xl font-bold text-[#212529] mb-3">Your cart is empty</h2>
          <p className="text-[#6C757D] mb-8 max-w-md text-sm md:text-base text-center">
            Looks like you haven&apos;t added anything to your cart yet.
            Start exploring our products and find something you love.
          </p>
          <AppButton asChild className="bg-[#16A34A] hover:bg-[#15803D] text-white px-8 rounded-xl h-12">
            <Link href="/shop" className="flex items-center gap-2">
              <ShoppingBag size={18} /> Continue Shopping
            </Link>
          </AppButton>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full lg:container lg:mx-auto px-4 pt-8 md:pt-12">
      {/* Header */}
      <div className="mb-8">
        <div className="text-sm text-[#6C757D] mb-4">
          <Link href="/" className="hover:text-[#16A34A] transition-colors">Home</Link> / <span className="text-[#212529]">Shopping Cart</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#15833E] flex items-center justify-center flex-shrink-0">
            <ShoppingCart size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-[#212529]">Shopping Cart</h1>
            <p className="text-sm text-[#6C757D] mt-1">You have <span className="font-semibold text-[#15833E]">{itemCount} items</span> in your cart</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Left Column: Cart Items */}
        <div className="w-full md:w-2/3 flex flex-col gap-6">
          <div className="bg-white border border-[#E9ECEF] rounded-2xl overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
            <div className="divide-y divide-[#E9ECEF] flex flex-col">
              {items.map((item, index) => {
                if (!item) return null;
                const product = item.product || {};
                const itemIdStr = String(product.id || product._id || `item-${index}`);
                const itemPrice = item.price || 0;
                // Use optimistic count if available, otherwise fall back to real count
                const displayCount = quantityOverrides[itemIdStr] ?? item.count;
                const lineTotal = itemPrice * (displayCount || 1);
                const isUpdating = !!updatingIds[itemIdStr];
                const isRemoving = !!removingIds[itemIdStr];

                const skuCode = itemIdStr.length > 5 ? itemIdStr.substring(0, 6).toUpperCase() : itemIdStr.toUpperCase();

                return (
                  <div key={`${itemIdStr}-${index}`} className="p-6 flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center bg-white hover:bg-[#F8F9FA]/30 transition-colors">

                    {/* Image Area */}
                    <div className="w-[120px] h-[120px] shrink-0 bg-[#F8F9FA] rounded-[18px] border border-[#E9ECEF] relative flex items-center justify-center p-3">
                      {product.imageCover ? (
                        <Image src={product.imageCover} alt={product.title || "Product Image"} fill className="object-contain p-2" sizes="120px" />
                      ) : (
                        <ShoppingBag size={32} className="text-[#E9ECEF]" />
                      )}
                      {/* In Stock Badge overlapping */}
                      <div className="absolute -bottom-2.5 -right-2 bg-[#16A34A] text-white px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold flex items-center gap-1 shadow-md border border-white">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        In Stock
                      </div>
                    </div>

                    {/* Middle Info Area */}
                    <div className="flex-1 flex flex-col justify-center gap-2.5 w-full">
                      <div className="flex flex-col gap-1.5">
                        <h3 className="text-lg md:text-[19px] font-bold text-[#212529] line-clamp-1 leading-tight">
                          <Link href={`/productDetails/${itemIdStr}`} className="hover:text-[#16A34A] transition-colors">{product.title || "Unknown Product"}</Link>
                        </h3>
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <span className="bg-[#E8F6ED] text-[#16A34A] px-2.5 py-0.5 rounded-full text-xs font-semibold">
                            {product.category?.name || "Category"}
                          </span>
                          <span className="text-[#ADB5BD] text-[10px]">●</span>
                          <span className="text-xs text-[#878A99] font-medium">SKU: {skuCode}</span>
                        </div>
                      </div>

                      <div className="flex items-baseline gap-1.5">
                        <span className="text-xl md:text-[22px] font-extrabold text-[#16A34A]">{itemPrice} EGP</span>
                        <span className="text-[13px] text-[#878A99] font-medium">per unit</span>
                      </div>

                      <div className="mt-1 flex items-center bg-[#F8F9FA] rounded-full h-10 w-[110px] p-1 border border-[#E9ECEF]">
                        <button
                          className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-[#212529] hover:bg-gray-100 transition-colors border border-[#E9ECEF] disabled:opacity-40"
                          onClick={() => handleQuantityChange(itemIdStr, displayCount, -1)}
                          disabled={displayCount <= 1 || isUpdating}
                        >
                          <Minus size={14} strokeWidth={2.5} />
                        </button>
                        <span className="flex-1 text-center font-bold text-[15px] text-[#212529] flex items-center justify-center">
                          {isUpdating
                            ? <Loader2 size={14} className="animate-spin text-[#16A34A]" />
                            : displayCount
                          }
                        </span>
                        <button
                          className="w-8 h-8 rounded-full bg-[#16A34A] shadow-sm flex items-center justify-center text-white hover:bg-[#15803D] transition-colors disabled:opacity-40"
                          onClick={() => handleQuantityChange(itemIdStr, displayCount, +1)}
                          disabled={isUpdating}
                        >
                          <Plus size={14} strokeWidth={2.5} />
                        </button>
                      </div>
                    </div>

                    {/* Right Totals & Trash */}
                    <div className="flex md:flex-col items-center md:items-end justify-between w-full md:w-auto h-full gap-4 md:gap-0">
                      <div className="flex flex-col items-start md:items-end w-full md:h-full md:justify-end">
                        <div className="text-[13px] text-[#878A99] font-medium mb-0.5">Total</div>
                        <div className="text-xl md:text-[22px] font-extrabold text-[#212529] leading-none mb-1 transition-all">
                          {lineTotal}<span className="text-sm font-bold text-[#878A99] ml-1">EGP</span>
                        </div>
                      </div>

                      <button
                        className="w-12 h-12 bg-[#FEF2F2] text-red-500 rounded-[14px] flex items-center justify-center border border-red-50 hover:bg-red-500 hover:text-white transition-all shadow-sm shrink-0 mt-auto md:ml-6 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => handleRemove(itemIdStr)}
                        disabled={isRemoving}
                        aria-label="Remove item"
                      >
                        {isRemoving
                          ? <Loader2 size={20} className="animate-spin" />
                          : <Trash2 size={20} strokeWidth={2} />
                        }
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between mt-2 gap-4">
            <Link href="/shop" className="text-sm font-bold text-[#16A34A] hover:text-[#15803D] transition-colors flex items-center gap-1.5 bg-white border border-[#E9ECEF] px-4 py-2.5 rounded-xl shadow-sm hover:border-[#16A34A] group">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Continue Shopping
            </Link>
            <button
              onClick={handleClearCart}
              disabled={clearingCart}
              className="text-sm font-bold text-red-500 hover:text-red-700 transition-colors flex items-center gap-1.5 bg-white border border-[#E9ECEF] px-4 py-2.5 rounded-xl shadow-sm hover:border-red-500 hover:bg-[#FEF2F2] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {clearingCart
                ? <Loader2 size={16} className="animate-spin" />
                : <Trash2 size={16} />
              }
              Clear all items
            </button>
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="w-full md:w-1/3 sticky top-24">
          <div className="bg-white rounded-2xl shadow-sm border border-[#E9ECEF] overflow-hidden">
            <div className="bg-[#16A149] text-white p-6">
              <h2 className="text-lg font-bold">Order Summary</h2>
              <p className="text-sm text-white/80 mt-1">{itemCount} items in your cart</p>
            </div>

            <div className="p-6 flex flex-col gap-6">
              <div className="bg-[#EEFDF5] rounded-xl p-4 flex items-start gap-3 border border-[#DEF5E5]">
                <Truck size={20} className="text-[#16A34A] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-bold text-[#16A34A]">Free Shipping!</p>
                  <p className="text-xs text-[#16A34A]/80 mt-0.5">You qualify for free delivery globally.</p>
                </div>
              </div>

              <div className="flex flex-col gap-3 pb-6 border-b border-[#E9ECEF]">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#6C757D]">Subtotal</span>
                  <span className=" text-[#212529]">{totalPrice} EGP</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#6C757D]">Shipping</span>
                  <span className=" text-[#16A34A]">FREE</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-bold text-[#212529]">Total</span>
                <span className="text-2xl font-bold text-[#212529]">{totalPrice} <span className="font-normal text-sm">EGP</span></span>
              </div>

              <div className="flex gap-2">
                <Input placeholder="Apply Promo Code" className="bg-[#F8F9FA] border-[#E9ECEF] rounded-xl text-sm" />
              </div>

              <AppButton asChild className="w-full h-14 rounded-xl bg-[#16A34A] hover:bg-[#15803D] text-white text-lg font-bold mt-2 shadow-lg shadow-[#16A34A]/20">
                <Link href={isAuth ? "/checkout" : "/login"}>
                  {isAuth ? "Secure Checkout" : "Login to Checkout"}
                </Link>
              </AppButton>

              <div className="flex items-center justify-center gap-6 pt-4">
                <div className="flex items-center gap-1.5 text-xs text-[#6C757D]">
                  <ShieldCheck size={16} className="text-[#16A34A]" /> Secure Payment
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#6C757D]">
                  <Truck size={20} className="text-[#2B7FFF] mt-0.5 flex-shrink-0" /> Fast Delivery
                </div>
              </div>
              <Link href="/shop" className="text-sm font-bold mx-auto text-[#16A34A] hover:text-[#15803D] transition-colors flex items-center gap-1.5 ">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
