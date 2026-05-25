import { cn } from "@/lib/utils";

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "rounded-md border border-white/10 bg-white/[0.055] shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
