import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  markOnly?: boolean;
  size?: "sm" | "md" | "lg";
};

export function BrandLogo({ className, markOnly = false, size = "md" }: BrandLogoProps) {
  const markSize = size === "lg" ? "h-12 w-12" : size === "sm" ? "h-8 w-8" : "h-10 w-10";
  const textSize = size === "lg" ? "text-2xl" : size === "sm" ? "text-sm" : "text-lg";

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <svg className={markSize} viewBox="0 0 96 96" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="janko-gold" x1="25" y1="17" x2="76" y2="30" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fff7d6" />
            <stop offset="0.45" stopColor="#ffd166" />
            <stop offset="1" stopColor="#f7c948" />
          </linearGradient>
          <linearGradient id="janko-silver" x1="16" y1="76" x2="73" y2="37" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ffffff" />
            <stop offset="0.55" stopColor="#f4f4f5" />
            <stop offset="1" stopColor="#c7c7c7" />
          </linearGradient>
          <filter id="janko-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feColorMatrix in="blur" type="matrix" values="1 0 0 0 1 0 0.65 0 0 0.65 0 0 0.15 0 0 0 0 0.5 0" />
            <feBlend in="SourceGraphic" />
          </filter>
        </defs>
        <path d="M38 20h43L66 33H23L38 20Z" fill="url(#janko-gold)" filter="url(#janko-glow)" />
        <path d="M63 36h20v28L51 86H31l32-25V36Z" fill="url(#janko-silver)" />
        <path d="M18 65h36L36 79H5l13-14Z" fill="url(#janko-silver)" />
      </svg>
      {!markOnly && (
        <>
          <span className="h-8 w-px bg-white/35" />
          <span className={cn("font-semibold tracking-[0.42em] text-white drop-shadow", textSize)}>JANKO</span>
        </>
      )}
    </div>
  );
}
