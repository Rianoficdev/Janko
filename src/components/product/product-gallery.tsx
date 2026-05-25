"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Maximize2 } from "lucide-react";
import type { Product } from "@/types/commerce";

export function ProductGallery({ product }: { product: Product }) {
  const [selected, setSelected] = useState(product.gallery[0] ?? product.image);
  const [zoomOpen, setZoomOpen] = useState(false);

  return (
    <div className="space-y-4">
      <motion.div
        layout
        className="group relative aspect-square overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04]"
      >
        <Image
          src={selected}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <button
          type="button"
          aria-label="Abrir zoom da imagem"
          onClick={() => setZoomOpen(true)}
          className="absolute bottom-5 right-5 rounded-full border border-white/10 bg-black/40 p-3 text-white backdrop-blur-xl transition hover:border-amber-300/60 hover:text-amber-200"
        >
          <Maximize2 className="h-5 w-5" />
        </button>
      </motion.div>
      <div className="grid grid-cols-3 gap-3">
        {product.gallery.map((image) => (
          <button
            type="button"
            key={image}
            onClick={() => setSelected(image)}
            className={`aspect-square overflow-hidden rounded-2xl border transition ${
              selected === image ? "border-amber-300/70" : "border-white/10 opacity-70 hover:opacity-100"
            }`}
          >
            <Image src={image} alt="" width={220} height={220} className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
      <AnimatePresence>
        {zoomOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Fechar zoom"
              className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setZoomOpen(false)}
            />
            <motion.div
              className="fixed inset-4 z-50 grid place-items-center pointer-events-none"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
            >
              <Image
                src={selected}
                alt={product.name}
                width={1400}
                height={1400}
                className="max-h-full max-w-full rounded-md border border-white/10 object-contain shadow-[0_0_90px_rgba(250,204,21,0.18)]"
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
