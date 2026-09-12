import { ArrowUpLeft, Check, Code2, Palette } from 'lucide-react';
import { serviceCategories } from '@/lib/services';

const categoryMeta = {
  technology: {
    icon: Code2,
    index: '01',
    code: 'PRODUCT / SYSTEMS / GROWTH',
    prompt: 'لديك منتج أو عملية تحتاج إلى بناء تقني واضح؟',
    accent: '#16d5df',
  },
  design: {
    icon: Palette,
    index: '02',
    code: 'IDENTITY / CAMPAIGN / OBJECT',
    prompt: 'تحتاج حضورًا بصريًا يجعل علامتك أسهل في التذكر؟',
    accent: '#f57419',
  },
} as const;

export default function Services() {
  return (
    <section id="services" className="surface-warm section-pad section-rule-soft overflow-hidden" aria-labelledby="services-title">
      <div className="pointer-events-none absolute inset-0 atelier-grid opacity-35" aria-hidden="true" />
      <div className="container relative">
        <header className="grid gap-8 border-b border-[#07101c]/14 pb-10 lg:grid-cols-[.7fr_1.3fr] lg:items-end">
          <div>
            <span className="section-number">02 / SERVICE SYSTEM</span>
            <p className="mt-4 text-sm font-bold text-[#2145a8]">ما الذي تحتاجه الآن؟</p>
          </div>
          <div>
            <h2 id="services-title" className="editorial-heading max-w-4xl">خدمات تبدأ من المشكلة، لا من قائمة المزايا.</h2>
            <p className="editorial-copy mt-5">اختر المسار الأقرب لاحتياجك، ثم راجع المخرجات المتوقعة قبل بدء طلب المشروع. كل خدمة مرتبطة بخطوة عملية واضحة.</p>
          </div>
        </header>

        <div className="mt-16 space-y-20 lg:mt-24 lg:space-y-28">
          {(Object.keys(serviceCategories) as Array<keyof typeof serviceCategories>).map((categoryKey) => {
            const category = serviceCategories[categoryKey];
            const meta = categoryMeta[categoryKey];
            const Icon = meta.icon;

            return (
              <section key={category.key} className="grid gap-8 lg:grid-cols-[minmax(16rem,.36fr)_minmax(0,.64fr)] lg:gap-14" aria-labelledby={`${category.key}-services-title`}>
                <aside className="lg:sticky lg:top-28 lg:self-start">
                  <div className="flex items-center gap-4">
                    <span className="font-latin text-6xl font-extrabold leading-none text-[#07101c]/9">{meta.index}</span>
                    <span className="flex h-14 w-14 items-center justify-center rounded-full border border-[#07101c]/14 bg-white/55" style={{ color: meta.accent }}>
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                  </div>
                  <span className="section-number mt-7 block">{meta.code}</span>
                  <h3 id={`${category.key}-services-title`} className="mt-3 font-display text-3xl font-[750] leading-tight tracking-[-.035em] text-[#07101c] sm:text-4xl">{category.title}</h3>
                  <p className="mt-5 text-base leading-8 text-[#07101c]/64">{category.description}</p>
                  <p className="mt-7 border-r-2 pr-4 text-sm font-bold leading-7 text-[#07101c]" style={{ borderColor: meta.accent }}>{meta.prompt}</p>
                  <a href={`/services/${category.key}`} className="mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[#2145a8] underline decoration-[#16d5df] decoration-2 underline-offset-8">
                    استكشف صفحة القسم
                    <ArrowUpLeft className="h-4 w-4" aria-hidden="true" />
                  </a>
                </aside>

                <div className="border-t border-[#07101c]/16">
                  {category.services.map((service, index) => (
                    <article key={service.id} className="focus-card group grid gap-5 border-b border-[#07101c]/14 py-7 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start sm:py-9">
                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="font-latin text-[10px] font-extrabold tracking-[.12em] text-[#2145a8]/55">{service.code}</span>
                          <span className="h-px w-8" style={{ backgroundColor: meta.accent }} aria-hidden="true" />
                          <span className="text-xs font-bold text-[#07101c]/42">0{index + 1}</span>
                        </div>
                        <h4 className="mt-3 font-display text-xl font-bold leading-tight text-[#07101c] sm:text-2xl">{service.title}</h4>
                        <p className="mt-3 max-w-2xl text-sm leading-7 text-[#07101c]/64 sm:text-base">{service.summary}</p>
                        <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2" aria-label="المخرجات الأساسية">
                          {service.outputs.slice(0, 3).map((output) => (
                            <li key={output} className="flex items-center gap-2 text-xs font-semibold text-[#07101c]/67">
                              <Check className="h-3.5 w-3.5" style={{ color: meta.accent }} aria-hidden="true" />
                              {output}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <a href={`/?service=${service.id}#contact`} className="flex h-12 w-full items-center justify-center gap-2 border border-[#07101c]/14 bg-white/45 px-4 text-sm font-bold text-[#07101c] transition-colors hover:border-[#16d5df] hover:bg-[#16d5df]/10 sm:w-auto" aria-label={`طلب عرض سعر لخدمة ${service.title}`}>
                        اطلب الخدمة
                        <ArrowUpLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" aria-hidden="true" />
                      </a>
                    </article>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
}
