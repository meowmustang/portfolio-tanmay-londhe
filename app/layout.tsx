import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tanmay Londhe — Enterprise AI & Automation | Digital Transformation",
  description:
    "Senior Executive – Business Applications delivering enterprise-grade automation, AI solutions, and digital transformation across finance, tax, payments, compliance, and retail operations.",
  keywords: [
    "Tanmay Londhe",
    "Enterprise AI",
    "Automation Engineer",
    "Digital Transformation",
    "Business Applications",
    "Power Platform",
    "SAP Automation",
    "Document Intelligence",
    "Mumbai",
  ],
  authors: [{ name: "Tanmay Londhe" }],
  openGraph: {
    title: "Tanmay Londhe — Enterprise AI & Automation",
    description:
      "Building AI & automation solutions that transform business operations. Case studies across finance, tax, payments, compliance, and retail.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Manrope:wght@500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
