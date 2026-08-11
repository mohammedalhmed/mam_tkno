/** Product Systems Atelier — مسار عمل واقعي من Figma وGitHub إلى استيراد الثيم في سلة. */
import { ArrowUpLeft, Check, GitBranch, SearchCheck, SendToBack } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'نفهم المتجر',
    icon: SearchCheck,
    description: 'أراجع النشاط والجمهور والواجهة الحالية، ثم أحدد المشاكل والفرص قبل رسم أي شاشة.',
    output: 'مخرجات المرحلة: نطاق واضح + اتجاه بصري',
  },
  {
    number: '02',
    title: 'نصمم ونطوّر',
    icon: SendToBack,
    description: 'أبني النظام في Figma، ثم أحوله إلى مكوّنات متجاوبة مع مراعاة RTL وسهولة إدارة المحتوى.',
    output: 'مخرجات المرحلة: واجهة معتمدة + كود منظم',
  },
  {
    number: '03',
    title: 'نراجع عبر GitHub',
    icon: GitBranch,
    description: 'يرفع الثيم إلى المستودع، تتم مراجعة التفاصيل، ثم يصبح جاهزاً للاستيراد والاختبار داخل منصة سلة.',
    output: 'مخرجات المرحلة: مستودع قابل للاستيراد',
  },
];

export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden bg-[#e7eadc] py-24 text-[#0b0f14] md:py-32">
      <div className="absolute inset-y-0 left-0 w-3 bg-[#ff6b35]" aria-hidden="true" />
      <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-[#ff6b35]/14 blur-3xl" aria-hidden="true" />
      <div className="container relative">
        <div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <span className="eyebrow">آلية العمل</span>
            <span className="atelier-note mt-6">PROCESS / GITHUB → SALLA</span>
            <h2 className="mt-7 text-[clamp(2.7rem,5vw,5rem)] font-extrabold leading-[1.08]">من الفكرة إلى ثيم سلة قابل للاستيراد.</h2>
            <p className="mt-6 max-w-lg text-lg leading-8 text-[#0b0f14]/70">
              عملية واضحة تقلل التعديلات العشوائية وتُبقي التصميم والكود في مسار واحد يمكن مراجعته وتطويره.
            </p>
            <a href="#contact" className="ink-button mt-9">
              ابدأ بمراجعة متجرك
              <ArrowUpLeft className="h-5 w-5" />
            </a>
          </div>

          <div className="space-y-4">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <article
                  key={step.number}
                  className="grid gap-6 border-2 border-[#0b0f14] bg-[#f7f3e8] p-6 shadow-[8px_8px_0_#cbff59] transition-transform duration-200 hover:-translate-y-1 md:grid-cols-[86px_1fr] md:p-8"
                >
                  <div>
                    <span className="font-latin text-sm font-extrabold text-[#0b0f14]/40">{step.number}</span>
                    <span className="mt-4 flex h-12 w-12 items-center justify-center rounded-[.75rem_.15rem_.75rem_.15rem] bg-[#0b0f14] text-[#cbff59]">
                      <Icon className="h-6 w-6" />
                    </span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-extrabold md:text-3xl">{step.title}</h3>
                    <p className="mt-4 text-lg leading-8 text-[#0b0f14]/65">{step.description}</p>
                    <p className="mt-5 flex items-center gap-2 text-sm font-bold">
                      <Check className="h-4 w-4 text-[#4f7300]" />
                      {step.output}
                    </p>
                    <span className="atelier-measure mt-5">CHECKPOINT / {step.number}</span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
