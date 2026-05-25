"use client";

import { useCatalogProducts } from "@/hooks/use-catalog-products";

export function CatalogCount({ category }: { category: string }) {
  const products = useCatalogProducts();
  const count = products.filter((product) => product.category.toLowerCase() === category.toLowerCase()).length;

  return <>{count || "Nova"} opcoes</>;
}
