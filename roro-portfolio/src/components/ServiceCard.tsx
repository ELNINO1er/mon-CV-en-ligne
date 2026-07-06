import Icon, { type IconName } from "./Icon";
import TiltCard from "./TiltCard";
import type { Service } from "@/lib/content";

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <TiltCard className="card svc">
      <span className="svc-glow" aria-hidden="true" />
      <span className="svc-icon">
        <Icon name={service.icon as IconName} size={24} />
      </span>
      <h3 className="svc-title">{service.title}</h3>
      <p className="svc-desc">{service.description}</p>
      <p className="svc-benefit">
        <Icon name="Check" size={16} />
        {service.benefit}
      </p>
      <style>{`
        .svc { padding:28px; display:flex; flex-direction:column; gap:12px; }
        .svc-glow {
          position:absolute; inset:0; opacity:0; transition:opacity .35s;
          background:radial-gradient(240px circle at var(--mx,50%) var(--my,0%), rgba(124,92,255,.14), transparent 70%);
          pointer-events:none;
        }
        .svc:hover .svc-glow { opacity:1; }
        .svc-icon {
          display:inline-flex; align-items:center; justify-content:center; width:52px; height:52px;
          border-radius:15px; color:#fff; margin-bottom:6px;
          background:linear-gradient(135deg, rgba(124,92,255,.28), rgba(34,211,238,.2));
          border:1px solid var(--border-strong);
          box-shadow: inset 0 1px 0 rgba(255,255,255,.12);
          transition:transform .35s;
        }
        .svc:hover .svc-icon { transform:translateY(-4px) rotate(-4deg); }
        .svc-title { font-size:1.2rem; }
        .svc-desc { color:var(--muted); font-size:.95rem; }
        .svc-benefit {
          display:flex; align-items:flex-start; gap:8px; margin-top:6px;
          color:var(--cyan); font-size:.9rem; font-weight:500; line-height:1.45;
        }
        .svc-benefit svg { flex:none; margin-top:2px; }
      `}</style>
    </TiltCard>
  );
}
