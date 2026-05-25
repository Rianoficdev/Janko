import { ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type React from "react";
import { ProductCarousel } from "@/components/home/product-carousel";
import { ProductGrid } from "@/components/product/product-grid";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { categories } from "@/lib/categories";
import { products } from "@/lib/products";

function MotionReveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return <div className={className}>{children}</div>;
}

const comparison = [
  ["Identidade", "Produtos soltos sem direcao", "Modern Tech Lifestyle com linguagem consistente"],
  ["Experiencia", "Compra fria e funcional", "Jornada premium, fluida e visualmente marcante"],
  ["Produto", "Descricao generica", "Design, utilidade, inovacao e contexto de uso"],
  ["Marca", "Foco em preco", "Foco em experiencia, tecnologia e estilo de vida"],
  ["Escala", "Nicho limitado", "Gadgets, smart home, produtividade e lifestyle na mesma marca"],
];

const testimonials = [
  ["A JANKO tem cara de marca real: premium, limpa e com tecnologia no centro.", "Marina Costa", "E-commerce Lead"],
  ["A mistura de preto, dourado e produto tech cria uma sensacao de marca cara.", "Rafael Lima", "Growth Partner"],
  ["Nao parece uma loja aleatoria. Parece uma curadoria moderna para quem vive tecnologia.", "Bianca Torres", "Creative Strategist"],
];

const faqs = [
  ["A JANKO vende qual tipo de produto?", "A marca trabalha com Lifestyle Tech: gadgets, smart home, acessorios, produtividade, estetica e tecnologia premium."],
  ["Da para conectar Supabase?", "Sim. A estrutura de services e API routes ja separa os pontos de integracao para auth, banco e storage."],
  ["O Mercado Pago ja esta preparado?", "O checkout usa mock, mas /api/checkout ja representa o ponto para criar preference, PIX, cartao e webhooks."],
  ["O carrinho salva quando atualiza?", "Sim. Ele usa Zustand com persistencia local."],
  ["A marca fica limitada a um nicho?", "Nao. O posicionamento permite reunir produtos tech premium para rotina, casa, trabalho, mobilidade e estilo de vida."],
];

export function BrandStory() {
  return (
    <section className="border-b border-white/10 bg-[#060606] px-4 py-20 sm:px-6">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:items-center">
        <MotionReveal>
          <div className="overflow-hidden rounded-md border border-white/10 bg-white/[0.04] p-2">
            <Image
              src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=90"
              alt="Corredor escuro de escritorio premium"
              width={1200}
              height={900}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="aspect-[4/3] w-full rounded object-cover opacity-80"
            />
          </div>
        </MotionReveal>
        <MotionReveal delay={0.08}>
          <p className="text-xs font-bold uppercase tracking-[0.45em] text-amber-500">Sobre a marca</p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight text-white sm:text-5xl">
            Tecnologia feita para elevar sua experiencia diaria.
          </h2>
          <p className="mt-5 leading-8 text-zinc-400">
            A JANKO nasceu para unir tecnologia, design e experiencia em uma unica marca. Selecionamos produtos que combinam inovacao, estetica minimalista e funcionalidade para acompanhar a rotina moderna.
          </p>
          <Button asChild className="mt-7" variant="premium">
            <Link href="/#produtos">Explorar colecao</Link>
          </Button>
        </MotionReveal>
      </div>
    </section>
  );
}

export function Categories() {
  return (
    <section id="categorias" className="relative overflow-hidden border-b border-white/10 bg-black px-4 py-20 sm:px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(250,204,21,0.12),transparent_36%)]" />
      <div className="relative mx-auto max-w-6xl">
        <MotionReveal className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.45em] text-amber-500">Categorias</p>
          <h2 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
            Explore por estilo de uso.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
            Uma curadoria organizada para rotina, casa, produtividade e lifestyle moderno.
          </p>
        </MotionReveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/categorias/${category.slug}`}
              className="group rounded-md border border-white/10 bg-white/[0.04] p-5 transition hover:-translate-y-1 hover:border-amber-300/40 hover:bg-amber-500/10"
            >
              <p className="text-lg font-semibold text-white">{category.title}</p>
              <p className="mt-2 text-sm leading-6 text-zinc-400">{category.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FeaturedProducts() {
  return (
    <section id="produtos" className="relative overflow-hidden border-b border-white/10 bg-black px-4 py-24 sm:px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(250,204,21,0.17),transparent_34%)]" />
      <div className="relative mx-auto max-w-6xl">
        <MotionReveal className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.45em] text-amber-500">Future Essentials</p>
          <h2 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-6xl">
            Produtos pensados para quem vive o moderno.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
            Gadgets, acessorios e essenciais de tecnologia com design premium, utilidade real e presenca futurista.
          </p>
        </MotionReveal>
        <ProductGrid />
      </div>
    </section>
  );
}

export function Benefits() {
  const secondaryProducts = products.slice(4);

  return (
    <section id="metodo" className="relative overflow-hidden border-b border-white/10 bg-[#050505] px-4 py-24 sm:px-6">
      <div className="absolute inset-0 opacity-30 grid-bg" />
      <div className="relative mx-auto max-w-7xl">
        <MotionReveal className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.45em] text-amber-500">Mais produtos</p>
          <h2 className="mt-4 text-4xl font-black text-white sm:text-5xl">
            Essenciais para o lifestyle moderno.
          </h2>
          <p className="mt-4 text-zinc-400">
            Uma colecao maior de tecnologia premium para rotina, mobilidade, casa inteligente e produtividade.
          </p>
        </MotionReveal>
        <ProductCarousel products={secondaryProducts} />
        <div className="mt-10 text-center">
          <Button asChild variant="premium">
            <Link href="/#produtos">Ver colecao completa</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export function Comparison() {
  return (
    <section id="comparacao" className="relative overflow-hidden border-b border-white/10 bg-[#070707] px-4 py-24 sm:px-6">
      <div className="absolute right-[-15%] top-0 h-96 w-96 rounded-full bg-amber-500/20 blur-3xl" />
      <div className="relative mx-auto max-w-6xl">
        <MotionReveal className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.45em] text-amber-500">Comparacao</p>
          <h2 className="mt-4 text-4xl font-black text-white sm:text-5xl">
            Uma marca tech moderna, nao uma vitrine aleatoria.
          </h2>
        </MotionReveal>
        <MotionReveal delay={0.08}>
          <div className="mt-12 overflow-hidden rounded-md border border-white/10 bg-black/50">
            <div className="grid grid-cols-[0.75fr_1fr_1fr] bg-gradient-to-r from-amber-600 to-amber-500 text-xs font-bold uppercase tracking-[0.18em] text-white">
              <div className="p-4">Area</div>
              <div className="p-4">Loja comum</div>
              <div className="p-4">JANKO premium</div>
            </div>
            {comparison.map(([area, common, nexa]) => (
              <div key={area} className="grid grid-cols-[0.75fr_1fr_1fr] border-t border-white/10 text-sm">
                <div className="p-4 font-semibold text-white">{area}</div>
                <div className="p-4 text-zinc-500">{common}</div>
                <div className="p-4 text-zinc-300">{nexa}</div>
              </div>
            ))}
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}

export function AboutBrand() {
  return (
    <section className="border-b border-white/10 bg-[#060606] px-4 py-24 sm:px-6">
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-md border border-white/10 bg-white/[0.04] md:grid-cols-[0.9fr_1.1fr]">
        <div className="relative min-h-[420px]">
          <Image
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=90"
            alt="Especialista de marca"
            fill
            sizes="(min-width: 768px) 45vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="p-8 sm:p-12">
          <p className="text-xs font-bold uppercase tracking-[0.45em] text-amber-500">Premium Technology Experience</p>
          <h2 className="mt-4 text-4xl font-black text-white">A JANKO nao vende produtos. Vende experiencia.</h2>
          <p className="mt-5 leading-8 text-zinc-400">
            Cada item precisa entregar praticidade, inovacao e estetica moderna. A proposta e simples: transformar tecnologia em parte natural de um lifestyle premium.
          </p>
          <Button asChild variant="premium" className="mt-8">
            <Link href="/#produtos">Ver produtos</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  return (
    <section className="overflow-hidden border-b border-white/10 bg-black px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <MotionReveal className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.45em] text-amber-500">Depoimentos</p>
          <h2 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
            Experiencias modernas deixam impressao.
          </h2>
        </MotionReveal>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.map(([quote, name, role], index) => (
            <MotionReveal key={name} delay={index * 0.08}>
              <Card className="rounded-md p-6">
                <div className="mb-5 flex gap-1 text-amber-300">★★★★★</div>
                <p className="text-base leading-8 text-zinc-200">“{quote}”</p>
                <div className="mt-8">
                  <p className="font-semibold text-white">{name}</p>
                  <p className="text-sm text-zinc-500">{role}</p>
                </div>
              </Card>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FAQ() {
  return (
    <section id="faq" className="border-b border-white/10 bg-[#060606] px-4 py-24 sm:px-6">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.75fr_1.25fr]">
        <MotionReveal>
          <p className="text-xs font-bold uppercase tracking-[0.45em] text-amber-500">Duvidas</p>
          <h2 className="mt-4 text-4xl font-black text-white">Perguntas frequentes respondidas com transparencia.</h2>
          <Button asChild variant="premium" className="mt-8">
            <Link href="/#produtos">Quero comprar</Link>
          </Button>
        </MotionReveal>
        <div className="space-y-3">
          {faqs.map(([question, answer], index) => (
            <MotionReveal key={question} delay={index * 0.04}>
              <details className="group rounded-md border border-white/10 bg-black/45">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold text-white">
                  {question}
                  <span className="grid h-8 w-8 place-items-center rounded-sm bg-amber-500">
                    <ChevronDown className="h-4 w-4 transition group-open:rotate-180" />
                  </span>
                </summary>
                <p className="px-5 pb-5 leading-7 text-zinc-400">{answer}</p>
              </details>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
