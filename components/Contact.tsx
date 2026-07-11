"use client";

import { useState } from "react";
import { site } from "@/lib/content";
import { withBase } from "@/lib/paths";
import Reveal from "./Reveal";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", org: "", message: "" });

  const submit = () => {
    const subject = encodeURIComponent(`Opportunity — ${form.org || form.name || "via portfolio"}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nOrganization: ${form.org}\n\n${form.message}`
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  };

  const field =
    "focus-ring w-full rounded-xl border border-seam bg-charcoal px-4 py-3 text-sm text-paper placeholder:text-mist/60";

  return (
    <section id="contact" className="border-t border-seam py-24 md:py-32">
      <div className="wrap grid gap-14 lg:grid-cols-2">
        <Reveal>
          <p className="eyebrow">Contact</p>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight md:text-[2.6rem]">
            Let&apos;s build better business systems
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-mist">
            Open to conversations across AI automation, digital transformation, technology
            consulting, enterprise solutions, and product-focused roles. If your team has a
            process worth transforming, I&apos;d like to hear about it.
          </p>
          <dl className="mt-10 space-y-5">
            <div>
              <dt className="font-label text-[11px] font-semibold uppercase tracking-caps text-mist">Email</dt>
              <dd>
                <a href={`mailto:${site.email}`} className="focus-ring rounded-sm font-label text-sm font-semibold text-paper hover:text-ember">
                  {site.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-label text-[11px] font-semibold uppercase tracking-caps text-mist">LinkedIn</dt>
              <dd>
                <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="focus-ring rounded-sm font-label text-sm font-semibold text-paper hover:text-ember">
                  Connect with me →
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-label text-[11px] font-semibold uppercase tracking-caps text-mist">Resume</dt>
              <dd>
                <a href={withBase(site.resumeFile)} download className="focus-ring rounded-sm font-label text-sm font-semibold text-paper hover:text-ember">
                  Download resume →
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-label text-[11px] font-semibold uppercase tracking-caps text-mist">Location</dt>
              <dd className="font-label text-sm font-semibold text-paper">{site.location}</dd>
            </div>
          </dl>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-2xl border border-seam bg-graphite p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block font-label text-xs font-semibold text-mist">Name</span>
                <input
                  className={field}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  autoComplete="name"
                />
              </label>
              <label className="block">
                <span className="mb-2 block font-label text-xs font-semibold text-mist">Email</span>
                <input
                  type="email"
                  className={field}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@company.com"
                  autoComplete="email"
                />
              </label>
            </div>
            <label className="mt-4 block">
              <span className="mb-2 block font-label text-xs font-semibold text-mist">Organization</span>
              <input
                className={field}
                value={form.org}
                onChange={(e) => setForm({ ...form, org: e.target.value })}
                placeholder="Company or team"
                autoComplete="organization"
              />
            </label>
            <label className="mt-4 block">
              <span className="mb-2 block font-label text-xs font-semibold text-mist">Message</span>
              <textarea
                className={`${field} min-h-[130px] resize-y`}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="What are you working on?"
              />
            </label>
            <button
              onClick={submit}
              className="focus-ring mt-6 w-full rounded-full bg-ember px-6 py-3 font-label text-sm font-bold text-ink transition-transform hover:-translate-y-0.5"
            >
              Send message
            </button>
            <p className="mt-3 text-center text-[11px] text-mist/70">
              Opens your mail client with the message prefilled.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
