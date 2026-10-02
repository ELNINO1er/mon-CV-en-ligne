export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";

/** Texte localisé */
export type L = { fr: string; en: string };
export const l = (fr: string, en: string = fr): L => ({ fr, en });

export const isLocale = (v: string): v is Locale => (locales as readonly string[]).includes(v);

/** Le français est servi sans préfixe (/), l'anglais sous /en */
export const localePath = (locale: Locale, path: string) =>
  locale === defaultLocale ? path : `/${locale}${path === "/" ? "" : path}`;

export const stripLocale = (pathname: string) =>
  pathname === "/en" ? "/" : pathname.startsWith("/en/") ? pathname.slice(3) : pathname;
