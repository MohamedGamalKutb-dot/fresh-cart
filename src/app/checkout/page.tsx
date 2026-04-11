import { Metadata } from "next";
import CheckoutClient from "./_components/CheckoutClient";

export const metadata: Metadata = {
  title: "Checkout - Fresh Cart",
  description: "Complete your order securely on Fresh Cart.",
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}
