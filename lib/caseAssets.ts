import fs from "node:fs";
import path from "node:path";

/**
 * Enumerates the case-study images that actually exist in /public at build time.
 * Because the site is a static export, this runs once during `next build`, so
 * missing visuals are simply omitted from the markup instead of rendering
 * developer-facing "add an image here" placeholders to real visitors.
 */
const CASE_DIR = path.join(process.cwd(), "public", "case-studies");

const files: ReadonlySet<string> = (() => {
  try {
    return new Set(fs.readdirSync(CASE_DIR));
  } catch {
    return new Set<string>();
  }
})();

export type CaseVisualKind = "architecture" | "workflow" | "screenshot";

/** Returns the public URL for a case-study visual, or null when the file is absent. */
export function caseVisual(kind: CaseVisualKind, slug: string): string | null {
  const name = `${kind}-${slug}.png`;
  return files.has(name) ? `/case-studies/${name}` : null;
}
