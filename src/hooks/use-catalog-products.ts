"use client";

import { products as seedProducts } from "@/lib/products";
import { mergeProducts, useProductStore } from "@/store/product-store";

export function useCatalogProducts() {
  const adminProducts = useProductStore((state) => state.adminProducts);
  return mergeProducts(adminProducts);
}

export function useCatalogProduct(slug: string) {
  const products = useCatalogProducts();
  return products.find((product) => product.slug === slug);
}

export function useRelatedProducts(slug: string) {
  return useCatalogProducts().filter((product) => product.slug !== slug).slice(0, 3);
}

export function useSeedProducts() {
  return seedProducts;
}
