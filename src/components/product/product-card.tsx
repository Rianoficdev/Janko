import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { AddToCart } from "@/components/product/add-to-cart";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types/commerce";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="group overflow-hidden p-2.5 transition duration-500 hover:-translate-y-1 hover:border-amber-500/35 hover:shadow-[0_0_70px_rgba(250,204,21,0.14)]">
      <Link href={`/products/${product.slug}`} prefetch className="block">
        <div className="relative aspect-[5/3] overflow-hidden rounded bg-zinc-900">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          {product.badge && <Badge className="absolute left-4 top-4">{product.badge}</Badge>}
        </div>
      </Link>
      <div className="space-y-3 p-2.5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Link href={`/products/${product.slug}`} prefetch>
              <h3 className="text-base font-semibold text-white">{product.name}</h3>
            </Link>
            <p className="mt-1 line-clamp-2 text-xs leading-5 text-zinc-400">{product.tagline}</p>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-white/10 px-2 py-1 text-xs text-white">
            <Star className="h-3 w-3 fill-amber-300 text-amber-300" />
            {product.rating}
          </div>
        </div>
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-lg font-bold text-white">{formatPrice(product.price)}</p>
            {product.compareAtPrice && (
              <p className="text-xs text-zinc-500 line-through">{formatPrice(product.compareAtPrice)}</p>
            )}
          </div>
          <div className="w-36 max-w-[54%]">
            <AddToCart product={product} compact />
          </div>
        </div>
      </div>
    </Card>
  );
}
