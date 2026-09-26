import { useEffect, useRef, type CSSProperties, type PointerEvent as ReactPointerEvent } from 'react';
import { ArrowUpLeft, CheckCircle2, ExternalLink, Globe2 } from 'lucide-react';
import { projects } from '@/lib/portfolio-data';
import LiveProjectPreview from '@/components/LiveProjectPreview';

const projectSignatures = {
  bellabox: {
    label: 'SOFT COMMERCE',
    note: 'هدوء العناية يتحول إلى مسار شراء واضح وسهل.',
    tone: 'border-[#f3b8d5]/55 bg-[#f3b8d5]/12 text-[#ffd9e8]',
    line: '#f3b8d5',
    imagePosition: '50% 50%',
    mobileImagePosition: '50% 42%',
  },
  nerfona: {
    label: 'CARE / EDUCATION',
    note: 'المحتوى يشرح القيمة قبل أن يطلب من الزائر الشراء.',
    tone: 'border-[#a9e4c4]/48 bg-[#a9e4c4]/10 text-[#d8ffe7]',
    line: '#a9e4c4',
    imagePosition: '50% 50%',
    mobileImagePosition: '54% 42%',
  },
  altaj: {
    label: 'SPACE / LEAD',
    note: 'خدمات متعددة تجتمع حول نقطة تواصل واحدة ومباشرة.',
    tone: 'border-[#d7baff]/50 bg-[#d7baff]/10 text-[#eadfff]',
    line: '#d7baff',
    imagePosition: '50% 50%',
    mobileImagePosition: '50% 38%',
  },
} as const;

export default function Projects() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const tiltFrame = useRef<number | null>(null);
  const touchTimer = useRef<number | null>(null);

  const handleTiltMove = (event: ReactPointerEvent<HTMLAnchorElement>) => {
    if (event.pointerType === 'touch' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const card = event.currentTarget;
    const bounds = card.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    if (tiltFrame.current) window.cancelAnimationFrame(tiltFrame.current);
    tiltFrame.current = window.requestAnimationFrame(() => {
      card.style.setProperty('--tilt-x', `${(0.5 - y) * 3}deg`);
      card.style.setProperty('--tilt-y', `${(x - 0.5) * 4}deg`);
      card.style.setProperty('--glow-x', `${x * 100}%`);
      card.style.setProperty('--glow-y', `${y * 100}%`);
    });
  };

  const handleTouchStart = (event: ReactPointerEvent<HTMLAnchorElement>) => {
    if (event.pointerType !== 'touch') return;
    const card = event.currentTarget;
    card.dataset.touchActive = 'true';
    if (touchTimer.current) window.clearTimeout(touchTimer.current);
    touchTimer.current = window.setTimeout(() => delete card.dataset.touchActive, 1200);
  };

  const resetTilt = (event: { currentTarget: HTMLAnchorElement }) => {
    const card = event.currentTarget;
    card.style.setProperty('--tilt-x', '0deg');
    card.style.setProperty('--tilt-y', '0deg');
    card.style.setProperty('--glow-x', '50%');
    card.style.setProperty('--glow-y', '50%');
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const revealItems = Array.from(section.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (!('IntersectionObserver' in window)) {
      revealItems.forEach((item) => item.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }),
      { rootMargin: '0px 0px -8% 0px', threshold: 0.1 },
    );
    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="projects-system relative overflow-hidden bg-[#061437] py-20 sm:py-28" aria-labelledby="projects-title">
      <div className="canva-page-grid pointer-events-none absolute inset-0 opacity-80" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-40 top-1/4 h-96 w-96 rounded-full bg-[#245eb9]/20 blur-3xl" aria-hidden="true" />
      <div className="container relative">
        <header className="grid gap-8 border-b border-white/14 pb-10 lg:grid-cols-[.68fr_1.32fr] lg:items-end">
          <div>
            <span className="canva-chip">03 / SELECTED WORK</span>
            <p className="mt-4 max-w-xs text-sm leading-7 text-white/52">دليل مرئي على القرارات والنطاق، لا معرض صور منفصل عن سياق العمل.</p>
          </div>
          <div>
            <h2 id="projects-title" className="font-display text-[clamp(2.5rem,7vw,5.6rem)] font-[750] leading-[1.08] tracking-[-.045em] text-[#f8f5ec]">واجهات تتحدث بلغة نشاطها.</h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/62 sm:text-lg">كل مشروع يعرض المشكلة والقرار والمخرجات المتاحة، مع رابط مباشر للتجربة الحية ودراسة حالة موثقة.</p>
          </div>
        </header>

        <div>
          {projects.map((project, index) => {
            const signature = projectSignatures[project.id as keyof typeof projectSignatures];
            const reverse = index % 2 === 1;

            return (
          <article
                key={project.id}
                data-reveal
                style={{ '--reveal-delay': `${Math.min(index * 70, 140)}ms` } as CSSProperties}
                className="project-entry reveal-card grid gap-9 border-b border-white/12 py-14 sm:py-18 lg:grid-cols-[minmax(0,1.12fr)_minmax(20rem,.88fr)] lg:items-center lg:gap-16 lg:py-24"
              >
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`project-media case-window tilt-card group block overflow-hidden border border-white/16 bg-[#0b2459] shadow-[0_26px_70px_rgba(0,7,30,.42)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16d5df] ${reverse ? 'lg:order-2' : ''}`}
                  onPointerMove={handleTiltMove}
                  onPointerDown={handleTouchStart}
                  onPointerLeave={resetTilt}
                  onFocus={resetTilt}
                  aria-label={`فتح موقع ${project.arabicTitle}`}
                >
                  <div className="flex min-h-11 items-center justify-between border-b border-white/10 px-4 text-white/42">
                    <span className="flex items-center gap-2 text-[10px] font-bold">
                      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: signature.line }} />
                      LIVE EXPERIENCE
                    </span>
                    <span className="font-latin max-w-[62%] truncate text-[9px] sm:text-[10px]">{project.url.replace('https://', '')}</span>
                  </div>
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={project.image}
                      alt={`معاينة مشروع ${project.arabicTitle}`}
                      loading="lazy"
                      decoding="async"
                      sizes="(min-width: 1024px) 58vw, 100vw"
                      className="project-media__image h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      style={{ '--project-image-position': signature.imagePosition, '--project-image-position-mobile': signature.mobileImagePosition } as CSSProperties}
                    />
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-[#061437]/90 p-4 text-white sm:p-5">
                      <div>
                        <span className="font-latin text-[9px] font-extrabold tracking-[.12em] text-[#16d5df]">ROLE / SCOPE</span>
                        <p className="mt-1 text-xs font-bold leading-6 text-white/82 sm:text-sm">{project.role}</p>
                      </div>
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#16d5df] text-[#07101c] transition-transform duration-200 group-hover:-translate-x-1 group-hover:-translate-y-1">
                        <ExternalLink className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </a>

                <div className={`project-copy ${reverse ? 'lg:order-1' : ''}`}>
                  <div className="flex items-center justify-between gap-4">
                    <span className={`border px-3 py-1.5 text-[10px] font-extrabold tracking-[.1em] ${signature.tone}`}>{signature.label}</span>
                    <span className="font-latin text-5xl font-extrabold text-white/10">0{index + 1}</span>
                  </div>
                  <div className="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-2">
                    <h3 className="font-display text-[clamp(2.2rem,7vw,4.25rem)] font-[750] leading-[1.12] tracking-[-.045em] text-white">{project.arabicTitle}</h3>
                    <span className="font-latin text-xs font-bold text-[#16d5df]">{project.title}</span>
                  </div>
                  <p className="mt-5 text-base leading-8 text-white/65 sm:text-lg">{project.description}</p>

                  <div className="mt-7 border-r-2 pr-4" style={{ borderColor: signature.line }}>
                    <span className="font-latin text-[9px] font-extrabold tracking-[.13em] text-white/38">DESIGN DECISION</span>
                    <p className="mt-2 text-sm leading-7 text-white/78">{project.decision}</p>
                    <p className="mt-3 text-xs leading-6 text-white/42">{signature.note}</p>
                  </div>

                  <ul className="mt-7 grid gap-2 sm:grid-cols-2" aria-label="بيانات المشروع">
                    {project.facts.slice(0, 4).map((fact) => (
                      <li key={fact} className="flex items-start gap-2 text-xs leading-6 text-white/58">
                        <CheckCircle2 className="mt-1 h-3.5 w-3.5 shrink-0 text-[#16d5df]" aria-hidden="true" />
                        {fact}
                      </li>
                    ))}
                  </ul>

                  <div className="project-actions mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                    <a href={`/case-studies/${project.id}`} className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#16d5df] px-4 text-sm font-extrabold text-[#061437] shadow-[3px_3px_0_#285fbe] transition-transform hover:-translate-y-0.5 active:translate-y-0">
                      اقرأ دراسة الحالة
                      <ArrowUpLeft className="h-4 w-4" aria-hidden="true" />
                    </a>
                    <LiveProjectPreview project={project} className="inline-flex min-h-12 items-center justify-center gap-2 border border-[#16d5df] bg-[#16d5df] px-4 text-sm font-extrabold text-[#07101c] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[#7ee8ee] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#07101c] active:translate-y-0" />
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 border border-white/18 px-4 text-sm font-bold text-white/74 transition-colors hover:border-[#16d5df] hover:text-[#16d5df]">
                      زيارة الموقع
                      <Globe2 className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col gap-3 text-xs leading-6 text-white/38 sm:flex-row sm:items-center sm:justify-between">
          <span>المحتوى يعكس النطاق المعتمد والبيانات العامة المتاحة حتى سبتمبر 2026.</span>
          <span className="font-latin text-[#16d5df]">MAM_TKNO / EVIDENCE BEFORE CLAIMS</span>
        </div>
      </div>
    </section>
  );
}
