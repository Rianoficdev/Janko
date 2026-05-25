"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronDown, Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import { useState } from "react";
import { BrandLogo } from "@/components/brand-logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { categories } from "@/lib/categories";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Produtos" },
  { href: "/checkout", label: "Checkout" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openCart, items } = useCartStore();
  const count = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <motion.header
      initial={false}
      animate={{ y: 0, opacity: 1 }}
      className="fixed left-0 right-0 top-0 z-40 border-b border-white/10 bg-black/45 backdrop-blur-2xl"
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" prefetch className="flex items-center gap-3">
          <BrandLogo size="sm" />
        </Link>

        <div className="hidden items-center gap-1 rounded-md border border-white/10 bg-white/[0.04] p-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              prefetch
              className={cn(
                "rounded px-4 py-2 text-sm text-zinc-400 transition hover:text-white",
                pathname === item.href && "bg-white/10 text-white",
              )}
            >
              {item.label}
            </Link>
          ))}
          <div className="group relative">
            <Link
              href="/categorias"
              prefetch
              className={cn(
                "flex items-center gap-1 rounded px-4 py-2 text-sm text-zinc-400 transition hover:text-white",
                pathname.startsWith("/categorias") && "bg-white/10 text-white",
              )}
            >
              Categorias
              <ChevronDown className="h-3.5 w-3.5 transition group-hover:rotate-180" />
            </Link>
            <div className="pointer-events-none absolute left-1/2 top-full z-50 w-[520px] -translate-x-1/2 translate-y-4 opacity-0 transition duration-200 group-hover:pointer-events-auto group-hover:translate-y-2 group-hover:opacity-100">
              <div className="rounded-md border border-white/10 bg-black/90 p-3 shadow-[0_28px_90px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((category) => (
                    <Link
                      key={category.slug}
                      href={`/categorias/${category.slug}`}
                      prefetch
                      className="rounded p-3 transition hover:bg-amber-500/10"
                    >
                      <p className="text-sm font-semibold text-white">{category.title}</p>
                      <p className="mt-1 line-clamp-2 text-xs leading-5 text-zinc-500">{category.description}</p>
                    </Link>
                  ))}
                </div>
                <Link
                  href="/categorias"
                  prefetch
                  className="mt-2 flex items-center justify-between rounded border border-amber-300/20 bg-amber-500/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-amber-200 transition hover:bg-amber-500/15"
                >
                  Ver todas categorias
                  <ChevronDown className="-rotate-90 h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild variant="ghost" size="icon" aria-label="Buscar produtos">
            <Link href="/search" prefetch>
              <Search className="h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="ghost" size="icon" aria-label="Login">
            <Link href="/login" prefetch>
              <UserRound className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="outline" size="icon" onClick={openCart} aria-label="Carrinho" className="relative">
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-amber-500 px-1 text-[10px] font-bold text-white">
                {count}
              </span>
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen((value) => !value)}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-t border-white/10 bg-black/95 px-4 py-4 md:hidden"
        >
          <div className="grid gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                prefetch
                onClick={() => setMobileOpen(false)}
                className="rounded-2xl px-4 py-3 text-zinc-300 hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/categorias"
              prefetch
              onClick={() => setMobileOpen(false)}
              className="rounded-2xl px-4 py-3 text-zinc-300 hover:bg-white/10 hover:text-white"
            >
              Categorias
            </Link>
            <div className="grid gap-1 px-4 pb-2">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/categorias/${category.slug}`}
                  prefetch
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-3 py-2 text-sm text-zinc-500 hover:bg-white/10 hover:text-zinc-200"
                >
                  {category.title}
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
