"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Product } from "@/types/commerce";

type CartState = {
  items: CartItem[];
  isOpen: boolean;
  coupon: string;
  openCart: () => void;
  closeCart: () => void;
  setCoupon: (coupon: string) => void;
  addItem: (product: Product, options?: { quantity?: number; variant?: string; color?: string }) => void;
  removeItem: (productId: string, variant: string, color: string) => void;
  updateQuantity: (productId: string, variant: string, color: string, quantity: number) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      coupon: "",
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      setCoupon: (coupon) => set({ coupon }),
      addItem: (product, options) =>
        set((state) => {
          const variant = options?.variant ?? product.variants[0]?.value ?? "Padrao";
          const color = options?.color ?? product.colors[0] ?? "#fff";
          const quantity = options?.quantity ?? 1;
          const existing = state.items.find(
            (item) => item.product.id === product.id && item.variant === variant && item.color === color,
          );

          if (existing) {
            return {
              isOpen: true,
              items: state.items.map((item) =>
                item.product.id === product.id && item.variant === variant && item.color === color
                  ? { ...item, quantity: item.quantity + quantity }
                  : item,
              ),
            };
          }

          return {
            isOpen: true,
            items: [...state.items, { product, quantity, variant, color }],
          };
        }),
      removeItem: (productId, variant, color) =>
        set((state) => ({
          items: state.items.filter(
            (item) => !(item.product.id === productId && item.variant === variant && item.color === color),
          ),
        })),
      updateQuantity: (productId, variant, color, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId && item.variant === variant && item.color === color
              ? { ...item, quantity: Math.max(1, quantity) }
              : item,
          ),
        })),
      clearCart: () => set({ items: [], coupon: "" }),
    }),
    {
      name: "janko-cart",
      partialize: (state) => ({ items: state.items, coupon: state.coupon }),
    },
  ),
);

export function getCartSubtotal(items: CartItem[]) {
  return items.reduce((total, item) => total + item.product.price * item.quantity, 0);
}
