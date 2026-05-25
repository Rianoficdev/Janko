import { FolderTree, Plus } from "lucide-react";
import { AdminHeader } from "@/components/admin/admin-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { categories } from "@/lib/categories";

export default function AdminCategoriesPage() {
  return (
    <div className="space-y-6">
      <AdminHeader
        eyebrow="Categorias"
        title="Organizacao do catalogo."
        description="Gestao visual das categorias da JANKO. A gravacao real entra quando Supabase estiver conectado."
        action={
          <Button variant="premium">
            <Plus className="h-4 w-4" />
            Nova categoria
          </Button>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {categories.map((category) => (
          <Card key={category.slug} className="p-5">
            <FolderTree className="h-5 w-5 text-blue-300" />
            <h2 className="mt-5 text-xl font-bold text-white">{category.title}</h2>
            <p className="mt-3 text-sm leading-7 text-zinc-400">{category.description}</p>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">{category.slug}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
