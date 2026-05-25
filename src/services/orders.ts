import { createSupabaseServerClient } from "@/lib/supabase-server";
import type { Order, OrderItem, OrderStatus } from "@/types/order";

export type CreateOrderInput = Omit<Order, "id" | "createdAt" | "updatedAt"> & {
  items: Array<Omit<OrderItem, "id" | "order_id" | "createdAt" | "updatedAt">>;
};

export async function createOrder(values: CreateOrderInput) {
  const supabase = await createSupabaseServerClient();
  const { items, ...order } = values;

  const { data: createdOrder, error: orderError } = await supabase
    .from("orders")
    .insert(order)
    .select("*")
    .single();

  if (orderError) throw orderError;

  const orderItems = items.map((item) => ({ ...item, order_id: createdOrder.id }));
  const { error: itemsError } = await supabase.from("order_items").insert(orderItems);

  if (itemsError) throw itemsError;
  return createdOrder as Order;
}

export async function getAdminOrders(status?: OrderStatus) {
  const supabase = await createSupabaseServerClient();
  let query = supabase.from("orders").select("*").order("createdAt", { ascending: false });

  if (status) query = query.eq("status", status);

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as Order[];
}

export async function updateOrderStatus(id: string, status: OrderStatus) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.from("orders").update({ status }).eq("id", id).select("*").single();

  if (error) throw error;
  return data as Order;
}
