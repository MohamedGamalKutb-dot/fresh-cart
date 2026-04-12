"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { createCashOrderFromCartV2, createCheckoutSession } from "../checkout.services";
import { getUserOrders } from "@/app/orders/orders.services";
import { toast } from "sonner";

export function useCheckoutLogic() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { cart, guestCart, isMounted, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "card">("cash");
  const [addressMode, setAddressMode] = useState<"saved" | "new">("new");
  const [lastAddress, setLastAddress] = useState({ city: "", details: "", phone: "" });
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  // Controlled form state
  const [addressData, setAddressData] = useState({
    city: "",
    details: "",
    phone: ""
  });

  // Validation errors state
  const [errors, setErrors] = useState({
    city: false,
    details: false,
    phone: false
  });

  // Authenticated state is required for checkout
  const isAuth = status === "authenticated";

  useEffect(() => {
    if (isMounted) {
      if (status === "unauthenticated") {
        router.push("/login");
        return;
      }

      if (status === "loading") return;

      const token = (session as any)?.accessToken;
      if (!token) return;

      // Fetch last order to get real user address
      const fetchLastOrder = async () => {
        try {
          const userId = (session?.user as any)?.id;
          if (!userId) return;
          const orders = await getUserOrders(userId);

          if (orders && orders.length > 0) {
            const latest: any = orders.sort((a: any, b: any) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            )[0];

            if (latest.shippingAddress) {
              setLastAddress({
                city: latest.shippingAddress.city || "",
                details: latest.shippingAddress.details || "",
                phone: latest.shippingAddress.phone || ""
              });
            }
          }
        } catch (error) {
          console.error("Failed to fetch last address:", error);
        }
      };

      fetchLastOrder();
    }
  }, [isMounted, router, status, session]);

  // Handle switching between saved and new address
  const toggleAddressMode = (mode: "saved" | "new") => {
    setErrors({ city: false, details: false, phone: false });
    if (mode === "saved") {
      setAddressData(lastAddress);
      setAddressMode("saved");
    } else {
      setAddressData({ city: "", details: "", phone: "" });
      setAddressMode("new");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setAddressData(prev => ({ ...prev, [id]: value }));
    setErrors(prev => ({ ...prev, [id]: false }));
    if (addressMode === "saved") setAddressMode("new");
  };

  const items = cart ? cart.products : guestCart;
  const itemCount = items.reduce((acc, item) => acc + (item.count || 0), 0);
  const totalPrice = cart
    ? cart.totalCartPrice
    : guestCart.reduce((total, item) => total + (item.price || 0) * (item.count || 0), 0);

  const handlePlaceOrder = async () => {
    if (!cart?._id) {
      toast.error("No active cart found!");
      return;
    }

    // Validate fields
    const newErrors = {
      city: !addressData.city.trim(),
      details: !addressData.details.trim(),
      phone: !addressData.phone.trim()
    };

    setErrors(newErrors);

    if (newErrors.city || newErrors.details || newErrors.phone) {
      toast.error("Please fill in all required address fields", {
        description: "Red highlighted fields are missing information."
      });
      return;
    }

    setIsPlacingOrder(true);
    const toastId = toast.loading("Processing your order...");

    try {
      const token = (session as any)?.accessToken;
      if (!token) {
        toast.dismiss(toastId);
        router.push("/login");
        return;
      }

      if (paymentMethod === "cash") {
        await createCashOrderFromCartV2(cart._id, addressData, token);
        await clearCart();
        toast.success("Order placed successfully!", { id: toastId });
        router.push("/allorders");
      } else if (paymentMethod === "card") {
        const returnUrl = `${window.location.origin}/allorders`;
        const res = await createCheckoutSession(cart._id, addressData, token, returnUrl);
        toast.dismiss(toastId);
        if (res.status === "success" && res.session?.url) {
          window.location.href = res.session.url;
        } else {
          throw new Error("Invalid session data returned from server");
        }
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "An error occurred during checkout", { id: toastId });
      setIsPlacingOrder(false);
    }
  };

  return {
    router,
    cart,
    guestCart,
    isMounted,
    isAuth,
    paymentMethod,
    setPaymentMethod,
    addressMode,
    toggleAddressMode,
    addressData,
    lastAddress,
    handleInputChange,
    isPlacingOrder,
    itemCount,
    totalPrice,
    items,
    handlePlaceOrder,
    errors
  };
}
