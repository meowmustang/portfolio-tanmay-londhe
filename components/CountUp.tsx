"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts up to `value` when scrolled into view.
 *
 * The final number is what renders server-side, so the statistic is present
 * for crawlers, social previews, and anyone whose JavaScript never runs — the
 * previous version emitted a literal 0 into the static HTML. The count-up only
 * applies to tiles that are still below the fold on load, which avoids the
 * final-then-zero flash on anything already visible.
 */
export default function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || typeof IntersectionObserver === "undefined") return;

    // Already on screen: leave the rendered value alone rather than flashing it.
    const box = el.getBoundingClientRect();
    if (box.top < window.innerHeight) return;

    setDisplay(0);
    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        const duration = 1400;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setDisplay(Math.round(eased * value));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { rootMargin: "0px 0px -60px 0px" }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return (
    <span ref={ref} className="tabular-nums">
      {display.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}
