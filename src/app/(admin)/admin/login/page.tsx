"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { LockKeyhole, LogIn } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { BrandLogo } from "@/components/brand-logo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { createSupabaseBrowserClient } from "@/lib/supabase-client";
import { hasSupabaseEnv } from "@/lib/supabase";

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState(process.env.NEXT_PUBLIC_ADMIN_EMAIL ?? "admin@janko.com");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!hasSupabaseEnv()) {
      toast.error("Configure NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY no .env.local.");
      return;
    }

    setLoading(true);
    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (error) {
      toast.error("Acesso negado. Verifique e-mail e senha do admin.");
      return;
    }

    toast.success("Admin autenticado.");
    router.replace(searchParams.get("next") || "/admin/dashboard");
    router.refresh();
  }

  return (
    <main className="grid min-h-screen place-items-center overflow-hidden bg-[#050505] px-4 py-12 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(59,130,246,0.2),transparent_34%),radial-gradient(circle_at_80%_35%,rgba(96,165,250,0.12),transparent_30%)]" />
      <Card className="relative w-full max-w-md border-blue-400/20 bg-white/[0.055] p-6 shadow-[0_30px_120px_rgba(59,130,246,0.18)] backdrop-blur-2xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <BrandLogo />
          <div className="grid h-11 w-11 place-items-center rounded-md border border-blue-300/25 bg-blue-500/10 text-blue-200">
            <LockKeyhole className="h-5 w-5" />
          </div>
        </div>

        <p className="text-xs font-bold uppercase tracking-[0.4em] text-blue-300">Admin privado</p>
        <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">Acesso operacional JANKO.</h1>
        <p className="mt-3 text-sm leading-6 text-zinc-400">
          Esta entrada e exclusiva para administradores autenticados via Supabase Auth.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-3">
          <Input type="email" placeholder="admin@janko.com" value={email} onChange={(event) => setEmail(event.target.value)} />
          <Input type="password" placeholder="Senha" value={password} onChange={(event) => setPassword(event.target.value)} />
          <Button type="submit" variant="premium" className="w-full" disabled={loading}>
            <LogIn className="h-4 w-4" />
            {loading ? "Entrando..." : "Entrar no admin"}
          </Button>
        </form>

        <Link href="/" className="mt-5 block text-center text-sm text-zinc-500 transition hover:text-white">
          Voltar para loja
        </Link>
      </Card>
    </main>
  );
}
