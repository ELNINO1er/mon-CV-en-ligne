import { Hero } from "@/components/hero/Hero";
import { Intro } from "@/components/sections/Intro";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <FeaturedProjects />
      <Skills />
      <Experience showEducation={false} />
      <SelectedWork />
      <About />
      <Contact />
    </>
  );
}
