import { ArrowUpLeft, Check, MoveUpLeft } from 'lucide-react';
import type { CSSProperties } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InteractiveAtmosphere from '@/components/InteractiveAtmosphere';

export type ServiceCategoryKey = 'technology' | 'design';

type CategoryConfig = {
  eyebrow: string;
  title: string;
  description: string;
  accent: string;
  services: Array<{ code: string; title: string; summary: string; outputs: string[] }>;
};

const categories: Record<ServiceCategoryKey, CategoryConfig> = {
  technology: {
    eyebrow: 'DEVELOPMENT / 01',
    title: 'البرمجة والحلول التقنية',
    description: 'نبني منتجات رقمية واضحة البنية، من المتاجر والمواقع إلى التطبيقات والأنظمة التي تحتاجها العمليات اليومية.',
    accent: '#16d5df',
    services: [
      { code: 'DEV-01', title: 'تطوير المواقع والمتاجر', summary: 'واجهات متجاوبة وتجارب شراء أوضح للعلامات التي تريد النمو رقميًا.', outputs: ['واجهة متجاوبة', 'مكونات قابلة للتوسع', 'تجربة RTL محسّنة'] },
      { code: 'DEV-02', title: 'تطبيقات الجوال', summary: 'تجارب جوال مركزة تبدأ من تدفق المستخدم وتنتهي بمنتج قابل للاختبار.', outputs: ['تدفق مستخدم واضح', 'واجهات iOS وAndroid', 'نظام تصميم قابل لإعادة الاستخدام'] },
      { code: 'DEV-03', title: 'الأنظمة الإدارية', summary: 'لوحات وأدوات داخلية تقلل التعقيد وتحوّل العمليات إلى خطوات قابلة للقياس.', outputs: ['هندسة معلومات', 'حالات استخدام موثقة', 'واجهة تشغيل عملية'] },
    ],
  },
  design: {
    eyebrow: 'GRAPHICS / 02',
    title: 'الجرافيكس والتصميم',
    description: 'نصمم لغة بصرية تجعل العلامة مفهومة، متماسكة، وقابلة للتطبيق عبر الشاشة والمطبوعات.',
    accent: '#ff7a0a',
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
    <div className="relative min-h-screen overflow-hidden bg-[#f7f3e8] text-[#0b0f14]">
      <InteractiveAtmosphere />
      <Header />
      <main className="relative z-10 pt-32 sm:pt-40">
        <section className="container pb-16 sm:pb-24">
          <a href="/" className="inline-flex items-center gap-2 text-sm font-bold text-[#07164f]/65 transition-colors hover:text-[#147e87]">
            <MoveUpLeft className="h-4 w-4" aria-hidden="true" />
            العودة إلى الصفحة الرئيسية
          </a>
          <div className="mt-12 grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <div>
              <span className="eyebrow">{config.eyebrow}</span>
              <span className="atelier-note mt-5">MAM_TKNO / SERVICE SYSTEM</span>
            </div>
            <div>
              <h1 className="max-w-4xl text-[clamp(2.8rem,8vw,6.7rem)] font-extrabold leading-[1.04] tracking-[-.045em] text-[#07164f]">{config.title}</h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-[#0b0f14]/70 sm:text-xl">{config.description}</p>
              <a href="/#contact" className="ink-button mt-8">
                اطلب عرض سعر
                <ArrowUpLeft className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <section className="border-y border-[#07164f]/10 bg-white/45 py-16 sm:py-24" aria-labelledby="category-services-title">
          <div className="container">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <span className="atelier-note">CATALOG / {category === 'technology' ? '01' : '02'}</span>
                <h2 id="category-services-title" className="mt-4 text-3xl font-extrabold text-[#07164f] sm:text-5xl">خدمات مصممة حول مخرجات واضحة.</h2>
              </div>
              <span className="font-latin text-6xl font-black tracking-[-.08em] text-[#07164f]/8" aria-hidden="true">0{category === 'technology' ? '1' : '2'}</span>
            </div>
            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {config.services.map((service) => (
                <article key={service.code} className="group relative overflow-hidden border-2 border-[#07164f] bg-[#f7f3e8] p-6 shadow-[8px_8px_0_#07164f] transition-all duration-300 hover:-translate-y-1 hover:shadow-[10px_10px_0_var(--category-accent)]" style={{ '--category-accent': config.accent } as CSSProperties}>
                  <div className="flex items-center justify-between">
                    <span className="font-latin text-[10px] font-bold tracking-[.18em] text-[#2145a8]/55">{service.code}</span>
                    <span className="h-3 w-3 rounded-full" style={{ backgroundColor: config.accent }} aria-hidden="true" />
                  </div>
                  <h3 className="mt-10 text-2xl font-extrabold leading-tight text-[#07164f]">{service.title}</h3>
                  <p className="mt-4 min-h-24 text-base leading-7 text-[#0b0f14]/65">{service.summary}</p>
                  <ul className="mt-6 space-y-2 border-t border-[#07164f]/10 pt-5 text-sm font-bold text-[#07164f]/75">
                    {service.outputs.map((output) => <li key={output} className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[#147e87]" aria-hidden="true" />{output}</li>)}
                  </ul>
                  <a href="/#contact" className="mt-7 inline-flex items-center gap-2 text-sm font-extrabold text-[#07164f] transition-colors hover:text-[#147e87]">
                    اطلب تفاصيل الخدمة
                    <ArrowUpLeft className="h-4 w-4" aria-hidden="true" />
                  </a>
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
