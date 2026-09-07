import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Impact from "@/components/Impact";
import Flagship from "@/components/Flagship";
import Solutions from "@/components/Solutions";
import Portfolio from "@/components/Portfolio";
import HowIThink from "@/components/HowIThink";
import Intersection from "@/components/Intersection";
import About from "@/components/About";
import Capabilities from "@/components/Capabilities";
import Recognition from "@/components/Recognition";
import { appreciationGallery } from "@/lib/galleryAssets";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main id="main">
      <Nav />
      <Hero />
      <Impact />
      {/* Evidence before self-description: the work comes first. */}
      <Flagship />
      <Solutions />
      <Portfolio />
      <HowIThink />
      <Intersection />
      <About />
      <Capabilities />
      <Recognition gallery={appreciationGallery()} />
      <Contact />
      <Footer />
    </main>
  );
}
