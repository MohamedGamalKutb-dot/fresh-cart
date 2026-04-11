"use client";

import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import AppButton from "@/components/shared/AppButton/AppButton";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, HeartCrack, Heart, Trash2, ArrowLeft, Check } from "lucide-react";
import HeroBanner from "@/components/shared/HeroBanner/HeroBanner";

export default function WishlistClient() {
  const { wishlist, toggleWishlist, isMounted } = useWishlist();
  const { addToCart, isInCart } = useCart();

  if (!isMounted) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#16A34A] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const banner = (
    <HeroBanner
      title="My Wishlist"
      subtitle={`${wishlist.length} item${wishlist.length !== 1 ? 's' : ''} saved`}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Wishlist" }
      ]}
      icon={<Heart size={32} strokeWidth={2} />}
      bgClassName="bg-white border-b border-[#E9ECEF]"
      iconBgClassName="bg-[#FEF2F2]"
      iconColorClassName="text-red-500"
      titleClassName="text-[#212529]"
      subtitleClassName="text-[#6C757D]"
      breadcrumbClassName="text-[#6C757D]"
      breadcrumbActiveClassName="text-[#212529]"
    />
  );

  if (wishlist.length === 0) {
    return (
      <>
        {banner}
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col items-center justify-center min-h-[350px] text-center bg-white rounded-2xl border border-[#E9ECEF] p-8 mt-8 shadow-sm">
            <HeartCrack size={80} className="text-gray-200 mb-6" strokeWidth={1} />
            <h2 className="text-2xl font-bold text-[#212529] mb-3">Your wishlist is empty</h2>
            <p className="text-[#6C757D] mb-8 max-w-md text-sm md:text-base">
              You haven&apos;t added any products to your wishlist yet.
              Explore our wide range of products and save your favorites!
            </p>
            <AppButton asChild className="bg-[#16A34A] hover:bg-[#15803D] text-white px-8 rounded-xl h-12">
              <Link href="/shop" className="flex items-center gap-2">
                <ShoppingBag size={18} /> Continue Shopping
              </Link>
            </AppButton>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {banner}
      <div className="container mx-auto px-4 max-w-7xl py-8 md:py-12">
        <div className="bg-white border border-[#E9ECEF] rounded-2xl shadow-sm overflow-hidden mb-8">

          {/* Desktop & Tablet Table Header */}
          <div className="hidden md:grid grid-cols-[4fr_2fr_2fr_2fr] gap-4 p-6 border-b border-[#E9ECEF] bg-[#F8F9FA] text-sm font-semibold text-[#6C757D] uppercase tracking-wider">
            <div>Product Name</div>
            <div>Price</div>
            <div>Stock Status</div>
            <div className="text-right">Actions</div>
          </div>

          {/* List Items */}
          <div className="divide-y divide-[#E9ECEF]">
            {wishlist.map((product) => {
              if (!product) return null;
              const displayPrice = product.priceAfterDiscount ?? product.price ?? 0;
              const productIdStr = String(product.id || product._id || Math.random());
              return (
                <div key={productIdStr} className="hover:bg-[#F8F9FA]/30 transition-colors">

                  {/* Desktop / Tablet View */}
                  <div className="hidden md:grid grid-cols-[4fr_2fr_2fr_2fr] gap-4 p-6 items-center">
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-20 bg-[#F8F9FA] rounded-xl flex-shrink-0 border border-[#E9ECEF] relative overflow-hidden flex items-center justify-center">
                        <Image src={product.imageCover || ""} alt={product.title || "Product"} fill className="object-contain p-2" sizes="80px" />
                      </div>
                      <div className="flex flex-col justify-center">
                        <h3 className="text-base font-bold text-[#212529] line-clamp-1 mb-1">
                          <Link href={`/productDetails/${productIdStr}`} className="hover:text-[#16A34A] transition-colors">{product.title || "Unknown Product"}</Link>
                        </h3>
                        <p className="text-sm text-[#6C757D]">{product.category?.name || "Product"}</p>
                      </div>
                    </div>

                    <div className="flex flex-col items-start justify-center">
                      <span className="text-[#212529] font-bold text-lg">{displayPrice} EGP</span>
                      {product.priceAfterDiscount && (
                        <span className="text-[#6C757D] text-sm line-through">{product.price} EGP</span>
                      )}
                    </div>

                    <div className="flex flex-col items-start justify-center">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DEF5E5] text-[#16A34A] text-sm font-semibold">
                        <span className="w-2 h-2 rounded-full bg-[#16A34A]"></span>
                        In Stock
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 min-w-[160px]">
                      {isInCart(productIdStr) ? (
                        <AppButton asChild variant="outline" className="bg-[#F8F9FA] border-[#E9ECEF] text-[#212529] hover:bg-gray-100 flex items-center gap-2 rounded-xl h-11 px-5 w-full">
                          <Link href="/cart">
                            <Check size={18} className="text-[#16A34A]" />
                            <span className="whitespace-nowrap font-semibold">View Cart</span>
                          </Link>
                        </AppButton>
                      ) : (
                        <AppButton onClick={() => addToCart(product)} className="bg-[#16A34A] hover:bg-[#15803D] text-white flex items-center gap-2 rounded-xl h-11 px-5 w-full">
                          <ShoppingBag size={18} />
                          <span className="whitespace-nowrap font-semibold">Add to Cart</span>
                        </AppButton>
                      )}
                      <AppButton variant="ghost" size="icon" onClick={() => toggleWishlist(product)} className="text-[#6C757D] hover:text-red-500 hover:bg-red-50 transition-colors w-10 h-10 rounded-full flex-shrink-0" aria-label={`Remove ${product.title || 'item'} from wishlist`}>
                        <Trash2 size={20} />
                      </AppButton>
                    </div>
                  </div>

                  {/* Mobile View */}
                  <div className="flex flex-col gap-4 md:hidden p-5">
                    <div className="flex gap-4 items-center">
                      <div className="w-16 h-16 bg-[#F8F9FA] rounded-xl flex-shrink-0 border border-[#E9ECEF] relative overflow-hidden flex items-center justify-center p-2">
                        <Image src={product.imageCover || ""} alt={product.title || "Product"} fill className="object-contain p-1" sizes="64px" />
                      </div>
                      <div className="flex flex-col">
                        <h3 className="text-sm font-bold text-[#212529] line-clamp-1 mb-0.5">
                          <Link href={`/productDetails/${productIdStr}`} className="hover:text-[#16A34A] transition-colors">{product.title || "Unknown Product"}</Link>
                        </h3>
                        <p className="text-xs text-[#6C757D]">{product.category?.name || "Product"}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-[#6C757D]">Price:</span>
                      <span className="text-[#212529] font-bold">{displayPrice} EGP</span>
                      {product.priceAfterDiscount && (
                        <span className="text-[#6C757D] text-xs line-through ml-2">{product.price} EGP</span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 mt-1">
                      {isInCart(productIdStr) ? (
                        <AppButton asChild variant="outline" className="bg-[#F8F9FA] border-[#E9ECEF] text-[#212529] hover:bg-gray-100 flex items-center justify-center gap-2 rounded-xl h-11 flex-1 px-4">
                          <Link href="/cart">
                            <Check size={18} className="text-[#16A34A]" />
                            <span className="font-semibold text-sm">View Cart</span>
                          </Link>
                        </AppButton>
                      ) : (
                        <AppButton onClick={() => addToCart(product)} className="bg-[#16A34A] hover:bg-[#15803D] text-white flex items-center justify-center gap-2 rounded-xl h-11 flex-1 px-4">
                          <ShoppingBag size={18} />
                          <span className="font-semibold text-sm">Add to Cart</span>
                        </AppButton>
                      )}
                      <AppButton variant="outline" size="icon" onClick={() => toggleWishlist(product)} className="text-[#6C757D] hover:text-red-500 hover:bg-red-50 transition-colors w-11 h-11 rounded-xl border-[#E9ECEF] flex-shrink-0" aria-label={`Remove ${product.title || 'item'} from wishlist`}>
                        <Trash2 size={18} />
                      </AppButton>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Footer Area */}
          <div className="p-6 border-t border-[#E9ECEF] bg-[#F8F9FA]/50">
            <Link href="/shop" className="inline-flex items-center gap-2 text-[#212529] hover:text-[#16A34A] transition-colors font-semibold text-sm">
              <ArrowLeft size={16} />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
