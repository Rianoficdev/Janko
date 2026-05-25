"use client";

import Link from "next/link";
import { ArrowUpRight, Package, ReceiptText, ShoppingBag, Sparkles } from "lucide-react";
import { AdminHeader } from "@/components/admin/admin-header";
import { RevenueChart } from "@/components/admin/admin-chart";
import { adminOrders } from "@/components/admin/admin-data";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCatalogProducts } from "@/hooks/use-catalog-products";
import { formatPrice } from "@/lib/utils";

export default function AdminDashboardPage() {
  const products = useCatalogProducts();

  return (
    <div className="space-y-6">
      <AdminHeader
        eyebrow="Admin privado"
        title="Operacao JANKO em tempo real."
        description="Painel premium mockado para acompanhar catalogo, pedidos, vendas e os proximos passos da loja."
        action={
          <Button asChild variant="premium">
            <Link href="/admin/products/new">
              Novo produto <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        }
      />

      <div className="grid gap-4 md:grid-cols-4">
        {[
          ["Receita", "R$ 48.920", "+18%", ShoppingBag],
          ["Pedidos", String(adminOrders.length), "+11%", ReceiptText],
          ["Produtos", String(products.length), "catalogo", Package],
          ["Experiencia", "4.8/5", "+0.7", Sparkles],
        ].map(([label, value, delta, Icon]) => (
          <Card key={label as string} className="p-5">
            <Icon className="h-5 w-5 text-amber-300" />
            <p className="mt-5 text-sm text-zinc-400">{label as string}</p>
            <p className="mt-2 text-3xl font-black text-white">{value as string}</p>
            <p className="mt-2 text-sm text-emerald-300">{delta as string}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_0.8fr]">
        <RevenueChart />
        <Card className="overflow-hidden">
          <div className="border-b border-white/10 p-5">
            <h2 className="text-xl font-bold text-white">Ultimos pedidos</h2>
            <p className="text-sm text-zinc-500">Resumo operacional mockado</p>
          </div>
          <div className="divide-y divide-white/10">
            {adminOrders.slice(0, 4).map((order) => (
              <div key={order.id} className="flex items-center justify-between gap-4 p-5">
                <div>
                  <p className="font-semibold text-white">{order.id}</p>
                  <p className="text-sm text-zinc-500">{order.customer}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-white">{formatPrice(order.total)}</p>
                  <p className="text-xs text-amber-200">{order.status}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
