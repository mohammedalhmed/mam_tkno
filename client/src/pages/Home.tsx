/** Product Systems Atelier — صفحة واحدة متصلة من التعريف إلى الدليل ثم آلية العمل والتواصل. */
import { lazy, Suspense, useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Services from '@/components/Services';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';
const Footer = lazy(() => import('@/components/Footer'));
const InteractiveAtmosphere = lazy(() => import('@/components/InteractiveAtmosphere'));
const SectionRevealObserver = lazy(() => import('@/components/SectionRevealObserver'));
import { HOME_METADATA, setJsonLd, setPageMetadata } from '@/lib/seo';

export default function Home() {
  useEffect(() => {
    setPageMetadata(HOME_METADATA);
    setJsonLd('case-study-jsonld', null);
  }, []);
  return (
    <div className="relative min-h-screen bg-[#f7f3e8] text-[#0b0f14]">
      <Suspense fallback={null}>
        <InteractiveAtmosphere />
        <SectionRevealObserver />
      </Suspense>
      <Header />
      <main className="relative z-10">
        <Hero />
        <Projects />
        <Skills />
        <Services />
        <FAQ />
        <Contact />
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}
