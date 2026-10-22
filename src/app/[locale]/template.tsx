"use client";

import { motion, useReducedMotion } from "motion/react";
import { DUR, EASE_OUT } from "@/lib/motion";

/**
 * Transition de page : fondu uniquement. Pas de transform/filter ici —
 * ils casseraient le `position: fixed` utilisé par l'épinglage GSAP.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: DUR.base, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}
