import { Metadata } from "next";
import WishlistClient from "./_components/WishlistClient";

export const metadata: Metadata = {
  title: "My Wishlist - Fresh Cart",
};

export default function WishlistPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-0 flex flex-col">
      <WishlistClient />
    </div>
  );
}
