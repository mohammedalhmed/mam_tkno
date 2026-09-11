import { ArrowRight, CheckCircle2, ExternalLink, MoveUpLeft } from 'lucide-react';
import { useEffect, type CSSProperties } from 'react';
import { Link, useParams } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CaseStudyActions from '@/components/CaseStudyActions';
import { getCaseStudy } from '@/lib/case-studies';
import { projects } from '@/lib/portfolio-data';
import { setJsonLd, setPageMetadata, SITE_URL } from '@/lib/seo';

const caseStudyThemes = {
  bellabox: {
    accent: '#8f3754',
    soft: '#f2dfe5',
    line: '#d8b8c4',
    signature: 'هدوء بصري يترك الفئات والمنتجات تقود قرار الشراء.',
    grid: 'lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,.8fr)]',
    mediaOrder: '',
    asideOrder: '',
  },
  nerfona: {
    accent: '#42623b',
    soft: '#e1ead8',
    line: '#bfd0b3',
    signature: 'المعلومة تسبق المنتج عندما يحتاج الاختيار إلى فهم.',
    grid: 'lg:grid-cols-[minmax(280px,.8fr)_minmax(0,1.2fr)]',
    mediaOrder: 'lg:order-2',
    asideOrder: 'lg:order-1',
  },
  altaj: {
    accent: '#6f315d',
    soft: '#eadde7',
    line: '#cfb6c9',
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
      <div className="min-h-screen bg-[#f1f5f5] text-[#07164f]">
        <Header />
        <main className="container flex min-h-[70vh] flex-col items-start justify-center py-24">
          <p className="font-latin text-xs font-extrabold tracking-[.18em] text-[#147e87]">CASE STUDY / 404</p>
          <h1 className="mt-5 max-w-2xl text-4xl font-extrabold leading-tight sm:text-6xl">لم نعثر على دراسة الحالة المطلوبة.</h1>
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
    <div className="min-h-screen bg-[#f7f3e8] text-[#0b0f14]" style={themeStyle}>
      <Header />
      <main>
        <section className="relative overflow-hidden border-b border-white/10 bg-[#07164f] pb-16 pt-32 text-[#f7f3e8] md:pb-24 md:pt-44">
          <div className="pointer-events-none absolute -left-24 top-20 h-80 w-80 rounded-full bg-[#16d5df]/20 blur-3xl" />
          <div className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-[#ff7a0a]/15 blur-3xl" />
          <div className="container relative">
            <Link href="/#projects" className="inline-flex items-center gap-2 text-sm font-bold text-white/65 transition-colors hover:text-[#16d5df] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16d5df]">
              <MoveUpLeft className="h-4 w-4" aria-hidden="true" /> العودة إلى المشاريع
            </Link>
            <div className="mt-12 max-w-5xl">
              <p className="font-latin text-xs font-extrabold tracking-[.18em] text-[#16d5df]">CASE STUDY / {study.projectId.toUpperCase()}</p>
              <p className="mt-5 text-sm font-bold text-[#c8ff2b]">{study.category}</p>
              <h1 className="mt-4 text-[clamp(3rem,10vw,8.5rem)] font-extrabold leading-[1.02] tracking-[-.05em]">{study.arabicTitle}</h1>
              <p className="mt-7 max-w-3xl text-xl leading-[1.8] text-white/72 sm:text-2xl">{study.summary}</p>
              <div className="mt-7 max-w-3xl border-r-2 border-[var(--case-line)] pr-4">
                <p className="font-latin text-[9px] font-extrabold tracking-[.16em] text-[#16d5df]">PROJECT PRINCIPLE</p>
                <p className="mt-2 text-sm font-semibold leading-7 text-white/70 sm:text-base">{theme.signature}</p>
              </div>
              <div className="mt-9"><CaseStudyActions study={study} /></div>
            </div>
          </div>
        </section>

        <section className={`container grid gap-10 py-16 md:py-24 lg:items-start ${theme.grid}`}>
          <div className={`overflow-hidden rounded-[1.5rem_.4rem_1.5rem_.4rem] border border-[var(--case-line)] bg-[#111922] shadow-[0_24px_70px_rgba(7,22,79,.12)] ${theme.mediaOrder}`}>
            {study.media.map((media, index) => (
              <figure key={media.label}>
                {media.type === 'image' && media.src ? <img src={media.src} alt={media.alt} loading={index === 0 ? 'eager' : 'lazy'} decoding="async" fetchPriority={index === 0 ? 'high' : 'auto'} sizes="(min-width: 1024px) 58vw, 100vw" className="aspect-[16/10] h-full w-full object-cover" /> : <div className="flex aspect-[16/10] items-center justify-center bg-white/[.04] text-white/45">الوسيط غير متوفر حاليًا</div>}
                <figcaption className="flex items-center justify-between border-t border-white/10 px-5 py-3 text-xs text-white/50"><span>{media.label}</span><span className="font-latin text-[9px] font-bold tracking-[.12em] text-[var(--case-line)]">{study.projectId.toUpperCase()} / LIVE VIEW</span></figcaption>
              </figure>
            ))}
          </div>
          <aside className={`border-r-2 border-[var(--case-accent)] pr-5 ${theme.asideOrder}`}>
            <span className="inline-flex bg-[var(--case-soft)] px-3 py-2 font-latin text-[10px] font-extrabold tracking-[.16em] text-[var(--case-accent)]">PROJECT SIGNALS / {study.projectId.toUpperCase()}</span>
            <h2 className="mt-4 text-2xl font-extrabold">ماذا نراجع هنا؟</h2>
            <p className="mt-4 text-base leading-8 text-[#0b0f14]/68">تجمع هذه الصفحة بين المعلومات الظاهرة في المشروع ونطاق العمل المعتمد لدى MAM_Tkno، وتفصل المخرجات الوصفية عن أي نتائج رقمية غير منشورة.</p>
            <div className="mt-6 border border-[#07164f]/12 bg-white/60 p-4 shadow-[5px_5px_0_var(--case-soft)]">
              <p className="font-latin text-[9px] font-extrabold tracking-[.14em] text-[var(--case-accent)]">EVIDENCE NOTE</p>
              <p className="mt-2 text-sm leading-7 text-[#0b0f14]/62">{study.evidenceNote}</p>
            </div>
            <a href={project.url} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-2 border-b border-[#07164f]/25 pb-1 text-sm font-extrabold text-[#07164f] transition-colors hover:border-[#16d5df] hover:text-[#147e87] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16d5df]">زيارة الموقع الحي <ExternalLink className="h-4 w-4" aria-hidden="true" /></a>
          </aside>
        </section>

        <section className="border-y border-[#07164f]/10 bg-[#e8f1ef] py-16 text-[#0b0f14] md:py-24">
          <div className="container grid gap-10 md:grid-cols-3">
            <article className="border-t-2 border-[#ff7a0a] bg-white/50 p-6"><p className="font-latin text-[10px] font-extrabold tracking-[.18em] text-[#bd5400]">01 / PROBLEM</p><h2 className="mt-4 text-2xl font-extrabold">المشكلة</h2><p className="mt-4 leading-8 text-[#0b0f14]/68">{study.problem}</p></article>
            <article className="border-t-2 border-[#16d5df] bg-white/50 p-6"><p className="font-latin text-[10px] font-extrabold tracking-[.18em] text-[#147e87]">02 / SOLUTION</p><h2 className="mt-4 text-2xl font-extrabold">الحل</h2><p className="mt-4 leading-8 text-[#0b0f14]/68">{study.solution}</p></article>
            <article className="border-t-2 border-[var(--case-accent)] bg-white/50 p-6"><p className="font-latin text-[10px] font-extrabold tracking-[.18em] text-[var(--case-accent)]">03 / OUTCOME</p><h2 className="mt-4 text-2xl font-extrabold">المخرجات والنتيجة</h2><span className="mt-4 inline-flex border border-[var(--case-line)] bg-[var(--case-soft)] px-3 py-1.5 text-xs font-bold text-[var(--case-accent)]">{study.outcomeStatus === 'descriptive' ? 'توثيق وصفي دون أرقام' : 'بانتظار اعتماد النتائج'}</span><p className="mt-4 leading-8 text-[#0b0f14]/68">{study.outcome}</p></article>
          </div>
        </section>

        <section className="container grid gap-10 py-16 md:py-24 lg:grid-cols-[.8fr_1.2fr]">
          <div><p className="font-latin text-[10px] font-extrabold tracking-[.18em] text-[#147e87]">DELIVERABLES / SCOPE</p><h2 className="mt-4 text-3xl font-extrabold">ما الذي دخل في النطاق؟</h2><p className="mt-5 max-w-sm text-sm leading-7 text-[#0b0f14]/55">مخرجات محددة يمكن مراجعتها داخل الواجهة، وليست قائمة ادعاءات عامة.</p></div>
          <div><ul className="grid gap-3 sm:grid-cols-2">{study.deliverables.map((item) => <li key={item} className="flex items-start gap-3 border border-[#07164f]/12 bg-white/65 p-4 text-sm leading-7 text-[#0b0f14]/72"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#147e87]" aria-hidden="true" />{item}</li>)}</ul><div className="mt-8 flex flex-wrap gap-2">{study.services.map((service) => <span key={service} className="rounded-full border border-[var(--case-line)] bg-[var(--case-soft)] px-3 py-2 text-xs font-bold text-[var(--case-accent)]">{service}</span>)}</div></div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
