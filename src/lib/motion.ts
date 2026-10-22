import type { Variants } from "motion/react";

/**
 * Système de motion centralisé.
 * Un seul endroit pour les durées, les courbes d'accélération et les variantes
 * réutilisables — pour garantir un rythme cohérent sur tout le portfolio.
 */

/** Courbes d'accélération (cubic-bezier). */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const; // sortie douce et ample (défaut)
export const EASE_OUT = [0.22, 1, 0.36, 1] as const; // sortie nette, plus courte
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const; // symétrique (indicateurs, boucles)

/** Alias historique conservé pour compatibilité (voir lib/utils). */
export const EASE = EASE_OUT_EXPO;

/** Échelle de durées (secondes) — pensée pour rester lisible et homogène. */
export const DUR = {
  fast: 0.4, // micro-interactions, apparitions d'items
  base: 0.6, // transitions de blocs, cartes
  slow: 0.9, // révélations au scroll
  xslow: 1.1, // titres (SplitText), moments forts
} as const;

/** Ressorts partagés (pills de navigation, badges actifs). */
export const SPRING = { type: "spring", stiffness: 380, damping: 32 } as const;
export const SPRING_SOFT = { type: "spring", stiffness: 140, damping: 28, mass: 0.3 } as const;

/** Variante « fondu + montée » paramétrable. */
export const fadeUp = (delay = 0, y = 24, blur = true): Variants => ({
  hidden: { opacity: 0, y, filter: blur ? "blur(8px)" : "blur(0px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: DUR.slow, ease: EASE_OUT_EXPO, delay },
  },
});

/** Orchestration d'une cascade d'enfants. */
export const stagger = (children = 0.06, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: children, delayChildren } },
});
