"use client";

import { useState, type CSSProperties } from "react";
import Link from "next/link";
import { site, positioning } from "@/lib/content";
import { withBase } from "@/lib/paths";

const initials = site.name
  .split(" ")
  .map((n) => n[0])
  .join("");

/** Staggered entrance driven by CSS, so the hero paints without waiting for React. */
const enter = (delay: number) => ({ "--enter-delay": `${delay}s` }) as CSSProperties;

export default function Hero() {
  const [photoOk, setPhotoOk] = useState(true);

  return (
    <section className="relative pb-14 pt-24 md:pb-20 md:pt-28" id="home">
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="wrap relative grid gap-6 lg:grid-cols-[1.35fr_0.75fr] lg:items-stretch">
        {/* Text panel */}
        <div
          style={enter(0)}
          className="glass-lit enter flex flex-col justify-center p-7 sm:p-9 md:p-11"
        >
          <p className="eyebrow">{positioning.descriptor}</p>

          {/* One h1 carrying both the name and the positioning, so the name is
              still the page's primary heading for search. */}
          <h1 className="mt-5">
            <span className="block font-display text-lg font-semibold tracking-tight text-mist">
              {site.name}
            </span>
            <span className="mt-2 block max-w-[30rem] font-display text-[2rem] font-semibold leading-[1.1] tracking-tight text-paper sm:text-[2.35rem] md:text-[3rem]">
              I turn business problems into{" "}
              <span className="text-ember">
                {/* The hyphen is a break opportunity, so keep the compound whole. */}
                <span className="whitespace-nowrap">AI-powered</span> systems
              </span>
              .
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-mist md:text-[17px]">
            {positioning.supporting}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/#work"
              className="focus-ring rounded-full bg-ember px-6 py-3 font-label text-sm font-bold text-ink shadow-[0_10px_30px_-12px_rgba(255,132,0,0.7)] transition-transform hover:-translate-y-0.5"
            >
              {positioning.primaryCta}
            </Link>
            <a
              href={withBase(site.resumeFile)}
              download
              className="glass-chip focus-ring px-6 py-3 font-label text-sm font-semibold text-paper transition-colors hover:border-white/25"
            >
              {positioning.secondaryCta}
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring inline-flex min-h-[24px] items-center px-2 py-3 font-label text-sm font-semibold text-mist transition-colors hover:text-ember"
            >
              LinkedIn →
            </a>
          </div>
        </div>

        {/* Photo panel */}
        <div
          style={enter(0.12)}
          className="glass-lit enter relative mx-auto w-full max-w-[19rem] p-3 lg:max-w-none"
        >
          <div className="relative overflow-hidden rounded-[1.35rem]">
            <div className="aspect-[4/5] w-full">
              {photoOk ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={withBase(site.photo)}
                  alt={site.name}
                  onError={() => setPhotoOk(false)}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-white/[0.03]">
                  <span className="font-display text-5xl font-semibold text-paper/25">
                    {initials}
                  </span>
                </div>
              )}
            </div>
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-white/[0.06]"
              aria-hidden="true"
            />
          </div>
          <div className="mt-3.5 flex items-start gap-2 px-2 pb-1">
            <span
              className="mt-[0.4rem] h-1.5 w-1.5 shrink-0 rounded-full bg-ember shadow-[0_0_10px_rgba(255,132,0,0.9)]"
              aria-hidden="true"
            />
            <p className="font-label text-[12.5px] font-semibold leading-snug text-paper/90">
              {site.role}
              <span className="mt-0.5 block text-mist">
                {site.company} · {site.location}
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
