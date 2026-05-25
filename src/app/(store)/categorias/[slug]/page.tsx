import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/product/product-grid";
import { categories } from "@/lib/categories";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find((item) => item.slug === slug);

  if (!category) return {};

  return {
    title: category.title,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = categories.find((item) => item.slug === slug);

  if (!category) notFound();

  return (
    <div className="min-h-screen px-4 pb-24 pt-32 sm:px-6">
      <section className="mx-auto max-w-6xl">
        <p className="text-xs font-bold uppercase tracking-[0.45em] text-amber-500">Categoria</p>
        <h1 className="mt-5 text-5xl font-black text-white sm:text-7xl">{category.title}</h1>
        <p className="mt-5 max-w-2xl leading-8 text-zinc-400">{category.description}</p>

        <ProductGrid category={category.title} />
      </section>
    </div>
  );
}
