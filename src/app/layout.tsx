import type { Metadata } from "next";
import { Exo } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/shared/Footer/Footer";
import { WishlistProvider } from "@/context/WishlistContext";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "@/components/ui/sonner";

import NextAuthProvider from "@/components/NextAuth/NextAuthProvider";

const inter = Exo({ subsets: ["latin"], variable: "--font-exo", display: "swap", preload: true });

export const metadata: Metadata = {
  title: "Fresh Cart",
  description: "Fresh groceries delivered to your door.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("font-sans", inter.variable)}
    >
      <body suppressHydrationWarning className="antialiased flex flex-col min-h-screen">
        <NextAuthProvider>
            <CartProvider>
            <WishlistProvider>
                <Navbar />
                <main className="flex-1">
                {children}
                </main>
                <Footer/>
                <Toaster position="top-center" richColors />
            </WishlistProvider>
            </CartProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
