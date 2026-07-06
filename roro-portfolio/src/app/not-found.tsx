import Link from "next/link";
import Icon from "@/components/Icon";

export default function NotFound() {
  return (
    <section className="section nf">
      <div className="container nf-inner">
        <span className="eyebrow">Erreur 404</span>
        <h1 className="h-display nf-title">
          Cette page a pris <span className="text-gradient">un autre chemin</span>
        </h1>
        <p className="lead" style={{ marginInline: "auto" }}>
          La page que vous cherchez n&apos;existe pas ou a été déplacée. Revenons sur les rails.
        </p>
        <div className="nf-actions">
          <Link href="/" className="btn btn-primary">
            <Icon name="ArrowRight" size={17} style={{ transform: "rotate(180deg)" }} /> Accueil
          </Link>
          <Link href="/projets" className="btn btn-ghost">
            Voir les projets
          </Link>
        </div>
      </div>
      <style>{`
        .nf { min-height:64vh; display:flex; align-items:center; }
        .nf-inner { text-align:center; display:flex; flex-direction:column; align-items:center; gap:20px; }
        .nf-title { max-width:18ch; }
        .nf-actions { display:flex; gap:13px; flex-wrap:wrap; justify-content:center; margin-top:8px; }
      `}</style>
    </section>
  );
}
