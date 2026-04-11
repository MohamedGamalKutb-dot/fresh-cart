"use client";

import { Mail, Leaf, Truck, Tag, ArrowRight, Apple, Play, Star, Smartphone, Loader2 } from "lucide-react";
import Link from "next/link";
import { useNewsletterLogic } from "./NewsletterSection.logic";

export default function NewsletterSection() {
  const { email, setEmail, loading, handleSubscribe, isVisible, containerRef } = useNewsletterLogic();

  return (
    <section className="container mx-auto px-4 max-w-7xl my-24 overflow-hidden" ref={containerRef}>
      {/* Main Container */}
      <div className="bg-[#f8f9fa] border border-[#e9ecef] rounded-[3rem] p-8 md:p-12 lg:p-14 relative overflow-hidden">
        
        {/* Subtle vertical divider in the middle (visible on very large screens) */}
        <div className="hidden lg:block absolute left-[60%] top-14 bottom-14 w-[1px] bg-gray-200/50 -translate-x-1/2" />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-14 xl:gap-20 items-center">
          
          {/* Left Panel: Newsletter - Slides from BOTTOM */}
          <div className={`flex flex-col lg:col-span-3 lg:pr-6 xl:pr-12 transition-all duration-[1200ms] ease-[cubic-bezier(0.33,1,0.68,1)] ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-32 opacity-0"
          }`}>
            {/* Header / Icon */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 bg-[#00BC86] rounded-2xl flex items-center justify-center text-white shadow-sm transition-transform hover:scale-105 active:scale-95 cursor-default">
                <Mail size={28} />
              </div>
              <div>
                <p className="text-[#00BC86] text-sm font-extrabold tracking-wide uppercase mb-0.5">
                  Newsletter
                </p>
                <p className="text-[#6c757d] text-sm font-medium">
                  50,000+ subscribers
                </p>
              </div>
            </div>

            {/* Typography */}
            <h2 className="text-3xl md:text-4xl lg:text-[40px] font-bold text-[#212529] leading-[1.2] mb-4">
              Get the Freshest Updates <br className="hidden md:block" />
              <span className="text-[#00BC86]">Delivered Free</span>
            </h2>
            <p className="text-[17px] text-[#6c757d] mb-8 font-medium">
              Weekly recipes, seasonal offers & exclusive member perks.
            </p>

            {/* Pills */}
            <div className="flex flex-wrap gap-3 mb-10">
              <div className="flex items-center gap-2.5 bg-white border border-[#D0FAE5] rounded-full px-1.5 py-1.5 pr-4 shadow-sm hover:translate-y-[-2px] transition-transform cursor-help">
                <div className="w-7 h-7 bg-[#D0FAE5] rounded-full flex items-center justify-center">
                  <Leaf size={14} className="text-[#009966]" />
                </div>
                <span className="text-[13px] font-bold text-[#495057]">Fresh Picks Weekly</span>
              </div>
              <div className="flex items-center gap-2.5 bg-white border border-[#D0FAE5] rounded-full px-1.5 py-1.5 pr-4 shadow-sm hover:translate-y-[-2px] transition-transform cursor-help">
                <div className="w-7 h-7 bg-[#D0FAE5] rounded-full flex items-center justify-center">
                  <Truck size={14} className="text-[#009966]" />
                </div>
                <span className="text-[13px] font-bold text-[#495057]">Free Delivery Codes</span>
              </div>
              <div className="flex items-center gap-2.5 bg-white border border-[#D0FAE5] rounded-full px-1.5 py-1.5 pr-4 shadow-sm hover:translate-y-[-2px] transition-transform cursor-help">
                <div className="w-7 h-7 bg-[#D0FAE5] rounded-full flex items-center justify-center">
                  <Tag size={14} className="text-[#009966]" />
                </div>
                <span className="text-[13px] font-bold text-[#495057]">Members-Only Deals</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 mb-5 w-full">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="flex-1 min-w-0 bg-white border border-[#ced4da] text-[#212529] placeholder:text-[#adb5bd] rounded-xl px-5 py-4 focus:outline-none focus:border-[#00BC86] focus:ring-4 focus:ring-[#00BC86]/10 shadow-sm transition-all font-medium"
                required
               
                />
              <button
                type="submit"
                disabled={loading}
                className="bg-[#00BC86] hover:bg-[#009966] text-white font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed min-w-[160px]"
              >
                {loading ? (
                    <>
                    <Loader2 className="animate-spin" size={20} /> Processing
                    </>
                ) : (
                    <>
                    Subscribe <ArrowRight size={20} />
                    </>
                )}
              </button>
            </form>

            <p className="text-[13.5px] text-[#868e96] flex items-center gap-2 font-semibold ml-2">
              <span className="text-[#facc15] text-lg">✨</span> Unsubscribe anytime. No spam, ever.
            </p>
          </div>


          {/* Right Panel: Mobile App Card - Slides from BOTTOM with Delay */}
          <div className={`relative bg-[#161c24] rounded-[2.5rem] p-10 overflow-hidden shadow-2xl lg:h-full flex flex-col justify-center mx-auto lg:ml-auto w-full max-w-[500px] lg:col-span-2 group border border-white/5 transition-all duration-[1200ms] delay-150 ease-[cubic-bezier(0.33,1,0.68,1)] ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-32 opacity-0"
          }`}>
            {/* Subtle glow background effect */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-[#0aad0a]/10 blur-[90px] rounded-full pointer-events-none transition-all duration-700 group-hover:bg-[#0aad0a]/20" />
            
            <div className="relative z-10 w-full lg:max-w-[340px]">
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 bg-[#0e3b2b] border border-[#00D492]/20 text-[#00D492] text-[11px] font-extrabold px-3.5 py-1.5 rounded-full mb-6 tracking-[0.1em] uppercase w-fit">
                <Smartphone size={14} strokeWidth={3} />
                MOBILE APP
              </div>

              <h3 className="text-[28px] md:text-[34px] font-bold text-white leading-[1.1] mb-3 tracking-tight">
                Shop Faster <br/> on Our App
              </h3>
              <p className="text-[16px] text-[#94a3b8] mb-8 font-medium leading-relaxed">
                Get app-exclusive deals & 15% off your first order.
              </p>

              {/* App Buttons */}
              <div className="flex flex-col gap-3.5 mb-8 pb-8 border-b border-white/10">
                <Link
                  href="https://apps.apple.com"
                  target="_blank"
                  className="flex items-center gap-4 bg-[#232a32] hover:bg-[#2c343d] border border-white/5 hover:border-white/15 rounded-xl p-3 px-6 transition-all w-full active:scale-[0.98] group/btn shadow-sm"
                >
                  <Apple size={30} className="text-white transition-transform group-hover/btn:scale-110" fill="currentColor" />
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] text-[#94a3b8] font-bold leading-none mb-1.5 tracking-widest">DOWNLOAD ON</span>
                    <span className="text-[17px] text-white font-bold leading-none">App Store</span>
                  </div>
                </Link>

                <Link
                  href="https://play.google.com"
                  target="_blank"
                  className="flex items-center gap-4 bg-[#232a32] hover:bg-[#2c343d] border border-white/5 hover:border-white/15 rounded-xl p-3 px-6 transition-all w-full active:scale-[0.98] group/btn shadow-sm"
                >
                  <Play size={28} className="text-[#0aad0a] ml-1 transition-transform group-hover/btn:scale-110" fill="currentColor" />
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] text-[#94a3b8] font-bold leading-none mb-1.5 tracking-widest">GET IT ON</span>
                    <span className="text-[17px] text-white font-bold leading-none">Google Play</span>
                  </div>
                </Link>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3.5">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} className="text-[#facc15]" fill="currentColor" />
                  ))}
                </div>
                <p className="text-[#94a3b8] text-[13.5px] font-bold">
                  <span className="text-white text-[15px]">4.9</span> · 100K+ downloads
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
