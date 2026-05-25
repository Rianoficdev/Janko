import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CatalogCount } from "@/components/product/catalog-count";
import { categories } from "@/lib/categories";

export const metadata: Metadata = {
  title: "Categorias",
  description: "Categorias de produtos JANKO para lifestyle tech premium.",
};

export default function CategoriesPage() {
  return (
    <div className="min-h-screen px-4 pb-24 pt-32 sm:px-6">
      <section className="mx-auto max-w-6xl">
        <p className="text-xs font-bold uppercase tracking-[0.45em] text-amber-500">Categorias</p>
        <h1 className="mt-5 max-w-4xl text-5xl font-black tracking-tight text-white sm:text-7xl">
          Escolha por estilo de uso.
        </h1>
        <p className="mt-5 max-w-2xl leading-8 text-zinc-400">
          Esta sera a tela principal de categorias da JANKO. Por enquanto, ela organiza a curadoria por tipo de produto
          para facilitar a proxima etapa de filtros e colecoes.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/categorias/${category.slug}`}
              className="group rounded-md border border-white/10 bg-white/[0.04] p-6 transition hover:-translate-y-1 hover:border-amber-300/40 hover:bg-amber-500/10"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xl font-semibold text-white">{category.title}</p>
                  <p className="mt-3 text-sm leading-6 text-zinc-400">{category.description}</p>
                </div>
                <ArrowRight className="h-5 w-5 shrink-0 text-amber-300 transition group-hover:translate-x-1" />
              </div>
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500">
                <CatalogCount category={category.title} />
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
