import { slugify } from "@/lib/slugify";
import type { ProductFormData, SourcePlatform } from "@/types/product";

export type ScrapedProductDraft = Partial<ProductFormData> & {
  sourceUrl: string;
  sourcePlatform: SourcePlatform;
};

export async function scrapeGenericProduct(url: string): Promise<ScrapedProductDraft> {
  const title = new URL(url).hostname.replace(/^www\./, "");

  return {
    sourceUrl: url,
    sourcePlatform: "manual",
    title,
    slug: slugify(title),
    description: "Draft importado. Revise titulo, imagens, preco e SEO antes de publicar.",
    images: [],
    price: 0,
    oldPrice: null,
    tags: [],
    type: "affiliate",
    status: "draft",
    affiliateUrl: url,
    commission: 0,
    sku: null,
    stock: 0,
    featured: false,
    seoTitle: title,
    seoDescription: null,
  };
}
