import { scrapeGenericProduct } from "@/scrapers/generic";

export async function scrapeAmazonProduct(url: string) {
  const draft = await scrapeGenericProduct(url);
  return { ...draft, sourcePlatform: "amazon" as const };
}
