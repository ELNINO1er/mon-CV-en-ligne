import { cn } from "@/lib/utils";

type Props = {
  items: string[];
  className?: string;
  duration?: number;
  reverse?: boolean;
  /** Couleurs des séparateurs, appliquées en boucle */
  colors?: string[];
};

export function Marquee({ items, className, duration = 40, reverse, colors = ["var(--color-brand)"] }: Props) {
  const row = (hidden?: boolean) => (
    <ul aria-hidden={hidden} className="flex shrink-0 items-center gap-10 pr-10">
      {items.map((item, i) => (
        <li key={item} className="flex items-center gap-10 whitespace-nowrap">
          {item}
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: colors[i % colors.length] }} />
        </li>
      ))}
    </ul>
  );

  return (
    <div className={cn("group mask-fade-x flex overflow-hidden", className)}>
      <div
        className="flex w-max animate-marquee group-hover:[animation-play-state:paused]"
        style={{ "--marquee-duration": `${duration}s`, animationDirection: reverse ? "reverse" : "normal" } as React.CSSProperties}
      >
        {row()}
        {row(true)}
      </div>
    </div>
  );
}
