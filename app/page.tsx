import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Impact from "@/components/Impact";
import Flagship from "@/components/Flagship";
import Capabilities from "@/components/Capabilities";
import Solutions from "@/components/Solutions";
import Portfolio from "@/components/Portfolio";
import Recognition from "@/components/Recognition";
import { appreciationGallery } from "@/lib/galleryAssets";
import HowIWork from "@/components/HowIWork";
import About from "@/components/About";
import Journey from "@/components/Journey";
import Leadership from "@/components/Leadership";
import Philosophy from "@/components/Philosophy";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main id="main">
      <Nav />
      <Hero />
      <Impact />
      {/* Proof before autobiography: the flagship and the case studies come first. */}
      <Flagship />
      <Capabilities />
      <Solutions />
      <Portfolio />
      <Recognition gallery={appreciationGallery()} />
      <HowIWork />
      <About />
      <Journey />
      <Leadership />
      <Philosophy />
      <Skills />
      <Contact />
      <Footer />
    </main>
  );
}
