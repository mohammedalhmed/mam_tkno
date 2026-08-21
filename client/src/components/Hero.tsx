/** Product Systems Atelier — افتتاحية غير متماثلة تعرض تخصص متاجر سلة كمنتج لا كقالب. */
import { ArrowDownLeft, ArrowUpLeft, CheckCircle2, Code2, PanelsTopLeft, ShoppingBag } from 'lucide-react';

const proofPoints = [
  { value: '03', label: 'مشاريع حيّة موثقة' },
  { value: 'RTL', label: 'تجربة عربية أولاً' },
  { value: 'Salla', label: 'تخصص واجهات المتاجر' },
];

export default function Hero() {
  return (
    <section id="home" className="atelier-grid grain relative overflow-hidden pb-20 pt-32 lg:min-h-[92svh] lg:pb-28 lg:pt-36">
      <div className="pointer-events-none absolute -left-20 top-24 h-52 w-52 rounded-full bg-[#ff7a0a]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-[#16d5df]/12 blur-3xl" />
      <div className="container relative">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,.88fr)_minmax(560px,1.12fr)] lg:gap-10">
          <div className="reveal max-w-3xl">
            <div className="mb-7 flex flex-wrap items-center gap-4">
              <span className="lime-ticket">
                <span className="h-2 w-2 rounded-full bg-[#0b0f14]" />
                متاح لمشاريع مختارة
              </span>
              <span className="text-sm font-semibold text-[#0b0f14]/55">مصمم ومطوّر واجهات متاجر</span>
            </div>

            <h1 className="max-w-4xl text-[clamp(2.85rem,11vw,7.2rem)] font-extrabold leading-[1.06] text-[#0b0f14] sm:text-[clamp(3.4rem,8vw,7.2rem)] sm:leading-[1.03]">
              متجرك ليس
                <span className="relative mx-1.5 inline-block sm:mx-2">
                قالباً
                <span className="absolute inset-x-0 bottom-[7%] -z-10 h-[22%] -rotate-1 bg-[#16d5df]" />
              </span>
              <br />
              نبني له نظاماً.
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="atelier-note">DECISION / 01</span>
              <span className="text-[0.74rem] font-bold leading-6 text-[#0b0f14]/48 sm:text-xs">الهدف التجاري أولاً، ثم الشكل الذي يخدمه</span>
            </div>

            <p className="mt-7 max-w-2xl text-[1.05rem] leading-[1.95] text-[#0b0f14]/68 sm:text-lg sm:leading-8 md:text-xl md:leading-9">
              أنا محمد الحضرمي، أحوّل احتياج المتجر التجاري إلى واجهة سلة سريعة وواضحة، من التصميم في Figma إلى الكود
              القابل للاستيراد عبر GitHub.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="#projects" className="ink-button">
                شاهد المشاريع الحيّة
                <ArrowDownLeft className="h-5 w-5" />
              </a>
              <a href="#services" className="ghost-button">
                كيف أبني الثيم؟
                <PanelsTopLeft className="h-5 w-5" />
              </a>
            </div>

            <div className="mt-11 grid grid-cols-3 gap-3 border-t border-[#0b0f14]/20 pt-6">
              {proofPoints.map((point) => (
                <div key={point.value}>
                  <div className="font-latin text-xl font-extrabold sm:text-2xl">{point.value}</div>
                  <div className="mt-1 text-[0.72rem] font-semibold leading-5 text-[#0b0f14]/55 sm:text-xs">{point.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal-delayed relative lg:translate-x-10">
            <div className="absolute -right-4 top-12 z-20 hidden -rotate-3 border-2 border-[#07164f] bg-[#ff7a0a] px-4 py-2 text-xs font-extrabold text-white shadow-[5px_5px_0_#07164f] md:block">
              Product / UI / Code
            </div>

            <figure className="case-window bg-[#0b0f14] p-2.5">
              <div className="mb-2.5 flex items-center justify-between px-2 py-1 text-[#f7f3e8]/60">
                <div className="flex gap-1.5" aria-hidden="true">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff7a0a]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#16d5df]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
                </div>
                <span className="font-latin text-[10px]">storefront.system / 01</span>
              </div>
              <div className="relative aspect-[16/10] overflow-hidden rounded-[.85rem_.1rem_.85rem_.1rem] bg-[#171d25]">
                <img
                  src="/manus-storage/portfolio-hero-atelier_61d8db81.png"
                  alt="تصور لنظام واجهة متجر إلكتروني عربي متجاوب"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-[#0b0f14] via-[#0b0f14]/75 to-transparent px-5 pb-5 pt-16 text-white">
                  <div>
                    <p className="text-[0.7rem] leading-5 text-white/60 sm:text-xs">من لوحة التصميم إلى الواجهة</p>
                    <p className="mt-1 font-['Alexandria'] text-base font-bold leading-7 sm:text-lg">نظام متسق لكل نقطة بيع</p>
                  </div>
                  <ArrowUpLeft className="h-6 w-6 text-[#16d5df]" />
                </div>
              </div>
            </figure>

            <span className="atelier-measure absolute -right-2 -bottom-14 hidden sm:flex">FRAME / 16:10 / RTL</span>

            <div className="absolute -bottom-8 -left-3 grid w-[82%] grid-cols-3 border-2 border-[#07164f] bg-[#f7f3e8] p-3 shadow-[8px_8px_0_#16d5df] sm:-left-8 sm:w-[72%] sm:p-4">
              <div className="flex items-center gap-2 border-l border-[#0b0f14]/15 px-2">
                <ShoppingBag className="h-4 w-4" />
                <span className="text-[10px] font-bold sm:text-xs">تجارة</span>
              </div>
              <div className="flex items-center gap-2 border-l border-[#0b0f14]/15 px-2">
                <Code2 className="h-4 w-4" />
                <span className="text-[10px] font-bold sm:text-xs">تطوير</span>
              </div>
              <div className="flex items-center gap-2 px-2">
                <CheckCircle2 className="h-4 w-4" />
                <span className="text-[10px] font-bold sm:text-xs">تحسين</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
