import Link from "next/link";
import Logo from "./Logo";
import Icon from "./Icon";
import { site, navLinks, whatsappUrl, mailtoUrl } from "@/lib/site";

export default function Footer() {
  const year = 2025;
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Logo />
            <p className="footer-pitch">{site.shortPitch}</p>
            <div className="footer-socials">
              <a className="footer-soc" href={whatsappUrl()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <Icon name="MessageCircle" size={18} />
              </a>
              <a className="footer-soc" href={mailtoUrl()} aria-label="Email">
                <Icon name="Mail" size={18} />
              </a>
              <a className="footer-soc" href={site.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Icon name="Linkedin" size={18} />
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-h">Navigation</h4>
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} className="footer-link">
                {l.label}
              </Link>
            ))}
          </div>

          <div className="footer-col">
            <h4 className="footer-h">Contact</h4>
            <a className="footer-link" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
              WhatsApp — {site.phoneDisplay}
            </a>
            <a className="footer-link" href={mailtoUrl()}>
              {site.email}
            </a>
            <span className="footer-link footer-loc">
              <Icon name="MapPin" size={15} /> {site.location}
            </span>
            <Link href="/contact" className="btn btn-primary" style={{ marginTop: 14 }}>
              Discuter de mon projet
            </Link>
          </div>
        </div>

        <hr className="divider" />
        <div className="footer-bottom">
          <p>© {year} {site.name} — {site.brand}. Tous droits réservés.</p>
          <p className="mono">Conçu &amp; développé avec Next.js</p>
        </div>
      </div>

      <style>{`
        .footer { border-top:1px solid var(--border); padding-block:64px 32px; margin-top:40px; position:relative; }
        .footer::before {
          content:""; position:absolute; inset:0 0 auto 0; height:1px;
          background:linear-gradient(90deg,transparent,var(--violet),var(--cyan),transparent); opacity:.6;
        }
        .footer-top { display:grid; grid-template-columns:1.6fr 1fr 1.2fr; gap:40px; }
        .footer-pitch { color:var(--muted); margin-top:18px; max-width:42ch; font-size:.95rem; }
        .footer-socials { display:flex; gap:10px; margin-top:20px; }
        .footer-soc {
          display:inline-flex; align-items:center; justify-content:center; width:42px; height:42px;
          border-radius:12px; background:var(--surface); border:1px solid var(--border); color:var(--text);
          transition:transform .2s, border-color .2s, color .2s;
        }
        .footer-soc:hover { transform:translateY(-3px); border-color:rgba(124,92,255,.5); color:#fff; }
        .footer-h { font-size:.78rem; letter-spacing:.16em; text-transform:uppercase; color:var(--faint); margin-bottom:16px; font-family:var(--font-mono); }
        .footer-col { display:flex; flex-direction:column; gap:12px; align-items:flex-start; }
        .footer-link { color:var(--muted); font-size:.95rem; transition:color .2s; display:inline-flex; align-items:center; gap:7px; }
        .footer-link:hover { color:#fff; }
        .footer-bottom { display:flex; justify-content:space-between; gap:16px; flex-wrap:wrap; margin-top:24px; color:var(--faint); font-size:.85rem; }
        @media (max-width:820px){ .footer-top{ grid-template-columns:1fr 1fr; } .footer-brand{ grid-column:1/-1; } }
        @media (max-width:520px){ .footer-top{ grid-template-columns:1fr; } }
      `}</style>
    </footer>
  );
}
