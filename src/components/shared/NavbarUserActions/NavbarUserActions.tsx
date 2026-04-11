import { useSession, signOut } from "next-auth/react"
import { useEffect, useState } from "react"
import Link from "next/link"
import { 
  User, 
  LogOut, 
  UserPlus, 
  UserCircle, 
  Package, 
  Heart, 
  MapPin, 
  Settings,
  CircleUserRound
} from "lucide-react"
import { toast } from "sonner"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function NavbarUserActions({ variant = "topbar" }: { variant?: "topbar" | "main" }) {
  const { data: session, status } = useSession()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const isAuthenticated = status === "authenticated"
  const displayName = session?.user?.name || "Guest"

  async function handleSignOut() {
    await signOut({ callbackUrl: "/login" ,redirect: false})
    toast.success("Signed out successfully")
  }

  const UserMenu = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button 
          className="flex items-center justify-center hover:bg-gray-100 rounded-full p-1.5 transition-colors focus:outline-none group"
          aria-label="User menu"
        >
          <UserCircle size={28} className="text-[#6a7282] group-hover:text-[#16A34A] transition-colors" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 p-2 rounded-2xl shadow-xl border-[#E9ECEF] mt-2 mr-4 animate-in fade-in zoom-in duration-200">
        <DropdownMenuLabel className="p-3 mb-1">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#EEFDF5] flex items-center justify-center text-[#16A34A] shrink-0">
               <CircleUserRound size={28} strokeWidth={1.5} />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[17px] font-bold text-[#212529] truncate leading-tight">{displayName}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator className="bg-[#F8F9FA] h-px mb-1 mx-2" />
        
        <div className="flex flex-col gap-0.5">
          <Link href="/profile/addresses">
            <DropdownMenuItem className="flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-[#F8F9FA] focus:bg-[#F8F9FA] text-[#495057] focus:text-[#16A34A] group">
              <User size={18} className="text-[#ADB5BD] group-focus:text-[#16A34A]" />
              <span className="font-semibold text-[15px]">My Profile</span>
            </DropdownMenuItem>
          </Link>
          
          <Link href="/allorders">
            <DropdownMenuItem className="flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-[#F8F9FA] focus:bg-[#F8F9FA] text-[#495057] focus:text-[#16A34A] group">
              <Package size={18} className="text-[#ADB5BD] group-focus:text-[#16A34A]" />
              <span className="font-semibold text-[15px]">My Orders</span>
            </DropdownMenuItem>
          </Link>
          
          <Link href="/wishlist">
            <DropdownMenuItem className="flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-[#F8F9FA] focus:bg-[#F8F9FA] text-[#495057] focus:text-[#16A34A] group">
              <Heart size={18} className="text-[#ADB5BD] group-focus:text-[#16A34A]" />
              <span className="font-semibold text-[15px]">My Wishlist</span>
            </DropdownMenuItem>
          </Link>
          
          <Link href="/profile/addresses">
            <DropdownMenuItem className="flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-[#F8F9FA] focus:bg-[#F8F9FA] text-[#495057] focus:text-[#16A34A] group">
              <MapPin size={18} className="text-[#ADB5BD] group-focus:text-[#16A34A]" />
              <span className="font-semibold text-[15px]">Addresses</span>
            </DropdownMenuItem>
          </Link>
          
          <Link href="/profile/settings">
            <DropdownMenuItem className="flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-[#F8F9FA] focus:bg-[#F8F9FA] text-[#495057] focus:text-[#16A34A] group">
              <Settings size={18} className="text-[#ADB5BD] group-focus:text-[#16A34A]" />
              <span className="font-semibold text-[15px]">Settings</span>
            </DropdownMenuItem>
          </Link>
        </div>
        
        <DropdownMenuSeparator className="bg-[#F8F9FA] h-px my-1 mx-2" />
        
        <DropdownMenuItem 
          onClick={handleSignOut}
          className="flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-[#FFF5F5] focus:bg-[#FFF5F5] text-[#FA5252] focus:text-[#E03131] group"
        >
          <LogOut size={18} />
          <span className="font-bold text-[15px]">LogOut</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  if (variant === "main") {
    if (!isMounted || !isAuthenticated) {
      return (
        <Link 
          href="/login" 
          className="hidden md:flex items-center justify-center bg-[#16A34A] text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-[#15803D] shadow-sm shadow-[#16A34A]/20 transition-all gap-2"
        >
          <User size={16} />
          Sign In
        </Link>
      )
    }

    return (
      <div className="hidden md:flex items-center">
        <UserMenu />
      </div>
    )
  }

  // default variant: topbar
  if (!isMounted || !isAuthenticated) {
    return (
      <div className="flex items-center gap-3 text-xs">
        <Link href="/login" className="hover:text-[#16A34A] transition-colors">
          <div className="flex items-center justify-center gap-1.5">
            <User size={13} /> 
            <span className="font-medium">Sign In</span>
          </div>
        </Link>
        <span className="text-[#E9ECEF]">|</span>
        <Link href="/register" className="hover:text-[#16A34A] transition-colors">
          <div className="flex items-center justify-center gap-1.5">
            <UserPlus size={13} /> 
            <span className="font-medium">Sign Up</span>
          </div>
        </Link>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-3">
      <Link href="/profile/addresses" className="flex items-center gap-1.5 text-xs text-[#6C757D] hover:text-[#16A34A] transition-colors">
        <User size={13} />
        <span className="font-medium">{displayName}</span>
      </Link>
      <span className="text-[#E9ECEF]">|</span>
      <button
        className="flex items-center gap-1 text-xs text-[#6C757D] hover:text-[#FB2D37] transition-colors"
        onClick={handleSignOut}
        aria-label="Sign out"
      >
        <LogOut size={13} />
        <span>logOut</span>
      </button>
    </div>
  )
}
