/** Product Systems Atelier — الخبرات كطبقات نظام متجر لا كسحابة شعارات عامة. */
import { Blocks, Gauge, LayoutTemplate, PenTool } from 'lucide-react';

const capabilities = [
  {
    number: '01',
    title: 'واجهات سلة',
    description: 'تطوير ثيمات وأقسام المتجر بما يحافظ على هوية النشاط وسهولة الإدارة من المنصة.',
    icon: LayoutTemplate,
    skills: ['Salla Themes', 'Storefront UX', 'Reusable Sections', 'RTL'],
  },
  {
    number: '02',
    title: 'تطوير الواجهة',
    description: 'تحويل التصميم إلى واجهة متجاوبة ونظيفة يمكن تطويرها ومراجعتها عبر GitHub.',
    icon: Blocks,
    skills: ['HTML', 'CSS', 'JavaScript', 'Tailwind', 'Bootstrap', 'GitHub'],
  },
  {
    number: '03',
    title: 'تصميم المنتج',
    description: 'بناء تدفق واضح للشراء ونظام بصري متسق يبدأ من Figma قبل كتابة الكود.',
    icon: PenTool,
    skills: ['Figma', 'UI/UX', 'Design Systems', 'Prototyping'],
  },
  {
    number: '04',
    title: 'الأداء والنمو',
    description: 'مراجعة البنية والمحتوى والتفاصيل التي تؤثر في السرعة والوضوح والظهور في البحث.',
    icon: Gauge,
    skills: ['Performance', 'Technical SEO', 'Content Structure', 'Accessibility'],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="atelier-grid py-24 md:py-32">
      <div className="container">
        <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
          <div>
            <span className="eyebrow text-[#0b0f14]/60">مجال الخبرة</span>
            <p className="font-latin mt-5 text-xs font-bold text-[#0b0f14]/35">CAPABILITIES / FOUR LAYERS</p>
            <span className="atelier-note mt-5">SYSTEM MAP / 04</span>
          </div>
          <div>
            <h2 className="text-[clamp(2.45rem,9vw,5.3rem)] font-extrabold leading-[1.12] sm:text-[clamp(2.6rem,6vw,5.3rem)] sm:leading-[1.08]">أصمم الرحلة، لا الشاشة فقط.</h2>
            <p className="mt-5 max-w-2xl text-[1.05rem] leading-[1.95] text-[#0b0f14]/62 sm:text-lg sm:leading-8">
              كل قرار بصري مرتبط بتجربة الزائر، قابلية إدارة المتجر، وسلامة التنفيذ التقني.
            </p>
          </div>
        </div>

        <div className="mt-16 border-y border-[#0b0f14]/20">
          {capabilities.map((capability) => {
            const Icon = capability.icon;
            return (
              <article
                key={capability.number}
                className="group grid gap-5 border-b border-[#0b0f14]/15 py-8 last:border-b-0 md:grid-cols-[100px_1fr_1.25fr] md:items-center md:gap-8"
              >
                <div className="flex items-center justify-between md:block">
                  <span className="font-latin text-sm font-extrabold text-[#0b0f14]/28">{capability.number}</span>
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-[.7rem_.15rem_.7rem_.15rem] bg-[#07164f] text-[#16d5df] transition-transform duration-200 group-hover:-rotate-3 md:mt-4">
                    <Icon className="h-5 w-5" />
                  </span>
                </div>
                <div>
                  <h3 className="text-[1.35rem] font-extrabold leading-[1.45] sm:text-2xl md:text-3xl">{capability.title}</h3>
                  <p className="mt-3 max-w-xl text-[0.98rem] leading-[1.9] text-[#0b0f14]/60 sm:text-base sm:leading-7">{capability.description}</p>
                  <span className="atelier-measure mt-4">LAYER / {capability.number}</span>
                </div>
                <div className="flex flex-wrap gap-2 md:justify-end">
                  {capability.skills.map((skill) => (
                    <span key={skill} className="font-latin rounded-sm border border-[#0b0f14]/18 bg-white/35 px-3 py-2 text-[0.68rem] font-bold leading-5 sm:text-[11px]">
                      {skill}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
