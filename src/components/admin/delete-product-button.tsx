"use client";

import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { deleteProductAction } from "@/app/(admin)/admin/products/actions";
import { Button } from "@/components/ui/button";

export function DeleteProductButton({ id, title }: { id: string; title: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(`Excluir "${title}"? Esta acao nao pode ser desfeita.`);
    if (!confirmed) return;

    setLoading(true);
    const result = await deleteProductAction(id);
    setLoading(false);

    if (!result.ok) {
      toast.error(result.error ?? "Nao foi possivel excluir o produto.");
      return;
    }

    toast.success("Produto excluido.");
    router.refresh();
  }

  return (
    <Button type="button" variant="outline" size="sm" onClick={handleDelete} disabled={loading}>
      <Trash2 className="h-4 w-4" />
      {loading ? "Excluindo..." : "Excluir"}
    </Button>
  );
}
