"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { SPRING_SOFT } from "@/lib/motion";

/**
 * Fil de progression du défilement, en haut de chaque page.
 * Évoque un « signal » parcourant l'infrastructure. Désactivé en reduced-motion.
 */
export function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, SPRING_SOFT);

  if (reduce) return null;

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-brand "
    />
  );
}
