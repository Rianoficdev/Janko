import Link from "next/link";
import { Edit3, Plus } from "lucide-react";
import { AdminHeader } from "@/components/admin/admin-header";
import { DeleteProductButton } from "@/components/admin/delete-product-button";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import { listProductsAdmin } from "@/services/products";

export const dynamic = "force-dynamic";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(value));
}

export default async function AdminProductsPage() {
  const products = await listProductsAdmin();

  return (
    <div className="space-y-6">
      <AdminHeader
        eyebrow="Catalogo real"
        title="Produtos da loja."
        description="Produtos carregados diretamente da tabela products no Supabase."
        action={
          <Button asChild className="bg-blue-500 text-white shadow-[0_0_42px_rgba(59,130,246,0.28)] hover:bg-blue-400">
            <Link href="/admin/products/new">
              <Plus className="h-4 w-4" />
              Novo produto
            </Link>
          </Button>
        }
      />

      <Card className="overflow-hidden border-blue-400/15 bg-[#0F0F10]/80">
        <div className="border-b border-white/10 p-5">
          <h2 className="text-xl font-bold text-white">Tabela de produtos</h2>
          <p className="mt-1 text-sm text-zinc-400">Drafts, publicados e arquivados em um unico painel.</p>
        </div>

        {products.length === 0 ? (
          <div className="grid min-h-72 place-items-center px-6 py-14 text-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-300">Sem produtos</p>
              <h3 className="mt-3 text-2xl font-black text-white">Nenhum produto cadastrado ainda.</h3>
              <p className="mt-3 text-zinc-400">Crie o primeiro item para iniciar a curadoria JANKO.</p>
              <Button asChild className="mt-6 bg-blue-500 text-white hover:bg-blue-400">
                <Link href="/admin/products/new">
                  <Plus className="h-4 w-4" />
                  Novo produto
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] text-left text-sm">
              <thead className="text-zinc-500">
                <tr>
                  <th className="p-4">Titulo</th>
                  <th className="p-4">Tipo</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Preco</th>
                  <th className="p-4">Featured</th>
                  <th className="p-4">Criado em</th>
                  <th className="p-4 text-right">Acoes</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-t border-white/10 text-zinc-300">
                    <td className="p-4">
                      <div>
                        <p className="font-semibold text-white">{product.title}</p>
                        <p className="text-xs text-zinc-500">{product.slug}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="rounded-full border border-blue-300/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-100">
                        {product.type}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs font-semibold text-zinc-200">
                        {product.status}
                      </span>
                    </td>
                    <td className="p-4">{formatPrice(product.price)}</td>
                    <td className="p-4">{product.featured ? "Sim" : "Nao"}</td>
                    <td className="p-4">{formatDate(product.createdAt)}</td>
                    <td className="p-4">
                      <div className="flex justify-end gap-2">
                        <Button asChild variant="outline" size="sm">
                          <Link href={`/admin/products/${product.id}/edit`}>
                            <Edit3 className="h-4 w-4" />
                            Editar
                          </Link>
                        </Button>
                        <DeleteProductButton id={product.id} title={product.title} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
