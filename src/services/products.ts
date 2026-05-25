import { createSupabaseServerClient } from "@/lib/supabase-server";
import type { Product, ProductFormData, ProductStatus } from "@/types/product";

const productSelect = `
  id,
  title,
  slug,
  description,
  images,
  price,
  oldPrice,
  category,
  tags,
  type,
  status,
  affiliateUrl,
  commission,
  sourcePlatform,
  sku,
  stock,
  clicks,
  conversions,
  featured,
  seoTitle,
  seoDescription,
  createdAt,
  updatedAt
`;

export async function getPublishedProducts() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("products")
    .select(productSelect)
    .eq("status", "published")
    .order("featured", { ascending: false })
    .order("createdAt", { ascending: false });

  if (error) throw error;
  return (data ?? []) as Product[];
}

export async function listProducts() {
  return getPublishedProducts();
}

export async function getFeaturedProducts(limit = 8) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("products")
    .select(productSelect)
    .eq("status", "published")
    .eq("featured", true)
    .limit(limit);

  if (error) throw error;
  return (data ?? []) as Product[];
}

export async function getProductBySlug(slug: string) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("products")
    .select(productSelect)
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error) throw error;
  return data as Product | null;
}

export async function getProductById(id: string) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.from("products").select(productSelect).eq("id", id).maybeSingle();

  if (error) throw error;
  return data as Product | null;
}

export async function getAdminProducts(status?: ProductStatus) {
  const supabase = await createSupabaseServerClient();
  let query = supabase.from("products").select(productSelect).order("createdAt", { ascending: false });

  if (status) query = query.eq("status", status);

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as Product[];
}

export async function listProductsAdmin(status?: ProductStatus) {
  return getAdminProducts(status);
}

export async function searchProducts(query: string) {
  const term = query.replace(/[%,{}]/g, " ").trim();

  if (!term) return [];

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("products")
    .select(productSelect)
    .eq("status", "published")
    .or(`title.ilike.%${term}%,description.ilike.%${term}%,tags.cs.{${term}}`)
    .order("featured", { ascending: false })
    .order("createdAt", { ascending: false });

  if (error) throw error;
  return (data ?? []) as Product[];
}

export async function createProduct(values: ProductFormData) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.from("products").insert(values).select(productSelect).single();

  if (error) throw error;
  return data as Product;
}

export async function updateProduct(id: string, values: Partial<ProductFormData>) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.from("products").update(values).eq("id", id).select(productSelect).single();

  if (error) throw error;
  return data as Product;
}

export async function deleteProduct(id: string) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) throw error;
}

export async function registerAffiliateClick(product: Product) {
  if (product.type !== "affiliate" || !product.affiliateUrl) return null;

  const supabase = await createSupabaseServerClient();
  await supabase.from("analytics_events").insert({
    product_id: product.id,
    event: "click",
    source: product.sourcePlatform,
    metadata: { affiliateUrl: product.affiliateUrl },
  });

  return product.affiliateUrl;
}
