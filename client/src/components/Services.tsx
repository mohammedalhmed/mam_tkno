import { ArrowUpLeft, Check, Code2, Palette, Sparkles } from 'lucide-react';
import type { CSSProperties } from 'react';
import { serviceCategories } from '@/lib/services';

const categoryIcons = {
  technology: Code2,
  design: Palette,
} as const;

const categoryNotes = {
  technology: 'SYSTEMS / PRODUCT / GROWTH',
  design: 'IDENTITY / CAMPAIGN / OBJECT',
} as const;

export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden bg-[#e8f1ef] py-24 text-[#0b0f14] md:py-32" aria-labelledby="services-title">
      <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-b from-[#ff7a0a] via-[#2145a8] to-[#16d5df]" aria-hidden="true" />
      <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-[#16d5df]/14 blur-3xl" aria-hidden="true" />
      <div className="absolute right-0 top-0 h-full w-1/3 bg-[linear-gradient(90deg,transparent,rgba(20,126,135,.05))]" aria-hidden="true" />

      <div className="container relative">
        <header className="max-w-4xl">
          <div className="flex flex-wrap items-center gap-3">
            <span className="eyebrow">خدمات الوكالة</span>
            <span className="atelier-note">MAM_TKNO / SERVICE CATALOG</span>
          </div>
          <div className="mt-7 grid gap-6 lg:grid-cols-[1fr_.75fr] lg:items-end">
            <h2 id="services-title" className="text-[clamp(2.45rem,8vw,5.8rem)] font-extrabold leading-[1.03] tracking-[-.045em] sm:leading-[1.04]">
              حلول واضحة،<br />مخرجات يمكن استخدامها.
            </h2>
            <p className="max-w-xl text-[1.05rem] leading-[1.95] text-[#0b0f14]/70 sm:text-lg sm:leading-8">
              نقسم العمل إلى خدمات مفهومة، لكل واحدة مشكلة محددة ومخرجات تساعدك على اتخاذ قرار أسرع وبدء المشروع بثقة.
            </p>
          </div>
        </header>

        <div className="mt-14 space-y-16 md:mt-20 md:space-y-24">
          {(Object.keys(serviceCategories) as Array<keyof typeof serviceCategories>).map((categoryKey) => {
            const category = serviceCategories[categoryKey];
            const Icon = categoryIcons[categoryKey];
            const isTechnology = categoryKey === 'technology';

            return (
              <section key={category.key} aria-labelledby={`${category.key}-services-title`}>
                <div className="flex flex-wrap items-end justify-between gap-6 border-b-2 border-[#07164f]/15 pb-6">
                  <div className="flex items-start gap-4 sm:gap-6">
                    <span
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[1rem_.2rem_1rem_.2rem] text-[#07164f] sm:h-16 sm:w-16"
                      style={{ backgroundColor: category.accent }}
                    >
                      <Icon className="h-7 w-7 sm:h-8 sm:w-8" aria-hidden="true" />
                    </span>
                    <div>
                      <span className="atelier-note">{categoryNotes[categoryKey]}</span>
                      <h3 id={`${category.key}-services-title`} className="mt-2 text-3xl font-extrabold tracking-[-.03em] text-[#07164f] sm:text-5xl">
                        {category.title}
                      </h3>
                    </div>
                  </div>
                  <a
                    href={`/services/${category.key}`}
                    className="inline-flex items-center gap-2 text-sm font-extrabold text-[#07164f] transition-colors hover:text-[#147e87] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#147e87] focus-visible:ring-offset-4"
                  >
                    استكشف القسم
                    <ArrowUpLeft className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>

                <p className="mt-6 max-w-3xl text-base leading-8 text-[#0b0f14]/65 sm:text-lg">{category.description}</p>

                <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {category.services.map((service, index) => (
                    <article
                      key={service.id}
                      className={`group relative flex min-h-[31rem] flex-col overflow-hidden border-2 border-[#07164f] bg-[#f7f3e8] p-6 shadow-[8px_8px_0_#07164f] transition-all duration-300 hover:-translate-y-2 hover:shadow-[12px_12px_0_var(--service-accent)] focus-within:-translate-y-2 focus-within:shadow-[12px_12px_0_var(--service-accent)] ${
                        isTechnology ? 'hover:border-[#16d5df] focus-within:border-[#16d5df]' : 'hover:border-[#ff7a0a] focus-within:border-[#ff7a0a]'
                      }`}
                      style={{ '--service-accent': category.accent } as CSSProperties}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-latin text-[10px] font-bold tracking-[.18em] text-[#2145a8]/55">{service.code}</span>
                        <span className="font-latin text-xs font-bold text-[#07164f]/35">0{index + 1}</span>
                      </div>
                      <h4 className="mt-10 text-2xl font-extrabold leading-tight text-[#07164f]">{service.title}</h4>
                      <p className="mt-4 text-base leading-7 text-[#0b0f14]/70">{service.summary}</p>

                      <div className="mt-6 border-y border-[#07164f]/10 py-5">
                        <span className="atelier-note">المشكلة التي نعالجها</span>
                        <p className="mt-2 text-sm leading-6 text-[#0b0f14]/65">{service.problem}</p>
                      </div>

                      <div className="mt-5">
                        <span className="atelier-note">مخرجات متوقعة</span>
                        <ul className="mt-3 space-y-2 text-sm font-bold text-[#07164f]/80">
                          {service.outputs.map((output) => (
                            <li key={output} className="flex items-start gap-2">
                              <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#147e87]" aria-hidden="true" />
                              <span>{output}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-auto pt-7">
                        <p className="flex items-start gap-2 text-xs leading-5 text-[#0b0f14]/55">
                          <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#ff7a0a]" aria-hidden="true" />
                          <span>{service.fit}</span>
                        </p>
                        <a
                          href={`/?service=${service.id}#contact`}
                          className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-[#07164f] transition-colors hover:text-[#147e87] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#147e87] focus-visible:ring-offset-4"
                        >
                          اطلب عرض سعر
                          <ArrowUpLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1 group-focus-within:-translate-x-1" aria-hidden="true" />
                        </a>
                      </div>
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
