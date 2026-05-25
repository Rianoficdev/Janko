import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getRequiredSupabaseEnv } from "@/lib/supabase";

export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient(
    getRequiredSupabaseEnv("NEXT_PUBLIC_SUPABASE_URL"),
    getRequiredSupabaseEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // Server Components nao gravam cookies; middleware faz a renovacao.
          }
        },
      },
    },
  );
}
