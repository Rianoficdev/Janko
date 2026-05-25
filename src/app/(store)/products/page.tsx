import type { Metadata } from "next";
import { StoreProductCard } from "@/components/store/store-product-card";
import { listProducts } from "@/services/products";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Produtos",
  description: "Catalogo premium JANKO de produtos tech e lifestyle moderno.",
};

export default async function ProductsPage() {
  const products = await listProducts();

  return (
    <div className="min-h-screen bg-[#050505] px-4 pb-24 pt-32 text-white sm:px-6">
      <section className="mx-auto max-w-7xl">
        <p className="text-center text-xs font-bold uppercase tracking-[0.45em] text-blue-300">Catalogo</p>
        <h1 className="mx-auto mt-5 max-w-4xl text-center text-5xl font-black tracking-tight sm:text-7xl">
          Tecnologia premium para rotina moderna.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-center leading-8 text-zinc-400">
          Produtos publicados diretamente do Supabase, organizados para lifestyle tech, produtividade e experiencia moderna.
        </p>

        {products.length === 0 ? (
          <div className="mt-14 grid min-h-80 place-items-center rounded-md border border-white/10 bg-[#0F0F10]/80 px-6 text-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-300">Catalogo vazio</p>
              <h2 className="mt-3 text-3xl font-black">Nenhum produto publicado.</h2>
              <p className="mt-3 text-zinc-400">Publique produtos no admin para eles aparecerem aqui.</p>
            </div>
          </div>
        ) : (
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <StoreProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
