import { ArrowUpLeft, Plus } from 'lucide-react';

const questions = [
  {
    question: 'ما الذي تقدمه MAM_Tkno للمنتجات والمتاجر الرقمية؟',
    answer:
      'نصمم ونطوّر المواقع والمتاجر والمنتجات الرقمية، ونقدّم تدقيق UI/UX وتهيئة SEO، إلى جانب الهوية البصرية والتصاميم التسويقية والمطبوعة، مع تجربة عربية متجاوبة تدعم RTL.',
  },
  {
    question: 'هل التسليم يكون على شكل ثيم سلة قابل للاستيراد؟',
    answer:
      'نعم. بعد اعتماد التصميم، يُنظّم الكود داخل مستودع GitHub ليسهل مراجعته وتطويره، ثم يُجهّز الثيم للاختبار والاستيراد إلى منصة سلة وفق نطاق المشروع ومتطلباته.',
  },
  {
    question: 'كيف يتحدد نطاق مشروع موقع أو تطبيق أو هوية بصرية؟',
    answer:
      'يبدأ النطاق من الهدف والجمهور ونقاط الاستخدام المطلوبة، ثم نحدد الصفحات أو التدفقات والمخرجات التقنية أو البصرية ومعايير القبول. يُعرض الملخص قبل التنفيذ حتى تكون الحدود والقرارات واضحة للطرفين.',
  },
  {
    question: 'هل تشمل الخدمة تحسين الظهور في محركات البحث؟',
    answer:
      'نراعي أساسيات SEO وAEO داخل الواجهة مثل التسلسل الدلالي للعناوين، وضوح المحتوى، البيانات المنظمة، النصوص البديلة، الأداء، وتجربة الجوال. ويُحدد نطاق العمل الإضافي بعد مراجعة الموقع وأهدافه.',
  },
  {
    question: 'كيف يبدأ مشروع جديد أو مراجعة منتج قائم؟',
    answer:
      'نحتاج إلى رابط المنتج إن وُجد، ووصف مختصر للهدف والجمهور وما تريد تحسينه. نراجع الواجهة أو الفكرة ومسار الاستخدام، ثم نشارك ملاحظات أولية تساعد على تحديد الأولويات ونطاق التنفيذ.',
  },
] as const;

export default function FAQ() {
  return (
    <section id="faq" className="surface-warm section-pad section-rule-soft relative overflow-hidden" aria-labelledby="faq-title">
      <div className="pointer-events-none absolute inset-0 atelier-grid opacity-25" aria-hidden="true" />
      <div className="container relative">
        <div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <span className="section-number">04 / QUESTIONS</span>
            <h2 id="faq-title" className="editorial-heading mt-5">
              وضوح قبل البناء.
            </h2>
            <p className="editorial-copy mt-6 max-w-lg">
              إجابات قصيرة تساعدك على معرفة ما سنحتاجه في البداية، وكيف يتحول النقاش الأول إلى نطاق عملي.
            </p>
            <a href="#contact" className="mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[#2145a8] underline decoration-[#16d5df] decoration-2 underline-offset-8">
              ما زال لديك سؤال؟ تواصل معنا
              <ArrowUpLeft className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <div className="border-t border-[#07101c]/16">
            {questions.map((item, index) => (
              <details key={item.question} className="group border-b border-[#07101c]/16" open={index === 0}>
                <summary className="flex min-h-20 cursor-pointer list-none items-center gap-4 py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16d5df] focus-visible:ring-inset sm:gap-6">
                  <span className="font-latin w-8 text-xs font-extrabold text-[#2145a8]/60">0{index + 1}</span>
                  <span className="flex-1 font-display text-lg font-bold leading-8 text-[#07101c] sm:text-xl">{item.question}</span>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-[#07101c]/18 text-[#2145a8] transition-transform duration-200 group-open:rotate-45"><Plus className="h-4 w-4" aria-hidden="true" /></span>
                </summary>
                <p className="mr-12 max-w-2xl pb-7 text-base leading-8 text-[#07101c]/65 sm:mr-14">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
