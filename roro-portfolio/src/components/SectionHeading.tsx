import Reveal from "./Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div className={`sec-head ${align === "center" ? "is-center" : ""}`}>
      <Reveal>
        <span className="eyebrow">{eyebrow}</span>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="h-section">{title}</h2>
      </Reveal>
      {intro && (
        <Reveal delay={0.1}>
          <p className="lead">{intro}</p>
        </Reveal>
      )}
      <style>{`
        .sec-head { display:flex; flex-direction:column; gap:18px; margin-bottom:clamp(36px,5vw,60px); }
        .sec-head.is-center { align-items:center; text-align:center; }
        .sec-head.is-center .lead { margin-inline:auto; }
      `}</style>
    </div>
  );
}
