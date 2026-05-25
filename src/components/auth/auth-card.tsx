"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, ShieldCheck, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/auth-store";

export function AuthCard({ initialMode = "login" }: { initialMode?: "login" | "cadastro" }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const login = useAuthStore((state) => state.login);
  const register = useAuthStore((state) => state.register);
  const [mode, setMode] = useState<"login" | "cadastro">(initialMode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function redirectAfterAuth(role?: string) {
    const next = searchParams.get("next");

    if (role === "admin") {
      router.replace(next?.startsWith("/admin") ? next : "/admin/dashboard");
      return;
    }

    router.replace(next && !next.startsWith("/admin") ? next : "/");
  }

  function handleAuth() {
    const result =
      mode === "login" ? login(email, password) : register(name || "Cliente JANKO", email, password);

    if (!result.ok) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);
    redirectAfterAuth(result.user?.role);
  }

  function handleSocialLogin(provider: "GitHub" | "Google") {
    toast.info(`${provider} preparado para integracao futura com Supabase Auth.`);
  }

  return (
    <Card className="w-full max-w-md p-6">
      <div className="text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-white text-black">
          <ShieldCheck className="h-6 w-6" />
        </div>
        <h1 className="mt-6 text-3xl font-black text-white">{mode === "login" ? "Entrar na JANKO" : "Criar conta"}</h1>
        <p className="mt-2 text-sm text-zinc-400">
          Login mockado local. Admin: admin@janko.com / 123456.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-2 rounded-full border border-white/10 bg-white/[0.04] p-1">
        <button
          type="button"
          onClick={() => setMode("login")}
          className={`rounded-full py-2 text-sm ${mode === "login" ? "bg-white text-black" : "text-zinc-400"}`}
        >
          Login
        </button>
        <button
          type="button"
          onClick={() => setMode("cadastro")}
          className={`rounded-full py-2 text-sm ${mode === "cadastro" ? "bg-white text-black" : "text-zinc-400"}`}
        >
          Cadastro
        </button>
      </div>

      <form className="mt-6 space-y-4" onSubmit={(event) => event.preventDefault()}>
        {mode === "cadastro" && <Input placeholder="Nome" value={name} onChange={(event) => setName(event.target.value)} />}
        <Input placeholder="E-mail" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        <Input placeholder="Senha" type="password" minLength={6} value={password} onChange={(event) => setPassword(event.target.value)} />
        <Button type="button" variant="premium" className="w-full" onClick={handleAuth}>
          {mode === "login" ? "Entrar" : "Criar conta"}
        </Button>
      </form>

      <div className="mt-5 grid gap-3">
        <Button type="button" variant="outline" onClick={() => handleSocialLogin("GitHub")}>
          <Sparkles className="h-4 w-4" />
          Continuar com GitHub
        </Button>
        <Button type="button" variant="outline" onClick={() => handleSocialLogin("Google")}>
          <Mail className="h-4 w-4" />
          Continuar com Google
        </Button>
      </div>
    </Card>
  );
}
