"use client";

import Link from "next/link";
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
          <div className="mock floaty">
            <div className="mock-bar">
              <span className="mock-dot" style={{ background: "#ff5f57" }} />
              <span className="mock-dot" style={{ background: "#febc2e" }} />
              <span className="mock-dot" style={{ background: "#28c840" }} />
              <span className="mock-title mono">roro-systems — dashboard.tsx</span>
            </div>
            <div className="mock-body">
              <pre className="mock-code mono">
                <code>
                  <span className="c-key">const</span> <span className="c-fn">app</span> ={" "}
                  <span className="c-str">createSaaS</span>({"{"}
                  {"\n"}  ia: <span className="c-num">true</span>,{"\n"}  multiTenant:{" "}
                  <span className="c-num">true</span>,{"\n"}  secure: <span className="c-num">true</span>,
                  {"\n"}{"}"});
                </code>
              </pre>
              <div className="mock-kpis">
                <div className="kpi">
                  <span className="kpi-label">Utilisateurs</span>
                  <span className="kpi-val">12,4k</span>
                  <span className="kpi-bar"><i style={{ width: "78%" }} /></span>
                </div>
                <div className="kpi">
                  <span className="kpi-label">Automatisations</span>
                  <span className="kpi-val">340/j</span>
                  <span className="kpi-bar"><i style={{ width: "64%" }} /></span>
                </div>
                <div className="kpi kpi--wide">
                  <span className="kpi-label">Temps gagné</span>
                  <span className="kpi-val text-grad-gold">+ 62%</span>
                  <span className="kpi-spark" aria-hidden="true" />
                </div>
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
        .mock {
          position:relative; z-index:2; border-radius:20px; overflow:hidden;
          border:1px solid var(--border-strong);
          background:linear-gradient(180deg, rgba(20,22,34,.95), rgba(10,12,20,.95));
          box-shadow: 0 40px 90px -30px rgba(0,0,0,.8), inset 0 1px 0 rgba(255,255,255,.06);
        }
        .mock-bar { display:flex; align-items:center; gap:8px; padding:12px 16px; border-bottom:1px solid var(--border); background:rgba(255,255,255,.02); }
        .mock-dot { width:11px; height:11px; border-radius:50%; }
        .mock-title { margin-left:10px; font-size:.74rem; color:var(--faint); }
        .mock-body { padding:20px; display:flex; flex-direction:column; gap:18px; }
        .mock-code { margin:0; font-size:.82rem; line-height:1.7; color:#c7cbe0; background:rgba(0,0,0,.25); padding:16px; border-radius:12px; border:1px solid var(--border); overflow:auto; }
        .c-key { color:#7c9cff; } .c-fn { color:var(--cyan); } .c-str { color:var(--gold); } .c-num { color:#34d399; }
        .mock-kpis { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
        .kpi { padding:14px; border-radius:13px; background:var(--surface); border:1px solid var(--border); display:flex; flex-direction:column; gap:7px; }
        .kpi--wide { grid-column:1/-1; }
        .kpi-label { font-size:.72rem; color:var(--faint); text-transform:uppercase; letter-spacing:.08em; }
        .kpi-val { font-family:var(--font-display); font-weight:700; font-size:1.4rem; color:#fff; }
        .kpi-bar { height:6px; border-radius:6px; background:rgba(255,255,255,.08); overflow:hidden; }
        .kpi-bar i { display:block; height:100%; border-radius:6px; background:linear-gradient(90deg,var(--violet),var(--cyan)); }
        .kpi-spark { height:34px; border-radius:8px; background:
          linear-gradient(90deg, transparent, rgba(245,197,66,.06)),
          repeating-linear-gradient(90deg, rgba(245,197,66,.35) 0 2px, transparent 2px 14px);
          mask-image:linear-gradient(180deg, transparent, #000 60%); }

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
        }
      `}</style>
    </section>
  );
}
