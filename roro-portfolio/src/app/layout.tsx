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
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Romaric Bombade — Développeur Full-Stack IA & SaaS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Développeur Full-Stack IA & SaaS`,
    description:
      "Applications web, plateformes SaaS et automatisations intelligentes pour accélérer votre transformation digitale.",
    images: ["/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: { canonical: "/" },
  icons: {
    icon: "/roro-mark.svg",
    shortcut: "/roro-mark.svg",
    apple: "/roro-mark.svg",
  },
  // Renseignez le code Search Console via NEXT_PUBLIC_GOOGLE_VERIFICATION
  verification: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION }
    : undefined,
  category: "technology",
};

const base = site.siteUrl.replace(/\/$/, "");
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${base}/#person`,
      name: site.name,
      jobTitle: "Développeur Full-Stack IA & SaaS",
      description: site.shortPitch,
      url: base,
      image: `${base}/og.jpg`,
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
        "Next.js",
        "React",
        "TypeScript",
        "Laravel",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${base}/#website`,
      url: base,
      name: `${site.name} — Développeur Full-Stack IA & SaaS`,
      inLanguage: "fr-FR",
      publisher: { "@id": `${base}/#person` },
    },
    {
      "@type": "ProfessionalService",
      "@id": `${base}/#service`,
      name: `${site.name} — ${site.brand}`,
      description:
        "Développeur Full-Stack freelance : création de sites web professionnels, applications métier, plateformes SaaS, e-commerce et automatisation IA.",
      url: base,
      image: `${base}/og.jpg`,
      email: `mailto:${site.email}`,
      telephone: site.phoneDisplay,
      priceRange: "$$",
      provider: { "@id": `${base}/#person` },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Abidjan",
        addressCountry: "CI",
      },
      areaServed: [
        { "@type": "City", name: "Abidjan" },
        { "@type": "Country", name: "Côte d'Ivoire" },
        { "@type": "Place", name: "International (freelance à distance)" },
      ],
      sameAs: [site.linkedin],
      makesOffer: [
        "Création de sites web professionnels",
        "Développement d'applications web sur mesure",
        "Plateformes SaaS et portails clients",
        "Automatisation avec l'IA",
        "Développement e-commerce sécurisé",
        "Refonte et modernisation UI/UX",
      ].map((name) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name, serviceType: name },
      })),
    },
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
