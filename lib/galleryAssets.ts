import fs from "node:fs";
import path from "node:path";

/**
 * Build-time enumeration of the appreciation screenshots present in /public.
 * Captions are matched by filename so the gallery never renders a broken tile
 * and never depends on a client-side onError fallback.
 */
const DIR = path.join(process.cwd(), "public", "recognition");

const CAPTIONS: Record<string, string> = {
  "appreciation-1.png": "Formal appreciation",
  "appreciation-2.png": "Leadership endorsement",
  "appreciation-3.png": "Business appreciation",
  "appreciation-4.png": "Project success acknowledgement",
};

export type GalleryItem = { src: string; caption: string };

export function appreciationGallery(): GalleryItem[] {
  let names: string[];
  try {
    names = fs.readdirSync(DIR).filter((n) => /\.(png|jpe?g|webp)$/i.test(n));
  } catch {
    return [];
  }
  return names
    .sort()
    .map((name) => ({
      src: `/recognition/${name}`,
      caption: CAPTIONS[name] ?? "Appreciation",
    }));
}
