"use client";

import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  CreditCard,
  Banknote,
  ShieldCheck,
  Plus,
  ArrowLeft,
  Lock,
  ShoppingBag,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AppButton from "@/components/shared/AppButton/AppButton";
import { useCheckoutLogic } from "./CheckoutClient.logic";

export default function CheckoutClient() {
  const {
    isMounted,
    isAuth,
    items,
    itemCount,
    totalPrice,
    paymentMethod,
    setPaymentMethod,
    addressMode,
    toggleAddressMode,
    addressData,
    lastAddress,
    handleInputChange,
    isPlacingOrder,
    handlePlaceOrder,
    errors
  } = useCheckoutLogic();

  if (!isMounted || !isAuth) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#16A34A] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 max-w-7xl pt-12 flex flex-col items-center justify-center min-h-[40vh]">
        <h2 className="text-2xl font-bold text-[#212529] mb-3">Your cart is empty</h2>
        <Link href="/shop" className="text-[#16A34A] font-semibold hover:underline">
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-16">
      
      {/* Page Header */}
      <div className="bg-white border-b border-[#E9ECEF] pt-6 pb-8 mb-8 shadow-sm">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-sm text-[#6C757D] mb-4">
            <Link href="/" className="hover:text-[#16A34A] transition-colors">Home</Link> /{" "}
            <Link href="/cart" className="hover:text-[#16A34A] transition-colors">Cart</Link> /{" "}
            <span className="text-[#212529] font-medium">Checkout</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-[#16A34A] w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0 shadow-sm">
                <ShieldCheck size={26} strokeWidth={2} />
              </div>
              <div className="flex flex-col">
                <h1 className="text-[28px] font-bold text-[#212529] leading-tight mb-1">Complete Your Order</h1>
                <p className="text-sm text-[#6C757D]">Review your items and complete your purchase securely</p>
              </div>
            </div>
            <Link href="/cart" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#16A34A] hover:text-[#15803D] transition-colors">
              <ArrowLeft size={16} /> Back to Cart
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Left Column: Forms & Details */}
          <div className="w-full lg:w-[65%] flex flex-col gap-8">

            {/* Shipping Address Section */}
            <section className="bg-white rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-[#E9ECEF] overflow-hidden">
              <div className="bg-[#16A34A] text-white py-4 px-6 flex items-center gap-3">
                <MapPin size={22} />
                <div className="flex flex-col">
                  <h2 className="text-[17px] font-bold leading-tight">Shipping Address</h2>
                </div>
              </div>

              <div className="p-6 md:p-8">
                
                {/* 1. Saved Address Block */}
                {lastAddress.city && (
                  <div 
                    onClick={() => toggleAddressMode("saved")}
                    className={`w-full rounded-xl border-2 p-4 md:p-5 cursor-pointer transition-all flex items-center gap-4 mb-4 ${addressMode === "saved" ? "border-[#16A34A] bg-[#EEFDF5]" : "border-[#E9ECEF] bg-white hover:bg-gray-50"}`}
                  >
                    <div className={`w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0 shadow-sm transition-colors ${addressMode === 'saved' ? 'bg-[#16A34A] text-white' : 'bg-[#F8F9FA] text-[#6C757D]'}`}>
                      <MapPin size={22} strokeWidth={2} />
                    </div>
                    <div className="flex flex-col flex-1">
                       <span className={`font-bold text-[17px] leading-tight ${addressMode === 'saved' ? 'text-[#16A34A]' : 'text-[#212529]'}`}>{lastAddress.city}</span>
                       <span className="text-[13px] text-[#6C757D] mt-0.5">{lastAddress.details} (Last Delivery)</span>
                    </div>
                    {addressMode === "saved" && (
                       <div className="w-6 h-6 rounded-full bg-[#16A34A] flex items-center justify-center text-white">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                       </div>
                    )}
                  </div>
                )}
                
                {/* 2. Add New Block */}
                <div 
                  onClick={() => toggleAddressMode("new")}
                  className={`w-full rounded-xl border-2 border-dashed p-4 md:p-5 cursor-pointer transition-all flex items-center gap-4 mb-8 ${addressMode === "new" ? "border-[#16A34A] bg-[#EEFDF5]" : "border-[#DEE2E6] bg-white hover:bg-gray-50"}`}
                >
                  <div className={`w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0 shadow-sm transition-colors ${addressMode === 'new' ? 'bg-[#16A34A] text-white' : 'bg-gray-100 text-[#6C757D]'}`}>
                    <Plus size={22} strokeWidth={2.5} />
                  </div>
                  <div className="flex flex-col flex-1">
                     <span className={`font-bold text-[17px] leading-tight ${addressMode === 'new' ? 'text-[#16A34A]' : 'text-[#212529]'}`}>Use a different address</span>
                     <span className="text-[13px] text-[#6C757D] mt-0.5">Enter a new shipping address manually</span>
                  </div>
                </div>

                {/* Delivery Information Banner */}
                <div className="bg-[#F0F7FF] border border-transparent rounded-xl p-4 flex gap-3 mb-6">
                  <div className="w-6 h-6 shrink-0 bg-[#0052CC] rounded-full flex items-center justify-center mt-0.5 text-white font-bold italic text-sm">i</div>
                  <div className="flex flex-col">
                    <h4 className="text-[15px] font-bold text-[#0052CC] mb-0.5">Delivery Information</h4>
                    <p className="text-[13px] text-[#0052CC]">Please ensure your address is accurate for smooth delivery</p>
                  </div>
                </div>

                <form className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2 relative">
                    <Label htmlFor="city" className="text-[14px] font-bold text-[#212529]">City <span className="text-red-500">*</span></Label>
                    <div className="relative flex items-center">
                      <div className="absolute left-4 text-[#ADB5BD]">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 10h12"/><path d="M4 14h12"/><path d="M4 18h12"/><path d="M4 22h16"/><path d="M4 2v20"/><path d="M20 2v20"/><path d="M12 2v20"/></svg>
                      </div>
                      <Input 
                        id="city" 
                        value={addressData.city}
                        onChange={handleInputChange}
                        placeholder="e.g. Cairo, Alexandria, Giza" 
                        className={`h-[52px] rounded-xl bg-white focus-visible:ring-[#16A34A] focus-visible:border-[#16A34A] text-[15px] pl-12 transition-colors ${errors.city ? 'border-red-500 focus-visible:ring-red-500' : 'border-[#E9ECEF]'}`} 
                      />
                    </div>
                    {errors.city && <span className="text-xs text-red-500 font-medium ml-1">City is required</span>}
                  </div>
                  
                  <div className="flex flex-col gap-2 relative">
                    <Label htmlFor="details" className="text-[14px] font-bold text-[#212529]">Street Address <span className="text-red-500">*</span></Label>
                    <div className="relative flex items-center">
                      <div className="absolute left-4 text-[#ADB5BD]">
                        <MapPin size={20} strokeWidth={2} />
                      </div>
                      <Input 
                        id="details" 
                        value={addressData.details}
                        onChange={handleInputChange}
                        placeholder="Street name, building number, floor, apartment..." 
                        className={`h-[52px] rounded-xl bg-white focus-visible:ring-[#16A34A] focus-visible:border-[#16A34A] text-[15px] pl-12 transition-colors ${errors.details ? 'border-red-500 focus-visible:ring-red-500' : 'border-[#E9ECEF]'}`}
                      />
                    </div>
                    {errors.details && <span className="text-xs text-red-500 font-medium ml-1">Street address is required</span>}
                  </div>

                  <div className="flex flex-col gap-2 relative">
                    <Label htmlFor="phone" className="text-[14px] font-bold text-[#212529]">Phone Number <span className="text-red-500">*</span></Label>
                    <div className="relative flex items-center">
                      <div className="absolute left-4 text-[#ADB5BD]">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                      </div>
                      <Input 
                        id="phone" 
                        value={addressData.phone}
                        onChange={handleInputChange}
                        placeholder="01xxxxxxxxx" 
                        className={`h-[52px] rounded-xl bg-white focus-visible:ring-[#16A34A] focus-visible:border-[#16A34A] text-[15px] pl-12 pr-[140px] transition-colors ${errors.phone ? 'border-red-500 focus-visible:ring-red-500' : 'border-[#E9ECEF]'}`} 
                      />
                      <span className="absolute right-4 text-[13px] text-[#878A99] pointer-events-none select-none font-medium hidden sm:block">
                        Egyptian numbers only
                      </span>
                    </div>
                    {errors.phone && <span className="text-xs text-red-500 font-medium ml-1">Phone number is required</span>}
                  </div>
                </form>

              </div>
            </section>

            {/* Payment Methods Section */}
            <section className="bg-white rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-[#E9ECEF] overflow-hidden mb-8">
              <div className="bg-[#16A34A] text-white py-4 px-6 flex items-center gap-3">
                <CreditCard size={22} />
                <div className="flex flex-col">
                  <h2 className="text-[17px] font-bold leading-tight">Payment Method</h2>
                </div>
              </div>

              <div className="p-6 md:p-8 flex flex-col gap-5">
                
                {/* Cash Option */}
                <label 
                  className={`flex items-center justify-between p-4 md:p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                    paymentMethod === "cash" 
                    ? "border-[#16A34A] bg-[#EEFDF5]" 
                    : "border-[#E9ECEF] bg-white"
                  }`}
                  onClick={() => setPaymentMethod("cash")}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-[14px] flex items-center justify-center shrink-0 shadow-sm transition-colors ${paymentMethod === 'cash' ? 'bg-[#16A34A] text-white' : 'bg-[#F8F9FA] text-[#6C757D] border border-[#E9ECEF]'}`}>
                      <Banknote size={24} strokeWidth={2} />
                    </div>
                    <div className="flex flex-col">
                      <h3 className={`font-bold text-[17px] mb-0.5 ${paymentMethod === 'cash' ? 'text-[#16A34A]' : 'text-[#212529]'}`}>Cash on Delivery</h3>
                      <p className="text-[13px] text-[#6C757D]">Pay when your order arrives at your doorstep</p>
                    </div>
                  </div>
                  <div className="ml-4 shrink-0">
                    {paymentMethod === "cash" ? (
                      <div className="w-6 h-6 rounded-full bg-[#16A34A] flex items-center justify-center text-white">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full border-2 border-[#E9ECEF]"></div>
                    )}
                  </div>
                </label>

                {/* Card Option */}
                <label 
                  className={`flex items-center justify-between p-4 md:p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                    paymentMethod === "card" 
                    ? "border-[#16A34A] bg-[#EEFDF5]" 
                    : "border-[#E9ECEF] bg-white"
                  }`}
                  onClick={() => setPaymentMethod("card")}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`w-12 h-12 rounded-[14px] flex items-center justify-center shrink-0 shadow-sm transition-colors ${paymentMethod === 'card' ? 'bg-[#16A34A] text-white' : 'bg-[#F8F9FA] text-[#6C757D] border border-[#E9ECEF]'}`}>
                      <CreditCard size={24} strokeWidth={2} />
                    </div>
                    <div className="flex flex-col flex-1">
                      <h3 className={`font-bold text-[17px] mb-1 ${paymentMethod === 'card' ? 'text-[#16A34A]' : 'text-[#212529]'}`}>Pay Online</h3>
                      <p className="text-[13px] text-[#6C757D] mb-1.5">Secure payment with Credit/Debit Card via Stripe</p>
                      
                      <div className="flex items-center gap-1.5">
                        <div className="w-7 h-5 rounded overflow-hidden relative border border-[#E9ECEF] bg-[#1A1F71] flex items-center justify-center text-[7px] text-white font-bold italic">VISA</div>
                        <div className="w-7 h-5 rounded overflow-hidden relative border border-[#E9ECEF] bg-white flex items-center justify-center">
                          <div className="w-2.5 h-2.5 rounded-full bg-red-500 absolute left-1"></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 mix-blend-multiply absolute right-1"></div>
                        </div>
                        <div className="w-7 h-5 rounded overflow-hidden relative border border-[#E9ECEF] bg-[#0070CD] flex items-center justify-center text-[6px] text-white font-bold uppercase">Amex</div>
                      </div>
                    </div>
                  </div>
                  <div className="ml-4 shrink-0">
                    {paymentMethod === "card" ? (
                      <div className="w-6 h-6 rounded-full bg-[#16A34A] flex items-center justify-center text-white">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full border-2 border-[#E9ECEF]"></div>
                    )}
                  </div>
                </label>

                {/* Secure Badge */}
                <div className="flex items-center gap-3 mt-2 bg-[#EEFDF5] p-4 rounded-xl border border-transparent">
                  <div className="w-8 h-8 rounded-full bg-[#16A34A]/10 flex items-center justify-center shrink-0">
                   <ShieldCheck size={18} className="text-[#16A34A]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[15px] font-bold text-[#16A34A] mb-0.5">Secure & Encrypted</span>
                    <span className="text-[13px] text-[#16A34A]">Your payment info is protected with 256-bit SSL encryption</span>
                  </div>
                </div>

              </div>
            </section>
          </div>

          {/* Right Column: Order Summary (Figma styling) */}
          <div className="w-full lg:w-[35%] sticky top-8">
            <div className="bg-white rounded-2xl shadow-sm border border-[#E9ECEF] overflow-hidden">
              
               <div className="bg-[#16A149] text-white p-6">
              <h2 className="text-lg font-bold">Order Summary</h2>
              <p className="text-sm text-white/80 mt-1">{itemCount} items in your cart</p>
            </div>

              {/* Items Summary */}
              <div className="flex flex-col gap-4 max-h-[320px] overflow-y-auto pr-2 [scrollbar-width:thin]">
                {items.map((item, index) => {
                  if (!item) return null;
                  const product = item.product || {};
                  const itemId = product.id || product._id || `item-${index}`;
                  const itemPrice = item.price || 0;
                  const lineTotal = itemPrice * (item.count || 1);
                  
                  return (
                  <div key={itemId} className="flex gap-4 items-center group">
                    <div className="w-[64px] h-[64px] bg-[#F8F9FA] rounded-[16px] border border-transparent group-hover:border-[#E9ECEF] transition-colors flex shrink-0 items-center justify-center p-2 relative">
                      {product.imageCover ? (
                        <Image src={product.imageCover} alt={product.title || "Product"} fill className="object-contain p-1.5" sizes="64px" />
                      ) : (
                        <ShoppingBag size={24} className="text-[#E9ECEF]" />
                      )}
                    </div>
                    <div className="flex flex-col flex-1 min-w-0 justify-center">
                      <h4 className="text-[15px] font-bold text-[#212529] line-clamp-1">{product.title || "Unknown Product"}</h4>
                      <span className="text-[13px] text-[#6C757D] mt-0.5">Qty: <span className="font-semibold text-[#212529]">{item.count}</span></span>
                    </div>
                    <div className="text-[16px] font-bold text-[#212529] whitespace-nowrap pl-4">
                      {lineTotal} <span className="text-[12px] font-medium text-[#878A99]">EGP</span>
                    </div>
                  </div>
                )})}
              </div>

              {/* Totals Box */}
              <div className="rounded-xl p-5 border border-transparent flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-[15px] text-[#6C757D] font-medium">Subtotal</span>
                  <span className="text-[16px] font-bold text-[#212529]">{totalPrice} <span className="text-[11px] font-medium text-[#878A99]">EGP</span></span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[15px] text-[#6C757D] font-medium">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 18H3a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h3"/><path d="M14 6h4l4 4v8h-3"/><circle cx="19" cy="18" r="2"/><circle cx="9" cy="18" r="2"/><path d="M11 18h4"/></svg>
                    Shipping
                  </div>
                  <span className="text-[16px] font-bold text-[#16A34A]">FREE</span>
                </div>
                
                <div className="w-full h-px bg-[#E9ECEF] my-0.5 opacity-50"></div>
                
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[18px] font-bold text-[#212529]">Total</span>
                  <div className="text-right">
                    <span className="text-[26px] font-extrabold text-[#212529] tracking-tight">{totalPrice}</span>
                    <span className="text-[14px] font-bold text-[#878A99] ml-1">EGP</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4 mt-1">
                <AppButton 
                  onClick={handlePlaceOrder}
                  disabled={isPlacingOrder}
                  className="w-full h-[56px] rounded-[16px] bg-[#16A34A] hover:bg-[#15803D] text-white text-[18px] font-bold shadow-lg shadow-[#16A34A]/25 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                >
                  {isPlacingOrder ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Lock size={20} strokeWidth={2.5} /> Place Order
                    </>
                  )}
                </AppButton>
                
                <div className="flex items-center justify-center gap-6 mt-1">
                  <div className="flex items-center gap-1.5 text-[12px] font-medium text-[#6C757D]">
                    <ShieldCheck size={16} className="text-[#16A34A]" /> Secure Payment
                  </div>
                  <div className="flex items-center gap-1.5 text-[12px] font-medium text-[#6C757D]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 18H3a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h3"/><path d="M14 6h4l4 4v8h-3"/><circle cx="19" cy="18" r="2"/><circle cx="9" cy="18" r="2"/><path d="M11 18h4"/></svg> Fast Delivery
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
