import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { productTypeLabels } from "@/lib/product-labels";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types/product";

export function StoreProductCard({ product }: { product: Product }) {
  const image = product.images[0];

  return (
    <Card className="group overflow-hidden p-2.5 transition duration-500 hover:-translate-y-1 hover:border-blue-400/35 hover:shadow-[0_0_70px_rgba(59,130,246,0.14)]">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[5/3] overflow-hidden rounded-md bg-[#0F0F10]">
          {image ? (
            <Image
              src={image}
              alt={product.title}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="grid h-full place-items-center bg-[radial-gradient(circle_at_50%_35%,rgba(59,130,246,0.2),transparent_42%),#0F0F10] text-sm text-zinc-500">
              Sem imagem
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            <Badge className="border-blue-300/30 bg-blue-500/15 text-blue-100">
              {productTypeLabels[product.type]}
            </Badge>
            {product.featured && <Badge>Destaque</Badge>}
          </div>
        </div>
      </Link>

      <div className="space-y-3 p-2.5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Link href={`/products/${product.slug}`}>
              <h3 className="text-base font-semibold text-white">{product.title}</h3>
            </Link>
            <p className="mt-1 line-clamp-2 text-xs leading-5 text-zinc-400">{product.description}</p>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-white/10 px-2 py-1 text-xs text-white">
            <Star className="h-3 w-3 fill-blue-300 text-blue-300" />
            Tech
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-lg font-bold text-white">{formatPrice(product.price)}</p>
            {product.oldPrice && <p className="text-xs text-zinc-500 line-through">{formatPrice(product.oldPrice)}</p>}
          </div>
          <Link
            href={`/products/${product.slug}`}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-blue-500 px-4 text-sm font-semibold text-white transition hover:bg-blue-400"
          >
            Ver produto
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </Card>
  );
}
