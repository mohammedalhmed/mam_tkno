/** Product Systems Atelier — صفحة واحدة متصلة من التعريف إلى الدليل ثم آلية العمل والتواصل. */
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Services from '@/components/Services';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import InteractiveAtmosphere from '@/components/InteractiveAtmosphere';
import SectionRevealObserver from '@/components/SectionRevealObserver';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#f7f3e8] text-[#0b0f14]">
      <InteractiveAtmosphere />
      <SectionRevealObserver />
      <Header />
      <main className="relative z-10">
        <Hero />
        <Projects />
        <Skills />
        <Services />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
