"use client";

import { useState } from "react";
import { site } from "@/lib/content";
import { withBase } from "@/lib/paths";
import Reveal from "./Reveal";

/**
 * The site is a static export, so there is no server to post to.
 * Set NEXT_PUBLIC_FORM_ENDPOINT (Formspree, Web3Forms, Basin, ...) to get a real
 * submission; with no endpoint configured the form composes an email instead,
 * and the copy-address fallback covers visitors with no mail client.
 */
const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT || "";

type State = "idle" | "sending" | "sent" | "composed" | "error";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", org: "", message: "" });
  const [state, setState] = useState<State>("idle");
  const [copied, setCopied] = useState(false);
  const [touched, setTouched] = useState(false);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  const valid =
    form.name.trim().length > 1 && emailValid && form.message.trim().length > 9;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!valid) return;

    if (ENDPOINT) {
      setState("sending");
      try {
        const res = await fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(form),
        });
        setState(res.ok ? "sent" : "error");
      } catch {
        setState("error");
      }
      return;
    }

    const subject = encodeURIComponent(`Opportunity — ${form.org || form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nOrganisation: ${form.org}\n\n${form.message}`
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setState("composed");
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      /* Clipboard blocked — the address is visible beside the button anyway. */
    }
  };

  const field =
    "focus-ring w-full rounded-xl border border-white/[0.09] bg-white/[0.04] px-4 py-3 text-sm text-paper placeholder:text-mist/90 transition-colors focus:border-ember/50 focus:bg-white/[0.06]";
  const flag = (bad: boolean) => (touched && bad ? " border-red-500/60" : "");

  return (
    <section id="contact" className="py-20 md:py-28">
      <div className="wrap grid gap-14 lg:grid-cols-2">
        <Reveal>
          <p className="eyebrow">Contact</p>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight md:text-[2.6rem]">
            Where should the next transformation start?
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-mist">
            Open to conversations about AI transformation, intelligent automation programmes,
            and platform ownership. If a process in your organisation costs more than it
            should, describe how it runs today and I will tell you what I think is worth
            changing.
          </p>

          <dl className="mt-10 space-y-5">
            <div>
              <dt className="font-label text-[11px] font-semibold uppercase tracking-caps text-mist">
                Email
              </dt>
              <dd className="mt-1 flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${site.email}`}
                  className="focus-ring inline-flex min-h-[24px] items-center rounded-sm font-label text-sm font-semibold text-paper hover:text-ember"
                >
                  {site.email}
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="glass-chip focus-ring min-h-[24px] px-3 py-1 font-label text-[11px] font-semibold text-mist transition-colors hover:border-white/25 hover:text-paper"
                >
                  {copied ? "Copied" : "Copy"}
                </button>
              </dd>
            </div>
            <div>
              <dt className="font-label text-[11px] font-semibold uppercase tracking-caps text-mist">
                LinkedIn
              </dt>
              <dd>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring inline-flex min-h-[24px] items-center rounded-sm font-label text-sm font-semibold text-paper hover:text-ember"
                >
                  Connect with me →
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-label text-[11px] font-semibold uppercase tracking-caps text-mist">
                Resume
              </dt>
              <dd>
                <a
                  href={withBase(site.resumeFile)}
                  download
                  className="focus-ring inline-flex min-h-[24px] items-center rounded-sm font-label text-sm font-semibold text-paper hover:text-ember"
                >
                  Download PDF →
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-label text-[11px] font-semibold uppercase tracking-caps text-mist">
                Location
              </dt>
              <dd className="font-label text-sm font-semibold text-paper">{site.location}</dd>
            </div>
          </dl>
        </Reveal>

        <Reveal delay={0.1}>
          <form
            onSubmit={submit}
            noValidate
            className="glass-lit p-7 sm:p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block font-label text-xs font-semibold text-mist">
                  Name
                </span>
                <input
                  className={field + flag(form.name.trim().length < 2)}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  autoComplete="name"
                  required
                />
              </label>
              <label className="block">
                <span className="mb-2 block font-label text-xs font-semibold text-mist">
                  Email
                </span>
                <input
                  type="email"
                  className={field + flag(!emailValid)}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@company.com"
                  autoComplete="email"
                  required
                />
              </label>
            </div>

            <label className="mt-4 block">
              <span className="mb-2 block font-label text-xs font-semibold text-mist">
                Organisation <span className="font-normal text-mist">(optional)</span>
              </span>
              <input
                className={field}
                value={form.org}
                onChange={(e) => setForm({ ...form, org: e.target.value })}
                placeholder="Company or team"
                autoComplete="organization"
              />
            </label>

            <label className="mt-4 block">
              <span className="mb-2 block font-label text-xs font-semibold text-mist">
                What process are you trying to fix?
              </span>
              <textarea
                className={field + " min-h-[130px] resize-y" + flag(form.message.trim().length < 10)}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="How it runs today, who it affects, and what it costs you."
                required
              />
            </label>

            <button
              type="submit"
              disabled={state === "sending"}
              className="focus-ring mt-6 w-full rounded-full bg-ember px-6 py-3 font-label text-sm font-bold text-ink transition-transform hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
            >
              {state === "sending" ? "Sending..." : ENDPOINT ? "Send message" : "Compose email"}
            </button>

            <p
              aria-live="polite"
              className="mt-3 min-h-[2rem] text-center text-[11px] leading-relaxed text-mist"
            >
              {touched && !valid &&
                "Add your name, a valid email, and a line or two about the process."}
              {state === "sent" && (
                <span className="text-ember">
                  Thanks — message received. I will reply shortly.
                </span>
              )}
              {state === "composed" &&
                "Your mail client should be open. If nothing happened, copy the address above instead."}
              {state === "error" && (
                <span className="text-red-400">
                  That did not go through. Please email {site.email} directly.
                </span>
              )}
              {state === "idle" && !touched && !ENDPOINT &&
                "Opens your mail client with the message prefilled."}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
