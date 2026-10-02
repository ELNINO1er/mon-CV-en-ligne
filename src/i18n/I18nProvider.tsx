"use client";

import { createContext, useContext, useMemo } from "react";
import { localePath, type L, type Locale } from "./config";
import { dictionaries, type Dictionary } from "./dictionary";

type I18n = {
  locale: Locale;
  t: Dictionary;
  /** Chemin localisé : href("/projects") → "/projects" (fr) ou "/en/projects" */
  href: (path: string) => string;
  /** Résout un texte localisé */
  tr: (value: L) => string;
};

const Ctx = createContext<I18n | null>(null);

export function I18nProvider({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const value = useMemo<I18n>(
    () => ({
      locale,
      t: dictionaries[locale],
      href: (path) => localePath(locale, path),
      tr: (v) => v[locale],
    }),
    [locale]
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useI18n() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
  return ctx;
}
