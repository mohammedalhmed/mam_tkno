/** Product Systems Atelier — صفحة واحدة متصلة من التعريف إلى الدليل ثم آلية العمل والتواصل. */
import { lazy, Suspense, useEffect, useState } from 'react';
import Header from '@/components/Header';
import PageLoadingSkeleton from '@/components/PageLoadingSkeleton';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import WebsiteTypes from '@/components/WebsiteTypes';
import Skills from '@/components/Skills';
import Services from '@/components/Services';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';
const Footer = lazy(() => import('@/components/Footer'));
const InteractiveAtmosphere = lazy(() => import('@/components/InteractiveAtmosphere'));
const SectionRevealObserver = lazy(() => import('@/components/SectionRevealObserver'));
import { HOME_METADATA, setJsonLd, setPageMetadata } from '@/lib/seo';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setPageMetadata(HOME_METADATA);
    setJsonLd('case-study-jsonld', null);

    const loadingTimer = window.setTimeout(() => setIsLoading(false), 420);
    return () => window.clearTimeout(loadingTimer);
  }, []);
  return (
    <div className="site-shell relative" aria-busy={isLoading}>
      {isLoading && <PageLoadingSkeleton fullScreen />}
      <Suspense fallback={<PageLoadingSkeleton />}>
        <InteractiveAtmosphere />
        <SectionRevealObserver />
      </Suspense>
      <Header />
      <main className="relative z-10">
        <Hero />
        <Services />
        <WebsiteTypes />
        <Projects />
        <Skills />
        <FAQ />
        <Contact />
      </main>
      <Suspense fallback={<PageLoadingSkeleton />}>
        <Footer />
      </Suspense>
    </div>
  );
}
