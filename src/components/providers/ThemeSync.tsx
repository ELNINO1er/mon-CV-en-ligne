"use client";

import { useLayoutEffect } from "react";

/**
 * <html> est rendu par le layout [locale] : quand la langue change, React le
 * re-rend et efface `data-theme` (posé hors React par le script inline).
 * On réapplique le thème mémorisé à chaque changement de langue.
 */
export function ThemeSync({ locale }: { locale: string }) {
  useLayoutEffect(() => {
    const root = document.documentElement;
    if (root.dataset.theme) return;
    let theme = "dark";
    try {
      const saved = localStorage.getItem("theme");
      theme = saved === "light" || saved === "dark" ? saved : matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    } catch {}
    root.dataset.theme = theme;
  }, [locale]);

  return null;
}
