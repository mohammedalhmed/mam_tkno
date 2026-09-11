import { ArrowRight, CheckCircle2, ExternalLink, MoveUpLeft } from 'lucide-react';
import { Link, useParams } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CaseStudyActions from '@/components/CaseStudyActions';
import { getCaseStudy } from '@/lib/case-studies';
import { projects } from '@/lib/portfolio-data';

export default function CaseStudyPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const study = getCaseStudy(projectId);
  const project = projects.find((item) => item.id === projectId);

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

  return (
    <div className="min-h-screen bg-[#0b0f14] text-[#f7f3e8]">
      <Header />
      <main>
        <section className="relative overflow-hidden border-b border-white/10 bg-[#07164f] pb-16 pt-32 md:pb-24 md:pt-44">
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
              <div className="mt-9"><CaseStudyActions study={study} /></div>
            </div>
          </div>
        </section>

        <section className="container grid gap-10 py-16 md:py-24 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,.8fr)] lg:items-start">
          <div className="overflow-hidden rounded-[1.5rem_.4rem_1.5rem_.4rem] border border-[#16d5df]/50 bg-[#111922] shadow-[0_24px_90px_rgba(22,213,223,.12)]">
            {study.media.map((media) => (
              <figure key={media.label}>
                {media.type === 'image' && media.src ? <img src={media.src} alt={media.alt} className="aspect-[16/10] h-full w-full object-cover" /> : <div className="flex aspect-[16/10] items-center justify-center bg-white/[.04] text-white/45">الوسيط غير متوفر حاليًا</div>}
                <figcaption className="border-t border-white/10 px-5 py-3 text-xs text-white/45">{media.label}</figcaption>
              </figure>
            ))}
          </div>
          <aside className="border-r-2 border-[#16d5df] pr-5">
            <p className="font-latin text-[10px] font-extrabold tracking-[.18em] text-[#16d5df]">PROJECT SIGNALS</p>
            <h2 className="mt-4 text-2xl font-extrabold">ماذا نراجع هنا؟</h2>
            <p className="mt-4 text-base leading-8 text-white/62">هذه الصفحة تفصل قرارات الواجهة والنطاق الظاهرة في المشروع، وتوضح ما هو منشور للمراجعة وما يحتاج بيانات اعتماد إضافية.</p>
            <a href={project.url} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-2 text-sm font-extrabold text-[#c8ff2b] hover:text-[#16d5df] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16d5df]">زيارة الموقع الحي <ExternalLink className="h-4 w-4" aria-hidden="true" /></a>
          </aside>
        </section>

        <section className="border-y border-white/10 bg-[#111922] py-16 md:py-24">
          <div className="container grid gap-10 md:grid-cols-3">
            <article className="border-t border-[#ff7a0a] pt-5"><p className="font-latin text-[10px] font-extrabold tracking-[.18em] text-[#ff7a0a]">01 / PROBLEM</p><h2 className="mt-4 text-2xl font-extrabold">المشكلة</h2><p className="mt-4 leading-8 text-white/65">{study.problem}</p></article>
            <article className="border-t border-[#16d5df] pt-5"><p className="font-latin text-[10px] font-extrabold tracking-[.18em] text-[#16d5df]">02 / SOLUTION</p><h2 className="mt-4 text-2xl font-extrabold">الحل</h2><p className="mt-4 leading-8 text-white/65">{study.solution}</p></article>
            <article className="border-t border-[#c8ff2b] pt-5"><p className="font-latin text-[10px] font-extrabold tracking-[.18em] text-[#c8ff2b]">03 / OUTCOME</p><h2 className="mt-4 text-2xl font-extrabold">المخرجات والنتيجة</h2><p className="mt-4 leading-8 text-white/65">{study.outcome}</p></article>
          </div>
        </section>

        <section className="container grid gap-10 py-16 md:py-24 lg:grid-cols-[.8fr_1.2fr]">
          <div><p className="font-latin text-[10px] font-extrabold tracking-[.18em] text-[#16d5df]">DELIVERABLES / SCOPE</p><h2 className="mt-4 text-3xl font-extrabold">ما الذي دخل في النطاق؟</h2></div>
          <div><ul className="grid gap-3 sm:grid-cols-2">{study.deliverables.map((item) => <li key={item} className="flex items-start gap-3 border border-white/12 bg-white/[.03] p-4 text-sm leading-7 text-white/72"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#16d5df]" aria-hidden="true" />{item}</li>)}</ul><div className="mt-8 flex flex-wrap gap-2">{study.services.map((service) => <span key={service} className="rounded-full border border-[#16d5df]/30 bg-[#16d5df]/10 px-3 py-2 text-xs font-bold text-[#16d5df]">{service}</span>)}</div></div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
