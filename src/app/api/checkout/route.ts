import { createCheckoutSession } from "@/services/commerce";
import { preflightResponse, secureJson } from "@/lib/security";

const METHODS = ["POST", "OPTIONS"];

export async function OPTIONS(request: Request) {
  return preflightResponse(request, METHODS);
}

export async function POST(request: Request) {
  const session = await createCheckoutSession();

  return secureJson(request, {
    ...session,
    message: "Mock pronto para Mercado Pago preference, PIX e cartao.",
  }, METHODS);
}
