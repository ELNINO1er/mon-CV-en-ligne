import Link from "next/link";
import Icon, { type IconName } from "./Icon";
import { whatsappUrl } from "@/lib/site";
import type { Pack } from "@/lib/content";

export default function PackCard({ pack }: { pack: Pack }) {
  const wa = whatsappUrl(
    `Bonjour Romaric, je suis intéressé(e) par le "${pack.name}". Pouvons-nous en discuter ?`,
  );
  return (
    <div className={`card pack ${pack.featured ? "pack--featured" : ""}`}>
      {pack.featured && <span className="pack-badge">Le plus demandé</span>}
      <span className="pack-icon">
        <Icon name={pack.icon as IconName} size={24} />
      </span>
      <h3 className="pack-name">{pack.name}</h3>
      <p className="pack-tagline">{pack.tagline}</p>

      <div className="pack-audience">
        <span className="pack-label mono">Pour qui</span>
        <p>{pack.audience}</p>
      </div>

      <ul className="pack-benefits">
        {pack.benefits.map((b) => (
          <li key={b}>
            <Icon name="CheckCircle2" size={17} />
            {b}
          </li>
        ))}
      </ul>

      <Link href={`/contact?pack=${pack.slug}`} className="btn btn-primary pack-cta">
        Demander un devis
      </Link>
      <a href={wa} target="_blank" rel="noopener noreferrer" className="pack-wa">
        <Icon name="MessageCircle" size={15} /> ou discuter sur WhatsApp
      </a>

      <style>{`
        .pack { padding:30px; display:flex; flex-direction:column; gap:14px; }
        .pack--featured { border-color:rgba(124,92,255,.5); box-shadow:var(--shadow-glow); }
        .pack-badge {
          position:absolute; top:18px; right:20px; font-size:.7rem; font-weight:700; letter-spacing:.03em;
          padding:5px 11px; border-radius:999px; color:#fff;
          background:linear-gradient(120deg,var(--violet),var(--cyan));
        }
        .pack-icon {
          display:inline-flex; align-items:center; justify-content:center; width:54px; height:54px;
          border-radius:15px; color:#fff;
          background:linear-gradient(135deg, rgba(124,92,255,.3), rgba(34,211,238,.2));
          border:1px solid var(--border-strong);
        }
        .pack-name { font-size:1.3rem; }
        .pack-tagline { color:var(--muted); font-size:.96rem; }
        .pack-audience { padding:14px 16px; border-radius:14px; background:var(--surface); border:1px solid var(--border); }
        .pack-label { display:block; font-size:.68rem; letter-spacing:.14em; text-transform:uppercase; color:var(--faint); margin-bottom:5px; }
        .pack-audience p { color:var(--text); font-size:.9rem; }
        .pack-benefits { list-style:none; margin:0; padding:0; display:flex; flex-direction:column; gap:11px; }
        .pack-benefits li { display:flex; align-items:flex-start; gap:10px; color:var(--text); font-size:.94rem; }
        .pack-benefits svg { color:var(--cyan); flex:none; margin-top:1px; }
        .pack-cta { margin-top:6px; width:100%; }
        .pack-wa { display:inline-flex; align-items:center; justify-content:center; gap:7px; color:var(--muted); font-size:.85rem; transition:color .2s; }
        .pack-wa:hover { color:#25d366; }
      `}</style>
    </div>
  );
}
