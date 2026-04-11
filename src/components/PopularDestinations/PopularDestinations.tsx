import Link from "next/link";

const DESTINATIONS = [
  { label: "All Products", href: "/products", primary: true },
  { label: "Categories", href: "/category", primary: false },
  { label: "Today's Deals", href: "/deals", primary: false },
  { label: "Contact Us", href: "/contact", primary: false },
];

export default function PopularDestinations() {
  return (
    <div className="mt-14 w-full max-w-[600px] border border-gray-100 rounded-[1.5rem] p-6 md:p-8 bg-white/60 backdrop-blur-md shadow-[0_4px_25px_-10px_rgba(0,0,0,0.05)] z-10 relative">
      <h3 className="text-center text-[11px] font-black text-gray-400 mb-6 tracking-[0.2em] uppercase">
        Popular Destinations
      </h3>

      <div className="flex flex-wrap items-center justify-center gap-2.5 md:gap-3">
        {DESTINATIONS.map(({ label, href, primary }) =>
          primary ? (
            <Link
              key={label}
              href={href}
              className="bg-[#e8f5e9] text-[#1EBA57] font-bold px-4 py-2.5 rounded-full hover:bg-[#d0f0d6] transition-colors text-[13px] md:text-sm shadow-sm ring-1 ring-[#1EBA57]/10"
            >
              {label}
            </Link>
          ) : (
            <Link
              key={label}
              href={href}
              className="bg-white border border-gray-200 text-gray-600 font-bold px-4 py-2.5 rounded-full hover:bg-gray-50 hover:border-gray-300 transition-colors text-[13px] md:text-sm shadow-sm"
            >
              {label}
            </Link>
          )
        )}
      </div>
    </div>
  );
}
