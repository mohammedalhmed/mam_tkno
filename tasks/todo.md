# MAM_Tkno Task List

> تمت مواءمة حالات المهام التالية مع checkpoints المنشورة حتى `26b4ce11` بتاريخ 2026-09-11. البنود غير المكتملة بقيت معلّقة عندما تتطلب بيانات رسمية، اعتماد محتوى، أو تدقيق إطلاق إضافيًا.
>
> لا يبدأ التنفيذ قبل اعتماد `SPEC-MAM_Tkno.md` و`tasks/plan.md` والإجابة عن أسئلة البوابة.

## Foundation

- [x] Task: اعتماد الاسم التجاري والرسائل الأساسية وهوية MAM_Tkno.
  - Acceptance: يظهر الاسم التجاري والقطاعان بصياغة موحدة، ولا توجد بقايا للهوية الشخصية في العناوين الأساسية.
  - Verify: مراجعة نصية للمحتوى + معاينة الهيدر والـ hero على 390 و1280.
  - Files: `client/index.html`, `client/src/components/Header.tsx`, `client/src/components/Hero.tsx`, `client/src/index.css`

- [x] Task: إنشاء tokens للهوية التقنية/الوكالية وإعادة ضبط typography.
  - Acceptance: الألوان والخطوط والمسافات معرفة مركزيًا، وتعمل RTL دون قص أو تباين ضعيف.
  - Verify: `pnpm run check`, معاينة responsive، فحص focus-visible.
  - Files: `client/index.html`, `client/src/index.css`

## Information architecture

- [x] Task: تصميم navigation ومخطط mega-menu للأقسام والخدمات.
  - Acceptance: تظهر البرمجة والجرافيكس وخدماتهما الفرعية في desktop، وتتحول القائمة إلى menu قابل للغلق على الهاتف.
  - Verify: اختبار لوحة المفاتيح، الضغط خارج القائمة، Escape، وعدم وجود overflow أفقي.
  - Files: `client/src/components/Header.tsx`, `client/src/App.tsx`, `client/src/pages/Home.tsx`

- [x] Task: اعتماد مسارات الصفحات والروابط النظيفة.
  - Acceptance: كل رابط داخلي يقود إلى هدف موجود أو يعرض حالة قادمة واضحة، مع إمكانية الرجوع من كل صفحة فرعية.
  - Verify: فحص جميع الروابط يدويًا + `pnpm run build`.
  - Files: `client/src/App.tsx`, `client/src/pages/`

## Service catalog

- [x] Task: بناء نموذج بيانات موحد للخدمات والأقسام.
  - Acceptance: توجد معرفات ثابتة للخدمات التسع، مع title, summary, deliverables, audience, CTA.
  - Verify: type-check + مراجعة content inventory.
  - Files: `client/src/lib/`, `client/src/components/Services.tsx`

- [x] Task: تنفيذ قسم البرمجة والحلول التقنية.
  - Acceptance: تظهر الخدمات الست مع فروق واضحة ومخرجات وزر طلب عرض سعر.
  - Verify: content and CTA audit على سطح المكتب والهاتف.
  - Files: `client/src/components/Services.tsx`, `client/src/pages/`

- [x] Task: تنفيذ قسم الجرافيكس والتصميم.
  - Acceptance: تظهر الخدمات الثلاث مع أمثلة استخدام ومخرجات وزر طلب عرض سعر.
  - Verify: content and CTA audit على سطح المكتب والهاتف.
  - Files: `client/src/components/Services.tsx`, `client/src/pages/`

## Portfolio and case studies

- [x] Task: بناء content model لمشاريع متعددة الوسائط.
  - Acceptance: يدعم image, video, mockup, prototype reference مع alt ونوع الوسيط وحالة غياب المحتوى.
  - Verify: type-check + اختبار render لمشروع بوسيط واحد ومتعدد.
  - Files: `client/src/lib/`, `client/src/components/Projects.tsx`

- [x] Task: إضافة قالب دراسة الحالة.
  - Acceptance: كل دراسة حالة تعرض المشكلة، الحل، المخرجات/النتيجة، الخدمات، ومشروع مشابه.
  - Verify: فتح route، زر العودة، responsive review، وعدم اختلاق نتائج أو شهادات.
  - Files: `client/src/pages/`, `client/src/components/`

- [x] Task: تنفيذ مشاركة المشروع وطلب مشروع مشابه.
  - Acceptance: المشاركة تستخدم Web Share API عند توفره مع fallback للرابط، وCTA يفتح النموذج مع service/project context.
  - Verify: اختبار المتصفح الداعم وغير الداعم للمشاركة.
  - Files: `client/src/components/`, `client/src/hooks/`

## Lead quotation flow

- [x] Task: تصميم مخطط خطوات النموذج والحقول الشرطية.
  - Acceptance: اختيار القسم والخدمة يغير الحقول، مع حفظ التقدم داخل الجلسة وملخص قبل الإرسال.
  - Verify: اختبار مسارات web, ecommerce, app, branding, print, ERP.
  - Files: `client/src/components/`, `client/src/lib/`

- [x] Task: تنفيذ التحقق ورسائل الخطأ والنجاح.
  - Acceptance: لا ينتقل المستخدم بخطوة ناقصة، الحقول لها labels، الأخطاء بجانب الحقول، ورسالة النجاح مفهومة.
  - Verify: keyboard-only + invalid/valid path + mobile review.
  - Files: `client/src/components/`, `client/src/lib/`

- [x] Task: اعتماد قناة الإرسال.
  - Acceptance: إذا بقي المشروع static تظهر آلية mailto/نجاح محلي معلنة؛ إذا اختير full-stack تُكتب مواصفة API قبل التنفيذ.
  - Verify: موافقة المستخدم + اختبار عدم فقدان البيانات.
  - Files: `SPEC-MAM_Tkno.md`, `client/src/components/`

## SEO and accessibility

- [x] Task: تحديث metadata وOpen Graph والروابط canonical.
  - Acceptance: كل route مهم له title/description/canonical مناسب لـ MAM_Tkno.
  - Verify: source inspection + فحص الروابط.
  - Files: `client/index.html`, `client/src/pages/`

- [ ] Task: إضافة LocalBusiness وProfessionalService بعد توفير البيانات الرسمية.
  - Acceptance: Schema لا يحتوي placeholders غير معلنة أو بيانات تخمينية.
  - Verify: JSON-LD parser/validator + مراجعة المستخدم.
  - Files: `client/index.html`, `client/src/lib/`

- [ ] Task: تدقيق WCAG والاستجابة والأداء.
  - Acceptance: لا تمرير أفقي، focus واضح، alt متوفر، reduced motion محترم، ونجاح check/build.
  - Verify: `pnpm run check`, `pnpm run build`, معاينة 390/768/1280، Lighthouse/بديل مكافئ.
  - Files: `client/src/index.css`, affected components, `client/index.html`

## Release and documentation

- [x] Task: تجهيز content inventory وتسليم قائمة البيانات الناقصة.
  - Acceptance: كل خدمة ومشروع له مالك محتوى وحالة (جاهز/ناقص/يحتاج اعتماد).
  - Verify: مراجعة المستخدم.
  - Files: `docs/content-inventory.md`

- [x] Task: حفظ checkpoint بعد اعتماد كل release.
  - Acceptance: checkpoint موثق برسالة واضحة ولا توجد أخطاء build أو type-check.
  - Verify: `pnpm run check && pnpm run build`.
  - Files: repository state and checkpoint metadata


## Continuation after Release 3

> البنود أدناه تعكس مخرجات Release 2 الموثقة في checkpoints `4afc385d` و`5976ccbb` و`6a5e9f28` و`b8762261` و`161fac6c` و`26b4ce11`.

- [x] Task: تحويل بيانات المشاريع الحالية إلى content model موحّد لدراسات الحالة.
  - Acceptance: يدعم المشكلة والحل والمخرجات والنتيجة الموثقة والخدمات والوسائط وحالة غياب المحتوى دون اختلاق بيانات.
  - Verify: `pnpm run check` + render لمشروع بوسيط واحد ومتعدد.
  - Files: `client/src/lib/portfolio-data.ts`, `client/src/lib/case-studies.ts`

- [x] Task: إضافة route وقالب دراسة حالة قابل لإعادة الاستخدام.
  - Acceptance: يفتح كل مشروع عبر رابط داخلي، يعرض المشكلة والحل والمخرجات والوسائط والخدمات، ويوفر عودة واضحة.
  - Verify: فتح routes على 390/768/1280 وفحص عدم وجود تمرير أفقي.
  - Files: `client/src/App.tsx`, `client/src/pages/CaseStudy.tsx`, `client/src/components/`

- [ ] Task: تنفيذ مشاركة المشروع وطلب مشروع مشابه.
  - Acceptance: تستخدم المشاركة Web Share API عند توفره مع fallback للرابط، ويفتح طلب المشروع النموذج بسياق المشروع والخدمة.
  - Verify: اختبار مسار المشاركة ومسار طلب مشروع مشابه في المتصفح.
  - Files: `client/src/components/CaseStudyActions.tsx`, `client/src/components/QuoteRequest.tsx`, `client/src/hooks/`

- [x] Task: توثيق حالة release وتحديث content inventory.
  - Acceptance: توضح حالة كل مشروع والحقول الناقصة والبيانات التي تحتاج اعتمادًا.
  - Verify: مراجعة `docs/content-inventory.md` وتشغيل `pnpm run check && pnpm run build`.
  - Files: `docs/content-inventory.md`, `tasks/todo.md`

- [x] Task: حفظ checkpoint بعد اكتمال دراسات الحالة.
  - Acceptance: checkpoint برسالة واضحة بعد نجاح الفحص والبناء والمعاينة responsive.
  - Verify: `pnpm run check`, `pnpm run build`, معاينة 390/768/1280.
  - Files: repository state and checkpoint metadata

> ملاحظة تنفيذية: تمت مواءمة مهام الأساس والتنقل والخدمات وتدفق طلب السعر ودراسات الحالة مع checkpoints المنشورة. ما تبقى محصور في البيانات الرسمية، اعتماد المحتوى، وتدقيق الإطلاق النهائي.

## Current Status After Checkpoint Reconciliation

- **مكتمل:** الهوية، tokens، التنقل، المسارات، كتالوج الخدمات التسع، دراسات الحالة، المشاركة، طلب مشروع مشابه، تدفق طلب السعر متعدد الخطوات، التحقق والحفظ داخل الجلسة، قناة `mailto` في النسخة الثابتة، metadata، Open Graph، canonical، JSON-LD لدراسات الحالة، `verify:seo`، تحسين تحميل الصور، وتقسيم الكود الآمن.
- **مكتمل جزئيًا:** تدقيق WCAG والاستجابة والأداء؛ تم تنفيذ focus-visible وalt وreduced motion ومعاينات 390 و1280 وتحسينات الأداء، بينما ما زال توثيق مصفوفة 768 وLighthouse أو بديل مكافئ وتدقيق لوحة المفاتيح النهائي مطلوبًا.
- **معلّق على بيانات رسمية:** `LocalBusiness` و`ProfessionalService`، مؤشرات ونتائج دراسات الحالة، وبيانات MAM_Tkno القانونية ووسائل الاتصال والعنوان.
- **خارج نطاق static الحالي:** حفظ الطلبات الدائم، CRM، رفع الملفات، الإشعارات الخادمية، CMS، المصادقة، الدفع، والإرسال المضمون؛ تحتاج هذه العناصر إلى قرار full-stack أو تكامل خارجي وفق المواصفة.

## Data and contact handoff

- [ ] Task: اعتماد بيانات MAM_Tkno الرسمية وتثبيتها في الهوية وSchema.
  - Input: الاسم MAM_Tkno، الاسم الوصفي MAM_Tkno التقنية، النشاط مستقل، خدمات برمجية وتصاميم جرافيك، اليمن-صنعاء، العالم العربي، عربي، البريد والهاتف والحسابات الرسمية.
  - Verify: مراجعة المستخدم + JSON-LD parser + معاينة قسم التواصل.

- [ ] Task: تحويل CTA طلب العرض إلى رسالة واتساب منظمة.
  - Input: رقم واتساب الدولي `+967738738317` ما لم يذكر المستخدم رقمًا مختلفًا.
  - Verify: اختبار فتح رابط WhatsApp مع رسالة سياقية وعدم فقدان بيانات الطلب.

- [ ] Task: جمع معلومات الأعمال والمشاريع من ملفات المشروع والمواصفات والمهام والروابط العامة المتاحة.
  - Acceptance: فصل المعلومات الموثقة عن المعلومات التي تحتاج اعتمادًا، ومنع إضافة أرقام أو شهادات غير مثبتة.
  - Verify: تحديث `docs/content-inventory.md` ومراجعة المستخدم.

- [ ] Task: تحديث Schema إلى LocalBusiness وProfessionalService بعد اعتماد بيانات النشاط.
  - Verify: JSON-LD parser + فحص DOM للمسارات الأساسية.

- [ ] Task: تشغيل check/build وverify:seo والمعاينات responsive ثم حفظ checkpoint.
  - Verify: 390 و768 و1280، المسارات الرئيسية، نموذج السعر، واتساب، ودراسات الحالة.
