export interface OrderItem {
  count: number;
  price: number;
  product: {
    id: string;
    title: string;
    imageCover: string;
  };
}

export interface Order {
  id: number;
  isDelivered: boolean;
  isPaid: boolean;
  totalOrderPrice: number;
  createdAt: string;
  cartItems: OrderItem[];
  shippingAddress?: {
    details?: string;
    phone?: string;
    city?: string;
  };
}
