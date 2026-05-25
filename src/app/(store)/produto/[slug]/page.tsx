"use client";

import { useParams } from "next/navigation";
import { RotateCcw, ShieldCheck, Star, Truck } from "lucide-react";
import { AddToCart } from "@/components/product/add-to-cart";
import { ProductCard } from "@/components/product/product-card";
import { ProductGallery } from "@/components/product/product-gallery";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useCatalogProduct, useRelatedProducts } from "@/hooks/use-catalog-products";
import { formatPrice } from "@/lib/utils";

export default function ProductPage() {
  const params = useParams<{ slug: string }>();
  const product = useCatalogProduct(params.slug);
  const related = useRelatedProducts(params.slug);

  if (!product) {
    return (
      <div className="grid min-h-screen place-items-center px-4 py-32 text-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.45em] text-amber-500">Produto</p>
          <h1 className="mt-4 text-4xl font-black text-white">Produto nao encontrado.</h1>
          <p className="mt-3 text-zinc-400">Esse item ainda nao existe no catalogo local da JANKO.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 pb-24 pt-28 sm:px-6">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.9fr]">
        <ProductGallery product={product} />

        <section className="lg:sticky lg:top-28 lg:self-start">
          <Badge>{product.category}</Badge>
          <h1 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-6xl">{product.name}</h1>
          <p className="mt-4 text-xl leading-8 text-zinc-300">{product.tagline}</p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.06] px-3 py-2 text-sm text-white">
              <Star className="h-4 w-4 fill-amber-300 text-amber-300" />
              {product.rating} · {product.reviewCount} avaliacoes
            </div>
            {product.compareAtPrice && (
              <span className="rounded-full bg-emerald-400/10 px-3 py-2 text-sm text-emerald-200">
                Economize {formatPrice(product.compareAtPrice - product.price)}
              </span>
            )}
          </div>

          <div className="mt-8 flex items-end gap-4">
            <p className="text-5xl font-black text-white">{formatPrice(product.price)}</p>
            {product.compareAtPrice && <p className="pb-2 text-xl text-zinc-500 line-through">{formatPrice(product.compareAtPrice)}</p>}
          </div>

          <Card className="mt-8 p-5">
            <AddToCart product={product} />
          </Card>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              [Truck, "Frete rapido"],
              [ShieldCheck, "Compra segura"],
              [RotateCcw, "7 dias troca"],
            ].map(([Icon, text]) => (
              <div key={text as string} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm text-zinc-300">
                <Icon className="mb-3 h-5 w-5 text-amber-300" />
                {text as string}
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-4">
            <h2 className="text-2xl font-bold text-white">Descricao premium</h2>
            <p className="leading-8 text-zinc-400">{product.description}</p>
            <div className="grid gap-2">
              {product.features.map((feature) => (
                <div key={feature} className="flex items-center gap-3 text-zinc-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <section className="mx-auto mt-24 max-w-7xl">
        <h2 className="text-3xl font-black text-white">Produtos relacionados</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {related.slice(0, 3).map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
