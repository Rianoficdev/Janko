"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Minus, Plus, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types/commerce";
import { useCartStore } from "@/store/cart-store";

export function AddToCart({ product, compact = false }: { product: Product; compact?: boolean }) {
  const [variant, setVariant] = useState(product.variants[0]?.value ?? "Padrao");
  const [color, setColor] = useState(product.colors[0] ?? "#fff");
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);

  function handleAdd() {
    addItem(product, { variant, color, quantity });
    openCart();
    toast.success(`${product.name} adicionado ao carrinho`);
  }

  if (compact) {
    return (
      <Button variant="premium" className="w-full" onClick={handleAdd}>
        <ShoppingBag className="h-4 w-4" />
        Comprar agora
      </Button>
    );
  }

  return (
    <div className="space-y-5">
      <div>
        <p className="mb-3 text-sm font-medium text-zinc-300">Cor</p>
        <div className="flex gap-3">
          {product.colors.map((item) => (
            <button
              type="button"
              key={item}
              aria-label={`Selecionar cor ${item}`}
              onClick={() => setColor(item)}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/15"
            >
              <span className="h-7 w-7 rounded-full" style={{ background: item }} />
              {color === item && <Check className="absolute h-4 w-4 text-amber-300" />}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-sm font-medium text-zinc-300">Variante</p>
        <div className="grid grid-cols-2 gap-3">
          {product.variants.map((item) => (
            <button
              type="button"
              key={item.value}
              onClick={() => setVariant(item.value)}
              className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${
                variant === item.value
                  ? "border-amber-300/70 bg-amber-500/10 text-white"
                  : "border-white/10 bg-white/[0.04] text-zinc-400 hover:bg-white/10"
              }`}
            >
              <span className="block font-semibold">{item.value}</span>
              <span className="text-xs">{item.stock} em estoque</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex h-13 items-center justify-between rounded-full border border-white/10 bg-white/[0.05] px-2 sm:w-36">
          <button type="button" className="rounded-full p-3 text-zinc-300" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
            <Minus className="h-4 w-4" />
          </button>
          <span className="font-semibold text-white">{quantity}</span>
          <button type="button" className="rounded-full p-3 text-zinc-300" onClick={() => setQuantity(quantity + 1)}>
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <motion.div whileTap={{ scale: 0.98 }} className="flex-1">
          <Button variant="premium" size="lg" className="w-full" onClick={handleAdd}>
            <ShoppingBag className="h-5 w-5" />
            Adicionar ao carrinho
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
