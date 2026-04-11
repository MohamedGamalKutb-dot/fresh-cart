import { Metadata } from "next";
import CartClient from "./_components/CartClient";

export const metadata: Metadata = {
  title: "Shopping Cart - Fresh Cart",
};

export default function CartPage() {
  return (
    <>
 

      <div className= "bg-[#F8F9FA] min-h-screen pb-16">
        <CartClient />
      </div>
    </>
  );
}