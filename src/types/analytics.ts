export type AnalyticsEventType = "view" | "click" | "conversion" | "add_to_cart" | "checkout_start" | "purchase";

export type AnalyticsEvent = {
  id: string;
  product_id: string | null;
  event: AnalyticsEventType;
  source: string | null;
  session_id: string | null;
  visitor_id: string | null;
  user_id: string | null;
  metadata: Record<string, unknown>;
  ip_hash: string | null;
  user_agent: string | null;
  createdAt: string;
  updatedAt: string;
};

export type AnalyticsSummary = {
  views: number;
  clicks: number;
  conversions: number;
  revenue: number;
};
