"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, Settings, User, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function ProfileSidebar() {
  const pathname = usePathname();
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    const savedName = localStorage.getItem("userName");
    if (savedName) setUserName(savedName);
  }, []);

  const menuItems = [
    {
      title: "My Addresses",
      href: "/profile/addresses",
      icon: MapPin,
    },
    {
      title: "Settings",
      href: "/profile/settings",
      icon: Settings,
    },
  ];

  return (
    <aside className="w-full md:w-80 shrink-0">
      <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24 shadow-sm">
        {/* User Info */}
        <div className="flex items-center gap-4  pb-8 border-b border-gray-50">
           <h2 className="text-xl font-bold text-gray-900">  My Account</h2>
        </div>

        {/* Navigation */}
        <div className="space-y-1">  
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center justify-between w-full px-4 py-3.5 rounded-xl transition-all duration-200 group relative overflow-hidden",
                  isActive
                    ? "bg-green-100/50 text-green-700 font-bold"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                {isActive && (
                  <div className="absolute left-0 top-0 w-1 h-full bg-green-600" />
                )}
                <div className="flex items-center gap-3">
                  <item.icon
                    size={20}
                    className={cn(
                      "transition-colors",
                      isActive ? "text-green-700" : "text-gray-400 group-hover:text-gray-900"
                    )}
                  />
                  <span>{item.title}</span>
                </div>
                {isActive && <ChevronRight size={18} className="text-green-700" />}
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
