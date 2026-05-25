import { Search } from "lucide-react";
import { StoreProductCard } from "@/components/store/store-product-card";
import { Input } from "@/components/ui/input";
import { searchProducts } from "@/services/products";

export const dynamic = "force-dynamic";

type SearchPageProps = {
  searchParams: Promise<{ q?: string }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const q = params.q?.trim() ?? "";
  const products = q ? await searchProducts(q) : [];

  return (
    <div className="min-h-screen bg-[#050505] px-4 pb-24 pt-32 text-white sm:px-6">
      <section className="mx-auto max-w-7xl">
        <p className="text-center text-xs font-bold uppercase tracking-[0.45em] text-blue-300">Busca</p>
        <h1 className="mx-auto mt-5 max-w-3xl text-center text-5xl font-black tracking-tight sm:text-7xl">
          Encontre seu essencial tech.
        </h1>

        <form action="/search" className="relative mx-auto mt-10 max-w-2xl">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />
          <Input
            name="q"
            defaultValue={q}
            placeholder="Buscar por titulo, descricao ou tag"
            className="h-14 border-blue-400/20 pl-12 text-base focus:border-blue-400/70 focus:ring-blue-500/10"
          />
        </form>

        {!q ? (
          <div className="mt-14 grid min-h-64 place-items-center rounded-md border border-white/10 bg-[#0F0F10]/80 px-6 text-center">
            <p className="text-zinc-400">Digite uma busca para encontrar produtos publicados.</p>
          </div>
        ) : products.length === 0 ? (
          <div className="mt-14 grid min-h-64 place-items-center rounded-md border border-white/10 bg-[#0F0F10]/80 px-6 text-center">
            <p className="text-xl font-semibold text-white">Nenhum produto encontrado para {q}</p>
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
