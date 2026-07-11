import Reveal from "./Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
}) {
  return (
    <Reveal className="max-w-3xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-paper md:text-[2.6rem]">
        {title}
      </h2>
      {lede && <p className="mt-5 text-base leading-relaxed text-mist md:text-lg">{lede}</p>}
    </Reveal>
  );
}
