import Link from "next/link";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import StrengthCard from "@/components/StrengthCard";
import StackSection from "@/components/StackSection";
import ProjectCard from "@/components/ProjectCard";
import CtaBand from "@/components/CtaBand";
import TrustedBrands from "@/components/TrustedBrands";
import Testimonials from "@/components/Testimonials";
import Reveal, { RevealGroup, RevealItem } from "@/components/Reveal";
import Icon from "@/components/Icon";
import { services, strengths, SHOW_TESTIMONIALS } from "@/lib/content";
import { projects } from "@/lib/projects";

export default function Home() {
  const featured = projects.filter((p) => p.featured);

  return (
    <>
      <Hero />

      <div id="suite" />

      {/* Stats */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal>
            <Stats />
          </Reveal>
        </div>
      </section>

      {/* Trusted brands */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal>
            <TrustedBrands />
          </Reveal>
        </div>
      </section>

      {/* Services */}
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Ce que je fais"
            title={<>Des solutions digitales qui <span className="text-gradient">créent de la valeur</span></>}
            intro="De l'idée à la mise en ligne, je conçois des produits web pensés pour vos objectifs business — pas seulement pour la technique."
          />
          <RevealGroup className="grid-cards">
            {services.map((s) => (
              <RevealItem key={s.title}>
                <ServiceCard service={s} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Why me */}
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Pourquoi travailler avec moi"
            title={<>Un partenaire technique <span className="text-gradient">fiable et orienté résultats</span></>}
            intro="Je combine expertise full-stack, IA et compréhension business pour livrer vite, bien, et utile."
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

      {/* Featured projects */}
      <section className="section">
        <div className="container">
          <div className="home-proj-head">
            <SectionHeading
              eyebrow="Projets réalisés"
              title={<>Des études de cas, <span className="text-gradient">pas une simple liste</span></>}
              intro="FinTech, AgriTech, e-commerce, santé, automatisation : un aperçu de projets concrets."
            />
            <Reveal delay={0.1}>
              <Link href="/projets" className="btn btn-ghost home-proj-all">
                Tous les projets <Icon name="ArrowRight" size={17} />
              </Link>
            </Reveal>
          </div>
          <RevealGroup className="grid-cards">
            {featured.map((p) => (
              <RevealItem key={p.slug}>
                <ProjectCard project={p} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Stack */}
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Stack technique"
            title={<>Un écosystème <span className="text-gradient">moderne et complet</span></>}
            intro="Les technologies que j'utilise au quotidien pour construire des produits robustes et évolutifs."
          />
          <StackSection />
        </div>
      </section>

      {SHOW_TESTIMONIALS && <Testimonials />}

      <CtaBand />

      <style>{`
        .home-proj-head { display:flex; align-items:flex-end; justify-content:space-between; gap:24px; flex-wrap:wrap; }
        .home-proj-head .sec-head { margin-bottom:clamp(28px,4vw,44px); }
        .home-proj-all { margin-bottom:clamp(28px,4vw,44px); }
      `}</style>
    </>
  );
}
