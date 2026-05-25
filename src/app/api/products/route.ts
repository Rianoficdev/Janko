import { products } from "@/lib/products";
import { preflightResponse, secureJson } from "@/lib/security";

const METHODS = ["GET", "OPTIONS"];

export async function OPTIONS(request: Request) {
  return preflightResponse(request, METHODS);
}

export async function GET(request: Request) {
  return secureJson(request, {
    data: products,
    integrations: {
      database: "Supabase ready",
      storage: "Supabase Storage ready",
    },
  }, METHODS);
}
