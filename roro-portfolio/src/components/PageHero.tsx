import Reveal from "./Reveal";

export default function PageHero({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
}) {
  return (
    <section className="page-hero">
      <div className="page-hero-orb" aria-hidden="true" />
      <div className="container">
        <Reveal>
          <span className="eyebrow">{eyebrow}</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="h-display page-hero-title">{title}</h1>
        </Reveal>
        {intro && (
          <Reveal delay={0.1}>
            <p className="lead page-hero-intro">{intro}</p>
          </Reveal>
        )}
      </div>
      <style>{`
        .page-hero { position:relative; overflow:hidden; padding-top:clamp(48px,7vw,84px); padding-bottom:clamp(24px,4vw,40px); }
        .page-hero-orb { position:absolute; width:420px; height:420px; border-radius:50%; filter:blur(90px); background:rgba(124,92,255,.2); top:-160px; left:20%; pointer-events:none; z-index:-1; }
        .page-hero .eyebrow { margin-bottom:20px; }
        .page-hero-title { max-width:16ch; margin-bottom:18px; }
        .page-hero-intro { max-width:64ch; }
      `}</style>
    </section>
  );
}
