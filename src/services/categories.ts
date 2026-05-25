import { createSupabaseServerClient } from "@/lib/supabase-server";
import type { Category } from "@/types/product";

const categorySelect = `
  id,
  name,
  slug,
  description,
  image,
  featured,
  createdAt,
  updatedAt
`;

export async function listCategories() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("categories")
    .select(categorySelect)
    .order("featured", { ascending: false })
    .order("name", { ascending: true });

  if (error) throw error;
  return (data ?? []) as Category[];
}
