import Icon, { type IconName } from "./Icon";
import Reveal from "./Reveal";
import { stackGroups } from "@/lib/content";

export default function StackSection() {
  return (
    <div className="stack">
      {stackGroups.map((g, i) => (
        <Reveal key={g.label} delay={i * 0.06} className="card stack-group">
          <div className="stack-head">
            <span className="stack-icon">
              <Icon name={g.icon as IconName} size={18} />
            </span>
            <h3 className="stack-label">{g.label}</h3>
          </div>
          <div className="stack-items">
            {g.items.map((it) => (
              <span key={it} className="chip">
                {it}
              </span>
            ))}
          </div>
        </Reveal>
      ))}
      <style>{`
        .stack { display:grid; gap:18px; grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr)); }
        .stack-group { padding:24px; display:flex; flex-direction:column; gap:16px; }
        .stack-head { display:flex; align-items:center; gap:12px; }
        .stack-icon {
          display:inline-flex; align-items:center; justify-content:center; width:40px; height:40px; border-radius:12px; color:var(--cyan);
          background:linear-gradient(135deg, rgba(34,211,238,.15), rgba(124,92,255,.12)); border:1px solid var(--border-strong);
        }
        .stack-label { font-size:1.02rem; }
        .stack-items { display:flex; flex-wrap:wrap; gap:9px; }
      `}</style>
    </div>
  );
}
