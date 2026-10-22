"use client";

import { Fragment } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn, EASE } from "@/lib/utils";

/** Workflow produit animé : nœuds qui apparaissent en cascade, signal qui circule entre eux. */
export function WorkflowDiagram({
  steps,
  accent = "#4f8cff",
  size = "lg",
  className,
}: {
  steps: string[];
  accent?: string;
  size?: "sm" | "lg";
  className?: string;
}) {
  const reduce = useReducedMotion();
  const small = size === "sm";

  return (
    <motion.ol
      style={{ "--accent": accent } as React.CSSProperties}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09 } } }}
      className={cn(
        "flex",
        small ? "flex-wrap items-center gap-y-2" : "flex-col gap-0 md:flex-row md:flex-wrap md:items-center md:gap-y-4",
        className
      )}
      aria-label="Workflow"
    >
      {steps.map((step, i) => (
        <Fragment key={step}>
          <motion.li
            variants={{
              hidden: { opacity: 0, scale: 0.9, filter: "blur(6px)" },
              show: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.7, ease: EASE } },
            }}
            className={cn(
              "relative flex shrink-0 items-center gap-2 rounded-full border border-line-strong bg-surface",
              small ? "px-2.5 py-1 text-[11px] text-muted" : "w-fit px-4 py-2.5 text-sm"
            )}
          >
            <span
              className={cn("font-mono", small ? "text-[9px]" : "text-[10px]")}
              style={{ color: "var(--accent)" }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            {step}
          </motion.li>
          {i < steps.length - 1 && (
            <li
              aria-hidden
              className={cn(
                "relative overflow-hidden bg-line-strong",
                small ? "mx-1 h-px w-4" : "ml-7 h-6 w-px md:ml-0 md:h-px md:w-10 lg:w-14"
              )}
            >
              <span
                className={cn(
                  "absolute",
                  small
                    ? "inset-y-0 left-0 w-1/2 animate-flow bg-brand"
                    : "inset-x-0 top-0 h-1/2 bg-brand md:inset-y-0 md:left-0 md:h-full md:w-1/2 md:animate-flow md:bg-brand"
                )}
                style={{ animationDelay: `${i * 0.25}s` }}
              />
            </li>
          )}
        </Fragment>
      ))}
    </motion.ol>
  );
}
