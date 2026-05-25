import { notFound } from "next/navigation";
import { AdminHeader } from "@/components/admin/admin-header";
import { ProductForm } from "@/components/admin/product-form";
import { listCategories } from "@/services/categories";
import { getProductById } from "@/services/products";

export const dynamic = "force-dynamic";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [product, categories] = await Promise.all([getProductById(id), listCategories()]);

  if (!product) notFound();

  return (
    <div className="space-y-6">
      <AdminHeader
        eyebrow="Editar produto"
        title="Atualizar produto."
        description="Edite o produto diretamente na tabela products do Supabase."
      />
      <ProductForm mode="edit" product={product} categories={categories} />
    </div>
  );
}
