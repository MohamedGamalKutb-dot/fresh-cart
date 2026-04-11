import OrdersClient from "../orders/_components/OrdersClient";

export const metadata = {
  title: "My Orders | FreshCart",
  description: "Track and manage your orders on FreshCart",
};

export default function AllOrdersPage() {
  return (
    <main>
      <OrdersClient />
    </main>
  );
}
