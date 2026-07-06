import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import StrengthCard from "@/components/StrengthCard";
import StackSection from "@/components/StackSection";
import Timeline from "@/components/Timeline";
import Reveal, { RevealGroup, RevealItem } from "@/components/Reveal";
import Icon from "@/components/Icon";
import CtaBand from "@/components/CtaBand";
import { strengths } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "À propos — parcours & expertise",
  description:
    "Romaric Bombade, développeur Full-Stack IA & SaaS : parcours, expertise, stack technique et approche orientée business. FinTech, AgriTech, e-commerce, santé et automatisation.",
  alternates: { canonical: "/a-propos/" },
};

const domains = ["FinTech", "SaaS", "AgriTech", "E-commerce", "Santé digitale", "Automatisation", "UI/UX"];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="À propos"
        title={<>Développeur passionné par <span className="text-gradient">le digital utile</span></>}
      />

      {/* Intro + photo */}
      <section className="section" style={{ paddingTop: 12 }}>
        <div className="container about-intro">
          <Reveal className="about-photo-wrap">
            <div className="about-photo">
              <Image
                src="/img/romaric.jpg"
                alt="Romaric Bombade, développeur Full-Stack IA & SaaS"
                width={520}
                height={640}
                className="about-img"
                priority
              />
              <div className="about-photo-badge glass">
                <span className="mono about-badge-role">{site.role}</span>
                <span className="about-badge-loc">
                  <Icon name="MapPin" size={14} /> {site.location}
                </span>
              </div>
            </div>
          </Reveal>

          <div className="about-text">
            <Reveal>
              <p className="about-p">
                Je suis un développeur Full-Stack passionné par la création de solutions digitales
                utiles, modernes et performantes. J&apos;utilise les technologies web modernes et les
                outils d&apos;intelligence artificielle pour concevoir des applications plus rapides,
                plus intuitives et mieux adaptées aux besoins réels des entreprises.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="about-p">
                Mon expérience couvre les plateformes de gestion financière, les solutions SaaS, les
                sites institutionnels, l&apos;e-commerce, l&apos;AgriTech, la santé digitale et
                l&apos;automatisation des processus. J&apos;aime transformer un besoin métier en un
                produit clair, fiable et agréable à utiliser.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="about-domains">
                {domains.map((d) => (
                  <span key={d} className="chip">
                    {d}
                  </span>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="about-actions">
                <Link href="/contact" className="btn btn-primary">
                  Travailler ensemble <Icon name="ArrowRight" size={17} />
                </Link>
                <a href="/docs/cv-romaric-bombade.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                  <Icon name="Download" size={17} /> Télécharger mon CV
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Strengths */}
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Pourquoi travailler avec moi"
            title={<>Mes forces à <span className="text-gradient">votre service</span></>}
          />
          <RevealGroup className="grid-cards">
            {strengths.map((s, i) => (
              <RevealItem key={s.title}>
                <StrengthCard strength={s} index={i} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Parcours */}
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Parcours"
            title={<>Expériences & <span className="text-gradient">formation</span></>}
            intro="Un parcours entre entreprises, freelance et entrepreneuriat, au service de projets concrets."
          />
          <Timeline />
        </div>
      </section>

      {/* Stack */}
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Stack technique"
            title={<>Les technologies que <span className="text-gradient">je maîtrise</span></>}
          />
          <StackSection />
        </div>
      </section>

      <CtaBand />

      <style>{`
        .about-intro { display:grid; grid-template-columns:.85fr 1.15fr; gap:clamp(28px,5vw,56px); align-items:center; }
        .about-photo { position:relative; }
        .about-img {
          width:100%; height:auto; border-radius:var(--radius-lg); border:1px solid var(--border-strong);
          box-shadow:var(--shadow-soft); object-fit:cover; filter:contrast(1.03) saturate(1.05);
        }
        .about-photo::after { content:""; position:absolute; inset:-14px; z-index:-1; border-radius:calc(var(--radius-lg) + 14px); background:radial-gradient(60% 60% at 50% 20%,rgba(124,92,255,.35),transparent 70%); filter:blur(30px); }
        .about-photo-badge { position:absolute; left:16px; bottom:16px; right:16px; padding:14px 16px; display:flex; flex-direction:column; gap:4px; }
        .about-badge-role { color:var(--cyan); font-size:.78rem; }
        .about-badge-loc { display:flex; align-items:center; gap:6px; color:#fff; font-weight:600; font-size:.92rem; }
        .about-text { display:flex; flex-direction:column; gap:20px; }
        .about-p { color:var(--muted); font-size:1.05rem; line-height:1.75; max-width:60ch; }
        .about-domains { display:flex; flex-wrap:wrap; gap:9px; }
        .about-actions { display:flex; flex-wrap:wrap; gap:13px; margin-top:6px; }
        @media (max-width:860px){ .about-intro{ grid-template-columns:1fr; } .about-photo{ max-width:420px; } }
      `}</style>
    </>
  );
}
