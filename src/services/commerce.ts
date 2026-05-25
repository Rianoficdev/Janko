import { products } from "@/lib/products";

export async function getProducts() {
  return products;
}

export async function createCheckoutSession() {
  return {
    provider: "mercado-pago",
    status: "mock",
    redirectUrl: "/checkout?status=approved",
  };
}

export const integrationReadiness = {
  supabase: ["auth", "products", "orders", "storage"],
  mercadoPago: ["preference", "pix", "credit_card", "webhooks"],
  apiRoutes: ["/api/products", "/api/checkout"],
};
