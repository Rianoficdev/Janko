"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { products as seedProducts } from "@/lib/products";
import type { Product } from "@/types/commerce";

export type ProductFormValues = {
  name: string;
  tagline: string;
  description: string;
  category: string;
  price: number;
  compareAtPrice?: number;
  stock: number;
  badge?: string;
  rating: number;
  image: string;
  gallery: string[];
  variants: string[];
  colors: string[];
  features: string[];
};

type ProductStore = {
  adminProducts: Product[];
  addProduct: (values: ProductFormValues) => Product;
  updateProduct: (id: string, values: Partial<ProductFormValues>) => void;
  deleteProduct: (id: string) => void;
  resetAdminProducts: () => void;
};

export function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function buildProduct(values: ProductFormValues, existing?: Product): Product {
  const now = Date.now();
  const slug = existing?.slug ?? slugify(values.name || `produto-${now}`);

  return {
    id: existing?.id ?? `admin-${now}`,
    slug,
    name: values.name,
    tagline: values.tagline || values.description.slice(0, 90),
    description: values.description,
    category: values.category,
    price: values.price,
    compareAtPrice: values.compareAtPrice,
    rating: values.rating,
    reviewCount: existing?.reviewCount ?? 0,
    image: values.image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=90",
    gallery: values.gallery.length ? values.gallery : [values.image].filter(Boolean),
    colors: values.colors.length ? values.colors : ["#facc15", "#111827"],
    variants: (values.variants.length ? values.variants : ["Padrao"]).map((variant) => ({
      name: "Opcao",
      value: variant,
      stock: values.stock,
    })),
    features: values.features.length ? values.features : ["Curadoria premium", "Design moderno", "Experiencia JANKO"],
    badge: values.badge || undefined,
  };
}

export const useProductStore = create<ProductStore>()(
  persist(
    (set) => ({
      adminProducts: [],
      addProduct: (values) => {
        const product = buildProduct(values);
        set((state) => ({ adminProducts: [product, ...state.adminProducts] }));
        return product;
      },
      updateProduct: (id, values) =>
        set((state) => ({
          adminProducts: state.adminProducts.map((product) => {
            if (product.id !== id) return product;

            return buildProduct(
              {
                name: values.name ?? product.name,
                tagline: values.tagline ?? product.tagline,
                description: values.description ?? product.description,
                category: values.category ?? product.category,
                price: values.price ?? product.price,
                compareAtPrice: values.compareAtPrice ?? product.compareAtPrice,
                stock: values.stock ?? product.variants[0]?.stock ?? 0,
                badge: values.badge ?? product.badge,
                rating: values.rating ?? product.rating,
                image: values.image ?? product.image,
                gallery: values.gallery ?? product.gallery,
                variants: values.variants ?? product.variants.map((variant) => variant.value),
                colors: values.colors ?? product.colors,
                features: values.features ?? product.features,
              },
              product,
            );
          }),
        })),
      deleteProduct: (id) =>
        set((state) => ({ adminProducts: state.adminProducts.filter((product) => product.id !== id) })),
      resetAdminProducts: () => set({ adminProducts: [] }),
    }),
    {
      name: "janko-admin-products",
      partialize: (state) => ({ adminProducts: state.adminProducts }),
    },
  ),
);

export function mergeProducts(adminProducts: Product[]) {
  const map = new Map<string, Product>();

  [...adminProducts, ...seedProducts].forEach((product) => {
    if (!map.has(product.slug)) map.set(product.slug, product);
  });

  return Array.from(map.values());
}
