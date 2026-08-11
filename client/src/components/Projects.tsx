/** Product Systems Atelier — دراسات حالة كبيرة، ببيانات موثقة وصورة مستقلة لكل مشروع. */
import { ArrowUpLeft, CheckCircle2, ExternalLink, Globe2 } from 'lucide-react';
import { projects } from '@/lib/portfolio-data';

export default function Projects() {
  return (
    <section id="projects" className="bg-[#0b0f14] py-24 text-[#f7f3e8] md:py-32">
      <div className="container">
        <div className="grid gap-8 border-b border-white/15 pb-10 lg:grid-cols-[.7fr_1.3fr] lg:items-end">
          <div>
            <span className="eyebrow text-[#16d5df]">المشاريع الحيّة</span>
            <p className="font-latin mt-5 text-xs font-bold text-white/35">SELECTED WORK / 2026</p>
          </div>
          <div>
            <h2 className="text-[clamp(2.7rem,6vw,5.7rem)] font-extrabold leading-[1.08]">واجهات تتحدث بلغة نشاطها.</h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/60">
              البيانات أدناه مستخرجة من الصفحات العامة للمشاريع، ومع كل بطاقة رابط مباشر لمراجعة التجربة الحيّة.
            </p>
          </div>
        </div>

        <div className="divide-y divide-white/15">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className="grid gap-10 py-16 lg:grid-cols-[minmax(0,1.2fr)_minmax(340px,.8fr)] lg:items-center lg:gap-14 lg:py-24"
            >
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`case-window group block ${index % 2 === 1 ? 'lg:order-2' : ''}`}
                aria-label={`فتح موقع ${project.arabicTitle}`}
              >
                <div className="flex h-11 items-center justify-between border-b border-white/10 px-4 text-white/45">
                  <div className="flex gap-1.5" aria-hidden="true">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ff7a0a]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#16d5df]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  </div>
                  <span className="font-latin text-[10px]">{project.url.replace('https://', '')}</span>
                </div>
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img src={project.image} alt={`معاينة تحريرية لمشروع ${project.arabicTitle}`} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-[#0b0f14]/0 transition-colors duration-200 group-hover:bg-[#0b0f14]/25" />
                  <div className="absolute bottom-4 left-4 flex translate-y-3 items-center gap-2 bg-[#16d5df] px-4 py-3 text-sm font-extrabold text-[#07164f] opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
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

                <h3 className="mt-7 text-4xl font-extrabold md:text-5xl">{project.arabicTitle}</h3>
                <p className="font-latin mt-2 text-sm font-bold text-[#16d5df]">{project.title}</p>
                <p className="mt-6 text-lg leading-9 text-white/68">{project.description}</p>

                <div className="mt-7 border-r-2 border-[#16d5df] pr-4">
                  <p className="text-xs font-bold text-white/40">الدور في المشروع</p>
                  <p className="mt-1.5 font-semibold leading-7 text-white/90">{project.role}</p>
                </div>

                <div className="mt-5 border border-white/15 bg-white/[.035] p-4">
                  <span className="atelier-note text-[#16d5df]">DECISION / 0{index + 1}</span>
                  <p className="mt-4 text-xs font-bold text-white/38">قرار الواجهة</p>
                  <p className="mt-2 leading-7 text-white/72">{project.decision}</p>
                </div>

                <ul className="mt-7 grid gap-2.5 sm:grid-cols-2" aria-label="بيانات ظاهرة في الموقع">
                  {project.facts.map((fact) => (
                    <li key={fact} className="flex items-center gap-2 text-sm text-white/62">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-[#16d5df]" />
                      {fact}
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="font-latin rounded-sm border border-white/15 px-2.5 py-1.5 text-[10px] font-bold text-white/55">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a href={project.url} target="_blank" rel="noopener noreferrer" className="lime-button !min-h-12 text-sm">
                    زيارة المشروع
                    <ExternalLink className="h-4 w-4" />
                  </a>
                  <span className="flex items-center gap-2 text-xs text-white/35">
                    <Globe2 className="h-4 w-4" />
                    تم التحقق من الصفحة العامة · أغسطس 2026
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
