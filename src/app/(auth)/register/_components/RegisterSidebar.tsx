import { Star, Truck, Shield } from "lucide-react";

const FEATURES = [
  { icon: Star, title: "Premium Quality", desc: "Premium quality products sourced from trusted suppliers." },
  { icon: Truck, title: "Fast Delivery", desc: "Same-day delivery available in most areas" },
  { icon: Shield, title: "Secure Shopping", desc: "Your data and payments are completely secure" },
];

export default function RegisterSidebar() {
  return (
    <div className="flex flex-col justify-start w-full lg:w-[45%] bg-white p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-[#E9ECEF]">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-[#212529] leading-tight mb-3">
        Welcome to <span className="text-[#0AAD0A]">FreshCart</span>
      </h1>
      <p className="text-[#6C757D] text-sm leading-relaxed mb-8">
        Join thousands of happy customers who enjoy fresh groceries delivered right to their doorstep.
      </p>

      {/* Feature list */}
      <div className="space-y-5 mb-8">
        {FEATURES.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="flex items-start gap-4">
            <div className="flex-shrink-0 bg-[#E8F5E9] rounded-full p-2.5">
              <Icon className="size-5 text-[#0AAD0A]" />
            </div>
            <div>
              <p className="font-semibold text-[#212529] text-sm">{title}</p>
              <p className="text-[#6C757D] text-xs leading-relaxed mt-0.5">{desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Testimonial card */}
      <div className="rounded-2xl p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="size-10 rounded-full bg-[#E8F5E9] flex items-center justify-center flex-shrink-0 overflow-hidden border-2 border-[#0AAD0A]/20">
            <svg viewBox="0 0 40 40" className="size-full" aria-hidden="true">
              <rect width="40" height="40" fill="#C8E6C9" />
              <circle cx="20" cy="16" r="7" fill="#4CAF50" />
              <ellipse cx="20" cy="36" rx="13" ry="10" fill="#388E3C" />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-[#212529] text-sm">Sarah Johnson</p>
            <div className="flex items-center gap-0.5 mt-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
          </div>
        </div>
        <p className="text-[#495057] text-xs leading-relaxed italic">
          &ldquo;FreshCart has transformed my shopping experience. The quality of the products is outstanding,
          and the delivery is always on time. Highly recommend!&rdquo;
        </p>
      </div>
    </div>
  );
}
