"use client"

import * as React from "react"
import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Input } from "@/components/ui/input"
import { Headphones, Heart, ShoppingCart, Search, ShoppingCartIcon, Loader2 } from "lucide-react"
import NavbarLine from "@/components/shared/NavbarLine/NavbarLine"
import NavbarUserActions from "@/components/shared/NavbarUserActions/NavbarUserActions";
import MobileNav from "./MobileNav";
import { useNavbarLogic } from "./Navbar.logic";
import { useSession } from "next-auth/react"

export default function Navbar() {
  const {
    scrolled,
    searchQuery,
    setSearchQuery,
    handleSearch,
    handleSearchKeyDown,
    navCategories,
    isLoading,
    wishlistCount,
    cartCount
  } = useNavbarLogic();
 
  return (
    <header className="w-full sticky top-0 z-50 bg-white shadow-sm">
      {/* Top bar — hides on scroll */}
      <div
        className={`hidden md:block overflow-hidden transition-all duration-300 ease-in-out ${
          scrolled ? "max-h-0 opacity-0" : "max-h-10 opacity-100"
        }`}
      >
        <NavbarLine />
      </div>

      {/* Main Navbar */}
      <nav className="w-full lg:container lg:mx-auto px-4 h-16 flex items-center gap-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 ">
          <ShoppingCartIcon size={30} className="text-[#16A34A]"/>
          <span className="font-bold text-xl text-[#212529] hidden sm:block">FreshCart</span>
        </Link>

        {/* Search Bar */}
        <div className="flex-1 relative hidden md:flex items-center">
          <Input
            type="search"
            placeholder="Search for products, brands and more..."
            className="rounded-full pr-11 bg-[#F8F9FA] border-[#E9ECEF] focus-visible:ring-[#16A34A] text-sm h-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearchKeyDown}
          />
          <button
            aria-label="Search"
            onClick={handleSearch}
            className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-[#16A34A] text-white hover:bg-[#15803D] transition-colors"
          >
            <Search size={15} />
          </button>
        </div>

        {/* Nav Links */}
        <NavigationMenu className="hidden md:flex" viewport={false}>
          <NavigationMenuList className="gap-0">

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/"
                  prefetch={true}
                  className="px-3 py-2 hover:bg-transparent text-sm font-medium text-[#212529] hover:text-[#16A34A] transition-colors"
                >
                  Home
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/shop"
                  prefetch={true}
                  className="px-3 py-2 text-sm hover:bg-transparent font-medium text-[#212529] hover:text-[#16A34A] transition-colors"
                >
                  Shop
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="px-3 py-2 text-sm font-medium text-[#212529] hover:text-[#16A34A] bg-transparent hover:bg-transparent data-[state=open]:bg-transparent data-[state=open]:text-[#16A34A] transition-colors">
                Categories
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="w-56 py-2">
                   {isLoading ? (
                    <li className="px-4 py-2 flex items-center justify-center">
                       <Loader2 className="w-4 h-4 animate-spin text-[#16A34A]" />
                    </li>
                  ) : (
                    navCategories.map((cat) => (
                      <li key={cat.label}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={cat.href}
                            className="block px-4 py-2 text-sm text-[#212529] hover:bg-green-50 hover:text-[#16A34A] font-medium transition-colors"
                          >
                            {cat.label}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))
                  )}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/brands"
                  prefetch={true}
                  className="px-3 py-2 text-sm font-medium hover:bg-transparent text-[#212529] hover:text-[#16A34A] transition-colors"
                >
                  Brands
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

          </NavigationMenuList>
        </NavigationMenu>

        {/* Right Actions */}
        <div className="ml-auto md:ml-0 flex items-center gap-1">

          {/* Support */}
          <Link
            href="/contact"
            prefetch={false}
            className="hidden md:flex items-center gap-2 px-3 py-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-9 h-9 flex items-center justify-center rounded-full bg-green-100 text-[#16A34A]">
              <Headphones size={18} />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-xs text-[#6C757D]">Support</span>
              <span className="text-sm font-semibold text-[#212529]">24/7 Help</span>
            </div>
          </Link>

          {/* Wishlist */}
          <Link
            href="/wishlist"
            prefetch={true}
            aria-label="Wishlist"
            className="relative w-9 h-9 flex items-center justify-center rounded-full text-[#6C757D] hover:bg-gray-100 hover:text-[#16A34A] transition-colors"
          >
            <Heart size={20} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#fb2d37] text-[10px] font-bold text-white">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link
            href="/cart"
            prefetch={true}
            aria-label="Cart"
            className="relative w-9 h-9 flex items-center justify-center rounded-full text-[#6C757D] hover:bg-gray-100 hover:text-[#16A34A] transition-colors"
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#16A34A] text-[10px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </Link>
          <div className=" ml-2">
            <NavbarUserActions variant="main" />
          </div>

          <div className="md:hidden ml-2">
            <MobileNav />
          </div>
        </div>
      </nav>
    </header>
  )
}
