"use client";

import { useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import { DUR, EASE_OUT } from "@/lib/motion";

/** Passe à true après le premier rendu client : seules les navigations suivantes sont animées. */
let hydrated = false;

/**
 * Transition de page : fondu uniquement. Pas de transform/filter ici —
 * ils casseraient le `position: fixed` utilisé par l'épinglage GSAP.
 * Le premier chargement n'est pas masqué : le HTML serveur reste visible
 * avant l'hydratation (LCP, réseaux lents, JS indisponible).
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const animate = hydrated && !reduce;

  useEffect(() => {
    hydrated = true;
  }, []);

  return (
    <motion.div
      initial={animate ? { opacity: 0 } : false}
      animate={{ opacity: 1 }}
      transition={{ duration: DUR.base, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}
