"use client";

import { ExternalLink, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { registerClickAction } from "@/app/(store)/products/actions";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import type { Product as CommerceProduct } from "@/types/commerce";
import type { Product } from "@/types/product";

function toCartProduct(product: Product): CommerceProduct {
  return {
    id: product.id,
    slug: product.slug,
    name: product.title,
    tagline: product.description.slice(0, 96),
    description: product.description,
    category: product.category ?? "JANKO",
    price: product.price,
    compareAtPrice: product.oldPrice ?? undefined,
    rating: 5,
    reviewCount: 0,
    image: product.images[0] ?? "/brand/hero-banner.png",
    gallery: product.images.length ? product.images : ["/brand/hero-banner.png"],
    colors: ["#3B82F6", "#0F0F10"],
    variants: [{ name: "Padrao", value: product.sku ?? "Padrao", stock: product.stock }],
    features: product.tags.length ? product.tags : ["Curadoria JANKO"],
    badge: product.featured ? "Destaque" : undefined,
  };
}

export function ProductPurchaseActions({ product }: { product: Product }) {
  const { addItem, openCart } = useCart();
  const [loading, setLoading] = useState(false);

  async function handleAffiliateClick() {
    if (!product.affiliateUrl) {
      toast.error("Link de afiliado indisponivel.");
      return;
    }

    setLoading(true);
    try {
      await registerClickAction(product.id);
      window.open(product.affiliateUrl, "_blank", "noopener,noreferrer");
    } catch {
      window.open(product.affiliateUrl, "_blank", "noopener,noreferrer");
    } finally {
      setLoading(false);
    }
  }

  function handleDropshippingAdd() {
    addItem(toCartProduct(product), { quantity: 1 });
    openCart();
    toast.success(`${product.title} adicionado ao carrinho.`);
  }

  if (product.type === "affiliate") {
    return (
      <Button type="button" onClick={handleAffiliateClick} disabled={loading} className="w-full bg-blue-500 text-white shadow-[0_0_42px_rgba(59,130,246,0.28)] hover:bg-blue-400">
        <ExternalLink className="h-5 w-5" />
        {loading ? "Abrindo..." : "Comprar agora"}
      </Button>
    );
  }

  return (
    <Button type="button" onClick={handleDropshippingAdd} className="w-full bg-blue-500 text-white shadow-[0_0_42px_rgba(59,130,246,0.28)] hover:bg-blue-400">
      <ShoppingBag className="h-5 w-5" />
      Adicionar ao carrinho
    </Button>
  );
}
