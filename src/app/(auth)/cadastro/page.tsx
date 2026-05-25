import { AuthCard } from "@/components/auth/auth-card";

export default function CadastroPage() {
  return (
    <div className="grid min-h-screen place-items-center px-4 py-32">
      <AuthCard initialMode="cadastro" />
    </div>
  );
}
