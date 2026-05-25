export type OrderStatus = "pending" | "paid" | "processing" | "shipped" | "delivered" | "cancelled" | "refunded";

export type PaymentStatus = "pending" | "approved" | "failed" | "refunded";

export type Order = {
  id: string;
  customer_id: string | null;
  customer_email: string;
  customer_name: string | null;
  status: OrderStatus;
  payment_status: PaymentStatus;
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  currency: string;
  payment_method: string | null;
  shipping_address: Record<string, unknown>;
  tracking_code: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
};

export type OrderItem = {
  id: string;
  order_id: string;
  product_id: string;
  title: string;
  sku: string | null;
  quantity: number;
  unit_price: number;
  total: number;
  product_snapshot: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
};
