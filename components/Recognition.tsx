"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { recognition } from "@/lib/content";
import { withBase } from "@/lib/paths";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

// Drop screenshot files into /public/recognition and list them here.
// Previews render blurred until clicked, keeping the gallery discreet by default.
const gallery: { src: string; caption: string }[] = [
  { src: "/recognition/appreciation-1.png", caption: "Formal appreciation" },
  { src: "/recognition/appreciation-2.png", caption: "Leadership endorsement" },
  { src: "/recognition/appreciation-3.png", caption: "Business appreciation" },
  { src: "/recognition/appreciation-4.png", caption: "Project success acknowledgement" },
];

export default function Recognition() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [available, setAvailable] = useState<boolean[]>(() => gallery.map(() => true));

  useEffect(() => {
    if (openIdx === null) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenIdx(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIdx]);

  const visible = gallery.filter((_, i) => available[i]);

  return (
    <section id="recognition" className="border-t border-seam bg-graphite py-24 md:py-32">
      <div className="wrap">
        <SectionHeading
          eyebrow="Recognition"
          title="Recognition & appreciation"
          lede="Trust is the currency of internal automation. These acknowledgements — from business teams, leadership, and cross-functional stakeholders — are the adoption signal behind every system."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {recognition.map((r, i) => (
            <Reveal key={r.context + r.source} delay={(i % 3) * 0.07}>
              <figure className="flex h-full flex-col rounded-2xl border border-seam bg-charcoal p-7 transition-colors hover:border-ember/30">
                <span className="font-display text-3xl leading-none text-ember" aria-hidden="true">
                  &ldquo;
                </span>
                <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-paper/90">
                  {r.quote}
                </blockquote>
                <figcaption className="mt-6 border-t border-seam pt-4">
                  <p className="font-label text-sm font-bold text-paper">{r.source}</p>
                  <p className="mt-1 font-label text-[11px] font-semibold uppercase tracking-caps text-mist">
                    {r.context}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        {visible.length > 0 && (
          <>
            <Reveal className="mt-20">
              <p className="font-label text-[11px] font-semibold uppercase tracking-caps text-mist">
                Appreciation gallery · previews blurred for discretion — click to view
              </p>
            </Reveal>
            <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
              {gallery.map((g, i) =>
                available[i] ? (
                  <Reveal key={g.src} delay={i * 0.05}>
                    <button
                      onClick={() => setOpenIdx(i)}
                      className="focus-ring group relative block w-full overflow-hidden rounded-xl border border-seam bg-charcoal"
                      aria-label={`View: ${g.caption}`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={withBase(g.src)}
                        alt=""
                        className="aspect-[4/3] w-full object-cover blur-md transition-all duration-500 group-hover:scale-105 group-hover:blur-sm"
                        onError={() =>
                          setAvailable((prev) => prev.map((v, j) => (j === i ? false : v)))
                        }
                      />
                      <span className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/90 via-ink/20 to-transparent p-3">
                        <span className="text-left font-label text-[11px] font-semibold leading-snug text-paper">
                          {g.caption}
                        </span>
                      </span>
                    </button>
                  </Reveal>
                ) : null
              )}
            </div>
          </>
        )}

        <AnimatePresence>
          {openIdx !== null && available[openIdx] && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/90 p-6 backdrop-blur-sm"
              onClick={() => setOpenIdx(null)}
              role="dialog"
              aria-modal="true"
              aria-label={gallery[openIdx].caption}
            >
              <motion.figure
                initial={{ scale: 0.94, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.94, opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="max-h-[85vh] max-w-4xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={withBase(gallery[openIdx].src)}
                  alt={gallery[openIdx].caption}
                  className="max-h-[75vh] w-auto rounded-xl border border-seam"
                />
                <figcaption className="mt-3 flex items-center justify-between gap-4">
                  <p className="font-label text-sm text-mist">{gallery[openIdx].caption}</p>
                  <button
                    onClick={() => setOpenIdx(null)}
                    className="focus-ring rounded-full border border-seam px-4 py-1.5 font-label text-xs font-semibold text-paper hover:border-mist"
                  >
                    Close
                  </button>
                </figcaption>
              </motion.figure>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
