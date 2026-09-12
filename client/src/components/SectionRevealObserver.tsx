import { useEffect } from 'react';

export default function SectionRevealObserver() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('js-motion');

    const sections = Array.from(document.querySelectorAll<HTMLElement>('main > section:not(#home)'));
    if (!sections.length) {
      root.classList.remove('js-motion');
      return;
    }

    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      sections.forEach((section) => section.classList.add('section-is-visible'));
      return () => root.classList.remove('js-motion');
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('section-is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => {
      observer.disconnect();
      root.classList.remove('js-motion');
    };
  }, []);

  return null;
}
