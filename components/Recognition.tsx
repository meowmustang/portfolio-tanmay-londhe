"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { recognition } from "@/lib/content";
import { withBase } from "@/lib/paths";
import type { GalleryItem } from "@/lib/galleryAssets";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Recognition({ gallery }: { gallery: GalleryItem[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);

  const close = useCallback(() => setOpenIdx(null), []);

  // Trap Escape and Tab, lock body scroll, move focus in, restore it on close.
  useEffect(() => {
    if (openIdx === null) return;
    restoreRef.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "Tab") {
        // The dialog holds a single focusable control — keep focus on it.
        e.preventDefault();
        closeRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      restoreRef.current?.focus();
    };
  }, [openIdx, close]);

  const active = openIdx === null ? null : gallery[openIdx];

  return (
    <section id="recognition" className="py-20 md:py-28">
      <div className="wrap">
        <SectionHeading
          eyebrow="Recognition"
          title="Adoption is the only real proof"
          lede="Internal transformation runs on trust. These acknowledgements — from business teams, finance leadership, and cross-functional stakeholders — are the signal that each system is genuinely being used, not merely delivered."
        />

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {recognition.map((r, i) => (
            <Reveal key={r.context + r.source} delay={(i % 3) * 0.07}>
              <figure className="glass glass-hover flex h-full flex-col p-7">
                <span className="font-display text-3xl leading-none text-ember" aria-hidden="true">
                  &ldquo;
                </span>
                <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-paper/90">
                  {r.quote}
                </blockquote>
                <figcaption className="glass-rule mt-6 border-t pt-4">
                  <p className="font-label text-sm font-bold text-paper">{r.source}</p>
                  <p className="mt-1 font-label text-[11px] font-semibold uppercase tracking-caps text-mist">
                    {r.context}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        {gallery.length > 0 && (
          <>
            <Reveal className="mt-20">
              <p className="font-label text-[11px] font-semibold uppercase tracking-caps text-mist">
                Appreciation gallery · previews blurred for discretion — click to view
              </p>
            </Reveal>
            <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
              {gallery.map((g, i) => (
                <Reveal key={g.src} delay={i * 0.05}>
                  <button
                    onClick={() => setOpenIdx(i)}
                    className="glass focus-ring group relative block w-full overflow-hidden !rounded-xl"
                    aria-label={`View: ${g.caption}`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={withBase(g.src)}
                      alt=""
                      loading="lazy"
                      className="aspect-[4/3] w-full object-cover blur-md transition-all duration-500 group-hover:scale-105 group-hover:blur-sm"
                    />
                    <span className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/90 via-ink/20 to-transparent p-3">
                      <span className="text-left font-label text-[11px] font-semibold leading-snug text-paper">
                        {g.caption}
                      </span>
                    </span>
                  </button>
                </Reveal>
              ))}
            </div>
          </>
        )}

        {active && (
          <div
            className="lightbox fixed inset-0 z-[60] flex items-center justify-center bg-ink/90 p-6 backdrop-blur-sm"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={active.caption}
          >
            <figure
              className="lightbox-panel max-h-[85vh] max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={withBase(active.src)}
                alt={active.caption}
                className="max-h-[75vh] w-auto rounded-2xl border border-white/10"
              />
              <figcaption className="mt-3 flex items-center justify-between gap-4">
                <p className="font-label text-sm text-mist">{active.caption}</p>
                <button
                  ref={closeRef}
                  onClick={close}
                  className="glass-chip focus-ring px-4 py-1.5 font-label text-xs font-semibold text-paper hover:border-white/25"
                >
                  Close
                </button>
              </figcaption>
            </figure>
          </div>
        )}
      </div>
    </section>
  );
}
