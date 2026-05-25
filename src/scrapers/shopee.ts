import { scrapeGenericProduct } from "@/scrapers/generic";

export async function scrapeShopeeProduct(url: string) {
  const draft = await scrapeGenericProduct(url);
  return { ...draft, sourcePlatform: "shopee" as const };
}
