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
    accent: '#83cfff',
  },
} as const;

export default function Services() {
  return (
    <section id="services" className="service-system relative overflow-hidden bg-[#071a43] py-20 text-white sm:py-28" aria-labelledby="services-title">
      <div className="canva-page-grid pointer-events-none absolute inset-0 opacity-80" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-40 top-1/3 h-80 w-80 rounded-full bg-[#16d5df]/10 blur-3xl" aria-hidden="true" />
      <div className="container relative">
        <header className="service-system__header grid gap-8 border-b border-white/14 pb-10 lg:grid-cols-[.7fr_1.3fr] lg:items-end">
          <div>
            <span className="canva-chip">02 / SERVICE SYSTEM</span>
            <p className="mt-4 text-sm font-bold text-[#83cfff]">ما الذي تحتاجه الآن؟</p>
          </div>
          <div>
            <h2 id="services-title" className="max-w-4xl font-display text-4xl font-[750] leading-[1.15] tracking-[-.045em] text-white sm:text-5xl lg:text-6xl">خدمات تبدأ من المشكلة، لا من قائمة المزايا.</h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-white/68">اختر المسار الأقرب لاحتياجك، ثم راجع المخرجات المتوقعة قبل بدء طلب المشروع. كل خدمة مرتبطة بخطوة عملية واضحة.</p>
          </div>
        </header>

        <div className="mt-16 space-y-20 lg:mt-24 lg:space-y-28">
          {(Object.keys(serviceCategories) as Array<keyof typeof serviceCategories>).map((categoryKey) => {
            const category = serviceCategories[categoryKey];
            const meta = categoryMeta[categoryKey];
            const Icon = meta.icon;

            return (
              <section key={category.key} className="service-system__category grid gap-8 lg:grid-cols-[minmax(16rem,.36fr)_minmax(0,.64fr)] lg:gap-14" aria-labelledby={`${category.key}-services-title`}>
                <aside className="service-system__category-info lg:sticky lg:top-28 lg:self-start">
                  <div className="flex items-center gap-4">
                    <span className="font-latin text-6xl font-extrabold leading-none text-white/10">{meta.index}</span>
                    <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/16 bg-white/8" style={{ color: meta.accent }}>
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                  </div>
                  <span className="canva-kicker mt-7 block">{meta.code}</span>
                  <h3 id={`${category.key}-services-title`} className="mt-3 font-display text-3xl font-[750] leading-tight tracking-[-.035em] text-white sm:text-4xl">{category.title}</h3>
                  <p className="mt-5 text-base leading-8 text-white/66">{category.description}</p>
                  <p className="mt-7 border-r-2 pr-4 text-sm font-bold leading-7 text-white/88" style={{ borderColor: meta.accent }}>{meta.prompt}</p>
                  <a href={`/services/${category.key}`} className="mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[#16d5df] underline decoration-[#16d5df] decoration-2 underline-offset-8">
                    استكشف صفحة القسم
                    <ArrowUpLeft className="h-4 w-4" aria-hidden="true" />
                  </a>
                </aside>

                <div className="service-system__list border-t border-white/16">
                  {category.services.map((service, index) => (
                    <article key={service.id} className="service-card focus-card group grid gap-5 border-b border-white/14 py-7 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start sm:py-9">
                      <div className="service-card__body">
                        <div className="service-card__meta flex flex-wrap items-center gap-3">
                          <span className="font-latin text-[10px] font-extrabold tracking-[.12em] text-[#a9c8ff]">{service.code}</span>
                          <span className="h-px w-8" style={{ backgroundColor: meta.accent }} aria-hidden="true" />
                          <span className="text-xs font-bold text-white/46">0{index + 1}</span>
                        </div>
                        <h4 className="service-card__title mt-3 font-display text-xl font-bold leading-tight text-white sm:text-2xl">{service.title}</h4>
                        <p className="service-card__summary mt-3 max-w-2xl text-sm leading-7 text-white/64 sm:text-base">{service.summary}</p>
                        <ul className="service-card__outputs mt-5 flex flex-wrap gap-x-5 gap-y-2" aria-label="المخرجات الأساسية">
                          {service.outputs.slice(0, 3).map((output) => (
                            <li key={output} className="flex items-center gap-2 text-xs font-semibold text-white/70">
                              <Check className="h-3.5 w-3.5" style={{ color: meta.accent }} aria-hidden="true" />
                              {output}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <a href={`/?service=${service.id}#contact`} className="service-card__cta flex h-12 w-full items-center justify-center gap-2 border border-[#16d5df]/60 bg-[#16d5df] px-4 text-sm font-bold text-[#061437] transition-all hover:-translate-y-0.5 hover:bg-[#8cf3fa] sm:w-auto" aria-label={`طلب عرض سعر لخدمة ${service.title}`}>
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
