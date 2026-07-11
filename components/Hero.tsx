"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/lib/content";
import { withBase } from "@/lib/paths";

const pipeline = ["Identify", "Understand", "Design", "Build", "Deploy", "Drive adoption", "Measure impact"];

const initials = site.name.split(" ").map((n) => n[0]).join("");

export default function Hero() {
  const reduce = useReducedMotion();
  const [photoOk, setPhotoOk] = useState(true);

  const fade = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section className="relative overflow-hidden pb-20 pt-28 md:pb-28 md:pt-32" id="home">
      <div className="hero-grid absolute inset-0" aria-hidden="true" />
      <div className="absolute -top-40 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-ember/[0.07] blur-[120px]" aria-hidden="true" />

      <div className="wrap relative grid gap-14 lg:grid-cols-[1.25fr_0.85fr] lg:items-center lg:gap-10">
        {/* Text column */}
        <div>
          <motion.p {...fade(0)} className="eyebrow">
            AI · Automation · Digital Transformation
          </motion.p>

          <motion.h1
            {...fade(0.12)}
            className="mt-6 max-w-2xl font-display text-[2.4rem] font-semibold leading-[1.06] tracking-tight text-paper md:text-[3.8rem] lg:max-w-xl"
          >
            Building AI &amp; automation solutions that{" "}
            <span className="text-ember">transform business operations</span>
          </motion.h1>

          <motion.p {...fade(0.24)} className="mt-7 max-w-xl text-base leading-relaxed text-mist md:text-lg">
            Senior Executive – Business Applications focused on delivering enterprise-grade
            automation, AI solutions, digital transformation initiatives, intelligent workflows,
            and business applications across multiple business functions.
          </motion.p>

          <motion.div {...fade(0.36)} className="mt-10 flex flex-wrap items-center gap-3">
            <Link href="/#solutions" className="focus-ring rounded-full bg-ember px-6 py-3 font-label text-sm font-bold text-ink transition-transform hover:-translate-y-0.5">
              View my work
            </Link>
            <a href={withBase(site.resumeFile)} download className="focus-ring rounded-full border border-seam px-6 py-3 font-label text-sm font-semibold text-paper transition-colors hover:border-mist">
              Download resume
            </a>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="focus-ring rounded-full border border-seam px-6 py-3 font-label text-sm font-semibold text-paper transition-colors hover:border-mist">
              Connect on LinkedIn
            </a>
            <Link href="/#contact" className="focus-ring px-2 py-3 font-label text-sm font-semibold text-mist transition-colors hover:text-ember">
              Contact me →
            </Link>
          </motion.div>
        </div>

        {/* Photo column */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 28, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-sm lg:max-w-none"
        >
          <div className="absolute -inset-6 rounded-[2rem] bg-ember/10 blur-3xl" aria-hidden="true" />
          <div className="relative overflow-hidden rounded-[1.75rem] border border-seam bg-charcoal">
            <div className="aspect-[4/5] w-full">
              {photoOk ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={withBase(site.photo)}
                  alt={site.name}
                  onError={() => setPhotoOk(false)}
                  className="h-full w-full object-cover grayscale-[15%]"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-b from-charcoal to-ink px-6 text-center">
                  <span className="font-display text-5xl font-semibold text-paper/25">{initials}</span>
                  <p className="max-w-[14rem] text-xs leading-relaxed text-mist/70">
                    Add a headshot at <code className="text-ember/80">public{site.photo}</code>
                  </p>
                </div>
              )}
            </div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-white/[0.04]" aria-hidden="true" />
          </div>
          <div className="mt-4 flex items-center gap-2 px-1">
            <span className="h-1.5 w-1.5 rounded-full bg-ember" aria-hidden="true" />
            <p className="font-label text-[13px] font-semibold text-paper/90">
              {site.role}
              <span className="text-mist"> · Oberoi Realty </span>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Signature: the delivery pipeline */}
      <div className="wrap relative">
        <motion.div {...fade(0.52)} className="mt-16 border-t border-seam pt-6 md:mt-20">
          <p className="font-label text-[10px] font-semibold uppercase tracking-caps text-mist">
            How problems become production systems
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
            {pipeline.map((step, i) => (
              <motion.span
                key={step}
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 + i * 0.12, duration: 0.5 }}
                className="flex items-center gap-3"
              >
                <span className="font-display text-sm font-medium text-paper/80">{step}</span>
                {i < pipeline.length - 1 && (
                  <span className="h-px w-6 bg-gradient-to-r from-ember/70 to-ember/10" aria-hidden="true" />
                )}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}