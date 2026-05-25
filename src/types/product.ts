export type ProductType = "affiliate" | "dropshipping";

export type ProductStatus = "draft" | "published" | "archived";

export type SourcePlatform = "amazon" | "shopee" | "aliexpress" | "manual";

export type Product = {
  id: string;
  title: string;
  slug: string;
  description: string;
  images: string[];
  price: number;
  oldPrice: number | null;
  category: string | null;
  tags: string[];
  type: ProductType;
  status: ProductStatus;
  affiliateUrl: string | null;
  commission: number;
  sourcePlatform: SourcePlatform;
  sku: string | null;
  stock: number;
  clicks: number;
  conversions: number;
  featured: boolean;
  seoTitle: string | null;
  seoDescription: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ProductFormData = Omit<Product, "id" | "clicks" | "conversions" | "createdAt" | "updatedAt">;

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
};
