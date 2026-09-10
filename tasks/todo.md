# MAM_Tkno Task List

> لا يبدأ التنفيذ قبل اعتماد `SPEC-MAM_Tkno.md` و`tasks/plan.md` والإجابة عن أسئلة البوابة.

## Foundation

- [ ] Task: اعتماد الاسم التجاري والرسائل الأساسية وهوية MAM_Tkno.
  - Acceptance: يظهر الاسم التجاري والقطاعان بصياغة موحدة، ولا توجد بقايا للهوية الشخصية في العناوين الأساسية.
  - Verify: مراجعة نصية للمحتوى + معاينة الهيدر والـ hero على 390 و1280.
  - Files: `client/index.html`, `client/src/components/Header.tsx`, `client/src/components/Hero.tsx`, `client/src/index.css`

- [ ] Task: إنشاء tokens للهوية التقنية/الوكالية وإعادة ضبط typography.
  - Acceptance: الألوان والخطوط والمسافات معرفة مركزيًا، وتعمل RTL دون قص أو تباين ضعيف.
  - Verify: `pnpm run check`, معاينة responsive، فحص focus-visible.
  - Files: `client/index.html`, `client/src/index.css`

## Information architecture

- [ ] Task: تصميم navigation ومخطط mega-menu للأقسام والخدمات.
  - Acceptance: تظهر البرمجة والجرافيكس وخدماتهما الفرعية في desktop، وتتحول القائمة إلى menu قابل للغلق على الهاتف.
  - Verify: اختبار لوحة المفاتيح، الضغط خارج القائمة، Escape، وعدم وجود overflow أفقي.
  - Files: `client/src/components/Header.tsx`, `client/src/App.tsx`, `client/src/pages/Home.tsx`

- [ ] Task: اعتماد مسارات الصفحات والروابط النظيفة.
  - Acceptance: كل رابط داخلي يقود إلى هدف موجود أو يعرض حالة قادمة واضحة، مع إمكانية الرجوع من كل صفحة فرعية.
  - Verify: فحص جميع الروابط يدويًا + `pnpm run build`.
  - Files: `client/src/App.tsx`, `client/src/pages/`

## Service catalog

- [ ] Task: بناء نموذج بيانات موحد للخدمات والأقسام.
  - Acceptance: توجد معرفات ثابتة للخدمات التسع، مع title, summary, deliverables, audience, CTA.
  - Verify: type-check + مراجعة content inventory.
  - Files: `client/src/lib/`, `client/src/components/Services.tsx`

- [ ] Task: تنفيذ قسم البرمجة والحلول التقنية.
  - Acceptance: تظهر الخدمات الست مع فروق واضحة ومخرجات وزر طلب عرض سعر.
  - Verify: content and CTA audit على سطح المكتب والهاتف.
  - Files: `client/src/components/Services.tsx`, `client/src/pages/`

- [ ] Task: تنفيذ قسم الجرافيكس والتصميم.
  - Acceptance: تظهر الخدمات الثلاث مع أمثلة استخدام ومخرجات وزر طلب عرض سعر.
  - Verify: content and CTA audit على سطح المكتب والهاتف.
  - Files: `client/src/components/Services.tsx`, `client/src/pages/`

## Portfolio and case studies

- [ ] Task: بناء content model لمشاريع متعددة الوسائط.
  - Acceptance: يدعم image, video, mockup, prototype reference مع alt ونوع الوسيط وحالة غياب المحتوى.
  - Verify: type-check + اختبار render لمشروع بوسيط واحد ومتعدد.
  - Files: `client/src/lib/`, `client/src/components/Projects.tsx`

- [ ] Task: إضافة قالب دراسة الحالة.
  - Acceptance: كل دراسة حالة تعرض المشكلة، الحل، المخرجات/النتيجة، الخدمات، ومشروع مشابه.
  - Verify: فتح route، زر العودة، responsive review، وعدم اختلاق نتائج أو شهادات.
  - Files: `client/src/pages/`, `client/src/components/`

- [ ] Task: تنفيذ مشاركة المشروع وطلب مشروع مشابه.
  - Acceptance: المشاركة تستخدم Web Share API عند توفره وfallback للرابط، وCTA يفتح النموذج مع service/project context.
  - Verify: اختبار المتصفح الداعم وغير الداعم للمشاركة.
  - Files: `client/src/components/`, `client/src/hooks/`

## Lead quotation flow

- [ ] Task: تصميم مخطط خطوات النموذج والحقول الشرطية.
  - Acceptance: اختيار القسم والخدمة يغير الحقول، مع حفظ التقدم داخل الجلسة وملخص قبل الإرسال.
  - Verify: اختبار مسارات web, ecommerce, app, branding, print, ERP.
  - Files: `client/src/components/`, `client/src/lib/`

- [ ] Task: تنفيذ التحقق ورسائل الخطأ والنجاح.
  - Acceptance: لا ينتقل المستخدم بخطوة ناقصة، الحقول لها labels، الأخطاء بجانب الحقول، ورسالة النجاح مفهومة.
  - Verify: keyboard-only + invalid/valid path + mobile review.
  - Files: `client/src/components/`, `client/src/lib/`

- [ ] Task: اعتماد قناة الإرسال.
  - Acceptance: إذا بقي المشروع static تظهر آلية mailto/نجاح محلي معلنة؛ إذا اختير full-stack تُكتب مواصفة API قبل التنفيذ.
  - Verify: موافقة المستخدم + اختبار عدم فقدان البيانات.
  - Files: `SPEC-MAM_Tkno.md`, `client/src/components/`

## SEO and accessibility

- [ ] Task: تحديث metadata وOpen Graph والروابط canonical.
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

- [ ] Task: تجهيز content inventory وتسليم قائمة البيانات الناقصة.
  - Acceptance: كل خدمة ومشروع له مالك محتوى وحالة (جاهز/ناقص/يحتاج اعتماد).
  - Verify: مراجعة المستخدم.
  - Files: `docs/content-inventory.md`

- [ ] Task: حفظ checkpoint بعد اعتماد كل release.
  - Acceptance: checkpoint موثق برسالة واضحة ولا توجد أخطاء build أو type-check.
  - Verify: `pnpm run check && pnpm run build`.
  - Files: repository state and checkpoint metadata

