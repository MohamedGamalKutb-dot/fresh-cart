import OrdersClient from "./_components/OrdersClient";

export const metadata = {
  title: "My Orders | FreshCart",
  description: "Track and manage your orders on FreshCart",
};

export default function OrdersPage() {
  return (
    <main>
      <OrdersClient />
    </main>
  );
}
