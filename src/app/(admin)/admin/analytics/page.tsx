"use client";

import { BarChart3, MousePointerClick, TrendingUp, Users } from "lucide-react";
import { AdminHeader } from "@/components/admin/admin-header";
import { RevenueChart } from "@/components/admin/admin-chart";
import { Card } from "@/components/ui/card";

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6">
      <AdminHeader
        eyebrow="Analytics"
        title="Inteligencia comercial."
        description="Visao fake de performance para validar a experiencia antes de conectar banco, eventos e Mercado Pago."
      />

      <div className="grid gap-4 md:grid-cols-4">
        {[
          ["Conversao", "4.8%", "+0.9%", MousePointerClick],
          ["Sessões", "18.4k", "+22%", Users],
          ["Receita", "R$ 48.9k", "+18%", TrendingUp],
          ["ROAS", "6.2x", "+1.1", BarChart3],
        ].map(([label, value, delta, Icon]) => (
          <Card key={label as string} className="p-5">
            <Icon className="h-5 w-5 text-amber-300" />
            <p className="mt-5 text-sm text-zinc-400">{label as string}</p>
            <p className="mt-2 text-3xl font-black text-white">{value as string}</p>
            <p className="mt-2 text-sm text-emerald-300">{delta as string}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <RevenueChart />
        <RevenueChart type="bar" />
      </div>
    </div>
  );
}
