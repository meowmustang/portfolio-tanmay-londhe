"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { withBase } from "@/lib/paths";

type Screen = { src: string; caption: string };

/**
 * Product screenshots with a click-to-enlarge lightbox. Screenshots carry small
 * type, so a grid thumbnail is not readable on its own and needs the enlarged view.
 */
export default function ScreenGallery({
  screens,
  note,
}: {
  screens: Screen[];
  note?: string;
}) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);

  const close = useCallback(() => setOpenIdx(null), []);

  useEffect(() => {
    if (openIdx === null) return;
    restoreRef.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") setOpenIdx((i) => (i === null ? i : (i + 1) % screens.length));
      if (e.key === "ArrowLeft")
        setOpenIdx((i) => (i === null ? i : (i - 1 + screens.length) % screens.length));
      if (e.key === "Tab") {
        // Only one focusable control in the dialog — keep focus on it.
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
  }, [openIdx, close, screens.length]);

  if (screens.length === 0) return null;
  const active = openIdx === null ? null : screens[openIdx];

  return (
    <div className="mt-10">
      <p className="font-label text-[11px] font-semibold uppercase tracking-caps text-mist">
        The product
      </p>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {screens.map((s, i) => (
          <figure key={s.src} className="flex flex-col">
            <button
              onClick={() => setOpenIdx(i)}
              className="glass glass-hover focus-ring group block overflow-hidden !p-0"
              aria-label={`Enlarge: ${s.caption}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={withBase(s.src)}
                alt={s.caption}
                width={1500}
                height={961}
                loading="lazy"
                decoding="async"
                className="block w-full"
              />
            </button>
            <figcaption className="mt-3 text-[13px] leading-relaxed text-mist">
              {s.caption}
            </figcaption>
          </figure>
        ))}
      </div>

      {note && <p className="mt-5 text-xs leading-relaxed text-mist">{note}</p>}

      {active && (
        <div
          className="lightbox fixed inset-0 z-[70] flex items-center justify-center bg-ink/92 p-4 backdrop-blur-sm sm:p-8"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={active.caption}
        >
          <figure
            className="lightbox-panel flex max-h-full w-full max-w-6xl flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={withBase(active.src)}
              alt={active.caption}
              className="max-h-[76vh] w-full rounded-2xl border border-white/10 object-contain"
            />
            <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-3">
              <p className="max-w-3xl text-[13px] leading-relaxed text-mist">
                {active.caption}
              </p>
              <div className="flex items-center gap-2">
                <span className="font-label text-[11px] font-semibold text-mist">
                  {openIdx! + 1} / {screens.length}
                </span>
                <button
                  ref={closeRef}
                  onClick={close}
                  className="glass-chip focus-ring min-h-[24px] px-4 py-1.5 font-label text-xs font-semibold text-paper hover:border-white/25"
                >
                  Close
                </button>
              </div>
            </figcaption>
          </figure>
        </div>
      )}
    </div>
  );
}
