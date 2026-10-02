import type { Metadata } from "next";
import { dictionaries } from "@/i18n/dictionary";
import { isLocale, localePath, type Locale } from "@/i18n/config";
import { profile } from "@/data/profile";

/** Métadonnées d'une page : titre, description, canonique et hreflang FR/EN */
export function pageMetadata(locale: Locale, path: string, title?: string, description?: string): Metadata {
  const t = dictionaries[locale].meta;
  return {
    ...(title ? { title } : {}),
    description: description ?? t.description,
    alternates: {
      canonical: localePath(locale, path),
      languages: { fr: localePath("fr", path), en: localePath("en", path), "x-default": localePath("fr", path) },
    },
    openGraph: {
      type: "website",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      title: title ? `${title} — ${profile.name}` : t.title,
      description: description ?? t.description,
      siteName: profile.name,
      url: localePath(locale, path),
    },
  };
}

/** Résout le paramètre de langue d'une page (les valeurs invalides sont filtrées par le layout) */
export async function resolveLocale(params: Promise<{ locale: string }>): Promise<Locale> {
  const { locale } = await params;
  return isLocale(locale) ? locale : "fr";
}
