# MAM_Tkno Development Plan

## Planning Basis

تعتمد الخطة على `CAPABILITY-MAP.md` و`SPEC-MAM_Tkno.md`. التنفيذ gated: لا تبدأ مرحلة الكود الفعلي قبل اعتماد المواصفة والإجابة عن أسئلة البيانات والخدمات الخادمية.

## Release Strategy

### Release 0: Foundation and proof of direction

الهدف هو تثبيت هوية MAM_Tkno، الرسائل، لوحة الألوان، الخطوط، بنية التنقل، ونموذج بيانات الخدمات والمشاريع. معيار الخروج هو أن يستطيع المستخدم مراجعة الاتجاه البصري والتنقل قبل إدخال جميع المحتويات.

### Release 1: Agency information architecture

تُبنى الصفحة الرئيسية وبنية قسمي الخدمات، صفحات/أقسام الخدمات التسعة، وCTAs موحدة لبدء الطلب. تُبقى المحتويات غير المؤكدة كحقول واضحة تحتاج بيانات المستخدم، ولا تُعرض أرقام أو شهادات غير موثقة.

### Release 2: Portfolio and case studies

يُضاف نموذج معرض الأعمال، مرشحات الفئات، وسياق دراسة الحالة. كل مشروع حقيقي يمر عبر قالب المشكلة، الحل، المخرجات، والنتيجة، مع مشاركة الرابط وطلب مشروع مشابه. إذا لم تتوفر وسائط حقيقية، تُستخدم حالة empty state أو محتوى تجريبي موسوم بوضوح لا كعمل منشور.

### Release 3: Lead and quotation experience

يُبنى نموذج متعدد الخطوات مع منطق شرطي، التحقق، حفظ التقدم داخل الجلسة، وملخص قبل الإرسال. في المشروع الثابت يكون الإرسال النهائي mailto أو نجاحًا محليًا معلنًا فقط إلى أن يوافق المستخدم على full-stack أو تكامل خارجي.

### Release 4: SEO, accessibility, performance, and launch gate

تُراجع metadata وSchema والروابط، ثم تُنفذ اختبارات الوصولية والاستجابة والأداء، وتُغلق العيوب قبل checkpoint.

## Technical Sequence

| Order | Module | Main outputs | Depends on | Verification gate |
|---|---|---|---|---|
| 1 | brand-foundation | tokens, logo treatment, typography, tone | — | visual review + check |
| 2 | information-architecture | routes, sticky navigation, mega-menu/mobile menu | brand-foundation | keyboard + responsive review |
| 3 | service-catalog | department layouts and 9 service entries | information-architecture | content and CTA audit |
| 4 | portfolio-case-studies | content model, cards, case-study routes | service-catalog | share + similar-project flow |
| 5 | lead-quotation-flow | multi-step conditional form | service-catalog, portfolio-case-studies | validation and success/error paths |
| 6 | seo-discoverability | metadata, schema, sitemap, robots | information-architecture, service-catalog | source inspection + validator |
| 7 | multilingual-rtl | locale-ready content structure | information-architecture, brand-foundation | Arabic RTL review |
| 8 | accessibility-performance | audit fixes and launch evidence | all modules | check, build, viewport matrix |

## Risks and Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| عدم توفر محتوى حقيقي لكل خدمة أو مشروع | محتوى عام أو غير موثوق | إنشاء content inventory ومطالبة المستخدم بالمواد قبل الإطلاق |
| نموذج الطلب يحتاج حفظًا أو إرسالًا خادميًا | تجربة وهمية أو فقدان الطلب | بوابة قرار مبكرة للترقية full-stack أو تكامل بريد موثق |
| كثرة الخدمات في صفحة واحدة | صعوبة الفهم والتنقل | أقسام واضحة، mega-menu، وroutes تدريجية عند الحاجة |
| الوسائط الكبيرة تؤثر على الأداء | LCP/CLS أسوأ | أصول storage، lazy loading، أحجام متجاوبة، وposter للڤيديو |
| تغيير الهوية يتعارض مع checkpoint الحالي | إعادة عمل أو فقدان سياق | checkpoints بعد كل release ومراجعة قبل الانتقال |

## Parallel Work

يمكن تنفيذ إعداد محتوى الخدمات، تجهيز content model، ومراجعة metadata بالتوازي بعد اعتماد `brand-foundation` و`information-architecture`. لا يجوز تنفيذ `lead-quotation-flow` قبل تثبيت معرفات الخدمات، ولا تنفيذ Schema النهائي قبل تثبيت الاسم والبيانات الرسمية.

## Verification Checkpoints

بعد كل release تُشغّل:

```bash
pnpm run check
pnpm run build
```

ثم تُجرى معاينة على 390×844 و768×1024 و1280×720، مع اختبار لوحة المفاتيح، الفوكس، menu drawer، form validation، والروابط. يُحفظ checkpoint فقط عندما لا توجد أخطاء TypeScript أو build، وتُوثق أي عناصر معلقة في قائمة المهام.

## Approval Gates

1. اعتماد خريطة القدرات.
2. اعتماد الاسم والهوية والبيانات الرسمية.
3. اعتماد قرار static-only مقابل full-stack.
4. اعتماد بنية الصفحات ونطاق الإصدار الأول.
5. اعتماد قائمة الأعمال والوسائط وحقوق استخدامها.
6. اعتماد نتيجة الاختبارات قبل النشر.


## Feature Slice: Theme switching and loading state

### Build order
1. تثبيت عقد الثيم في `ThemeContext` وتهيئة class مبكرة في `index.html`.
2. إضافة `ThemeToggle` إلى الهيدر مع دعم سطح المكتب والهاتف.
3. إضافة tokens/overrides للوضعين وإظهار الثيم المختار في meta `theme-color`.
4. بناء `PageLoadingSkeleton` واستخدامه في `App` و`Home` بدل fallback فارغ.
5. تشغيل check/build/verify:seo ثم معاينة 390×844 و768×1024 و1280×720.

### Risks and mitigation
- الألوان الثابتة في الهوية الداكنة قد تتغلب على tokens؛ تُستهدف الأسطح العامة فقط ولا يُعاد تلوين Hero/Services/FAQ/Contact التي صُممت أصلًا كلوحات داكنة.
- شاشة تحميل طويلة قد تؤخر الوصول للمحتوى؛ تُغلق بعد readiness مع حد أدنى قصير، وتُعطل الحركة الإضافية مع reduced motion.
- وميض الثيم قبل React؛ يقرأ script صغير اختيار `localStorage` قبل تحميل التطبيق.

### Exit gate
لا يُحفظ checkpoint إلا بعد نجاح `pnpm run check && pnpm run build && pnpm run verify:seo` ومراجعة سلوك الزر والـ fallback على أحجام الهاتف وسطح المكتب.


## Feature Slice: Mobile controls and tonal theme refinement

### Build order
1. إزالة CTA الجوال العائم وإلغاء مساحة الحجز السفلية المرتبطة به.
2. نقل زر الثيم إلى داخل drawer الجوال، مع إبقائه في هيدر سطح المكتب فقط.
3. استبدال طبقة الضوء البيضاء بطبقة زرقاء سماوية مضيئة تغطي body وsite-shell والأقسام ذات الأسطح الفاتحة، مع إبقاء `.dark` كما هو.
4. تحديث مواصفات الثيم وقائمة المهام، ثم تشغيل check/build/verify:seo والمعاينة responsive.

### Risk controls
- لا تُستخدم قاعدة `filter: brightness()` على الصفحة كلها حتى لا تتأثر الصور والنصوص؛ تُضبط أسطح الأقسام والتباين صراحة.
- لا يُعاد تلوين الوضع الداكن؛ قواعد light تكون تحت `html:not(.dark)` فقط.
- يبقى زر الثيم قابلًا للوصول من لوحة المفاتيح داخل drawer، ولا يُعرض في نسختين على الهاتف.

### Exit gate
لا يُحفظ checkpoint قبل نجاح الفحوص، التأكد من غياب CTA العائم وغياب زر الثيم من هيدر الهاتف، وتحقق أن `scrollWidth` لا يتجاوز عرض النافذة.
