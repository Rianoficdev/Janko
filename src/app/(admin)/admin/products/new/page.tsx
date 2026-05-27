import { AdminHeader } from "@/components/admin/admin-header";
import { ProductForm } from "@/components/admin/product-form";
import { listCategories } from "@/services/categories";

export const dynamic = "force-dynamic";

export default async function NewProductPage() {
  const categories = await listCategories();

  return (
    <div className="space-y-6">
      <AdminHeader
        eyebrow="Novo produto"
        title="Criar produto real."
        description="Formulario conectado ao Supabase com status, tipo de venda, SEO, imagens e categoria real."
      />
      <ProductForm mode="create" categories={categories} />
    </div>
  );
}
