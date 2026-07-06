import Icon, { type IconName } from "./Icon";
import type { Strength } from "@/lib/content";

export default function StrengthCard({ strength, index }: { strength: Strength; index: number }) {
  return (
    <div className="card strength">
      <span className="strength-num mono">{String(index + 1).padStart(2, "0")}</span>
      <span className="strength-icon">
        <Icon name={strength.icon as IconName} size={22} />
      </span>
      <h3 className="strength-title">{strength.title}</h3>
      <p className="strength-desc">{strength.description}</p>
      <style>{`
        .strength { padding:26px; display:flex; flex-direction:column; gap:12px; }
        .strength-num {
          position:absolute; top:18px; right:22px; font-size:1.5rem; font-weight:700;
          color:transparent; -webkit-text-stroke:1px rgba(255,255,255,.14);
        }
        .strength-icon {
          display:inline-flex; align-items:center; justify-content:center; width:46px; height:46px;
          border-radius:13px; color:var(--cyan);
          background:linear-gradient(135deg, rgba(34,211,238,.15), rgba(124,92,255,.12));
          border:1px solid var(--border-strong);
        }
        .strength-title { font-size:1.1rem; }
        .strength-desc { color:var(--muted); font-size:.93rem; }
      `}</style>
    </div>
  );
}
