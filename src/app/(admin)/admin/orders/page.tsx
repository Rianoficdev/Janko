"use client";

import { useMemo, useState } from "react";
import { Filter, Search } from "lucide-react";
import { AdminHeader } from "@/components/admin/admin-header";
import { adminOrders } from "@/components/admin/admin-data";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/utils";

export default function AdminOrdersPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("Todos");
  const filtered = useMemo(
    () =>
      adminOrders.filter((order) => {
        const matchesQuery = [order.id, order.customer, order.channel].join(" ").toLowerCase().includes(query.toLowerCase());
        const matchesStatus = status === "Todos" || order.status === status;
        return matchesQuery && matchesStatus;
      }),
    [query, status],
  );

  return (
    <div className="space-y-6">
      <AdminHeader
        eyebrow="Pedidos"
        title="Gestao de pedidos."
        description="Tabela operacional mockada para acompanhar status, cliente, canal e total dos pedidos."
      />

      <Card className="overflow-hidden">
        <div className="flex flex-col justify-between gap-4 border-b border-white/10 p-5 md:flex-row md:items-center">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <Input placeholder="Buscar pedido ou cliente" className="pl-9" value={query} onChange={(event) => setQuery(event.target.value)} />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-amber-300" />
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              className="h-11 rounded-md border border-white/10 bg-zinc-950 px-4 text-sm text-white outline-none"
            >
              {["Todos", "Pago", "Pendente", "Enviado", "Cancelado"].map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="text-zinc-500">
              <tr>
                <th className="p-4">Pedido</th>
                <th className="p-4">Cliente</th>
                <th className="p-4">Status</th>
                <th className="p-4">Canal</th>
                <th className="p-4">Data</th>
                <th className="p-4 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((order) => (
                <tr key={order.id} className="border-t border-white/10 text-zinc-300">
                  <td className="p-4 font-semibold text-white">{order.id}</td>
                  <td className="p-4">{order.customer}</td>
                  <td className="p-4">
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs">{order.status}</span>
                  </td>
                  <td className="p-4">{order.channel}</td>
                  <td className="p-4">{order.date}</td>
                  <td className="p-4 text-right font-semibold text-white">{formatPrice(order.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
