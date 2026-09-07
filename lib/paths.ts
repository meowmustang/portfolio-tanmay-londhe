/** Prefix static-asset URLs with the configured base path (for GitHub Pages project sites). */
export function withBase(path: string) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return `${base}${path}`;
}
