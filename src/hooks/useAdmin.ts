"use client";

import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase-client";
import { hasSupabaseEnv } from "@/lib/supabase";

export function useAdmin() {
  const supabaseConfigured = hasSupabaseEnv();
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(supabaseConfigured);

  useEffect(() => {
    if (!supabaseConfigured) return;

    const supabase = createSupabaseBrowserClient();
    supabase.auth.getUser().then(({ data }) => {
      setEmail(data.user?.email ?? null);
      setLoading(false);
    });
  }, [supabaseConfigured]);

  return { email, loading, isAdminSession: Boolean(email) };
}
