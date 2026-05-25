"use client";

import { Toaster } from "sonner";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { RoutePrefetcher } from "@/components/route-prefetcher";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <RoutePrefetcher />
      <CartDrawer />
      <Toaster theme="dark" richColors position="top-right" />
    </>
  );
}
