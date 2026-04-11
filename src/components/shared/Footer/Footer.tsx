"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import logo from "@/assets/icon.svg"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import AppButton from "@/components/shared/AppButton/AppButton"
import {
  Truck,
  RefreshCcw,
  ShieldCheck,
  Headphones,
  Leaf,
  Star,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Smartphone,
} from "lucide-react"

// ─── Data ─────────────────────────────────────────────────────────────────────

const features = [
  { icon: <Truck size={22} />, title: "Free Shipping", sub: "On orders over 500 EGP" },
  { icon: <RefreshCcw size={22} />, title: "Easy Returns", sub: "14-day return policy" },
  { icon: <ShieldCheck size={22} />, title: "Secure Payment", sub: "100% secure checkout" },
  { icon: <Headphones size={22} />, title: "24/7 Support", sub: "Contact us anytime" },
]

const footerLinks = [
  {
    heading: "Shop",
    links: ["All Products", "New Arrivals", "Best Sellers", "Sale", "Brands"],
  },
  {
    heading: "Account",
    links: ["My Account", "Order History", "Wishlist", "Track Order", "Returns"],
  },
  {
    heading: "Support",
    links: ["Help Center", "Contact Us", "Live Chat", "FAQs", "Shipping Info"],
  },
  {
    heading: "Legal",
    links: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Accessibility"],
  },
]

const socialLinks = [
  { icon: <Facebook size={16} />, label: "Facebook" },
  { icon: <Twitter size={16} />, label: "Twitter" },
  { icon: <Instagram size={16} />, label: "Instagram" },
  { icon: <Youtube size={16} />, label: "YouTube" },
]

// ─── Component ────────────────────────────────────────────────────────────────

export default function Footer() {
 
  return (
    <footer>

      {/* ── Light Section ──────────────────────────────────────────────────── */}
      <div className="bg-[#F0F9F3]">
        {/* Features Bar */}
        <div className="border-t border-[#D1FAE5]">
          <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {features.map(({ icon, title, sub }) => (
                <div key={title} className="flex items-start gap-3">
                  <div className="text-[#16A34A] shrink-0 mt-0.5">{icon}</div>
                  <div>
                    <p className="text-sm font-bold text-[#212529]">{title}</p>
                    <p className="text-xs text-[#6C757D]">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Dark Section ───────────────────────────────────────────────────── */}
      <div className="bg-[#0B101B] text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

            {/* Brand + Contact */}
            <div className="lg:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <Image src={logo} alt="FreshCart" width={28} height={28} />
                <span className="font-bold text-lg text-white">FreshCart</span>
              </Link>
              <p className="text-sm text-gray-400 mb-5 leading-relaxed">
                Your go-to destination for fresh groceries and daily essentials, delivered fast.
              </p>
              <div className="flex flex-col gap-2 mb-5 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Phone size={13} className="text-[#16A34A]" />
                  <span>+1 (800) 123-4567</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={13} className="text-[#16A34A]" />
                  <span>support@freshcart.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={13} className="text-[#16A34A]" />
                  <span>New York, NY 10001</span>
                </div>
              </div>
              {/* Social icons */}
              <div className="flex gap-2">
                {socialLinks.map(({ icon, label }) => (
                  <button
                    key={label}
                    aria-label={label}
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-white/10 text-gray-400 hover:border-[#16A34A] hover:text-[#16A34A] transition-colors"
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {footerLinks.map(({ heading, links }) => (
              <div key={heading}>
                <h4 className="text-sm font-bold text-white mb-4 tracking-wide">{heading}</h4>
                <ul className="flex flex-col gap-2.5">
                  {links.map((link) => (
                    <li key={link}>
                      <Link
                        href="#"
                        className="text-sm text-gray-400 hover:text-[#16A34A] transition-colors"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} FreshCart. All rights reserved.
            </p>
            {/* Payment icons */}
            <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
              {["VISA", "MC", "PayPal"].map((p) => (
                <span
                  key={p}
                  className="px-2.5 py-1 rounded bg-white/10 text-gray-300 text-[11px]"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

    </footer>
  )
}
