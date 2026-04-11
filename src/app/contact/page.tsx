import { Metadata } from "next";
import HeroBanner from "@/components/shared/HeroBanner/HeroBanner";
import ContactForm from "./_components/ContactForm";
import ContactSidebar from "./_components/ContactSidebar";
import { Headphones } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us - Fresh Cart",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-12 flex flex-col">
      {/* Banner */}
      <HeroBanner
        title="Contact Us"
        subtitle="We'd love to hear from you. Get in touch with our team."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact Us" },
        ]}
        icon={<Headphones size={36} strokeWidth={2} className="text-[#16A34A]" />}
        bgClassName="bg-[#16A34A] border-b-0"
        iconBgClassName="bg-[#DEF5E5]"
        iconColorClassName=""
        titleClassName="text-white"
        subtitleClassName="text-white/90"
        breadcrumbClassName="text-white/70"
        breadcrumbActiveClassName="text-white"
      />

      <div className="container mx-auto px-4 max-w-7xl pt-12 md:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left column — contact details, social, help CTA */}
          <ContactSidebar />

          {/* Right column — contact form */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
