import React from "react";
import ForgetPasswordClient from "./_components/ForgetPasswordClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password | Fresh Cart",
  description: "Reset your Fresh Cart account password securely.",
};

export default function ForgetPasswordPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-10 md:py-20 animate-in fade-in duration-700">
      <ForgetPasswordClient />
    </div>
  );
}
