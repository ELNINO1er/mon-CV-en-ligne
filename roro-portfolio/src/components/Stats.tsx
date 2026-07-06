import Counter from "./Counter";
import { stats } from "@/lib/site";

export default function Stats() {
  return (
    <div className="stats">
      {stats.map((s) => (
        <div key={s.label} className="stat">
          <span className="stat-value text-gradient">
            <Counter to={s.value} suffix={s.suffix} />
          </span>
          <span className="stat-label">{s.label}</span>
        </div>
      ))}
      <style>{`
        .stats { display:grid; grid-template-columns:repeat(4,1fr); gap:16px; }
        .stat { padding:22px; border:1px solid var(--border); border-radius:16px; background:var(--surface); text-align:center; }
        .stat-value { font-family:var(--font-display); font-weight:700; font-size:clamp(1.8rem,4vw,2.6rem); display:block; }
        .stat-label { color:var(--muted); font-size:.85rem; }
        @media (max-width:640px){ .stats{ grid-template-columns:repeat(2,1fr); } }
      `}</style>
    </div>
  );
}
