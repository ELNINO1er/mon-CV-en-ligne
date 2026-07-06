import Link from "next/link";
import Icon from "./Icon";
import Reveal from "./Reveal";
import { whatsappUrl } from "@/lib/site";

export default function CtaBand({
  title = "Un projet en tête ? Parlons-en.",
  text = "Vous avez une idée, un site à créer, une application à développer ou un processus à automatiser ? Transformons votre besoin en solution digitale concrète.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="section">
      <div className="container">
        <Reveal>
          <div className="cta glass">
            <div className="cta-glow" aria-hidden="true" />
            <div className="cta-content">
              <span className="eyebrow">Prêt à démarrer ?</span>
              <h2 className="h-section text-gradient">{title}</h2>
              <p className="lead">{text}</p>
              <div className="cta-actions">
                <Link href="/contact" className="btn btn-primary">
                  Demander un devis gratuit <Icon name="ArrowRight" size={18} />
                </Link>
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                >
                  <Icon name="MessageCircle" size={18} /> WhatsApp
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
      <style>{`
        .cta { position:relative; overflow:hidden; padding:clamp(36px,6vw,72px); text-align:center; }
        .cta-glow {
          position:absolute; inset:0; pointer-events:none;
          background:
            radial-gradient(50% 60% at 20% 0%, rgba(124,92,255,.22), transparent 60%),
            radial-gradient(50% 60% at 85% 100%, rgba(34,211,238,.18), transparent 60%);
        }
        .cta-content { position:relative; display:flex; flex-direction:column; align-items:center; gap:20px; }
        .cta-content .lead { margin-inline:auto; }
        .cta-actions { display:flex; gap:14px; flex-wrap:wrap; justify-content:center; margin-top:8px; }
      `}</style>
    </section>
  );
}
