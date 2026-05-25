import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BadgeCheck, Flame, PackageCheck, ShieldCheck, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const leftSignalSlots = [
  {
    delay: "0s",
    signals: [
      { Icon: Flame, eyebrow: "Future Essentials", text: "Tecnologia para a rotina" },
      { Icon: Sparkles, eyebrow: "Modern Lifestyle", text: "Menos excesso. Mais experiencia." },
      { Icon: PackageCheck, eyebrow: "Smart Selection", text: "Produtos com utilidade real" },
    ],
  },
  {
    delay: "1.1s",
    signals: [
      { Icon: BadgeCheck, eyebrow: "Premium Experience", text: "Design. Performance. Tecnologia." },
      { Icon: ShieldCheck, eyebrow: "Trust Layer", text: "Compra clara e segura" },
      { Icon: Sparkles, eyebrow: "Future Details", text: "Estetica futurista aplicada" },
    ],
  },
];

const rightSignalSlots = [
  {
    delay: "0.5s",
    signals: [
      { Icon: PackageCheck, eyebrow: "Smart Selection", text: "Produtos com utilidade real" },
      { Icon: BadgeCheck, eyebrow: "Premium Experience", text: "Design. Performance. Tecnologia." },
      { Icon: Flame, eyebrow: "Future Essentials", text: "Tecnologia para a rotina" },
    ],
  },
  {
    delay: "1.6s",
    signals: [
      { Icon: ShieldCheck, eyebrow: "Trust Layer", text: "Compra clara e segura" },
      { Icon: Sparkles, eyebrow: "Future Details", text: "Estetica futurista aplicada" },
      { Icon: BadgeCheck, eyebrow: "Premium Experience", text: "Experiencia moderna e fluida" },
    ],
  },
];

function SignalCard({
  signals,
  delay,
}: {
  signals: Array<{
    Icon: LucideIcon;
    eyebrow: string;
    text: string;
  }>;
  delay: string;
}) {
  return (
    <div
      className="float-card relative min-h-[80px] w-full overflow-hidden rounded-md border border-amber-300/25 bg-black/75 p-3 text-left shadow-[0_0_52px_rgba(250,204,21,0.2)] backdrop-blur-xl"
      style={{ animationDelay: delay }}
    >
      {signals.map(({ Icon, eyebrow, text }, index) => (
        <div
          key={eyebrow}
          className="rotating-signal absolute inset-0 flex items-center gap-3 p-3"
          style={{ animationDelay: `${index * 4}s` }}
        >
          <Icon className="h-4 w-4 shrink-0 text-amber-300" />
          <div>
            <p className="text-xs text-zinc-400">{eyebrow}</p>
            <p className="text-sm font-semibold leading-snug text-white">{text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function Hero() {
  return (
    <section className="theme-hero relative isolate min-h-screen overflow-hidden border-b border-white/10 px-4 pt-24 sm:px-6">
      <div className="hero-bg absolute inset-0 -z-10">
        <Image
          src="/brand/hero-banner.png"
          alt="Banner JANKO com carrinho dourado e sacolas premium"
          fill
          priority
          sizes="100vw"
          className="h-full w-full object-cover object-center opacity-85"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#050505_0%,rgba(5,5,5,0.76)_34%,rgba(5,5,5,0.34)_64%,#050505_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_10%,rgba(250,204,21,0.28),transparent_26%),linear-gradient(to_bottom,rgba(5,5,5,0.1)_0%,#050505_100%)]" />
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-8 grid max-w-3xl grid-cols-[1fr_auto_1fr] items-center rounded-md border border-white/10 bg-black/35 px-4 py-3 backdrop-blur-2xl">
          <div className="hidden justify-end gap-6 pr-6 text-xs text-zinc-300 sm:flex">
            <a href="#metodo">Metodo</a>
            <a href="#produtos">Produtos</a>
          </div>
          <Link href="/" className="flex items-center justify-center">
            <BrandLogo markOnly size="sm" />
          </Link>
          <div className="hidden justify-start gap-6 pl-6 text-xs text-zinc-300 sm:flex">
            <a href="#comparacao">Comparacao</a>
            <a href="#faq">FAQ</a>
          </div>
        </div>

        <div className="grid min-h-[calc(100vh-8rem)] items-center gap-6 lg:grid-cols-[170px_minmax(0,1fr)_170px] xl:grid-cols-[210px_minmax(0,1fr)_210px]">
          <div className="pointer-events-none z-20 hidden -translate-y-20 translate-x-4 flex-col gap-5 lg:flex xl:-translate-y-28 xl:translate-x-6">
            {leftSignalSlots.map((slot, index) => (
              <SignalCard key={index} {...slot} />
            ))}
          </div>

          <div className="relative z-20 mx-auto max-w-4xl pb-16 text-center">
            <div className="flex justify-center">
              <Badge>Modern Tech Lifestyle</Badge>
            </div>
            <h1 className="mx-auto mt-5 max-w-3xl text-balance text-4xl font-black uppercase leading-[0.94] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Tecnologia premium para o dia a dia.
            </h1>
            <p className="mx-auto mt-5 max-w-4xl text-sm leading-7 text-zinc-300 sm:whitespace-nowrap sm:text-base">
              Design futurista, utilidade real e experiencia moderna em uma curadoria inteligente.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild variant="premium" size="lg">
                <Link href="#produtos">
                  Explorar colecao <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/products/aura-watch-pro">Descobrir agora</Link>
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              {["Design futurista", "Experiencia premium", "Tecnologia inteligente"].map((item) => (
                <div key={item} className="flex items-center gap-2 text-xs text-zinc-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="pointer-events-none z-20 hidden -translate-x-4 -translate-y-20 flex-col gap-5 lg:flex xl:-translate-x-6 xl:-translate-y-28">
            {rightSignalSlots.map((slot, index) => (
              <SignalCard key={index} {...slot} />
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-3 pb-10 sm:grid-cols-3">
        {[
          [ShieldCheck, "Experiencia confiavel", "Navegacao clara, compra segura e interacao fluida."],
          [PackageCheck, "Selecao premium", "Produtos escolhidos por design, utilidade e inovacao."],
          [Flame, "Estetica futurista", "Uma identidade visual moderna, minimalista e memoravel."],
        ].map(([Icon, title, text]) => (
          <div
            key={title as string}
            className="flex flex-col items-center rounded-md border border-white/10 bg-black/45 p-4 text-center backdrop-blur-xl"
          >
            <Icon className="h-5 w-5 text-amber-300" />
            <h3 className="mt-3 font-semibold text-white">{title as string}</h3>
            <p className="mt-1 text-sm text-zinc-500">{text as string}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
