"use client";

import { getCartSubtotal, useCartStore } from "@/store/cart-store";

export function useCart() {
  return useCartStore();
}

export { getCartSubtotal };
