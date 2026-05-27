import type { ProductStatus, ProductType, SourcePlatform } from "@/types/product";

export const productStatusLabels: Record<ProductStatus, string> = {
  draft: "Rascunho",
  published: "Publicado",
  archived: "Arquivado",
};

export const productTypeLabels: Record<ProductType, string> = {
  affiliate: "Afiliado",
  dropshipping: "Dropshipping",
};

export const sourcePlatformLabels: Record<SourcePlatform, string> = {
  amazon: "Amazon",
  shopee: "Shopee",
  aliexpress: "AliExpress",
  manual: "Manual",
};
