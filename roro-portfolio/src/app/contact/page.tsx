import type { Metadata } from "next";
import { Suspense } from "react";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";
import { site, whatsappUrl, mailtoUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact — parlons de votre projet",
  description:
    "Contactez Romaric Bombade, développeur Full-Stack IA & SaaS à Abidjan. WhatsApp, email ou LinkedIn — devis gratuit et réponse rapide.",
  alternates: { canonical: "/contact/" },
};

const channels = [
  {
    icon: "MessageCircle" as const,
    label: "WhatsApp",
    value: site.phoneDisplay,
    href: whatsappUrl(),
    accent: "wa",
    hint: "Le plus rapide",
  },
  {
    icon: "Mail" as const,
    label: "Email",
    value: site.email,
    href: mailtoUrl(),
    accent: "mail",
    hint: "Pour les détails",
  },
  {
    icon: "Linkedin" as const,
    label: "LinkedIn",
    value: "Romaric Bombade",
    href: site.linkedin,
    accent: "in",
    hint: "Réseau pro",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={<>Transformons votre besoin en <span className="text-gradient">solution concrète</span></>}
        intro="Vous avez une idée, un site à créer, une application à développer ou un processus à automatiser ? Parlons-en — je vous réponds rapidement et le devis est gratuit."
      />

      <section className="section" style={{ paddingTop: 12 }}>
        <div className="container contact-layout">
          <div className="contact-side">
            {channels.map((c, i) => (
              <Reveal key={c.label} delay={i * 0.06}>
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`card channel channel--${c.accent}`}
                >
                  <span className="channel-icon">
                    <Icon name={c.icon} size={20} />
                  </span>
                  <span className="channel-body">
                    <span className="channel-label">{c.label}</span>
                    <span className="channel-value">{c.value}</span>
                  </span>
                  <span className="channel-hint mono">{c.hint}</span>
                </a>
              </Reveal>
            ))}

            <Reveal delay={0.2}>
              <div className="card contact-assure">
                <Icon name="ShieldCheck" size={22} />
                <p>
                  Réponse rapide, échange sans jargon et sans engagement. Je vous conseille la
                  solution la plus adaptée à votre budget et vos objectifs.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="contact-form-wrap">
            <Reveal>
              <Suspense fallback={null}>
                <ContactForm />
              </Suspense>
            </Reveal>
          </div>
        </div>
      </section>

      <style>{`
        .contact-layout { display:grid; grid-template-columns:.8fr 1.2fr; gap:28px; align-items:start; }
        .contact-side { display:flex; flex-direction:column; gap:14px; }
        .channel { display:flex; align-items:center; gap:16px; padding:20px 22px; }
        .channel-icon { display:inline-flex; align-items:center; justify-content:center; width:48px; height:48px; border-radius:14px; color:#fff; flex:none; background:linear-gradient(135deg,rgba(124,92,255,.28),rgba(34,211,238,.2)); border:1px solid var(--border-strong); }
        .channel--wa .channel-icon { background:linear-gradient(135deg,#25d366,#17a34a); color:#04140b; }
        .channel--in .channel-icon { background:linear-gradient(135deg,#0a66c2,#2f80ed); }
        .channel-body { display:flex; flex-direction:column; gap:2px; flex:1; }
        .channel-label { font-size:.78rem; color:var(--faint); text-transform:uppercase; letter-spacing:.1em; }
        .channel-value { color:#fff; font-weight:600; }
        .channel-hint { font-size:.72rem; color:var(--cyan); }
        .contact-assure { display:flex; gap:14px; padding:22px; color:var(--muted); font-size:.92rem; }
        .contact-assure svg { color:var(--cyan); flex:none; }
        @media (max-width:860px){ .contact-layout{ grid-template-columns:1fr; } }
      `}</style>
    </>
  );
}
