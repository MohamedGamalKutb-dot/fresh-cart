import { Metadata } from "next";
import RegisterForm from "./_components/RegisterForm";
import RegisterSidebar from "./_components/RegisterSidebar";

export const metadata: Metadata = {
  title: "Register - Fresh Cart",
  description:
    "Create your Fresh Cart account and enjoy premium quality groceries delivered fast to your door.",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <div className="container mx-auto px-4 max-w-7xl py-10">
        <div className="flex flex-col lg:flex-row items-stretch rounded-2xl overflow-hidden border border-[#E9ECEF] shadow-sm bg-white min-h-[700px]">

          {/* Left column — branding & social proof */}
          <RegisterSidebar />

          {/* Right column — registration form */}
          <div className="flex-1 flex items-center justify-start p-6 md:p-10 bg-white">
            <div className="w-full max-w-xl">
              <RegisterForm />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}