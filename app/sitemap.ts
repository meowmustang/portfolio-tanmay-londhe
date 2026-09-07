import type { MetadataRoute } from "next";
import { solutions } from "@/lib/solutions";
import { site } from "@/lib/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${site.url}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    ...solutions.map((s) => ({
      url: `${site.url}/solutions/${s.slug}/`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: s.featured ? 0.9 : 0.7,
    })),
  ];
}
