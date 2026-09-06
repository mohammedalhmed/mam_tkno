import { ArrowUpLeft, CheckCircle2, ExternalLink, Globe2 } from 'lucide-react';
import { projects } from '@/lib/portfolio-data';

const projectSignatures = {
  bellabox: {
    label: 'SOFT COMMERCE',
    note: 'اللون هنا يترجم هدوء العناية قبل لحظة الاختيار.',
    tone: 'border-[#d8b8c4] bg-[#f2dfe5] text-[#8f3754]',
    frame: 'border-[#d8b8c4]/75 shadow-[0_24px_80px_rgba(216,184,196,.16)]',
  },
  nerfona: {
    label: 'CARE / EDUCATION',
    note: 'مسار المحتوى يسبق الشراء عندما يحتاج المنتج إلى شرح.',
    tone: 'border-[#bfd0b3] bg-[#e1ead8] text-[#42623b]',
    frame: 'border-[#bfd0b3]/75 shadow-[0_24px_80px_rgba(191,208,179,.16)]',
  },
  altaj: {
    label: 'SPACE / LEAD',
    note: 'الخدمات المتعددة تحتاج نقطة وصول واحدة ومفهومة.',
    tone: 'border-[#cfb6c9] bg-[#eadde7] text-[#6f315d]',
    frame: 'border-[#cfb6c9]/75 shadow-[0_24px_80px_rgba(207,182,201,.16)]',
  },
} as const;

export default function Projects() {
  return (
    <section id="projects" className="bg-[#0b0f14] py-24 text-[#f7f3e8] md:py-32">
      <div className="container">
        <div className="grid gap-8 border-b border-white/15 pb-10 lg:grid-cols-[.7fr_1.3fr] lg:items-end">
          <div>
            <span className="eyebrow text-[#16d5df]">المشاريع الحيّة</span>
              <p className="font-latin mt-5 text-[0.68rem] font-bold leading-5 text-white/35 sm:text-xs">SELECTED WORK / 2026</p>
            <div className="mt-8 border-r-2 border-[#16d5df] pr-4">
              <p className="font-latin text-[0.62rem] font-extrabold leading-5 tracking-[.12em] text-[#16d5df] sm:text-[10px] sm:tracking-[.16em]">EVIDENCE / DECISIONS / LIVE PROOF</p>
              <p className="mt-2 max-w-xs text-[0.9rem] leading-7 text-white/52 sm:text-sm">كل دراسة حالة توضح قراراً مرئياً، لا مجرد لقطة واجهة.</p>
            </div>
          </div>
          <div>
            <h2 className="text-[clamp(2.45rem,9vw,5.7rem)] font-extrabold leading-[1.12] sm:text-[clamp(2.7rem,6vw,5.7rem)] sm:leading-[1.08]">واجهات تتحدث بلغة نشاطها.</h2>
            <p className="mt-5 max-w-2xl text-[1.05rem] leading-[1.95] text-white/60 sm:text-lg sm:leading-8">
              البيانات أدناه مستخرجة من الصفحات العامة للمشاريع، ومع كل بطاقة رابط مباشر لمراجعة التجربة الحيّة.
            </p>
          </div>
        </div>

        <div className="divide-y divide-white/15">
          {projects.map((project, index) => {
            const signature = projectSignatures[project.id as keyof typeof projectSignatures];
            const isFeatured = index === 0;
            const isCompact = index === 1;

            return (
              <article
                key={project.id}
                className={`grid gap-10 py-16 lg:grid-cols-[minmax(0,1.2fr)_minmax(340px,.8fr)] lg:items-center lg:gap-14 ${isFeatured ? 'lg:py-28' : isCompact ? 'lg:py-20' : 'lg:py-24'}`}
              >
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`case-window group block overflow-hidden ${signature.frame} ${index % 2 === 1 ? 'lg:order-2 lg:-translate-y-4' : ''} ${isFeatured ? 'lg:scale-[1.02]' : ''}`}
                  aria-label={`فتح موقع ${project.arabicTitle}`}
                >
                  <div className="flex h-11 items-center justify-between border-b border-white/10 px-4 text-white/45">
                    <div className="flex gap-1.5" aria-hidden="true">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#ff7a0a]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#16d5df]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                    </div>
                    <span className="font-latin text-[0.62rem] leading-5 sm:text-[10px]">{project.url.replace('https://', '')}</span>
                  </div>
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img src={project.image} alt={`معاينة تحريرية لمشروع ${project.arabicTitle}`} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]" />
                    <div className="absolute inset-0 bg-[#0b0f14]/0 transition-colors duration-200 group-hover:bg-[#0b0f14]/25" />
                    <div className={`absolute right-4 top-4 border px-3 py-2 font-latin text-[0.62rem] font-extrabold leading-5 tracking-[.1em] opacity-0 transition-all duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 ${signature.tone}`}>
                      {signature.label}
                    </div>
                    <div className="absolute bottom-4 left-4 flex translate-y-3 items-center gap-2 bg-[#16d5df] px-4 py-3 text-[0.8rem] font-extrabold leading-5 text-[#07164f] opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                      فتح الموقع الحي
                      <ArrowUpLeft className="h-4 w-4" />
                    </div>
                  </div>
                </a>

                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <div className="flex items-center justify-between gap-4">
                    <span className={`rounded-full border px-3 py-1.5 text-xs font-bold ${project.accentSoft} ${project.accent} ${project.accentBorder}`}>
                      {project.eyebrow}
                    </span>
                    <span className="font-latin text-3xl font-extrabold text-white/20">0{index + 1}</span>
                  </div>

                  <div className="mt-7 flex flex-wrap items-baseline gap-x-4 gap-y-2">
                    <h3 className="text-[clamp(2rem,8vw,3rem)] font-extrabold leading-[1.28] sm:text-4xl md:text-5xl">{project.arabicTitle}</h3>
                    <p className="font-latin text-sm font-bold text-[#16d5df]">{project.title}</p>
                  </div>
                  <p className="mt-6 text-[1rem] leading-[1.95] text-white/68 sm:text-lg sm:leading-9">{project.description}</p>

                  <div className={`mt-7 border-r-2 pr-4 ${project.accentBorder.replace('border-', 'border-r-')}`}>
                    <p className="font-latin text-[10px] font-extrabold tracking-[.16em] text-white/40">ROLE / PROJECT SCOPE</p>
                    <p className="mt-2 text-xs font-bold text-white/40">الدور في المشروع</p>
                    <p className="mt-1.5 font-semibold leading-7 text-white/90">{project.role}</p>
                  </div>

                  <div className="mt-5 grid gap-3 border border-white/15 bg-white/[.035] p-4 md:grid-cols-[auto_1fr] md:items-start md:gap-5">
                    <span className={`inline-flex w-fit items-center border px-2.5 py-1.5 font-latin text-[10px] font-extrabold tracking-[.14em] ${signature.tone}`}>DECISION / 0{index + 1}</span>
                    <div>
                      <p className="text-xs font-bold text-white/40">قرار الواجهة</p>
                      <p className="mt-2 text-[0.98rem] leading-[1.9] text-white/72 sm:text-base sm:leading-7">{project.decision}</p>
                    </div>
                  </div>

                  <div className={`mt-4 border-r-2 pr-4 ${project.accentBorder.replace('border-', 'border-r-')}`}>
                    <p className="font-latin text-[10px] font-extrabold tracking-[.14em] text-white/38">EDITORIAL TRACE / {signature.label}</p>
                    <p className="mt-2 text-sm leading-7 text-white/58">{signature.note}</p>
                  </div>

                  <ul className="mt-7 grid gap-2.5 sm:grid-cols-2" aria-label="بيانات ظاهرة في الموقع">
                    {project.facts.map((fact) => (
                      <li key={fact} className="flex items-start gap-2 text-[0.88rem] leading-6 text-white/62 sm:text-sm">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-[#16d5df]" />
                        {fact}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-7 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="font-latin rounded-sm border border-white/15 px-2.5 py-1.5 text-[0.65rem] font-bold leading-5 text-white/55 sm:text-[10px]">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="lime-button !min-h-12 text-sm">
                      زيارة المشروع
                      <ExternalLink className="h-4 w-4" />
                    </a>
                    <span className="flex items-start gap-2 text-[0.72rem] leading-5 text-white/35 sm:text-xs">
                      <Globe2 className="h-4 w-4" />
                      تم التحقق من الصفحة العامة · أغسطس 2026
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
