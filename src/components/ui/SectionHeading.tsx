import { SplitText } from "./SplitText";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

type Props = {
  index: string;
  label: string;
  title: string;
  description?: string;
  className?: string;
  as?: "h1" | "h2";
  /** Couleur de la section (variable CSS de la palette) */
  color?: string;
};

export function SectionHeading({ index, label, title, description, className, as = "h2", color = "var(--color-brand)" }: Props) {
  return (
    <div className={cn("max-w-4xl", className)}>
      <Reveal blur={false} y={12}>
        <p className="label-mono mb-6 flex items-center gap-3">
          <span style={{ color }}>{index}</span>
          <span className="h-px w-8" style={{ background: `linear-gradient(to right, ${color}, transparent)` }} />
          {label}
        </p>
      </Reveal>
      <SplitText
        as={as}
        text={title}
        className="text-[clamp(2.25rem,5.5vw,4.75rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-balance"
      />
      {description && (
        <Reveal delay={0.2}>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg">{description}</p>
        </Reveal>
      )}
    </div>
  );
}
