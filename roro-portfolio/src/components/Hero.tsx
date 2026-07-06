"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import ParticleField from "./ParticleField";
import RotatingWords from "./RotatingWords";
import Icon from "./Icon";
import { site, whatsappUrl } from "@/lib/site";
import { EASE } from "@/lib/motion";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

const floatChips = [
  { label: "React", x: "-8%", y: "12%", d: "0s" },
  { label: "Next.js", x: "88%", y: "8%", d: ".6s" },
  { label: "Laravel", x: "92%", y: "62%", d: "1.1s" },
  { label: "IA", x: "-6%", y: "70%", d: "1.6s" },
  { label: "SaaS", x: "78%", y: "92%", d: "2.1s" },
];

export default function Hero() {
  return (
    <section className="hero">
      <ParticleField />
      <div className="hero-orb hero-orb--1" aria-hidden="true" />
      <div className="hero-orb hero-orb--2" aria-hidden="true" />

      <div className="container hero-grid">
        <motion.div className="hero-copy" variants={container} initial="hidden" animate="show">
          <motion.span className="eyebrow" variants={item}>
            {site.role}
          </motion.span>

          <motion.h1 className="hero-title" variants={item}>
            {site.name}
          </motion.h1>

          <motion.p className="hero-rotor" variants={item}>
            Je conçois des solutions en <RotatingWords />
          </motion.p>

          <motion.p className="lead hero-lead" variants={item}>
            {site.tagline}
          </motion.p>

          <motion.div className="hero-actions" variants={item}>
            <Link href="/contact" className="btn btn-primary">
              Demander un devis gratuit <Icon name="ArrowRight" size={18} />
            </Link>
            <Link href="/projets" className="btn btn-ghost">
              Voir mes projets
            </Link>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
            >
              <Icon name="MessageCircle" size={18} /> WhatsApp
            </a>
          </motion.div>

          <motion.div className="hero-trust" variants={item}>
            <Icon name="MapPin" size={15} /> {site.location}
            <span className="hero-dot" />
            <Icon name="ShieldCheck" size={15} /> Disponible en freelance
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
        >
          <div className="portrait floaty">
            <div className="portrait-frame">
              <Image
                src="/img/romaric-portrait.jpg"
                alt="Romaric Bombade, développeur Full-Stack IA & SaaS"
                width={900}
                height={1200}
                priority
                className="portrait-img"
                sizes="(max-width: 960px) 80vw, 40vw"
              />
              <span className="portrait-ring" aria-hidden="true" />
            </div>

            <div className="portrait-card portrait-card--top glass">
              <span className="pc-avail" aria-hidden="true" />
              <div>
                <span className="pc-title">Disponible</span>
                <span className="pc-sub">Nouveaux projets freelance</span>
              </div>
            </div>

            <div className="portrait-card portrait-card--bottom glass">
              <span className="pc-icon">
                <Icon name="Rocket" size={16} />
              </span>
              <div>
                <span className="pc-val text-grad-gold">+ 62%</span>
                <span className="pc-sub">de temps gagné pour mes clients</span>
              </div>
            </div>
          </div>

          {floatChips.map((c) => (
            <span
              key={c.label}
              className="hero-chip floaty"
              style={{ left: c.x, top: c.y, animationDelay: c.d }}
            >
              {c.label}
            </span>
          ))}
        </motion.div>
      </div>

      <a href="#suite" className="hero-scroll" aria-label="Défiler vers la suite">
        <span className="hero-scroll-wheel" />
      </a>

      <style>{`
        .hero { position:relative; overflow:hidden; padding-top:clamp(48px,8vw,90px); padding-bottom:clamp(60px,9vw,110px); }
        .hero-orb { position:absolute; border-radius:50%; filter:blur(80px); pointer-events:none; z-index:-1; }
        .hero-orb--1 { width:420px; height:420px; background:rgba(124,92,255,.28); top:-120px; left:-120px; }
        .hero-orb--2 { width:360px; height:360px; background:rgba(34,211,238,.2); bottom:-140px; right:-100px; }
        .hero-grid { display:grid; grid-template-columns:1.05fr .95fr; gap:clamp(32px,5vw,64px); align-items:center; }
        .hero-copy { display:flex; flex-direction:column; gap:22px; }
        .hero-title { font-size:clamp(2.6rem,6.5vw,4.8rem); line-height:1; }
        .hero-rotor { font-family:var(--font-display); font-weight:600; font-size:clamp(1.3rem,3vw,2rem); color:var(--muted); }
        .hero-lead { max-width:56ch; }
        .hero-actions { display:flex; flex-wrap:wrap; gap:13px; margin-top:4px; }
        .hero-trust { display:flex; align-items:center; gap:10px; flex-wrap:wrap; color:var(--muted); font-size:.88rem; margin-top:6px; }
        .hero-trust svg { color:var(--cyan); }
        .hero-dot { width:4px; height:4px; border-radius:50%; background:var(--faint); }

        .hero-visual { position:relative; }
        .portrait { position:relative; z-index:2; max-width:420px; margin-inline:auto; }
        .portrait-frame {
          position:relative; border-radius:var(--radius-lg); overflow:hidden;
          border:1px solid var(--border-strong);
          box-shadow:0 40px 90px -30px rgba(0,0,0,.8), inset 0 1px 0 rgba(255,255,255,.06);
          background:linear-gradient(180deg, rgba(124,92,255,.12), rgba(10,12,20,.4));
        }
        .portrait-img { display:block; width:100%; height:auto; object-fit:cover; }
        .portrait-frame::after {
          content:""; position:absolute; inset:0; pointer-events:none;
          background:linear-gradient(180deg, transparent 55%, rgba(5,6,11,.55));
        }
        .portrait-ring {
          position:absolute; inset:0; border-radius:inherit; pointer-events:none;
          box-shadow:inset 0 0 0 1px rgba(255,255,255,.08);
        }
        .portrait::before {
          content:""; position:absolute; inset:-24px; z-index:-1; border-radius:calc(var(--radius-lg) + 24px);
          background:radial-gradient(60% 55% at 50% 25%, rgba(124,92,255,.4), transparent 70%);
          filter:blur(36px);
        }
        .portrait-card {
          position:absolute; z-index:3; display:flex; align-items:center; gap:11px;
          padding:12px 15px; border-radius:16px; box-shadow:0 18px 40px -18px rgba(0,0,0,.8);
        }
        .portrait-card--top { top:22px; left:-26px; }
        .portrait-card--bottom { bottom:26px; right:-30px; }
        .pc-title { display:block; color:#fff; font-weight:700; font-size:.9rem; }
        .pc-sub { display:block; color:var(--muted); font-size:.72rem; }
        .pc-val { display:block; font-family:var(--font-display); font-weight:700; font-size:1.25rem; }
        .pc-avail { width:10px; height:10px; border-radius:50%; background:#34d399; box-shadow:0 0 0 4px rgba(52,211,153,.2); animation:pulse-ring 2.4s ease-out infinite; }
        .pc-icon { display:inline-flex; align-items:center; justify-content:center; width:34px; height:34px; border-radius:10px; color:#fff; background:linear-gradient(135deg,var(--violet),var(--cyan)); flex:none; }

        .hero-chip {
          position:absolute; z-index:3; transform:translate(-50%,-50%);
          font-size:.8rem; font-weight:600; padding:9px 14px; border-radius:999px; color:#fff;
          background:rgba(12,14,24,.8); border:1px solid var(--border-strong); backdrop-filter:blur(8px);
          box-shadow:0 12px 30px -12px rgba(0,0,0,.7);
        }

        .hero-scroll { position:absolute; left:50%; bottom:22px; transform:translateX(-50%); width:26px; height:42px; border-radius:14px; border:2px solid var(--border-strong); display:flex; justify-content:center; padding-top:7px; }
        .hero-scroll-wheel { width:4px; height:9px; border-radius:3px; background:var(--cyan); animation:floaty 1.6s ease-in-out infinite; }

        @media (max-width:960px){
          .hero-grid{ grid-template-columns:1fr; }
          .hero-visual{ order:-1; max-width:520px; margin-inline:auto; }
          .hero-scroll{ display:none; }
        }
        @media (max-width:600px){
          .hero-chip{ display:none; }
          .portrait-card--top{ left:6px; }
          .portrait-card--bottom{ right:6px; }
        }
      `}</style>
    </section>
  );
}
