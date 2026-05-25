import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ProductPurchaseActions } from "@/components/store/product-purchase-actions";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import { listCategories } from "@/services/categories";
import { getProductBySlug } from "@/services/products";

export const dynamic = "force-dynamic";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product || product.status !== "published") {
    return { title: "Produto nao encontrado" };
  }

  return {
    title: product.seoTitle || product.title,
    description: product.seoDescription || product.description,
    openGraph: {
      title: product.seoTitle || product.title,
      description: product.seoDescription || product.description,
      images: product.images[0] ? [{ url: product.images[0] }] : undefined,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const [product, categories] = await Promise.all([getProductBySlug(slug), listCategories()]);

  if (!product || product.status !== "published") notFound();

  const category = categories.find((item) => item.id === product.category);
  const heroImage = product.images[0];

  return (
    <div className="min-h-screen bg-[#050505] px-4 pb-24 pt-28 text-white sm:px-6">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.9fr]">
        <section className="space-y-4">
          <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-white/10 bg-[#0F0F10]">
            {heroImage ? (
              <Image src={heroImage} alt={product.title} fill priority sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
            ) : (
              <div className="grid h-full place-items-center bg-[radial-gradient(circle_at_50%_35%,rgba(59,130,246,0.22),transparent_42%),#0F0F10] text-zinc-500">
                Sem imagem
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
          </div>

          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {product.images.slice(1, 5).map((image) => (
                <div key={image} className="relative aspect-square overflow-hidden rounded-md border border-white/10 bg-[#0F0F10]">
                  <Image src={image} alt="" fill sizes="160px" className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="lg:sticky lg:top-28 lg:self-start">
          <div className="flex flex-wrap gap-2">
            <Badge className="border-blue-300/30 bg-blue-500/15 text-blue-100">
              {product.type === "affiliate" ? "Afiliado" : "Dropshipping"}
            </Badge>
            {product.featured && <Badge>Destaque</Badge>}
            {category && <Badge>{category.name}</Badge>}
          </div>

          <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-6xl">{product.title}</h1>
          <p className="mt-5 leading-8 text-zinc-300">{product.description}</p>

          <div className="mt-8 flex items-end gap-4">
            <p className="text-5xl font-black">{formatPrice(product.price)}</p>
            {product.oldPrice && <p className="pb-2 text-xl text-zinc-500 line-through">{formatPrice(product.oldPrice)}</p>}
          </div>

          <Card className="mt-8 border-blue-400/15 bg-[#0F0F10]/80 p-5">
            <ProductPurchaseActions product={product} />
          </Card>

          <div className="mt-8 grid gap-4">
            <div>
              <h2 className="text-xl font-bold">Detalhes</h2>
              <div className="mt-4 grid gap-2 text-sm text-zinc-400">
                <p>Categoria: {category?.name ?? "Sem categoria"}</p>
                <p>Origem: {product.sourcePlatform}</p>
                {product.sku && <p>SKU: {product.sku}</p>}
              </div>
            </div>

            {product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs font-semibold text-zinc-300">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
