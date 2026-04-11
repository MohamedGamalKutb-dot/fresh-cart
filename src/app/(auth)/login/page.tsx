import { Metadata } from "next";
import LoginForm from "./_components/LoginForm";
import LoginSidebar from "./_components/LoginSidebar";

export const metadata: Metadata = {
  title: "Login - Fresh Cart",
  description: "Sign in to continue shopping on Fresh Cart.",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#F0F2F5] flex items-center py-10">
      <div className="w-full lg:container lg:mx-auto px-4">
        <div className="flex flex-col md:flex-row items-stretch rounded-[32px] overflow-hidden border border-[#E9ECEF] shadow-2xl bg-white min-h-[650px] max-w-5xl mx-auto">

          {/* Left column — illustration & features */}
          <LoginSidebar />

          {/* Right column — login form */}
          <div className="flex-1 flex items-center justify-center p-8 md:p-12 bg-white">
            <div className="w-full max-w-sm">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}