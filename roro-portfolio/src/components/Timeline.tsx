import Icon from "./Icon";
import Reveal from "./Reveal";
import { timeline } from "@/lib/content";

export default function Timeline() {
  return (
    <div className="tl">
      <span className="tl-line" aria-hidden="true" />
      {timeline.map((item, i) => (
        <Reveal key={item.title + i} delay={i * 0.06} className="tl-item">
          <span className="tl-dot" aria-hidden="true">
            <Icon name={item.type === "edu" ? "GraduationCap" : "Briefcase"} size={15} />
          </span>
          <div className="card tl-card">
            <span className="tl-period mono">
              <Icon name="Clock" size={13} /> {item.period}
            </span>
            <h3 className="tl-title">{item.title}</h3>
            <p className="tl-org">{item.org}</p>
            <p className="tl-desc">{item.description}</p>
          </div>
        </Reveal>
      ))}
      <style>{`
        .tl { position:relative; display:flex; flex-direction:column; gap:22px; padding-left:44px; }
        .tl-line {
          position:absolute; left:15px; top:8px; bottom:8px; width:2px;
          background:linear-gradient(180deg,var(--violet),var(--cyan),transparent);
        }
        .tl-item { position:relative; }
        .tl-dot {
          position:absolute; left:-44px; top:6px; display:inline-flex; align-items:center; justify-content:center;
          width:32px; height:32px; border-radius:50%; color:#fff;
          background:linear-gradient(135deg,var(--violet),var(--indigo));
          border:3px solid var(--bg); box-shadow:0 0 0 1px var(--border-strong), 0 0 18px rgba(124,92,255,.5);
        }
        .tl-card { padding:22px 24px; display:flex; flex-direction:column; gap:8px; }
        .tl-period { display:inline-flex; align-items:center; gap:6px; width:max-content; font-size:.72rem; letter-spacing:.06em; text-transform:uppercase; color:var(--cyan); }
        .tl-title { font-size:1.18rem; }
        .tl-org { color:var(--gold); font-weight:600; font-size:.95rem; }
        .tl-desc { color:var(--muted); font-size:.93rem; }
      `}</style>
    </div>
  );
}
