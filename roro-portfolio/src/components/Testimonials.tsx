import Icon from "./Icon";
import SectionHeading from "./SectionHeading";
import Reveal, { RevealGroup, RevealItem } from "./Reveal";
import { testimonials } from "@/lib/content";

export default function Testimonials() {
  return (
    <section className="section">
      <div className="container">
        <SectionHeading
          eyebrow="Témoignages"
          title={<>Ce que disent <span className="text-gradient">mes clients</span></>}
          intro="La confiance se construit sur des résultats concrets et une collaboration fluide."
        />
        <RevealGroup className="grid-cards">
          {testimonials.map((t, i) => (
            <RevealItem key={i}>
              <div className="card testi">
                <Icon name="Quote" size={28} className="testi-quote" />
                <p className="testi-text">{t.quote}</p>
                <div className="testi-author">
                  <span className="testi-avatar">{t.initials}</span>
                  <span>
                    <span className="testi-name">{t.author}</span>
                    <span className="testi-role">{t.role}</span>
                  </span>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
      <style>{`
        .testi { padding:28px; display:flex; flex-direction:column; gap:16px; }
        .testi-quote { color:var(--violet); opacity:.7; }
        .testi-text { color:var(--text); font-size:1rem; line-height:1.7; flex:1; }
        .testi-author { display:flex; align-items:center; gap:13px; margin-top:6px; }
        .testi-avatar {
          display:inline-flex; align-items:center; justify-content:center; width:46px; height:46px; border-radius:50%;
          font-weight:700; color:#fff; flex:none;
          background:linear-gradient(135deg,var(--violet),var(--cyan)); border:1px solid var(--border-strong);
        }
        .testi-name { display:block; color:#fff; font-weight:600; }
        .testi-role { display:block; color:var(--muted); font-size:.85rem; }
      `}</style>
    </section>
  );
}
