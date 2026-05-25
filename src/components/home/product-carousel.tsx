"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard } from "@/components/product/product-card";
import type { Product } from "@/types/commerce";

export function ProductCarousel({ products }: { products: Product[] }) {
  const visibleCount = Math.min(3, products.length);
  const hasCarousel = products.length > visibleCount;
  const [startIndex, setStartIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const visibleProducts = useMemo(
    () =>
      Array.from({ length: visibleCount }, (_, offset) => products[(startIndex + offset) % products.length]).filter(
        Boolean,
      ),
    [products, startIndex, visibleCount],
  );

  function previousProduct() {
    if (!hasCarousel) return;
    setDirection(-1);
    setStartIndex((current) => (current - 1 + products.length) % products.length);
  }

  function nextProduct() {
    if (!hasCarousel) return;
    setDirection(1);
    setStartIndex((current) => (current + 1) % products.length);
  }

  return (
    <div className="relative mt-14">
      {hasCarousel && (
        <>
          <button
            type="button"
            aria-label="Produto anterior"
            onClick={previousProduct}
            className="absolute left-0 top-1/2 z-20 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/10 bg-black/80 text-white shadow-[0_0_45px_rgba(250,204,21,0.18)] backdrop-blur-xl transition hover:border-amber-300/60 hover:text-amber-200 max-md:-left-1"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Proximo produto"
            onClick={nextProduct}
            className="absolute right-0 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 translate-x-1/2 place-items-center rounded-full border border-white/10 bg-black/80 text-white shadow-[0_0_45px_rgba(250,204,21,0.18)] backdrop-blur-xl transition hover:border-amber-300/60 hover:text-amber-200 max-md:-right-1"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}
      <div className="grid gap-5 md:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {visibleProducts.map((product, index) => (
            <motion.div
              key={`${product.id}-${startIndex}`}
              layout
              initial={{
                opacity: 0,
                x: direction * 28,
                filter: "blur(8px)",
                scale: 0.985,
              }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)", scale: 1 }}
              exit={{
                opacity: 0,
                x: direction * -28,
                filter: "blur(8px)",
                scale: 0.985,
              }}
              transition={{ duration: 0.35, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
              className="product-card-in"
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className="mt-5 flex justify-center gap-2">
        {products.map((product, index) => (
          <button
            key={product.id}
            type="button"
            aria-label={`Ir para produto ${index + 1}`}
            onClick={() => {
              setDirection(index > startIndex ? 1 : -1);
              setStartIndex(index);
            }}
            className={`h-1.5 rounded-full transition-all ${
              index === startIndex ? "w-8 bg-amber-300" : "w-2 bg-white/20 hover:w-8 hover:bg-amber-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
