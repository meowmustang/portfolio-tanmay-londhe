"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const links = [
  { id: "orbit", label: "ORBIT" },
  { id: "solutions", label: "Case studies" },
  { id: "impact", label: "Impact" },
  { id: "process", label: "Approach" },
  { id: "about", label: "About" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight whichever section currently owns the upper third of the viewport.
  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0 || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Close the mobile sheet when the viewport grows past the breakpoint.
  useEffect(() => {
    if (!open) return;
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "nav-glass border-b border-white/[0.07] bg-ink/70 backdrop-blur-xl backdrop-saturate-150"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="wrap flex h-16 items-center justify-between">
        <Link href="/" className="focus-ring group flex min-h-[24px] items-baseline gap-2 rounded-sm py-1">
          <span className="font-display text-[15px] font-semibold tracking-tight text-paper">
            Tanmay Londhe
          </span>
          <span className="hidden font-label text-[10px] font-semibold uppercase tracking-caps text-mist transition-colors group-hover:text-ember sm:inline">
            AI Transformation
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {links.map((l) => (
            <Link
              key={l.id}
              href={`/#${l.id}`}
              data-active={active === l.id ? "true" : undefined}
              className="nav-link focus-ring relative inline-flex min-h-[24px] items-center rounded-sm py-1 font-label text-[13px] font-semibold text-mist transition-colors hover:text-paper data-[active=true]:text-paper"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            className="focus-ring inline-flex min-h-[24px] items-center rounded-full border border-ember/50 bg-ember/[0.08] px-4 py-1.5 font-label text-[13px] font-semibold text-ember transition-all hover:bg-ember hover:text-ink"
          >
            Let&apos;s talk
          </Link>
        </nav>

        <button
          className="focus-ring rounded-sm p-2 text-mist md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            {open ? (
              <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.5" />
            ) : (
              <path d="M2 5h16M2 10h16M2 15h16" stroke="currentColor" strokeWidth="1.5" />
            )}
          </svg>
        </button>
      </div>

      <nav
        id="mobile-nav"
        hidden={!open}
        className="mobile-sheet nav-glass border-b border-white/[0.07] bg-ink/85 backdrop-blur-xl md:hidden"
        aria-label="Mobile"
      >
        <div className="wrap flex flex-col gap-1 py-4">
          {links.map((l) => (
            <Link
              key={l.id}
              href={`/#${l.id}`}
              onClick={() => setOpen(false)}
              data-active={active === l.id ? "true" : undefined}
              className="focus-ring rounded-sm py-2 font-label text-sm font-semibold text-mist hover:text-paper data-[active=true]:text-ember"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            onClick={() => setOpen(false)}
            className="focus-ring mt-2 rounded-full bg-ember px-5 py-2.5 text-center font-label text-sm font-bold text-ink"
          >
            Let&apos;s talk
          </Link>
        </div>
      </nav>
    </header>
  );
}
