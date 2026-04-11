"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Heart, ShoppingCart, Zap, Share2, Star,
  Minus, Plus, Truck, ShieldCheck, RotateCcw,
  CheckCircle2, Home, ChevronRight, Package, MessageSquare, PackageSearch
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AppButton from "@/components/shared/AppButton/AppButton"
import ProductCard from "@/components/ProductCard/ProductCard"
import { ProductDetailsData } from "@/app/productDetails/[id]/productDetails.interface"
import { AllproductsData } from "@/app/home.interface"

interface Props {
  product: ProductDetailsData
  relatedProducts: AllproductsData[]
}

const keyFeatures = [
  "Premium Quality Product",
  "100% Authentic Guarantee",
  "Fast & Secure Packaging",
  "Quality Tested",
]

export default function ProductDetailsClient({ product, relatedProducts }: Props) {
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(product.imageCover)
  const sliderRef = useRef<HTMLDivElement>(null)

  function scrollSlider(dir: "left" | "right") {
    if (!sliderRef.current) return
    sliderRef.current.scrollBy({ left: dir === "right" ? 320 : -320, behavior: "smooth" })
  }

  const {
    title, description, price, priceAfterDiscount, quantity: stock,
    sold, ratingsAverage, ratingsQuantity, category, brand,
    subcategory, images, reviews,
  } = product

  const displayPrice = priceAfterDiscount ?? price
  const discountPercent = priceAfterDiscount
    ? Math.round(((price - priceAfterDiscount) / price) * 100)
    : null
  const totalPrice = (displayPrice * quantity).toFixed(2)

  const fullStars = Math.floor(ratingsAverage)
  const hasHalf = ratingsAverage - fullStars >= 0.5

  const allImages = [product.imageCover, ...images.filter(img => img !== product.imageCover)]

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-6">

        {/* ── Breadcrumbs ── */}
        <nav className="flex items-center gap-1.5 text-sm text-[#6C757D] mb-6 flex-wrap">
          <Link href="/" className="flex items-center gap-1 hover:text-[#16A34A] transition-colors">
            <Home size={14} /> Home
          </Link>
          <ChevronRight size={14} className="text-[#ADB5BD]" />
          <Link href="/shop" className="hover:text-[#16A34A] transition-colors">{category.name}</Link>
          {subcategory[0] && (
            <>
              <ChevronRight size={14} className="text-[#ADB5BD]" />
              <Link href="/shop" className="hover:text-[#16A34A] transition-colors">{subcategory[0].name}</Link>
            </>
          )}
          <ChevronRight size={14} className="text-[#ADB5BD]" />
          <span className="text-[#212529] font-medium">{title}</span>
        </nav>

        {/* ── 2-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">

          {/* ── Left: Image Gallery ── */}
          <div className="flex flex-col gap-3">
            {/* Main image */}
            <div className="relative w-full aspect-square bg-[#F8F9FA] rounded-2xl overflow-hidden border border-[#E9ECEF]">
              <Image
                src={activeImage}
                alt={title}
                fill
                className="object-contain p-8 transition-all duration-300"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {discountPercent && (
                <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                  -{discountPercent}%
                </span>
              )}
            </div>
            {/* Thumbnails */}
            {allImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(img)}
                    className={`shrink-0 w-[72px] h-[72px] rounded-xl border-2 overflow-hidden bg-[#F8F9FA] transition-all ${
                      activeImage === img
                        ? "border-[#16A34A]"
                        : "border-[#E9ECEF] hover:border-[#16A34A]/50"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${title} ${i + 1}`}
                      width={72}
                      height={72}
                      className="object-contain p-1 w-full h-full"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Right: Product Info ── */}
          <div className="flex flex-col gap-4">

            {/* Category & Brand badges */}
            <div className="flex items-center gap-2 flex-wrap">
              <Badge className="bg-[#DCFCE7] text-[#16A34A] border-0 hover:bg-[#DCFCE7] font-medium">
                {category.name}
              </Badge>
              <Badge variant="outline" className="text-[#6C757D] bg-transparent">
                {brand.name}
              </Badge>
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold text-[#212529] leading-snug">{title}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={
                      i < fullStars
                        ? "fill-[#FFC107] text-[#FFC107]"
                        : i === fullStars && hasHalf
                        ? "fill-[#FFC107]/50 text-[#FFC107]"
                        : "fill-gray-200 text-gray-200"
                    }
                  />
                ))}
              </div>
              <span className="text-sm text-[#6C757D]">
                {ratingsAverage} ({ratingsQuantity} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className={`text-2xl font-extrabold ${priceAfterDiscount ? "text-[#16A34A]" : "text-[#212529]"}`}>
                {displayPrice} EGP
              </span>
              {priceAfterDiscount && (
                <>
                  <span className="text-base text-[#6C757D] line-through">{price} EGP</span>
                  <Badge className="bg-red-500 text-white border-0 text-xs">-{discountPercent}%</Badge>
                </>
              )}
            </div>

            {/* Stock status */}
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#16A34A] inline-block" />
              <span className="text-sm font-medium text-[#16A34A]">In Stock</span>
              <span className="text-sm text-[#6C757D] ml-1">· {stock} available · {sold}+ sold</span>
            </div>

            <Separator />

            {/* Short description */}
            <p className="text-sm text-[#6C757D]">{description.slice(0, 120)}...</p>

            <Separator />

            {/* Quantity selector */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-[#212529] w-20">Quantity</span>
              <div className="flex items-center border border-[#E9ECEF] rounded-lg overflow-hidden">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center text-[#6C757D] hover:bg-gray-50 transition-colors border-r border-[#E9ECEF]"
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} />
                </button>
                <span className="w-12 text-center text-sm font-semibold text-[#212529]">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => Math.min(stock, q + 1))}
                  className="w-10 h-10 flex items-center justify-center text-[#6C757D] hover:bg-gray-50 transition-colors border-l border-[#E9ECEF]"
                  aria-label="Increase quantity"
                >
                  <Plus size={14} />
                </button>
              </div>
              <span className="text-xs text-[#6C757D]">{stock} available</span>
            </div>

            {/* Total Price row */}
            <div className="flex items-center justify-between bg-[#F8F9FA] rounded-xl px-4 py-3">
              <span className="text-sm font-medium text-[#6C757D]">Total Price:</span>
              <span className="text-base font-extrabold text-[#16A34A]">{totalPrice} EGP</span>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-3">
              {/* Row 1: Add to Cart + Buy Now */}
              <div className="grid grid-cols-2 gap-3">
                <AppButton className="h-12 rounded-xl bg-[#16A34A] hover:bg-[#15803D] text-white border-0 gap-2 text-sm font-semibold">
                  <ShoppingCart size={18} /> Add to Cart
                </AppButton>
                <AppButton className="h-12 rounded-xl bg-[#212529] hover:bg-black text-white border-0 gap-2 text-sm font-semibold">
                  <Zap size={18} /> Buy Now
                </AppButton>
              </div>
              {/* Row 2: Add to Wishlist (wide) + Share (icon) */}
              <div className="flex gap-3">
                <AppButton
                  variant="outline"
                  className="flex-1 h-11 rounded-xl border-[#E9ECEF] text-[#6C757D] hover:border-red-300 hover:text-red-500 gap-2 text-sm"
                >
                  <Heart size={16} /> Add to Wishlist
                </AppButton>
                <AppButton
                  variant="outline"
                  size="icon"
                  className="h-11 w-11 rounded-xl border-[#E9ECEF] text-[#6C757D] shrink-0"
                  aria-label="Share"
                >
                  <Share2 size={16} />
                </AppButton>
              </div>
            </div>

            {/* Feature badges — 3 items */}
            <div className="grid grid-cols-3 gap-3 pt-1">
              {[
                { icon: <Truck size={20} />, title: "Free Delivery", sub: "Orders over 550" },
                { icon: <RotateCcw size={20} />, title: "30 Days Return", sub: "Money back" },
                { icon: <ShieldCheck size={20} />, title: "Secure Payment", sub: "100% Protected" },
              ].map(({ icon, title: t, sub }) => (
                <div key={t} className="flex flex-col items-center text-center gap-2 p-3 bg-[#F8F9FA] rounded-xl">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#DCFCE7] text-[#16A34A]">
                    {icon}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#212529]">{t}</p>
                    <p className="text-xs text-[#6C757D]">{sub}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* ── Tabs Section ── */}
        <div className="border border-[#E9ECEF] rounded-2xl overflow-hidden mb-12">
          <Tabs defaultValue="details">
            <TabsList className="w-full justify-start rounded-none bg-white border-b border-[#E9ECEF] h-auto p-0">
              {[
                { value: "details", label: "Product Details", icon: <Package size={15} /> },
                { value: "reviews", label: `Reviews (${ratingsQuantity})`, icon: <MessageSquare size={15} /> },
                { value: "shipping", label: "Shipping & Returns", icon: <PackageSearch size={15} /> },
              ].map(tab => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="flex items-center gap-1.5 rounded-none border-b-2 border-transparent data-[state=active]:border-[#16A34A] data-[state=active]:text-[#16A34A] data-[state=active]:shadow-none bg-transparent px-6 py-4 text-sm font-medium text-[#6C757D]"
                >
                  {tab.icon} {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Product Details */}
            <TabsContent value="details" className="p-6 mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Left: About + Product Info table */}
                <div>
                  <h3 className="font-bold text-[#212529] mb-2">About this Product</h3>
                  <p className="text-sm text-[#6C757D] leading-relaxed mb-6">{description}</p>

                  <h3 className="font-bold text-[#212529] mb-3">Product Information</h3>
                  <table className="w-full text-sm">
                    <tbody>
                      {[
                        { label: "Category", value: category.name },
                        { label: "Subcategory", value: subcategory[0]?.name ?? "—" },
                        { label: "Brand", value: brand.name },
                        { label: "Items Sold", value: `${sold}+ sold` },
                      ].map(({ label, value }) => (
                        <tr key={label} className="border-b border-[#E9ECEF] last:border-0">
                          <td className="py-2.5 pr-4 text-[#6C757D] w-2/5">{label}</td>
                          <td className="py-2.5 text-[#212529] font-semibold text-right">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* Right: Key Features */}
                <div>
                  <h3 className="font-bold text-[#212529] mb-3">Key Features</h3>
                  <ul className="space-y-3">
                    {keyFeatures.map(f => (
                      <li key={f} className="flex items-center gap-2 text-sm text-[#212529]">
                        <CheckCircle2 size={17} className="text-[#16A34A] shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>

            {/* Reviews */}
            <TabsContent value="reviews" className="p-6 mt-0">
              {reviews.length === 0 ? (
                <p className="text-sm text-[#6C757D]">No reviews yet.</p>
              ) : (
                <div className="flex flex-col gap-4">
                  {reviews.map(r => (
                    <div key={r._id} className="border border-[#E9ECEF] rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-sm text-[#212529]">{r.user.name}</span>
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i} size={13}
                              className={i < r.rating ? "fill-[#FFC107] text-[#FFC107]" : "fill-gray-200 text-gray-200"}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-[#6C757D]">{r.review}</p>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Shipping */}
            <TabsContent value="shipping" className="p-6 mt-0">
              <div className="text-sm text-[#6C757D] space-y-3">
                <p>🚚 <span className="font-semibold text-[#212529]">Free Shipping</span> on orders over 550 EGP.</p>
                <p>🔄 <span className="font-semibold text-[#212529]">30-Day Returns</span> — hassle-free returns within 30 days.</p>
                <p>📦 <span className="font-semibold text-[#212529]">Delivery Time</span> — 2–5 business days.</p>
                <p>💳 <span className="font-semibold text-[#212529]">Secure Payment</span> — 100% protected checkout.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* ── You May Also Like ── */}
        {relatedProducts.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="w-1 h-7 bg-[#16A34A] rounded-full inline-block" />
                <h2 className="text-xl font-bold text-[#212529]">
                  You May Also <span className="text-[#16A34A]">Like</span>
                </h2>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => scrollSlider("left")}
                  aria-label="Previous"
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-[#E9ECEF] text-[#6C757D] hover:border-[#16A34A] hover:text-[#16A34A] transition-colors"
                >
                  <ChevronRight size={16} className="rotate-180" />
                </button>
                <button
                  onClick={() => scrollSlider("right")}
                  aria-label="Next"
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-[#E9ECEF] text-[#6C757D] hover:border-[#16A34A] hover:text-[#16A34A] transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Slider */}
            <div
              ref={sliderRef}
              className="flex gap-4 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {relatedProducts.map((prod) => (
                <div key={prod.id} className="shrink-0 w-[230px]">
                  <ProductCard prod={prod} />
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
