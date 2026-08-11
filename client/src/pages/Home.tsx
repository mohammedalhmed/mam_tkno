/** Product Systems Atelier — صفحة واحدة متصلة من التعريف إلى الدليل ثم آلية العمل والتواصل. */
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Services from '@/components/Services';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f7f3e8] text-[#0b0f14]">
      <Header />
      <main>
        <Hero />
        <Projects />
        <Skills />
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
