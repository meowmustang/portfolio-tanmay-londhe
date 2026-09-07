import type { Metadata } from "next";
import { Inter, Manrope, Space_Grotesk } from "next/font/google";
import { site } from "@/lib/content";
import HydrationFlag from "@/components/HydrationFlag";
import { withBase } from "@/lib/paths";
import "./globals.css";

/* Self-hosted at build time: no render-blocking request to fonts.googleapis.com,
   no layout shift, and no third-party connection from the visitor's browser. */
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-label",
  display: "swap",
});

const title = "Tanmay Londhe — AI Transformation & Enterprise Automation";
const description =
  "I find how work actually gets done, identify what AI and automation can improve, and turn those ideas into production systems with measurable business impact. Eight enterprise case studies across finance, tax, payments, compliance, and retail.";

/* site.url may carry a GitHub Pages sub-path, so asset URLs are built absolutely.
   A leading-slash path would resolve against the origin and drop the repo segment. */
const ogImage = `${site.url}/og.png`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: "%s | Tanmay Londhe" },
  description,
  keywords: [
    "Tanmay Londhe",
    "AI transformation",
    "Enterprise AI",
    "Business process automation",
    "Digital transformation",
    "Intelligent automation",
    "AI operating model",
    "Business Applications",
    "Document intelligence",
    "Power Platform",
    "SAP automation",
    "Mumbai",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  openGraph: {
    title,
    description,
    url: site.url,
    siteName: site.name,
    type: "profile",
    locale: "en_IN",
    images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
  },
  twitter: { card: "summary_large_image", title, description, images: [ogImage] },
  robots: { index: true, follow: true },
  alternates: { canonical: `${site.url}/` },
};

export const viewport = {
  themeColor: "#08080A",
  colorScheme: "dark" as const,
};

/* Person schema so search engines and AI answer engines resolve who this is. */
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  url: site.url,
  email: `mailto:${site.email}`,
  image: `${site.url}${site.photo}`,
  sameAs: [site.linkedin],
  address: { "@type": "PostalAddress", addressLocality: "Mumbai", addressCountry: "IN" },
  worksFor: { "@type": "Organization", name: site.company },
  description,
  knowsAbout: [
    "AI transformation",
    "Business process automation",
    "Document intelligence",
    "Solution architecture",
    "Microsoft Power Platform",
    "SAP automation",
    "Change management",
  ],
};

/* Runs before first paint. Adds `js` so CSS may hide-then-reveal content, and
   arms a failsafe that forces everything visible if React never hydrates. */
const bootstrap =
  "document.documentElement.classList.add('js');" +
  "setTimeout(function(){var d=document.documentElement;" +
  "if(!d.classList.contains('hydrated'))d.classList.add('reveal-failsafe');},3000);";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    /* The bootstrap script below adds `js` to this element before React hydrates,
       so the class list legitimately differs from what the server rendered.
       suppressHydrationWarning covers this element's own attributes only — it does
       not extend to descendants, so real mismatches inside the tree still surface. */
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${manrope.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: bootstrap }}
        />
      </head>
      <body>
        {/* Ambient colour field: the depth source for every glass surface. */}
        <div
          className="ambient"
          aria-hidden="true"
          style={{ ["--bg-field" as string]: `url(${withBase("/bg-field.webp")})` }}
        />
        <HydrationFlag />
        <a
          href="#main"
          className="focus-ring sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-ember focus:px-5 focus:py-2.5 focus:font-label focus:text-sm focus:font-bold focus:text-ink"
        >
          Skip to content
        </a>
        {children}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </body>
    </html>
  );
}
