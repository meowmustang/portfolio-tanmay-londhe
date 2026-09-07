import { withBase } from "@/lib/paths";

/**
 * Renders a case-study visual as a captioned figure.
 * Returns nothing when the image is absent, so an unfinished case study
 * degrades to text rather than showing an empty placeholder.
 */
export default function CaseImage({
  src,
  caption,
  alt,
}: {
  src: string | null;
  caption: string;
  alt: string;
}) {
  if (!src) return null;

  return (
    <figure className="mt-10">
      <div className="glass overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={withBase(src)} alt={alt} loading="lazy" className="w-full" />
      </div>
      <figcaption className="mt-3 font-label text-[11px] font-semibold uppercase tracking-caps text-mist">
        {caption}
      </figcaption>
    </figure>
  );
}
