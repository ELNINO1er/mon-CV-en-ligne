import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "../globals.css";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Cursor } from "@/components/ui/Cursor";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { I18nProvider } from "@/i18n/I18nProvider";
import { ThemeSync } from "@/components/providers/ThemeSync";
import { dictionaries } from "@/i18n/dictionary";
import { isLocale, locales } from "@/i18n/config";
import { pageMetadata } from "@/lib/metadata";
import { profile } from "@/data/profile";
import { siteUrl } from "@/lib/utils";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = dictionaries[locale].meta;
  return {
    metadataBase: new URL(siteUrl),
    title: { default: t.title, template: `%s — ${profile.name}` },
    keywords: ["Full-Stack", "SaaS", "Multi-tenant", "Next.js", "React", "Abidjan", "Côte d'Ivoire", "Romaric Bombade"],
    authors: [{ name: profile.name }],
    twitter: { card: "summary_large_image" },
    ...pageMetadata(locale, "/"),
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#07080a" },
    { media: "(prefers-color-scheme: light)", color: "#f6f6f3" },
  ],
};

/** Appliqué avant le premier rendu pour éviter le flash de thème */
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='dark'}})()`;

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = dictionaries[locale];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.title[locale],
    email: `mailto:${profile.email}`,
    telephone: profile.phone,
    nationality: profile.nationality[locale],
    address: { "@type": "PostalAddress", addressLocality: "Abidjan", addressCountry: "CI" },
    knowsLanguage: ["fr", "en"],
    sameAs: [profile.linkedin, profile.github],
    url: siteUrl,
  };

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${instrument.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="grain min-h-screen overflow-x-clip">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-bg"
        >
          {t.ui.skip}
        </a>
        <I18nProvider locale={locale}>
          <ThemeSync locale={locale} />
          <ScrollProgress />
          <SmoothScroll>
            <Header />
            <main id="main">{children}</main>
            <Footer />
          </SmoothScroll>
          <Cursor />
        </I18nProvider>
      </body>
    </html>
  );
}
