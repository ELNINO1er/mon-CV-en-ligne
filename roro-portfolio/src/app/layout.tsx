import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { site } from "@/lib/site";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title: {
    default: `${site.name} — Développeur Full-Stack IA & SaaS`,
    template: `%s — ${site.name}`,
  },
  description:
    "Romaric Bombade, développeur Full-Stack IA & SaaS à Abidjan (Côte d'Ivoire). Création d'applications web, plateformes SaaS, automatisation digitale et sites web professionnels. Next.js, React, TypeScript, Laravel.",
  keywords: [
    "Romaric Bombade",
    "Développeur Full-Stack IA",
    "Développeur SaaS Côte d'Ivoire",
    "Développeur web Abidjan",
    "Création application web",
    "Automatisation digitale",
    "Développement site web professionnel",
    "Consultant digital Côte d'Ivoire",
    "Next.js React TypeScript Laravel",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: site.siteUrl,
    siteName: site.name,
    title: `${site.name} — Développeur Full-Stack IA & SaaS`,
    description:
      "Applications web, plateformes SaaS et automatisations intelligentes pour accélérer votre transformation digitale.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Développeur Full-Stack IA & SaaS`,
    description:
      "Applications web, plateformes SaaS et automatisations intelligentes pour accélérer votre transformation digitale.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  icons: { icon: "/roro-mark.svg" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: "Développeur Full-Stack IA & SaaS",
  description: site.shortPitch,
  url: site.siteUrl,
  email: `mailto:${site.email}`,
  telephone: site.phoneDisplay,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Abidjan",
    addressCountry: "CI",
  },
  sameAs: [site.linkedin],
  knowsAbout: [
    "Développement full-stack",
    "IA appliquée",
    "Architecture SaaS",
    "Automatisation digitale",
    "FinTech",
    "AgriTech",
    "E-commerce",
    "UI/UX",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      className={`${sans.variable} ${display.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
