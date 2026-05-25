"use client";

import { useState } from "react";
import { CheckCircle2, CreditCard, LockKeyhole, QrCode, Truck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/utils";
import { getCartSubtotal, useCartStore } from "@/store/cart-store";

export default function CheckoutPage() {
  const [payment, setPayment] = useState<"pix" | "card">("pix");
  const [done, setDone] = useState(false);
  const { items, clearCart } = useCartStore();
  const subtotal = getCartSubtotal(items);
  const shipping = subtotal > 300 || subtotal === 0 ? 0 : 24.9;
  const total = subtotal + shipping;

  function confirmOrder() {
    setDone(true);
    clearCart();
    toast.success("Pedido confirmado com mock Mercado Pago");
  }

  return (
    <div className="min-h-screen px-4 pb-24 pt-32 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-300">Checkout seguro</p>
            <h1 className="mt-4 text-5xl font-black text-white">Finalizacao minimalista.</h1>
          </div>
          <div className="flex gap-3 text-sm text-zinc-400">
            {["Dados", "Pagamento", "Confirmacao"].map((step, index) => (
              <div key={step} className="flex items-center gap-2">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-white/10 text-white">{index + 1}</span>
                {step}
              </div>
            ))}
          </div>
        </div>

        {done ? (
          <Card className="grid min-h-[420px] place-items-center p-8 text-center">
            <CheckCircle2 className="h-16 w-16 text-emerald-300" />
            <h2 className="mt-6 text-4xl font-black text-white">Pedido aprovado.</h2>
            <p className="mt-3 max-w-xl text-zinc-400">
              Fluxo mockado pronto para receber webhook do Mercado Pago e gravar pedido no Supabase.
            </p>
          </Card>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
            <Card className="p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <Input placeholder="Nome completo" />
                <Input placeholder="E-mail" type="email" />
                <Input placeholder="Telefone" />
                <Input placeholder="CPF" />
                <Input placeholder="CEP" />
                <Input placeholder="Cidade" />
                <Input placeholder="Endereco" className="sm:col-span-2" />
              </div>

              <div className="mt-8">
                <h2 className="text-xl font-bold text-white">Pagamento</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => setPayment("pix")}
                    className={`rounded-3xl border p-5 text-left transition ${
                      payment === "pix" ? "border-amber-300/70 bg-amber-500/10" : "border-white/10 bg-white/[0.04]"
                    }`}
                  >
                    <QrCode className="h-6 w-6 text-amber-300" />
                    <p className="mt-4 font-semibold text-white">PIX instantaneo</p>
                    <p className="text-sm text-zinc-400">QR code e copia e cola.</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPayment("card")}
                    className={`rounded-3xl border p-5 text-left transition ${
                      payment === "card" ? "border-amber-300/70 bg-amber-500/10" : "border-white/10 bg-white/[0.04]"
                    }`}
                  >
                    <CreditCard className="h-6 w-6 text-amber-300" />
                    <p className="mt-4 font-semibold text-white">Cartao</p>
                    <p className="text-sm text-zinc-400">Parcelamento preparado.</p>
                  </button>
                </div>
              </div>
            </Card>

            <Card className="h-fit p-6">
              <h2 className="text-xl font-bold text-white">Resumo</h2>
              <div className="mt-5 space-y-3">
                {items.length === 0 ? (
                  <p className="text-sm text-zinc-500">Carrinho vazio. Use o mock mesmo assim para testar a UI.</p>
                ) : (
                  items.map((item) => (
                    <div key={`${item.product.id}-${item.variant}`} className="flex justify-between gap-4 text-sm text-zinc-300">
                      <span>{item.quantity}x {item.product.name}</span>
                      <span>{formatPrice(item.product.price * item.quantity)}</span>
                    </div>
                  ))
                )}
              </div>
              <div className="mt-6 space-y-2 border-t border-white/10 pt-5 text-sm text-zinc-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Frete</span>
                  <span>{shipping === 0 ? "Gratis" : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between pt-3 text-2xl font-black text-white">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
              <Button variant="premium" className="mt-6 w-full" onClick={confirmOrder}>
                <LockKeyhole className="h-4 w-4" />
                Confirmar pedido
              </Button>
              <p className="mt-4 flex items-center gap-2 text-xs text-zinc-500">
                <Truck className="h-4 w-4" /> Frete calculado por regra mockada.
              </p>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
