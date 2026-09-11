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
    <section id="faq" className="relative overflow-hidden bg-[#f7f3e8] py-24 text-[#0b0f14] md:py-32" aria-labelledby="faq-title">
      <div className="absolute inset-x-0 top-0 h-px bg-[#0b0f14]/15" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-40 top-16 h-80 w-80 rounded-full bg-[#16d5df]/10 blur-3xl" aria-hidden="true" />
      <div className="container relative">
        <div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <span className="eyebrow">أسئلة شائعة</span>
            <span className="atelier-note mt-6">CLARITY / BEFORE BUILD</span>
            <h2 id="faq-title" className="mt-7 text-[clamp(2.45rem,9vw,5rem)] font-extrabold leading-[1.12] sm:text-[clamp(2.7rem,5vw,5rem)] sm:leading-[1.08]">
              قبل أن يبدأ الكود، يجب أن تكون الصورة واضحة.
            </h2>
            <p className="mt-6 max-w-lg text-[1.05rem] leading-[1.95] text-[#0b0f14]/70 sm:text-lg sm:leading-8">
              إجابات مختصرة عن طريقة العمل، مخرجات المشاريع التقنية والتصميمية، وما نحتاجه حتى تتحول المراجعة الأولى إلى قرار عملي.
            </p>
          </div>

          <dl className="divide-y-2 divide-[#07164f]/12 border-y-2 border-[#07164f]">
            {questions.map((item, index) => (
              <div key={item.question} className="grid gap-4 py-7 md:grid-cols-[76px_1fr] md:gap-8 md:py-9">
                <dt className="font-latin text-sm font-extrabold text-[#2145a8]/55">0{index + 1}</dt>
                <div>
                  <dt className="text-[1.18rem] font-extrabold leading-[1.75] sm:text-xl sm:leading-9 md:text-2xl">{item.question}</dt>
                  <dd className="mt-3 max-w-2xl text-[1rem] leading-[1.95] text-[#0b0f14]/68 sm:text-base sm:leading-8 md:text-lg">{item.answer}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
