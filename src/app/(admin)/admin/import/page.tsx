import { Link2, ScanSearch, Sparkles } from "lucide-react";
import { AdminHeader } from "@/components/admin/admin-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function AdminImportPage() {
  return (
    <div className="space-y-6">
      <AdminHeader
        eyebrow="Importador"
        title="Criar draft por link."
        description="Fluxo preparado para Fase 2: colar link, identificar plataforma, gerar rascunho e revisar antes de publicar."
      />

      <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
        <Card className="p-5">
          <div className="flex items-center gap-3 text-blue-200">
            <ScanSearch className="h-5 w-5" />
            <p className="text-sm font-semibold uppercase tracking-[0.28em]">Scraping preparado</p>
          </div>
          <div className="mt-6 grid gap-4">
            <Input placeholder="Cole aqui o link Amazon, Shopee, AliExpress ou manual" />
            <Button variant="premium" className="w-fit">
              <Link2 className="h-4 w-4" />
              Gerar rascunho
            </Button>
          </div>
        </Card>

        <Card className="p-5">
          <Sparkles className="h-5 w-5 text-blue-300" />
          <h2 className="mt-4 text-xl font-bold text-white">Proxima etapa</h2>
          <p className="mt-3 text-sm leading-7 text-zinc-400">
            Os scrapers ficam isolados em /scrapers e devem criar produtos com status draft para revisao no admin.
          </p>
        </Card>
      </div>
    </div>
  );
}
