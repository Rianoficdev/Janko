"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/utils";
import { getCartSubtotal, useCartStore } from "@/store/cart-store";

export function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, coupon, setCoupon } = useCartStore();
  const subtotal = getCartSubtotal(items);
  const discount = coupon.toUpperCase() === "JANKO10" ? subtotal * 0.1 : 0;
  const shipping = subtotal > 300 || subtotal === 0 ? 0 : 24.9;
  const total = subtotal - discount + shipping;

  function handleApplyCoupon() {
    if (!coupon.trim()) {
      toast.error("Digite um cupom.");
      return;
    }

    if (coupon.toUpperCase() !== "JANKO10") {
      toast.error("Cupom invalido.");
      return;
    }

    toast.success("Cupom JANKO10 aplicado.");
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.button
            type="button"
            aria-label="Fechar carrinho"
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="fixed right-0 top-0 z-50 flex h-dvh w-full max-w-md flex-col border-l border-white/10 bg-[#07080d]/95 p-5 shadow-2xl backdrop-blur-2xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-amber-300">Carrinho</p>
                <h2 className="mt-1 text-2xl font-semibold text-white">{items.length} itens</h2>
              </div>
              <Button variant="ghost" size="icon" onClick={closeCart} aria-label="Fechar">
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="mt-6 flex-1 space-y-4 overflow-y-auto pr-1">
              {items.length === 0 ? (
                <div className="grid h-full place-items-center text-center">
                  <div>
                    <ShoppingBag className="mx-auto h-10 w-10 text-zinc-500" />
                    <p className="mt-4 text-zinc-400">Seu carrinho esta vazio.</p>
                  </div>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    layout
                    key={`${item.product.id}-${item.variant}-${item.color}`}
                    className="rounded-3xl border border-white/10 bg-white/[0.05] p-3"
                  >
                    <div className="flex gap-3">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        width={80}
                        height={80}
                        className="h-20 w-20 rounded-2xl object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <h3 className="truncate font-semibold text-white">{item.product.name}</h3>
                        <p className="text-xs text-zinc-400">
                          {item.variant} · {formatPrice(item.product.price)}
                        </p>
                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center rounded-full border border-white/10">
                            <button
                              type="button"
                              className="p-2 text-zinc-300"
                              onClick={() =>
                                updateQuantity(item.product.id, item.variant, item.color, item.quantity - 1)
                              }
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-8 text-center text-sm text-white">{item.quantity}</span>
                            <button
                              type="button"
                              className="p-2 text-zinc-300"
                              onClick={() =>
                                updateQuantity(item.product.id, item.variant, item.color, item.quantity + 1)
                              }
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <button
                            type="button"
                            className="rounded-full p-2 text-zinc-500 hover:bg-white/10 hover:text-red-300"
                            onClick={() => removeItem(item.product.id, item.variant, item.color)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            <div className="mt-5 space-y-4 border-t border-white/10 pt-5">
              <div className="flex gap-2">
                <Input placeholder="Cupom JANKO10" value={coupon} onChange={(event) => setCoupon(event.target.value)} />
                <Button
                  variant="outline"
                  onClick={handleApplyCoupon}
                >
                  Aplicar
                </Button>
              </div>
              <div className="space-y-2 text-sm text-zinc-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Frete</span>
                  <span>{shipping === 0 ? "Gratis" : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Desconto</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
                <div className="flex justify-between pt-2 text-lg font-semibold text-white">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
              <Button asChild variant="premium" className="w-full" onClick={closeCart}>
                <Link href="/checkout">Ir para checkout</Link>
              </Button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
