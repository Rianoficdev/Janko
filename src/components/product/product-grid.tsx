"use client";

import { ProductCard } from "@/components/product/product-card";
import { useCatalogProducts } from "@/hooks/use-catalog-products";

export function ProductGrid({ category, limit }: { category?: string; limit?: number }) {
  const products = useCatalogProducts();
  const filtered = category
    ? products.filter((product) => product.category.toLowerCase() === category.toLowerCase())
    : products;
  const visible = typeof limit === "number" ? filtered.slice(0, limit) : filtered;

  return (
    <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {visible.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
