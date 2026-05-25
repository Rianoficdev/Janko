"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import { getCartSubtotal, useCartStore } from "@/store/cart-store";

export default function CartPage() {
  const { items, openCart } = useCartStore();
  const subtotal = getCartSubtotal(items);

  return (
    <div className="min-h-screen px-4 pb-24 pt-32 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-300">Carrinho</p>
        <h1 className="mt-4 text-5xl font-black text-white">Resumo da compra</h1>
        <Card className="mt-10 p-6">
          {items.length === 0 ? (
            <div className="py-16 text-center">
              <ShoppingBag className="mx-auto h-12 w-12 text-zinc-500" />
              <p className="mt-4 text-zinc-400">Seu carrinho esta vazio.</p>
              <Button asChild variant="premium" className="mt-6">
                <Link href="/#produtos">Ver produtos</Link>
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.variant}-${item.color}`} className="flex gap-4 rounded-3xl border border-white/10 bg-white/[0.04] p-4">
                    <Image src={item.product.image} alt={item.product.name} width={96} height={96} className="h-24 w-24 rounded-2xl object-cover" />
                    <div>
                      <h2 className="font-semibold text-white">{item.product.name}</h2>
                      <p className="text-sm text-zinc-400">{item.variant} · Quantidade {item.quantity}</p>
                      <p className="mt-2 font-bold text-white">{formatPrice(item.product.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="rounded-3xl border border-white/10 bg-black/30 p-5">
                <div className="flex justify-between text-zinc-300">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="mt-4 flex justify-between text-xl font-bold text-white">
                  <span>Total</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <Button asChild variant="premium" className="mt-6 w-full">
                  <Link href="/checkout">
                    Checkout <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" className="mt-3 w-full" onClick={openCart}>
                  Abrir drawer
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
