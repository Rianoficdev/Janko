"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const routesToPrefetch = [
  "/",
  "/carrinho",
  "/categorias",
  "/checkout",
  "/login",
  "/produto/aura-watch-pro",
  "/produto/sonic-pods-max",
  "/produto/nova-pack-carbon",
  "/produto/luma-lamp-mini",
  "/produto/halo-charge-station",
  "/produto/pulse-ring-air",
  "/produto/arc-desk-pad",
  "/produto/nova-cam-360",
];

export function RoutePrefetcher() {
  const router = useRouter();

  useEffect(() => {
    function prefetchRoutes() {
      routesToPrefetch.forEach((route) => router.prefetch(route));
    }

    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(prefetchRoutes, { timeout: 1800 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timeoutId = globalThis.setTimeout(prefetchRoutes, 600);
    return () => globalThis.clearTimeout(timeoutId);
  }, [router]);

  return null;
}
