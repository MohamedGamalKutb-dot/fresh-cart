import { Phone, Mail, Truck, Gift } from "lucide-react"
import NavbarUserActions from "@/components/shared/NavbarUserActions/NavbarUserActions"

export default function NavbarLine() {
  return (
    <div className="hidden md:flex w-full bg-[#F8F9FA] border-b border-[#E9ECEF]">
      <div className="w-full lg:container lg:mx-auto flex items-center justify-between px-4 h-11 text-xs text-[#6C757D]">

        {/* Left Side: Items with identical, responsive gaps */}
        <div className="flex items-center flex-1 justify-start gap-4 xl:gap-8 overflow-hidden mr-6">

          <div className="flex items-center gap-1.5 whitespace-nowrap">
            <Truck size={14} className="text-[#16A34A] shrink-0" />
            <span className="font-medium text-[#495057]">Free Shipping on Orders 500 EGP</span>
          </div>

          <div className="flex items-center gap-1.5 whitespace-nowrap">
            <Gift size={14} className="text-[#16A34A] shrink-0" />
            <span className="font-medium text-[#495057]">New Arrivals Daily</span>
          </div>

          <div className="flex items-center gap-1.5 hover:text-[#16A34A] transition-colors cursor-pointer whitespace-nowrap">
            <Phone size={13} className="shrink-0" />
            <span className="font-medium">+1 (800) 123-4567</span>
          </div>

          <div className="flex items-center gap-1.5 hover:text-[#16A34A] transition-colors cursor-pointer whitespace-nowrap">
            <Mail size={13} className="shrink-0" />
            <span className="font-medium">support@freshcart.com</span>
          </div>

        </div>

        {/* Right Side: Auth Actions */}
        <div className="flex items-center border-l border-[#E9ECEF] h-6 pl-4 xl:pl-6 shrink-0">
          <NavbarUserActions variant="topbar" />
        </div>

      </div>
    </div>
  )
}
