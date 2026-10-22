import { SplitText } from "@/components/ui/SplitText";
import { Reveal } from "@/components/ui/Reveal";

export function PageHeader({ label, title, description }: { label: string; title: string; description?: string }) {
  return (
    <header className="relative overflow-hidden pb-16 pt-40 md:pb-24 md:pt-48">
      <div aria-hidden className="bg-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_top,#000_20%,transparent_70%)]" />

      <div className="container-x relative">
        <Reveal blur={false} y={12}>
          <p className="label-mono mb-6">{label}</p>
        </Reveal>
        <SplitText
          as="h1"
          inView={false}
          delay={0.1}
          text={title}
          className="max-w-5xl text-[clamp(2.75rem,8vw,7.5rem)] font-semibold leading-[0.92] tracking-[-0.055em] text-balance"
        />
        {description && (
          <Reveal delay={0.4}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">{description}</p>
          </Reveal>
        )}
      </div>
    </header>
  );
}
