import Link from "next/link";
import { Mail, Send, ShieldCheck, Truck } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black px-4 py-12">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <div className="flex items-center gap-3">
            <BrandLogo />
          </div>
          <p className="mt-4 max-w-md text-sm leading-7 text-zinc-400">
            Modern Tech Lifestyle: tecnologia premium, design futurista e experiencia inteligente para o dia a dia moderno.
          </p>
          <div className="mt-6 flex gap-3 text-zinc-400">
            <Mail className="h-5 w-5" />
            <Send className="h-5 w-5" />
            <Truck className="h-5 w-5" />
            <ShieldCheck className="h-5 w-5" />
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-white">Loja</h3>
          <div className="mt-4 grid gap-3 text-sm text-zinc-400">
            <Link href="/products/aura-watch-pro">Produto destaque</Link>
            <Link href="/carrinho">Carrinho</Link>
            <Link href="/checkout">Checkout</Link>
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-white">Operacao</h3>
          <div className="mt-4 grid gap-3 text-sm text-zinc-400">
            <Link href="/categorias">Categorias</Link>
            <Link href="/login">Login</Link>
            <span>Supabase ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
