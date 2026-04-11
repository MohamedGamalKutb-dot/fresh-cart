"use client";

import Image from "next/image";
import Link from "next/link";
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  ShoppingBag, 
  Clock, 
  FileText,
  Phone,
  ChevronDown,
  ChevronUp,
  Receipt,
  Download
} from "lucide-react";
import { useOrdersLogic } from "./OrdersClient.logic";

export default function OrdersClient() {
  const {
    orders,
    isLoading,
    error,
    expandedOrders,
    toggleOrder,
    formatDate
  } = useOrdersLogic();

  if (isLoading) {
    return (
      <div className="min-h-[500px] flex items-center justify-center bg-[#F8F9FA]">
        <div className="w-10 h-10 border-4 border-[#16A34A] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-16">
      
      {/* Header */}
      <div className="bg-[#F8F9FA] pt-8 pb-6">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-center gap-4 mb-2">
            <Link href="/" className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-[#E9ECEF] hover:bg-gray-50 transition-colors text-[#212529]">
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-[28px] font-bold text-[#212529]">Orders</h1>
          </div>
          <p className="text-[15px] text-[#6C757D] ml-[56px]">
            Track and manage your {orders.length} orders
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-5xl">
        {error ? (
          <div className="bg-white rounded-2xl p-8 text-center text-red-500 shadow-sm border border-[#E9ECEF]">
            {error}
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-[#E9ECEF] flex flex-col items-center">
            <ShoppingBag size={48} className="text-[#ADB5BD] mb-4" />
            <h2 className="text-xl font-bold text-[#212529] mb-2">No orders found</h2>
            <p className="text-[#6C757D] mb-6">You haven&apos;t placed any orders yet.</p>
            <Link href="/shop" className="px-6 py-3 bg-[#16A34A] hover:bg-[#15803D] text-white font-bold rounded-xl transition-colors">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {orders.map((order) => {
              const isExpanded = !!expandedOrders[order.id];
              const firstItem = order.cartItems?.[0];
              const remainingItemsCount = Math.max(0, (order.cartItems?.length || 0) - 1);
              const totalItemsCount = order.cartItems?.reduce((sum, item) => sum + item.count, 0) || 0;

              return (
                <div key={order.id} className="bg-white rounded-[24px] shadow-sm border border-[#E9ECEF] overflow-hidden transition-all duration-200">
                  
                  {/* Order Overview (Card Header) */}
                  <div className="p-5 md:p-6 flex flex-col md:flex-row gap-5 items-start md:items-center relative">
                    
                    {/* Top Right Receipt Button (Figma) */}
                    <div className="absolute top-5 md:top-6 right-5 md:right-6 md:block hidden">
                      <button className="w-10 h-10 bg-[#F8F9FA] hover:bg-[#EEFDF5] transition-colors rounded-xl flex items-center justify-center text-[#6C757D] hover:text-[#16A34A]">
                        <Download size={18} />
                      </button>
                    </div>

                    {/* Left: Thumbnail image box */}
                    <div className="w-[100px] h-[100px] bg-[#F8F9FA] rounded-[16px] flex shrink-0 items-center justify-center p-2 relative shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]">
                      {firstItem?.product?.imageCover ? (
                        <Image src={firstItem.product.imageCover} alt={firstItem.product.title} fill className="object-contain p-2" sizes="100px" />
                      ) : (
                        <ShoppingBag size={32} className="text-[#ADB5BD]" />
                      )}
                      
                      {remainingItemsCount > 0 && (
                        <div className="absolute -top-2 -right-2 bg-[#212529] text-white text-[11px] font-bold w-7 h-7 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                          +{remainingItemsCount}
                        </div>
                      )}
                    </div>

                    {/* Middle: Details */}
                    <div className="flex flex-col flex-1 pl-1">
                      {/* Status Badge */}
                      <div className="mb-2.5 inline-block">
                        {order.isDelivered ? (
                           <div className="bg-[#D4EDDA] text-[#155724] px-3 py-1 rounded-full text-[12px] font-bold flex items-center gap-1.5 w-max">
                             <Clock size={14} /> Delivered
                           </div>
                        ) : (
                           <div className="bg-[#FFF3CD] text-[#856404] px-3 py-1 rounded-full text-[12px] font-bold flex items-center gap-1.5 w-max">
                             <Clock size={14} /> Processing
                           </div>
                        )}
                      </div>
                      
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-[20px] font-bold text-[#ADB5BD]">#</span>
                        <h3 className="text-[22px] font-bold text-[#212529] tracking-tight">{order.id}</h3>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] text-[#6C757D] font-medium">
                        <div className="flex items-center gap-1.5"><Calendar size={14} /> {formatDate(order.createdAt)}</div>
                        <div className="w-1 h-1 rounded-full bg-[#DEE2E6] hidden sm:block"></div>
                        <div className="flex items-center gap-1.5"><ShoppingBag size={14} /> {totalItemsCount} item{totalItemsCount !== 1 ? 's' : ''}</div>
                        <div className="w-1 h-1 rounded-full bg-[#DEE2E6] hidden sm:block"></div>
                        <div className="flex items-center gap-1.5"><MapPin size={14} /> {order.shippingAddress?.city || 'No City Provided'}</div>
                      </div>
                    </div>

                    {/* Right: Price & Toggle */}
                    <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-4 md:mt-0 mt-2 border-t md:border-0 border-[#E9ECEF] pt-4 md:pt-0">
                      <div className="text-[24px] font-extrabold text-[#212529] md:text-right md:mb-6">
                        {order.totalOrderPrice} <span className="text-[14px] font-bold text-[#878A99]">EGP</span>
                      </div>
                      
                      <button 
                        onClick={() => toggleOrder(order.id)}
                        className={`px-5 py-2.5 rounded-[12px] font-bold text-[14px] flex items-center gap-2 transition-colors ${
                          isExpanded ? "bg-[#16A34A] text-white" : "bg-white text-[#212529] border border-[#DEE2E6] hover:bg-[#F8F9FA]"
                        }`}
                      >
                        {isExpanded ? (
                          <>Hide <ChevronUp size={16} strokeWidth={2.5} /></>
                        ) : (
                          <>Details <ChevronDown size={16} strokeWidth={2.5} /></>
                        )}
                      </button>
                    </div>

                  </div>

                  {/* Expanded Details Section */}
                  {isExpanded && (
                    <div className="bg-[#FAFAFA] border-t border-[#E9ECEF] p-6 lg:p-8">
                      
                      {/* Order Items Title */}
                      <div className="flex items-center gap-3 mb-6">
                        <div className="bg-[#EEFDF5] w-8 h-8 rounded-[8px] flex items-center justify-center shrink-0">
                          <Receipt size={16} className="text-[#16A34A]" />
                        </div>
                        <h4 className="text-[16px] font-bold text-[#212529]">Order Items</h4>
                      </div>

                      {/* Items List */}
                      <div className="flex flex-col gap-3 mb-8">
                        {order.cartItems?.map((item) => (
                          <div key={item.product?.id || Math.random()} className="bg-white border border-[#E9ECEF] rounded-[16px] p-4 flex items-center gap-4 shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
                            <div className="w-[56px] h-[56px] bg-[#F8F9FA] rounded-[12px] p-1 relative flex shrink-0 items-center justify-center">
                              {item.product?.imageCover && (
                                <Image src={item.product.imageCover} alt={item.product.title} fill className="object-contain p-1" sizes="56px" />
                              )}
                            </div>
                            <div className="flex flex-col flex-1">
                              <span className="text-[15px] font-bold text-[#212529] line-clamp-1">{item.product?.title || "Product"}</span>
                              <span className="text-[13px] text-[#6C757D] mt-0.5">{item.count} × {item.price} EGP</span>
                            </div>
                            <div className="text-[16px] font-bold text-[#212529]">
                              {item.price * item.count} <span className="text-[12px] font-medium text-[#878A99]">EGP</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Grid for Address and Summary */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* Delivery Address Box */}
                        <div className="bg-[#F8F9FA] rounded-[16px] p-6 border border-[#E9ECEF]">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="bg-[#EBF5FF] w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                              <MapPin size={16} className="text-[#0070CD]" />
                            </div>
                            <h4 className="text-[15px] font-bold text-[#212529]">Delivery Address</h4>
                          </div>
                          
                          <div className="flex flex-col gap-2 pl-1">
                            <span className="text-[15px] font-bold text-[#212529]">{order.shippingAddress?.city || "Unknown City"}</span>
                            <span className="text-[13px] text-[#6C757D] leading-relaxed">{order.shippingAddress?.details || "No detailed address provided."}</span>
                            <div className="flex items-center gap-2 mt-2 text-[13px] text-[#6C757D] font-medium">
                              <Phone size={14} className="text-[#ADB5BD]" /> {order.shippingAddress?.phone || "No phone provided"}
                            </div>
                          </div>
                        </div>

                        {/* Order Summary Box (Yellowish) */}
                        <div className="bg-[#FFF9DB] rounded-[16px] p-6 border border-transparent">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="bg-[#FFF3CD] w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                              <FileText size={16} className="text-[#856404]" />
                            </div>
                            <h4 className="text-[15px] font-bold text-[#212529]">Order Summary</h4>
                          </div>
                          
                          <div className="flex flex-col gap-4 pl-1">
                            <div className="flex items-center justify-between">
                              <span className="text-[14px] text-[#6C757D] font-medium">Subtotal</span>
                              <span className="text-[15px] font-medium text-[#212529]">{order.totalOrderPrice} EGP</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-[14px] text-[#6C757D] font-medium">Shipping</span>
                              <span className="text-[15px] font-medium text-[#212529]">Free</span>
                            </div>
                            
                            <div className="w-full h-px bg-[#000000] opacity-10 my-1"></div>
                            
                            <div className="flex items-center justify-between">
                              <span className="text-[16px] font-bold text-[#212529]">Total</span>
                              <span className="text-[18px] font-extrabold text-[#212529]">{order.totalOrderPrice} EGP</span>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
