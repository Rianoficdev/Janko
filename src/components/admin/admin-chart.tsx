"use client";

import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useMounted } from "@/hooks/use-mounted";
import { adminChartData } from "@/components/admin/admin-data";

export function RevenueChart({ type = "area" }: { type?: "area" | "bar" }) {
  const mounted = useMounted();

  return (
    <Card className="p-5">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Performance</h2>
          <p className="text-sm text-zinc-500">Ultimos 7 dias</p>
        </div>
        <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs text-amber-200">Mock local</span>
      </div>
      <div className="h-72">
        {!mounted ? (
          <Skeleton className="h-full w-full" />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            {type === "area" ? (
              <AreaChart data={adminChartData}>
                <defs>
                  <linearGradient id="adminRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#facc15" stopOpacity={0.45} />
                    <stop offset="95%" stopColor="#facc15" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                <XAxis dataKey="day" stroke="#71717a" tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "#09090b", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, color: "white" }} />
                <Area type="monotone" dataKey="revenue" stroke="#facc15" fill="url(#adminRevenue)" strokeWidth={3} />
              </AreaChart>
            ) : (
              <BarChart data={adminChartData}>
                <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                <XAxis dataKey="day" stroke="#71717a" tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "#09090b", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, color: "white" }} />
                <Bar dataKey="orders" fill="#facc15" radius={[6, 6, 0, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  );
}
