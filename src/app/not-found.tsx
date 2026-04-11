"use client";

import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import NotFoundGraphic from "@/components/NotFoundGraphic/NotFoundGraphic";
import PopularDestinations from "@/components/PopularDestinations/PopularDestinations";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#f0fdf4] via-white to-white">

      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-[15%] w-64 h-64 bg-[#1EBA57]/[0.03] rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-[15%] w-80 h-80 bg-[#1EBA57]/[0.03] rounded-full blur-[80px] pointer-events-none" />

      {/* 404 Graphic */}
      <NotFoundGraphic />

      {/* Typography */}
      <div className="text-center max-w-lg mb-10 z-10 relative px-2">
        <h1 className="text-[36px] md:text-[42px] font-extrabold text-[#0B1629] mb-4 tracking-tight leading-tight">
          Oops! Nothing Here
        </h1>
        <p className="text-[#64748b] text-[16px] md:text-[17px] leading-relaxed mx-auto max-w-sm">
          Looks like this page went out of stock! Don&apos;t worry, there&apos;s
          plenty more fresh content to explore.
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-3 z-10 w-full max-w-md px-4 mx-auto justify-center">
        <Link
          href="/"
          className="flex items-center justify-center gap-2.5 bg-[#1EBA57] hover:bg-[#189b48] text-white px-7 py-4 rounded-2xl font-bold w-full sm:w-auto transition-all duration-300 shadow-[0_8px_20px_-6px_rgba(30,186,87,0.4)] hover:shadow-[0_12px_25px_-6px_rgba(30,186,87,0.5)] hover:-translate-y-0.5"
        >
          <Home size={18} strokeWidth={2.5} />
          Go to Homepage
        </Link>
        <button
          onClick={() => router.back()}
          className="flex items-center justify-center gap-2.5 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-[#475569] px-7 py-4 rounded-2xl font-bold w-full sm:w-auto transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 focus:outline-none"
        >
          <ArrowLeft size={18} strokeWidth={2.5} />
          Go Back
        </button>
      </div>

      {/* Popular Destinations */}
      <PopularDestinations />
    </div>
  );
}
