"use client";

import { createBrowserClient } from "@supabase/ssr";
import { getRequiredSupabaseEnv } from "@/lib/supabase";

export function createSupabaseBrowserClient() {
  return createBrowserClient(
    getRequiredSupabaseEnv("NEXT_PUBLIC_SUPABASE_URL"),
    getRequiredSupabaseEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
  );
}
