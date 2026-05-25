import { BrandLogo } from "@/components/brand-logo";

export function PremiumLoader() {
  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-black">
      <div className="relative flex h-32 w-32 animate-[loader-pop_260ms_ease-out] items-center justify-center rounded-full border border-white/10">
        <div className="absolute inset-0 animate-spin rounded-full border-t border-amber-500" />
        <BrandLogo markOnly size="lg" />
      </div>
    </div>
  );
}
