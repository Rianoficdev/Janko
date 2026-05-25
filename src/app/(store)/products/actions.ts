"use server";

import { registerClick } from "@/services/analytics";

export async function registerClickAction(productId: string) {
  await registerClick(productId);
}
