"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BarChart3, FolderTree, Import, LayoutDashboard, LogOut, Package, PlusCircle, ReceiptText } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { Button } from "@/components/ui/button";
import { createSupabaseBrowserClient } from "@/lib/supabase-client";
import { hasSupabaseEnv } from "@/lib/supabase";
import { cn } from "@/lib/utils";

const adminNav = [
  { href: "/admin/dashboard", label: "Dashboard", Icon: LayoutDashboard },
  { href: "/admin/products", label: "Produtos", Icon: Package },
  { href: "/admin/products/new", label: "Novo produto", Icon: PlusCircle },
  { href: "/admin/import", label: "Importador", Icon: Import },
  { href: "/admin/categories", label: "Categorias", Icon: FolderTree },
  { href: "/admin/orders", label: "Pedidos", Icon: ReceiptText },
  { href: "/admin/analytics", label: "Analytics", Icon: BarChart3 },
];

export function AdminLayoutShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [email, setEmail] = useState("Admin JANKO");
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage || !hasSupabaseEnv()) return;

    const supabase = createSupabaseBrowserClient();
    supabase.auth.getUser().then(({ data }) => {
      if (data.user?.email) setEmail(data.user.email);
    });
  }, [isLoginPage]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  async function handleLogout() {
    if (hasSupabaseEnv()) {
      const supabase = createSupabaseBrowserClient();
      await supabase.auth.signOut();
    }

    router.replace("/admin/login");
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(250,204,21,0.14),transparent_32%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.08),transparent_28%)]" />
      <div className="relative mx-auto grid min-h-screen max-w-[1500px] gap-6 px-4 py-4 lg:grid-cols-[280px_1fr]">
        <aside className="h-fit rounded-md border border-white/10 bg-white/[0.055] p-4 shadow-[0_24px_90px_rgba(0,0,0,0.45)] backdrop-blur-2xl lg:sticky lg:top-4">
          <div className="rounded-md border border-amber-300/20 bg-black/40 p-5">
            <BrandLogo />
            <p className="mt-4 text-xs uppercase tracking-[0.32em] text-amber-300">Private OS</p>
            <p className="mt-2 text-sm text-zinc-400">{email}</p>
          </div>
          <nav className="mt-5 grid gap-2">
            {adminNav.map(({ href, label, Icon }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-4 py-3 text-sm text-zinc-400 transition hover:bg-white/10 hover:text-white",
                  pathname === href && "bg-amber-500/15 text-amber-100",
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
          </nav>
          <Button
            variant="outline"
            className="mt-5 w-full"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            Sair do admin
          </Button>
        </aside>
        <main className="min-w-0 pb-10">{children}</main>
      </div>
    </div>
  );
}
