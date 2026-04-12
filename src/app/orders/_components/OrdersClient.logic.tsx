"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Order } from "../orders.interface";
import { getUserOrders } from "../orders.services";

export function useOrdersLogic() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedOrders, setExpandedOrders] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    if (status === "loading") return;

    const fetchOrders = async () => {
      try {
        const userId = (session?.user as any)?.id;
        if (!userId) return;

        const data = await getUserOrders(userId);

        const sortedOrders = (data || []).sort((a: Order, b: Order) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setOrders(sortedOrders);

        if (sortedOrders.length > 0) {
          setExpandedOrders({ [sortedOrders[0].id]: true });
        }
      } catch (err: any) {
        setError(err.message || "Error fetching orders");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [router, status, session]);

  const toggleOrder = (orderId: number) => {
    setExpandedOrders(prev => ({
      ...prev,
      [orderId]: !prev[orderId]
    }));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return {
    orders,
    isLoading,
    error,
    expandedOrders,
    toggleOrder,
    formatDate
  };
}
