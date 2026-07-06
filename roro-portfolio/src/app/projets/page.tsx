import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ProjectsExplorer from "@/components/ProjectsExplorer";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Projets & études de cas",
  description:
    "Études de cas de Romaric Bombade : plateformes FinTech, solutions AgriTech, e-commerce, santé digitale, réseau social sécurisé et automatisation IA.",
  alternates: { canonical: "/projets/" },
};

export default function ProjetsPage() {
  return (
    <>
      <PageHero
        eyebrow="Projets réalisés"
        title={<>Des projets concrets, <span className="text-gradient">des résultats mesurables</span></>}
        intro="Chaque projet est présenté comme une étude de cas : le problème, la solution mise en place, les technologies et le résultat obtenu."
      />
      <section className="section" style={{ paddingTop: 12 }}>
        <div className="container">
          <ProjectsExplorer />
        </div>
      </section>
      <CtaBand
        title="Votre projet peut être le prochain"
        text="Parlez-moi de votre besoin : je vous propose une approche claire, un périmètre réaliste et un devis gratuit."
      />
    </>
  );
}
