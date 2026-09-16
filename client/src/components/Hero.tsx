import { ArrowDownLeft, ArrowUpLeft, CheckCircle2, Code2, Palette, ShoppingBag } from 'lucide-react';

const proofPoints = [
  { icon: ShoppingBag, label: 'متاجر ومنتجات رقمية', detail: 'من الفكرة إلى واجهة قابلة للاستخدام' },
  { icon: Palette, label: 'تصميم وهوية بصرية', detail: 'نظام متسق لا مجرد ملفات منفصلة' },
  { icon: Code2, label: 'تنفيذ تقني واضح', detail: 'أداء واستجابة وتجربة عربية أولًا' },
];

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-[#061437] pb-20 pt-32 text-white sm:pt-36 lg:min-h-[94svh] lg:pb-28" aria-labelledby="hero-title">
      <div className="canva-page-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-32 top-16 h-[28rem] w-[28rem] rounded-full bg-[#2d72d8]/25 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-[#16d5df]/10 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-y-0 left-[8%] hidden w-px bg-white/10 lg:block" aria-hidden="true" />

      <div className="container relative">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,.9fr)_minmax(32rem,1.1fr)] lg:gap-14">
          <div className="reveal max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="canva-chip">
                <span className="h-2 w-2 rounded-full bg-[#16d5df]" />
                وكالة عربية للبرمجة والتصميم
              </span>
              <span className="canva-kicker">MAM_TKNO / STUDIO 01</span>
            </div>

            <h1 id="hero-title" className="mt-7 max-w-4xl font-display text-[clamp(3rem,9vw,7rem)] font-[750] leading-[1.05] tracking-[-.055em] text-white">
              نبني حضورك
              <span className="relative mx-2 inline-block">
                الرقمي
                <span className="absolute inset-x-0 bottom-[7%] -z-10 h-[18%] -rotate-1 bg-[#16d5df]" />
              </span>
              <br />كنظام متكامل.
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">
              نحوّل الاحتياج التجاري إلى منتج رقمي أو نظام بصري عربي واضح؛ من الاستراتيجية وتجربة المستخدم إلى التطوير والإطلاق.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="#contact" className="lime-button bg-[#16d5df] text-[#061437] shadow-[5px_5px_0_#285fbe]">
                ابدأ طلب مشروعك
                <ArrowUpLeft className="h-5 w-5" aria-hidden="true" />
              </a>
              <a href="#projects" className="canva-ghost-button ghost-button">
                شاهد الأعمال المختارة
                <ArrowDownLeft className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>

            <div className="mt-12 grid gap-3 pt-6 sm:grid-cols-3">
              {proofPoints.map(({ icon: Icon, label, detail }) => (
                <div key={label} className="canva-proof-card group grid grid-cols-[auto_1fr] gap-x-3 pt-4">
                  <span className="mt-1 flex h-8 w-8 items-center justify-center rounded-full border">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-white">{label}</p>
                    <p className="mt-1 text-xs leading-5 text-white/56">{detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal-delayed relative mx-auto w-full max-w-3xl lg:mx-0">
            <div className="absolute -right-3 top-10 z-20 hidden border border-white/25 bg-[#1f5dbc] px-4 py-2 text-xs font-bold text-white shadow-[4px_4px_0_#16d5df] sm:block">
              PRODUCT / UI / CODE
            </div>

            <figure className="case-window border-white/14 bg-[#091b45] p-2.5 shadow-[0_28px_80px_rgba(0,7,30,.42)]">
              <figcaption className="mb-2.5 flex items-center justify-between px-2 py-1 text-white/55">
                <span className="font-latin text-[10px]">PROJECT LAB / RTL</span>
                <span className="flex items-center gap-2 text-[10px] font-bold">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#16d5df]" />
                  تصميم · تنفيذ · تحسين
                </span>
              </figcaption>
              <div className="relative aspect-[16/11] overflow-hidden rounded-[1rem_.2rem_1rem_.2rem] bg-[#102657]">
                <img
                  src="/manus-storage/portfolio-hero-atelier_61d8db81.png"
                  alt="تصور لنظام واجهة متجر إلكتروني عربي متجاوب"
                  className="h-full w-full object-cover"
                  fetchPriority="high"
                />
                <div className="absolute inset-x-0 bottom-0 bg-[#061437]/90 px-5 py-4 text-white sm:px-6 sm:py-5">
                  <span className="font-latin text-[9px] font-extrabold tracking-[.12em] text-[#16d5df]">DESIGN SYSTEM / COMMERCE</span>
                  <p className="mt-1 font-display text-base font-bold sm:text-xl">واجهة واحدة. قرارات متسقة في كل نقطة بيع.</p>
                </div>
              </div>
            </figure>

            <div className="canva-shell-panel relative -mt-6 mr-auto grid w-[92%] grid-cols-3 p-3 shadow-[8px_8px_0_#16d5df] sm:w-[78%] sm:p-4">
              {['فهم الاحتياج', 'تصميم النظام', 'تنفيذ المنتج'].map((item, index) => (
                <div key={item} className="border-l border-white/15 px-2 last:border-l-0 sm:px-3">
                  <span className="font-latin text-[9px] font-extrabold text-[#83cfff]">0{index + 1}</span>
                  <p className="mt-1 text-[10px] font-bold leading-5 text-white sm:text-xs">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
