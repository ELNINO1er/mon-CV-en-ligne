"use client";

import { motion, useReducedMotion } from "motion/react";

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
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
