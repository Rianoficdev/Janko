"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Save, X } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { createProductAction, updateProductAction } from "@/app/(admin)/admin/products/actions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { slugify } from "@/lib/slugify";
import type { Category, Product, ProductFormData, ProductStatus, ProductType, SourcePlatform } from "@/types/product";

type ProductFormState = {
  title: string;
  description: string;
  price: string;
  oldPrice: string;
  type: ProductType;
  status: ProductStatus;
  affiliateUrl: string;
  sourcePlatform: SourcePlatform;
  category: string;
  tags: string;
  images: string;
  featured: boolean;
  commission: string;
  sku: string;
  stock: string;
  seoTitle: string;
  seoDescription: string;
};

const inputTone =
  "focus:border-blue-400/70 focus:ring-blue-500/10";

const selectClass =
  "h-12 w-full rounded-md border border-white/10 bg-[#050505] px-4 text-sm text-white outline-none transition focus:border-blue-400/70 focus:ring-4 focus:ring-blue-500/10";

const textareaClass =
  "min-h-32 w-full rounded-md border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-blue-400/70 focus:ring-4 focus:ring-blue-500/10";

function splitList(value: string) {
  return value
    .split(/[\n,]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function initialState(product?: Product, categories: Category[] = []): ProductFormState {
  return {
    title: product?.title ?? "",
    description: product?.description ?? "",
    price: product ? String(product.price) : "",
    oldPrice: product?.oldPrice ? String(product.oldPrice) : "",
    type: product?.type ?? "affiliate",
    status: product?.status ?? "draft",
    affiliateUrl: product?.affiliateUrl ?? "",
    sourcePlatform: product?.sourcePlatform ?? "manual",
    category: product?.category ?? categories[0]?.id ?? "",
    tags: product?.tags.join(", ") ?? "",
    images: product?.images.join("\n") ?? "",
    featured: product?.featured ?? false,
    commission: product ? String(product.commission) : "0",
    sku: product?.sku ?? "",
    stock: product ? String(product.stock) : "0",
    seoTitle: product?.seoTitle ?? "",
    seoDescription: product?.seoDescription ?? "",
  };
}

function toProductPayload(form: ProductFormState): ProductFormData {
  return {
    title: form.title.trim(),
    slug: slugify(form.title),
    description: form.description.trim(),
    images: splitList(form.images),
    price: Number(form.price),
    oldPrice: form.oldPrice ? Number(form.oldPrice) : null,
    category: form.category || null,
    tags: splitList(form.tags),
    type: form.type,
    status: form.status,
    affiliateUrl: form.type === "affiliate" ? form.affiliateUrl.trim() : null,
    commission: Number(form.commission || 0),
    sourcePlatform: form.sourcePlatform,
    sku: form.sku.trim() || null,
    stock: form.type === "dropshipping" ? Number(form.stock || 0) : 0,
    featured: form.featured,
    seoTitle: form.seoTitle.trim() || null,
    seoDescription: form.seoDescription.trim() || null,
  };
}

export function ProductForm({
  categories,
  product,
  mode,
}: {
  categories: Category[];
  product?: Product;
  mode: "create" | "edit";
}) {
  const router = useRouter();
  const [form, setForm] = useState<ProductFormState>(() => initialState(product, categories));
  const [saving, setSaving] = useState(false);
  const slug = useMemo(() => slugify(form.title), [form.title]);
  const previewImage = splitList(form.images)[0];

  function updateField<K extends keyof ProductFormState>(field: K, value: ProductFormState[K]) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.title.trim() || !form.description.trim() || !form.price) {
      toast.error("Preencha titulo, descricao e preco.");
      return;
    }

    if (form.type === "affiliate" && !form.affiliateUrl.trim()) {
      toast.error("Produto afiliado precisa de affiliateUrl.");
      return;
    }

    setSaving(true);
    const payload = toProductPayload(form);
    const result =
      mode === "create" ? await createProductAction(payload) : await updateProductAction(product!.id, payload);
    setSaving(false);

    if (!result.ok) {
      toast.error(result.error ?? "Nao foi possivel salvar o produto.");
      return;
    }

    toast.success(mode === "create" ? "Produto criado." : "Produto atualizado.");
    router.push("/admin/products");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
      <Card className="p-5">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2 md:col-span-2">
            <span className="text-sm font-semibold text-zinc-300">Titulo</span>
            <Input required value={form.title} onChange={(event) => updateField("title", event.target.value)} className={inputTone} />
            <span className="block text-xs text-zinc-500">Slug automatico: {slug || "produto-sem-titulo"}</span>
          </label>

          <label className="space-y-2 md:col-span-2">
            <span className="text-sm font-semibold text-zinc-300">Descricao</span>
            <textarea required value={form.description} onChange={(event) => updateField("description", event.target.value)} className={textareaClass} />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-zinc-300">Preco</span>
            <Input required type="number" step="0.01" value={form.price} onChange={(event) => updateField("price", event.target.value)} className={inputTone} />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-semibold text-zinc-300">Preco antigo</span>
            <Input type="number" step="0.01" value={form.oldPrice} onChange={(event) => updateField("oldPrice", event.target.value)} className={inputTone} />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-zinc-300">Tipo</span>
            <select value={form.type} onChange={(event) => updateField("type", event.target.value as ProductType)} className={selectClass}>
              <option value="affiliate">affiliate</option>
              <option value="dropshipping">dropshipping</option>
            </select>
          </label>
          <label className="space-y-2">
            <span className="text-sm font-semibold text-zinc-300">Status</span>
            <select value={form.status} onChange={(event) => updateField("status", event.target.value as ProductStatus)} className={selectClass}>
              <option value="draft">draft</option>
              <option value="published">published</option>
              <option value="archived">archived</option>
            </select>
          </label>

          {form.type === "affiliate" && (
            <label className="space-y-2 md:col-span-2">
              <span className="text-sm font-semibold text-zinc-300">Affiliate URL</span>
              <Input required value={form.affiliateUrl} onChange={(event) => updateField("affiliateUrl", event.target.value)} className={inputTone} />
            </label>
          )}

          <label className="space-y-2">
            <span className="text-sm font-semibold text-zinc-300">Plataforma</span>
            <select value={form.sourcePlatform} onChange={(event) => updateField("sourcePlatform", event.target.value as SourcePlatform)} className={selectClass}>
              <option value="amazon">amazon</option>
              <option value="shopee">shopee</option>
              <option value="aliexpress">aliexpress</option>
              <option value="manual">manual</option>
            </select>
          </label>
          <label className="space-y-2">
            <span className="text-sm font-semibold text-zinc-300">Categoria</span>
            <select value={form.category} onChange={(event) => updateField("category", event.target.value)} className={selectClass}>
              <option value="">Sem categoria</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-2 md:col-span-2">
            <span className="text-sm font-semibold text-zinc-300">Tags</span>
            <Input value={form.tags} onChange={(event) => updateField("tags", event.target.value)} placeholder="tech, produtividade, premium" className={inputTone} />
          </label>

          <label className="space-y-2 md:col-span-2">
            <span className="text-sm font-semibold text-zinc-300">Imagens</span>
            <textarea value={form.images} onChange={(event) => updateField("images", event.target.value)} placeholder="Uma URL por linha ou separadas por virgula" className={textareaClass} />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-zinc-300">Comissao</span>
            <Input type="number" step="0.01" value={form.commission} onChange={(event) => updateField("commission", event.target.value)} className={inputTone} />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-semibold text-zinc-300">SKU</span>
            <Input value={form.sku} onChange={(event) => updateField("sku", event.target.value)} className={inputTone} />
          </label>

          {form.type === "dropshipping" && (
            <label className="space-y-2">
              <span className="text-sm font-semibold text-zinc-300">Estoque</span>
              <Input type="number" value={form.stock} onChange={(event) => updateField("stock", event.target.value)} className={inputTone} />
            </label>
          )}

          <label className="flex items-center gap-3 rounded-md border border-white/10 bg-white/[0.04] px-4 py-3">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(event) => updateField("featured", event.target.checked)}
              className="h-4 w-4 accent-blue-500"
            />
            <span className="text-sm font-semibold text-zinc-300">Produto em destaque</span>
          </label>

          <label className="space-y-2 md:col-span-2">
            <span className="text-sm font-semibold text-zinc-300">SEO Title</span>
            <Input value={form.seoTitle} onChange={(event) => updateField("seoTitle", event.target.value)} className={inputTone} />
          </label>
          <label className="space-y-2 md:col-span-2">
            <span className="text-sm font-semibold text-zinc-300">SEO Description</span>
            <textarea value={form.seoDescription} onChange={(event) => updateField("seoDescription", event.target.value)} className={textareaClass} />
          </label>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button type="submit" disabled={saving} className="bg-blue-500 text-white shadow-[0_0_42px_rgba(59,130,246,0.28)] hover:bg-blue-400">
            <Save className="h-4 w-4" />
            {saving ? "Salvando..." : "Salvar produto"}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.push("/admin/products")}>
            <X className="h-4 w-4" />
            Cancelar
          </Button>
        </div>
      </Card>

      <aside className="space-y-4">
        <Card className="overflow-hidden p-3">
          <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-[#0F0F10]">
            {previewImage ? (
              <Image src={previewImage} alt="Preview do produto" fill sizes="360px" className="object-cover" />
            ) : (
              <div className="grid h-full place-items-center bg-[radial-gradient(circle_at_50%_35%,rgba(59,130,246,0.22),transparent_42%),#0F0F10] text-sm text-zinc-500">
                Preview da imagem
              </div>
            )}
          </div>
          <div className="p-3">
            <p className="text-lg font-bold text-white">{form.title || "Nome do produto"}</p>
            <p className="mt-1 text-sm text-zinc-400">{form.status} · {form.type}</p>
          </div>
        </Card>
        <Card className="p-5">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-blue-300">Supabase real</p>
          <p className="mt-3 text-sm leading-7 text-zinc-400">
            Ao salvar, o produto e gravado na tabela products e passa a aparecer na loja se estiver published.
          </p>
        </Card>
      </aside>
    </form>
  );
}
