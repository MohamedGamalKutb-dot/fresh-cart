import Image from "next/image";
import { Truck, Shield, Clock } from "lucide-react";
import cartIllustration from "@/assets/2e5810ff3e-e750761ebcd4ae5907db.png";

const FEATURES = [
  { icon: Truck, label: "Free Delivery" },
  { icon: Shield, label: "Secure Payment" },
  { icon: Clock, label: "24/7 Support" },
];

export default function LoginSidebar() {
  return (
    <div className="hidden md:flex flex-col w-full md:w-[45%] bg-white border-b md:border-b-0 md:border-r border-[#E9ECEF] overflow-hidden">
      {/* Illustration */}
      <div className="flex-1 relative min-h-[260px] md:min-h-0">
        <Image
          src={cartIllustration}
          alt="FreshCart grocery shopping cart illustration"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Text + feature badges */}
      <div className="p-8 md:p-10 bg-white">
        <h2 className="text-xl font-bold text-[#212529] leading-snug mb-2 text-center">
          FreshCart - Your One-Stop Shop for Fresh Products
        </h2>
        <p className="text-[#6C757D] text-sm leading-relaxed text-center mb-6">
          Join thousands of happy customers who trust FreshCart for their daily grocery needs
        </p>

        {/* Feature badges */}
        <div className="flex items-center justify-center gap-6">
          {FEATURES.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-1.5">
              <Icon className="size-4 text-[#0AAD0A] flex-shrink-0" />
              <span className="text-xs font-semibold text-[#212529]">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
