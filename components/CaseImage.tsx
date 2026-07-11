"use client";

import { useState } from "react";
import { withBase } from "@/lib/paths";

export default function CaseImage({
  src,
  title,
  note,
  alt,
}: {
  src: string;   // e.g. "/case-studies/architecture-fundflow-agent.png"
  title: string;
  note: string;
  alt: string;
}) {
  const [ok, setOk] = useState(true);

  if (ok) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={withBase(src)}
        alt={alt}
        onError={() => setOk(false)}
        className="w-full rounded-2xl border border-seam bg-charcoal"
      />
    );
  }

  return (
    <div className="flex aspect-[16/8] flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-seam bg-charcoal/60 p-8 text-center">
      <p className="font-display text-sm font-semibold text-paper/80">{title}</p>
      <p className="max-w-sm text-xs leading-relaxed text-mist/70">{note}</p>
    </div>
  );
}
