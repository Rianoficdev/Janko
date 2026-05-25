import { scrapeGenericProduct } from "@/scrapers/generic";

export async function scrapeAliExpressProduct(url: string) {
  const draft = await scrapeGenericProduct(url);
  return { ...draft, sourcePlatform: "aliexpress" as const };
}
