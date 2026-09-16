import { ArrowRight, CheckCircle2, ExternalLink, MoveUpLeft } from 'lucide-react';
import { useEffect, type CSSProperties } from 'react';
import { Link, useParams } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CaseStudyActions from '@/components/CaseStudyActions';
import LiveProjectPreview from '@/components/LiveProjectPreview';
import { getCaseStudy } from '@/lib/case-studies';
import { projects } from '@/lib/portfolio-data';
import { setJsonLd, setPageMetadata, SITE_URL } from '@/lib/seo';

const caseStudyThemes = {
  bellabox: {
    accent: '#f3b8d5',
    soft: '#3c1d40',
    line: '#f3b8d5',
    signature: 'هدوء بصري يترك الفئات والمنتجات تقود قرار الشراء.',
    grid: 'lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,.8fr)]',
    mediaOrder: '',
    asideOrder: '',
  },
  nerfona: {
    accent: '#a9e4c4',
    soft: '#133d36',
    line: '#a9e4c4',
    signature: 'المعلومة تسبق المنتج عندما يحتاج الاختيار إلى فهم.',
    grid: 'lg:grid-cols-[minmax(280px,.8fr)_minmax(0,1.2fr)]',
    mediaOrder: 'lg:order-2',
    asideOrder: 'lg:order-1',
  },
  altaj: {
    accent: '#d7baff',
    soft: '#2d1e4f',
    line: '#d7baff',
    signature: 'الخدمة المعقدة تبدأ من مسار قصير نحو طلب واضح.',
    grid: 'lg:grid-cols-[minmax(0,1.35fr)_minmax(260px,.65fr)]',
    mediaOrder: 'lg:translate-y-7',
    asideOrder: '',
  },
} as const;

export default function CaseStudyPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const study = getCaseStudy(projectId);
  const project = projects.find((item) => item.id === projectId);

  useEffect(() => {
    if (!study || !project || typeof document === 'undefined') return;

    const title = `دراسة حالة ${study.arabicTitle} | MAM_Tkno`;
    const description = `دراسة حالة ${study.arabicTitle}: ${study.summary}`;
    const canonicalPath = `/case-studies/${study.projectId}`;
    const canonicalUrl = `${SITE_URL}${canonicalPath}`;
    const imageSource = study.media.find((media) => media.src)?.src;
    const imageUrl = imageSource ? new URL(imageSource, SITE_URL).toString() : undefined;
    setPageMetadata({
      title,
      description,
      canonicalPath,
      ogType: 'article',
      image: imageUrl,
    });
    setJsonLd('case-study-jsonld', {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'CreativeWork',
          '@id': `${canonicalUrl}#case-study`,
          name: study.arabicTitle,
          headline: title,
          description,
          url: canonicalUrl,
          image: imageUrl,
          genre: study.category,
          about: study.problem,
          abstract: study.solution,
          keywords: [...study.services, ...study.deliverables].join(', '),
          creator: { '@type': 'Organization', name: 'MAM_Tkno', url: SITE_URL },
          isPartOf: { '@type': 'WebSite', name: 'MAM_Tkno', url: SITE_URL },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'البداية', item: `${SITE_URL}/` },
            { '@type': 'ListItem', position: 2, name: 'المشاريع', item: `${SITE_URL}/#projects` },
            { '@type': 'ListItem', position: 3, name: study.arabicTitle, item: canonicalUrl },
          ],
        },
      ],
    });

    return () => setJsonLd('case-study-jsonld', null);
  }, [project, study]);

  if (!study || !project) {
    return (
      <div className="site-shell">
        <Header />
        <main className="container flex min-h-[70vh] flex-col items-start justify-center py-24">
          <p className="section-number">CASE STUDY / 404</p>
          <h1 className="mt-5 max-w-2xl font-display text-4xl font-[750] leading-tight sm:text-6xl">لم نعثر على دراسة الحالة المطلوبة.</h1>
          <Link href="/#projects" className="ink-button mt-8">العودة إلى المشاريع <ArrowRight className="h-4 w-4" /></Link>
        </main>
      </div>
    );
  }

  const theme = caseStudyThemes[study.projectId as keyof typeof caseStudyThemes];
  const themeStyle = {
    '--case-accent': theme.accent,
    '--case-soft': theme.soft,
    '--case-line': theme.line,
  } as CSSProperties;

  return (
    <div className="site-shell" style={themeStyle}>
      <Header />
      <main>
        <section className="relative overflow-hidden border-b border-white/10 bg-[#061437] pb-16 pt-32 text-white md:pb-24 md:pt-44">
          <div className="canva-page-grid pointer-events-none absolute inset-0 opacity-80" aria-hidden="true" />
          <div className="pointer-events-none absolute -left-48 top-1/3 h-96 w-96 rounded-full bg-[var(--case-accent)]/10 blur-3xl" aria-hidden="true" />
          <div className="container relative">
            <Link href="/#projects" className="inline-flex items-center gap-2 text-sm font-bold text-white/65 transition-colors hover:text-[#16d5df] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16d5df]">
              <MoveUpLeft className="h-4 w-4" aria-hidden="true" /> العودة إلى المشاريع
            </Link>
            <div className="mt-12 max-w-5xl">
              <p className="canva-chip inline-flex">CASE STUDY / {study.projectId.toUpperCase()}</p>
              <p className="mt-5 text-sm font-bold text-[var(--case-line)]">{study.category}</p>
              <h1 className="mt-4 font-display text-[clamp(3rem,10vw,8.5rem)] font-[750] leading-[1.02] tracking-[-.05em]">{study.arabicTitle}</h1>
              <p className="mt-7 max-w-3xl text-xl leading-[1.8] text-white/72 sm:text-2xl">{study.summary}</p>
              <div className="mt-7 max-w-3xl border-r-2 border-[var(--case-line)] pr-4">
                <p className="font-latin text-[9px] font-extrabold tracking-[.16em] text-[#16d5df]">PROJECT PRINCIPLE</p>
                <p className="mt-2 text-sm font-semibold leading-7 text-white/70 sm:text-base">{theme.signature}</p>
              </div>
              <div className="mt-9"><CaseStudyActions study={study} /></div>
              <div className="mt-5 flex items-center gap-3 text-xs font-semibold text-white/52"><span className="h-px w-10 bg-[#16d5df]" aria-hidden="true" /><span className="font-latin text-[9px] tracking-[.16em] text-[#16d5df]">NEXT / SHARE OR START A SIMILAR PROJECT</span></div>
            </div>
          </div>
        </section>

        <section className="border-b border-white/10 bg-[#0b2459] py-5 text-white" aria-label="طبقات مراجعة المشروع">
          <div className="container grid overflow-hidden border border-white/14 bg-white/[.035] sm:grid-cols-3">
            <div className="border-b border-white/14 px-5 py-4 sm:border-b-0 sm:border-l"><p className="font-latin text-[9px] font-extrabold tracking-[.16em] text-[#16d5df]">DECISION / 01</p><p className="mt-1 text-sm font-bold text-white/88">{theme.signature}</p></div>
            <div className="border-b border-white/14 px-5 py-4 sm:border-b-0 sm:border-l"><p className="font-latin text-[9px] font-extrabold tracking-[.16em] text-[var(--case-accent)]">EVIDENCE / 02</p><p className="mt-1 text-sm font-bold text-white/88">مراجعة وصفية لما يظهر في المشروع.</p></div>
            <div className="px-5 py-4"><p className="font-latin text-[9px] font-extrabold tracking-[.16em] text-[#83cfff]">SCOPE / 03</p><p className="mt-1 text-sm font-bold text-white/88">{study.deliverables.length} مخرجات موثقة ضمن النطاق.</p></div>
          </div>
        </section>

        <section className={`bg-[#071a43] py-16 text-white md:py-24`}>
          <div className={`container grid gap-10 lg:items-start ${theme.grid}`}>
          <div className={`overflow-hidden border border-t-4 border-[var(--case-line)] border-t-[var(--case-accent)] bg-[#0b2459] shadow-[0_24px_70px_rgba(0,5,30,.35)] ${theme.mediaOrder}`}>
            {study.media.map((media, index) => (
              <figure key={media.label}>
                {media.type === 'image' && media.src ? <img src={media.src} alt={media.alt} loading={index === 0 ? 'eager' : 'lazy'} decoding="async" fetchPriority={index === 0 ? 'high' : 'auto'} sizes="(min-width: 1024px) 58vw, 100vw" className="aspect-[16/10] h-full w-full object-cover" /> : <div className="flex aspect-[16/10] items-center justify-center bg-white/[.04] text-white/45">الوسيط غير متوفر حاليًا</div>}
                <figcaption className="flex items-center justify-between border-t border-white/10 px-5 py-3 text-xs text-white/50"><span>{media.label}</span><span className="font-latin text-[9px] font-bold tracking-[.12em] text-[var(--case-line)]">{study.projectId.toUpperCase()} / LIVE VIEW</span></figcaption>
              </figure>
            ))}
          </div>
          <aside className={`border-r-2 border-[var(--case-accent)] pr-5 ${theme.asideOrder}`}>
            <span className="inline-flex bg-[var(--case-soft)] px-3 py-2 font-latin text-[10px] font-extrabold tracking-[.16em] text-[var(--case-accent)]">PROJECT SIGNALS / {study.projectId.toUpperCase()}</span>
            <h2 className="mt-4 font-display text-2xl font-bold text-white">ماذا نراجع هنا؟</h2>
            <p className="mt-4 text-base leading-8 text-white/68">تجمع هذه الصفحة بين المعلومات الظاهرة في المشروع ونطاق العمل المعتمد لدى MAM_Tkno، وتفصل المخرجات الوصفية عن أي نتائج رقمية غير منشورة.</p>
            <div className="mt-6 border border-white/14 bg-white/[.04] p-4 shadow-[5px_5px_0_var(--case-soft)]">
              <p className="font-latin text-[9px] font-extrabold tracking-[.14em] text-[var(--case-accent)]">EVIDENCE NOTE</p>
              <p className="mt-2 text-sm leading-7 text-white/68">{study.evidenceNote}</p>
            </div>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <LiveProjectPreview project={project} className="inline-flex min-h-11 items-center gap-2 bg-[#16d5df] px-4 text-sm font-extrabold text-[#07101c] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[#7ee8ee] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#147e87] active:translate-y-0" />
              <a href={project.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 border-b border-white/30 pb-1 text-sm font-extrabold text-white transition-colors hover:border-[#16d5df] hover:text-[#16d5df] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16d5df]">زيارة الموقع الحي <ExternalLink className="h-4 w-4" aria-hidden="true" /></a>
            </div>
          </aside>
          </div>
        </section>

        <section className="relative overflow-hidden border-y border-white/10 bg-[#061437] py-16 text-white md:py-24">
          <div className="canva-page-grid pointer-events-none absolute inset-0 opacity-65" aria-hidden="true" />
          <div className="container grid gap-5 md:grid-cols-2 md:grid-rows-[auto_auto]">
            <article className="relative border border-white/14 border-t-4 border-t-[var(--case-accent)] bg-[#0b2459]/78 p-7 md:row-span-2 md:flex md:min-h-[25rem] md:flex-col md:justify-end"><p className="font-latin text-[10px] font-extrabold tracking-[.18em] text-[var(--case-accent)]">01 / PROBLEM</p><h2 className="mt-4 font-display text-[clamp(2rem,3vw,3rem)] font-bold text-white">المشكلة</h2><p className="mt-5 max-w-xl leading-8 text-white/68">{study.problem}</p></article>
            <article className="relative border border-white/14 border-t-4 border-t-[#16d5df] bg-white/[.045] p-6"><p className="font-latin text-[10px] font-extrabold tracking-[.18em] text-[#16d5df]">02 / SOLUTION</p><h2 className="mt-4 font-display text-2xl font-bold text-white">الحل</h2><p className="mt-4 leading-8 text-white/68">{study.solution}</p></article>
            <article className="relative border border-white/14 border-t-4 border-t-[var(--case-accent)] bg-white/[.045] p-6"><p className="font-latin text-[10px] font-extrabold tracking-[.18em] text-[var(--case-accent)]">03 / OUTCOME</p><div className="mt-4 flex flex-wrap items-center justify-between gap-3"><h2 className="font-display text-2xl font-bold text-white">المخرجات والنتيجة</h2><span className="inline-flex border border-[var(--case-line)] bg-[var(--case-soft)] px-3 py-1.5 text-xs font-bold text-[var(--case-accent)]">{study.outcomeStatus === 'descriptive' ? 'توثيق وصفي دون أرقام' : 'بانتظار اعتماد النتائج'}</span></div><p className="mt-4 leading-8 text-white/68">{study.outcome}</p></article>
          </div>
        </section>

        <section className="bg-[#071a43] py-16 text-white md:py-24">
          <div className="container grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <div><p className="canva-kicker">DELIVERABLES / SCOPE</p><h2 className="mt-4 font-display text-3xl font-bold text-white">ما الذي دخل في النطاق؟</h2><p className="mt-5 max-w-sm text-sm leading-7 text-white/55">مخرجات محددة يمكن مراجعتها داخل الواجهة، وليست قائمة ادعاءات عامة.</p></div>
          <div><ul className="grid gap-3 sm:grid-cols-2">{study.deliverables.map((item) => <li key={item} className="flex items-start gap-3 border border-white/14 bg-white/[.045] p-4 text-sm leading-7 text-white/78"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#16d5df]" aria-hidden="true" />{item}</li>)}</ul><div className="mt-8 flex flex-wrap gap-2">{study.services.map((service) => <span key={service} className="border border-[var(--case-line)] bg-[var(--case-soft)] px-3 py-2 text-xs font-bold text-[var(--case-accent)]">{service}</span>)}</div></div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
