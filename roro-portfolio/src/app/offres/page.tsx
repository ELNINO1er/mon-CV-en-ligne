import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import PackCard from "@/components/PackCard";
import Reveal, { RevealGroup, RevealItem } from "@/components/Reveal";
import Icon from "@/components/Icon";
import CtaBand from "@/components/CtaBand";
import { packs } from "@/lib/content";

export const metadata: Metadata = {
  title: "Offres & packs freelance",
  description:
    "Packs freelance clairs : site vitrine, application métier, SaaS / portail client, automatisation IA et e-commerce. Demandez un devis gratuit à Romaric Bombade.",
  alternates: { canonical: "/offres/" },
};

const steps = [
  { icon: "MessageCircle" as const, title: "Échange", text: "On discute de votre besoin, vos objectifs et vos contraintes — gratuitement." },
  { icon: "Target" as const, title: "Proposition", text: "Je vous envoie un périmètre clair, un planning et un devis transparent." },
  { icon: "Code2" as const, title: "Réalisation", text: "Je développe avec des points réguliers, en gardant la qualité et les délais." },
  { icon: "Rocket" as const, title: "Livraison", text: "Mise en ligne, prise en main et accompagnement après le lancement." },
];

export default function OffresPage() {
  return (
    <>
      <PageHero
        eyebrow="Offres freelance"
        title={<>Des packs clairs pour <span className="text-gradient">chaque besoin</span></>}
        intro="Choisissez le pack le plus proche de votre projet. Chaque prestation est adaptée à votre contexte — le devis est toujours gratuit et sans engagement."
      />

      <section className="section" style={{ paddingTop: 12 }}>
        <div className="container">
          <RevealGroup className="grid-cards packs-grid">
            {packs.map((p) => (
              <RevealItem key={p.slug}>
                <PackCard pack={p} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Process */}
      <section className="section">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Comment ça se passe</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="h-section" style={{ margin: "18px 0 44px" }}>
              Une méthode <span className="text-gradient">simple et rassurante</span>
            </h2>
          </Reveal>
          <RevealGroup className="steps">
            {steps.map((s, i) => (
              <RevealItem key={s.title}>
                <div className="card step">
                  <span className="step-num mono">0{i + 1}</span>
                  <span className="step-icon">
                    <Icon name={s.icon} size={20} />
                  </span>
                  <h3 className="step-title">{s.title}</h3>
                  <p className="step-text">{s.text}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <CtaBand
        title="Pas sûr du pack à choisir ?"
        text="Décrivez-moi simplement votre besoin : je vous oriente vers la meilleure solution, sans jargon et sans engagement."
      />

      <style>{`
        .packs-grid { grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr)); }
        .steps { display:grid; gap:18px; grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr)); }
        .step { padding:26px; display:flex; flex-direction:column; gap:12px; }
        .step-num { position:absolute; top:18px; right:22px; font-size:1.4rem; font-weight:700; color:transparent; -webkit-text-stroke:1px rgba(255,255,255,.14); }
        .step-icon { display:inline-flex; align-items:center; justify-content:center; width:46px; height:46px; border-radius:13px; color:#fff; background:linear-gradient(135deg,rgba(124,92,255,.28),rgba(34,211,238,.2)); border:1px solid var(--border-strong); }
        .step-title { font-size:1.1rem; }
        .step-text { color:var(--muted); font-size:.92rem; }
      `}</style>
    </>
  );
}
