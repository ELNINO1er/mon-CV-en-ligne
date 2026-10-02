"use client";

import { Fragment } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn, EASE } from "@/lib/utils";

type Props = {
  /** Les mots entourés d'astérisques (*mot*) passent en serif italique. */
  text: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  delay?: number;
  stagger?: number;
  /** false = joue au montage (hero), true = au scroll */
  inView?: boolean;
};

export function SplitText({ text, as: Tag = "h2", className, delay = 0, stagger = 0.05, inView = true }: Props) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  const plain = text.replaceAll("*", "");

  return (
    <Tag className={className}>
      <span className="sr-only">{plain}</span>
      <span aria-hidden>
        {words.map((word, i) => {
          const em = word.startsWith("*");
          const wordClass = cn(
            "inline-block origin-bottom-left",
            em && "text-gradient pr-[0.12em] font-serif font-normal italic tracking-normal"
          );
          return (
            <Fragment key={i}>
              <span className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-bottom">
                {inView ? (
                  <motion.span
                    className={wordClass}
                    initial={reduce ? false : { y: "105%", opacity: 0, rotate: 4 }}
                    whileInView={{ y: "0%", opacity: 1, rotate: 0 }}
                    viewport={{ once: true, margin: "0px 0px -8% 0px" }}
                    transition={{ duration: 1.1, delay: delay + i * stagger, ease: EASE }}
                  >
                    {word.replaceAll("*", "")}
                  </motion.span>
                ) : (
                  // Au montage : animation CSS, visible sans attendre le JS (meilleur LCP)
                  <span
                    className={cn(wordClass, "anim-word")}
                    style={{ animationDelay: `${delay + i * stagger}s` }}
                  >
                    {word.replaceAll("*", "")}
                  </span>
                )}
              </span>
              {i < words.length - 1 && " "}
            </Fragment>
          );
        })}
      </span>
    </Tag>
  );
}
