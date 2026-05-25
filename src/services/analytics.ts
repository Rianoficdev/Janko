import { createSupabaseServerClient } from "@/lib/supabase-server";
import type { AnalyticsEvent, AnalyticsEventType, AnalyticsSummary } from "@/types/analytics";

export async function trackAnalyticsEvent(input: {
  product_id?: string;
  event: AnalyticsEventType;
  source?: string;
  metadata?: Record<string, unknown>;
}) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("analytics_events").insert({
    product_id: input.product_id ?? null,
    event: input.event,
    source: input.source ?? "store",
    metadata: input.metadata ?? {},
  });

  if (error) throw error;
}

export async function registerClick(productId: string) {
  await trackAnalyticsEvent({
    product_id: productId,
    event: "click",
    source: "store",
  });
}

export async function getAdminAnalyticsEvents(limit = 200) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("analytics_events")
    .select("*")
    .order("createdAt", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return (data ?? []) as AnalyticsEvent[];
}

export async function getAdminAnalyticsSummary(): Promise<AnalyticsSummary> {
  const events = await getAdminAnalyticsEvents();

  return {
    views: events.filter((event) => event.event === "view").length,
    clicks: events.filter((event) => event.event === "click").length,
    conversions: events.filter((event) => event.event === "conversion" || event.event === "purchase").length,
    revenue: 0,
  };
}
