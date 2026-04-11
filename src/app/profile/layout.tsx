import React from "react";
import HeroBanner from "@/components/shared/HeroBanner/HeroBanner";
import { UserCircle } from "lucide-react";
import ProfileSidebar from "./_components/ProfileSidebar";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "My Account" },
  ];

  return (
    <div className="bg-[#FBFCFD] min-h-screen pb-20">
      <HeroBanner
        title="My Account"
        subtitle="Manage your profile, addresses and orders"
        breadcrumbs={breadcrumbs}
        icon={<UserCircle size={36} />}
        bgClassName="bg-[#16A34A]"
        iconBgClassName="bg-[#15803D]"
      />

      <div className="w-full lg:container lg:mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <ProfileSidebar />

          {/* Page Content */}
          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
