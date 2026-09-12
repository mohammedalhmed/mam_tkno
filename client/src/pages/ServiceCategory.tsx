import { ArrowUpLeft, Check, FileCheck2, MoveUpLeft, Route } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export type ServiceCategoryKey = 'technology' | 'design';

type CategoryConfig = {
  eyebrow: string;
  title: string;
  description: string;
  accent: string;
  prompt: string;
  services: Array<{ code: string; title: string; summary: string; outputs: string[] }>;
};

const categories: Record<ServiceCategoryKey, CategoryConfig> = {
  technology: {
    eyebrow: '01 / DEVELOPMENT SYSTEM',
    title: 'البرمجة والحلول التقنية',
    description: 'نبني منتجات رقمية واضحة البنية، من المتاجر والمواقع إلى التطبيقات والأنظمة التي تحتاجها العمليات اليومية.',
    accent: '#16d5df',
    prompt: 'اختر هذا المسار عندما تكون المشكلة في رحلة الاستخدام أو التشغيل أو قدرة المنتج على النمو.',
    services: [
      { code: 'DEV-01', title: 'تطوير المواقع والمتاجر', summary: 'واجهات متجاوبة وتجارب شراء أوضح للعلامات التي تريد النمو رقميًا.', outputs: ['واجهة متجاوبة', 'مكونات قابلة للتوسع', 'تجربة RTL محسّنة'] },
      { code: 'DEV-02', title: 'تطبيقات الجوال', summary: 'تجارب جوال مركزة تبدأ من تدفق المستخدم وتنتهي بمنتج قابل للاختبار.', outputs: ['تدفق مستخدم واضح', 'واجهات iOS وAndroid', 'نظام تصميم قابل لإعادة الاستخدام'] },
      { code: 'DEV-03', title: 'الأنظمة الإدارية', summary: 'لوحات وأدوات داخلية تقلل التعقيد وتحوّل العمليات إلى خطوات قابلة للقياس.', outputs: ['هندسة معلومات', 'حالات استخدام موثقة', 'واجهة تشغيل عملية'] },
    ],
  },
  design: {
    eyebrow: '02 / VISUAL SYSTEM',
    title: 'الجرافيكس والتصميم',
    description: 'نصمم لغة بصرية تجعل العلامة مفهومة، متماسكة، وقابلة للتطبيق عبر الشاشة والمطبوعات.',
    accent: '#f57419',
    prompt: 'اختر هذا المسار عندما تحتاج العلامة إلى صوت وصورة متسقين في كل نقطة تواصل.',
    services: [
      { code: 'GR-01', title: 'الهوية البصرية', summary: 'نظام هوية واضح يربط الرمز والصوت واللون بنقاط تواصل حقيقية.', outputs: ['شعار واتجاه بصري', 'ألوان وخطوط', 'دليل استخدام مختصر'] },
      { code: 'GR-02', title: 'واجهات وتجارب المستخدم', summary: 'تصميم شاشات ومسارات تجعل المنتج أسهل للفهم وأقرب إلى أهداف المستخدم.', outputs: ['خرائط تدفق', 'واجهات عالية الدقة', 'نظام مكونات'] },
      { code: 'GR-03', title: 'المحتوى البصري والطباعة', summary: 'مواد بصرية ذات حضور يحافظ على اتساق العلامة في الحملات والمواد المطبوعة.', outputs: ['قوالب محتوى', 'مواد إطلاق', 'ملفات جاهزة للطباعة'] },
    ],
  },
};

export default function ServiceCategory({ category }: { category: ServiceCategoryKey }) {
  const config = categories[category];

  return (
    <div className="site-shell">
      <Header />
      <main>
        <section className="surface-ink relative overflow-hidden pb-16 pt-32 md:pb-24 md:pt-44">
          <div className="pointer-events-none absolute inset-0 tech-grid opacity-20" aria-hidden="true" />
          <div className="container relative">
            <a href="/" className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-white/62 transition-colors hover:text-[#16d5df]">
              <MoveUpLeft className="h-4 w-4" aria-hidden="true" />
              العودة إلى الصفحة الرئيسية
            </a>
            <div className="mt-10 grid gap-10 lg:grid-cols-[.36fr_.64fr] lg:items-end">
              <div>
                <span className="font-latin text-[10px] font-extrabold tracking-[.14em] text-[#16d5df]">{config.eyebrow}</span>
                <p className="mt-6 max-w-sm border-r-2 pr-4 text-sm leading-7 text-white/55" style={{ borderColor: config.accent }}>{config.prompt}</p>
              </div>
              <div>
                <h1 className="font-display text-[clamp(3rem,8vw,7rem)] font-[750] leading-[1.04] tracking-[-.05em] text-white">{config.title}</h1>
                <p className="mt-7 max-w-2xl text-lg leading-9 text-white/65 sm:text-xl">{config.description}</p>
                <a href="/#contact" className="lime-button mt-8">
                  ناقش هذا المسار
                  <ArrowUpLeft className="h-5 w-5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="surface-paper section-rule-soft py-10 md:py-14" aria-labelledby="method-board-title">
          <div className="container">
            <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#07101c]/14 pb-5">
              <div>
                <p className="section-number">METHOD BOARD / {category === 'technology' ? '01' : '02'}</p>
                <h2 id="method-board-title" className="mt-2 font-display text-2xl font-bold tracking-[-.035em] text-[#07101c]">قرار واضح قبل قائمة الخدمات.</h2>
              </div>
              <p className="max-w-md text-sm leading-7 text-[#07101c]/58">لوحة مختصرة توضّح كيف يتحول الاحتياج إلى نطاق يمكن مراجعته قبل فتح نموذج الطلب.</p>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-[1.2fr_.8fr_.8fr]">
              <article className="border border-[#07101c]/14 bg-[#07101c] p-6 text-white shadow-[8px_8px_0_rgba(22,213,223,.16)] md:row-span-2">
                <div className="flex items-center justify-between gap-4"><span className="font-latin text-[10px] font-extrabold tracking-[.16em] text-[#16d5df]">01 / DECISION</span><Route className="h-5 w-5 text-[#16d5df]" aria-hidden="true" /></div>
                <h3 className="mt-10 max-w-md font-display text-3xl font-bold leading-tight">نبدأ من موضع الاحتكاك، لا من اسم الخدمة.</h3>
                <p className="mt-5 max-w-lg text-sm leading-8 text-white/62">{config.prompt}</p>
              </article>
              <article className="border border-[#07101c]/14 bg-white/55 p-6">
                <div className="flex items-center justify-between gap-4"><span className="font-latin text-[10px] font-extrabold tracking-[.16em] text-[#2145a8]">02 / EVIDENCE</span><FileCheck2 className="h-5 w-5 text-[#2145a8]" aria-hidden="true" /></div>
                <h3 className="mt-7 font-display text-xl font-bold text-[#07101c]">نراجع ما يمكن رؤيته واختباره.</h3>
                <p className="mt-3 text-sm leading-7 text-[#07101c]/62">مخرجات واضحة ومسارات استخدام قابلة للمراجعة، من دون وعود رقمية غير منشورة.</p>
              </article>
              <article className="border border-[#07101c]/14 bg-[var(--brand-surface)] p-6">
                <p className="font-latin text-[10px] font-extrabold tracking-[.16em] text-[#147e87]">03 / SCOPE</p>
                <h3 className="mt-7 font-display text-xl font-bold text-[#07101c]">نحوّل القرار إلى نطاق مرحلي.</h3>
                <div className="mt-4 flex flex-wrap gap-2">{config.services.map((service) => <span key={service.code} className="ui-chip !min-h-7 !px-2.5 !text-[10px]">{service.code}</span>)}</div>
              </article>
            </div>
          </div>
        </section>

        <section className="surface-warm section-pad section-rule-soft" aria-labelledby="category-services-title">
          <div className="container">
            <header className="grid gap-6 border-b border-[#07101c]/14 pb-9 lg:grid-cols-[.55fr_1fr] lg:items-end">
              <span className="section-number">CATALOG / {category === 'technology' ? '01' : '02'}</span>
              <div>
                <h2 id="category-services-title" className="editorial-heading !text-[clamp(2.2rem,5vw,4.2rem)]">مخرجات واضحة قبل بدء التنفيذ.</h2>
                <p className="editorial-copy mt-4">راجع ما يقدمه كل مسار، ثم افتح نموذج الطلب مع توضيح ما تريد تحقيقه.</p>
              </div>
            </header>

            <div className="mt-10 border-t border-[#07101c]/14">
              {config.services.map((service, index) => (
                <article key={service.code} className="focus-card grid gap-6 border-b border-[#07101c]/14 py-8 md:grid-cols-[6rem_minmax(0,1fr)_minmax(13rem,.55fr)] md:items-start md:py-10">
                  <div className="flex items-center gap-3 md:block">
                    <span className="font-latin text-4xl font-extrabold text-[#07101c]/10">0{index + 1}</span>
                    <span className="section-number md:mt-2 md:block">{service.code}</span>
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold leading-tight text-[#07101c] sm:text-3xl">{service.title}</h3>
                    <p className="mt-4 max-w-2xl text-base leading-8 text-[#07101c]/64">{service.summary}</p>
                    <a href="/#contact" className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[#2145a8] underline decoration-[#16d5df] decoration-2 underline-offset-8">
                      اطلب تفاصيل الخدمة <span className="font-latin text-[9px] tracking-[.14em] text-[#147e87]">NEXT</span>
                      <ArrowUpLeft className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </div>
                  <ul className="space-y-3 border-r border-[#07101c]/12 pr-5">
                    {service.outputs.map((output) => (
                      <li key={output} className="flex items-start gap-2 text-sm font-semibold leading-6 text-[#07101c]/68">
                        <Check className="mt-1 h-4 w-4 shrink-0" style={{ color: config.accent }} aria-hidden="true" />
                        {output}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
