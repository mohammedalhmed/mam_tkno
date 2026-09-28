

## Website brief builder refinement

- [x] Task: تحسين تنسيق بيانات بطاقات تصنيفات المواقع.
  - Acceptance: هوية وملخص ومؤشرات وصفحات أساسية وإضافات في وحدات واضحة داخل البطاقة.
  - Verify: مراجعة لقطات 390 و768 و1280.
  - Files: `client/src/components/WebsiteTypes.tsx`, `client/src/index.css`

- [x] Task: توسيع بيانات الأنواع بالصفحات الأساسية والإضافات والأسئلة المتخصصة.
  - Acceptance: كل نوع يملك corePages وoptionalFeatures وintakeFields مختلفة وملائمة.
  - Verify: typecheck + فحص اختيار نوعين مختلفين.
  - Files: `client/src/lib/website-types.ts`

- [x] Task: استبدال اختيار الخدمات بنموذج بيانات brief.
  - Acceptance: اسم الموقع والمجال مطلوبان، والهوية والتواصل والروابط والأسئلة المتخصصة مدعومة.
  - Verify: فحص منع الإرسال الناقص وتحديث URL واتساب بعد الاكتمال.
  - Files: `client/src/components/WebsiteTypes.tsx`

- [x] Task: تحديد الصفحات الأساسية تلقائيًا وإضافة الوظائف الاختيارية التابعة للنوع.
  - Acceptance: الصفحات الأساسية محددة مسبقًا، والإضافات تشمل login/auth والإشعارات والمحادثة والدفع حسب النوع.
  - Verify: browser visual smoke test.
  - Files: `client/src/components/WebsiteTypes.tsx`, `client/src/index.css`

- [x] Task: تشغيل الفحوص وحفظ checkpoint.
  - Acceptance: نجاح check/build/verify:seo/test:visual دون overflow في 390 و768 و1280.
  - Verify: الأوامر الآلية + مراجعة الصور.
  - Files: repository state and checkpoint metadata

## Guided brief entry and mobile modal

- [x] Task: تقسيم نموذج brief إلى خطوات قصيرة مخصصة حسب النوع.
  - Acceptance: خمس خطوات واضحة مع حفظ البيانات والتحقق عند الحاجة.
  - Verify: تنقل Playwright بين الخطوات وتحديث الأسئلة حسب النوع.
  - Files: `client/src/components/WebsiteTypes.tsx`

- [x] Task: عرض نموذج الهاتف داخل نافذة منبثقة.
  - Acceptance: فتح من بطاقة التصنيف، قفل تمرير الخلفية، إغلاق ورجوع/التالي، بلا overflow.
  - Verify: اختبار 390px ولقطة بصرية.
  - Files: `client/src/components/WebsiteTypes.tsx`, `client/src/index.css`

- [x] Task: تشغيل الفحوص وحفظ checkpoint.
  - Acceptance: نجاح check/build/verify:seo/test:visual عند 390 و768 و1280.
  - Verify: الأوامر الآلية + المراجعة البصرية.
  - Files: repository state and checkpoint metadata

## Focused modal presentation

- [x] Task: تحويل الباني إلى modal مركزي داخل نفس الصفحة.
  - Acceptance: لا يوجد inline builder ظاهر؛ النموذج يظهر فوق الصفحة ببطاقة محددة العرض والارتفاع.
  - Verify: معاينة 390 و768 و1280.
  - Files: `client/src/components/WebsiteTypes.tsx`, `client/src/index.css`

- [x] Task: إضافة backdrop مموه وإغلاق واضح وحفظ الحالة.
  - Acceptance: الخلفية معتمة ومموهة، زر الإغلاق في الزاوية، Escape والإغلاق لا يفقدان البيانات.
  - Verify: اختبار Playwright + فحص focus/overflow.
  - Files: `client/src/components/WebsiteTypes.tsx`, `client/src/index.css`, `scripts/visual-smoke.mjs`

- [x] Task: تشغيل الفحوص وحفظ checkpoint.
  - Acceptance: نجاح check/build/verify:seo/test:visual.
  - Verify: الأوامر الآلية والمراجعة البصرية.
  - Files: repository state and checkpoint metadata

## Modal visibility regression fix

- [x] Task: إزالة تأثير transform عن حاوية القسم أثناء فتح modal حتى يرتبط بالviewport.
  - Acceptance: dialog والحقول تظهر فورًا داخل الشاشة بدل خروجها خارجها.
  - Verify: قياس DOM عند 450x818 + الاختبار البصري.
  - Files: `client/src/components/WebsiteTypes.tsx`, `client/src/index.css`

- [x] Task: إضافة اختبار يمنع عودة الشاشة الفارغة.
  - Acceptance: الاختبار يتحقق من أبعاد dialog وظهور أول حقل إدخال، إضافة إلى backdrop وEscape وعدم overflow.
  - Verify: `pnpm run test:visual` على 390 و768.
  - Files: `scripts/visual-smoke.mjs`

## UX audit and intake simplification

- [x] Task: تثبيت طبقات modal فوق الهيدر ومنع تداخل المحتوى.
  - Acceptance: backdrop يغطي viewport والبطاقة لا تبدأ تحت header في 390/768/desktop.
  - Verify: قياس DOM ولقطات responsive.
  - Files: `client/src/components/WebsiteTypes.tsx`, `client/src/index.css`

- [x] Task: تقليل وتنظيم حقول الإدخال.
  - Acceptance: الخطوة الأولى حقلان مطلوبان فقط، والبيانات الاختيارية في ملاحظة واحدة.
  - Verify: اختبار عدد الحقول ومراجعة UX.
  - Files: `client/src/components/WebsiteTypes.tsx`

- [x] Task: تقليل كثافة الإضافات مع عرض المزيد عند الطلب.
  - Acceptance: أربع إضافات أولية ثم توسعة واضحة لبقية الخيارات.
  - Verify: اختبار DOM والتفاعل.
  - Files: `client/src/components/WebsiteTypes.tsx`, `client/src/index.css`

- [x] Task: تشغيل الفحوص وحفظ checkpoint.
  - Acceptance: نجاح check/build/verify:seo/test:visual.
  - Verify: الأوامر الآلية والمراجعة البصرية.
  - Files: repository state and checkpoint metadata


## Automatic website type suggestion

- [x] Task: إضافة قواعد مطابقة المجال بأنواع المواقع.
  - Acceptance: كلمات دالة عربية/إنجليزية تربط المجال بنوع مناسب دون تخمين عند النصوص العامة.
  - Verify: اختبارات متجر/عيادة/منصة برمجية ونص عام.
  - Files: `client/src/lib/website-types.ts`, `client/src/components/WebsiteTypes.tsx`

- [x] Task: تحديث النوع والصفحات وعرض سبب الاقتراح.
  - Acceptance: النوع والصفحات الأساسية تتحدث تلقائيًا، مع إبقاء التعديل اليدوي متاحًا.
  - Verify: قياس DOM ولقطة responsive.
  - Files: `client/src/components/WebsiteTypes.tsx`, `client/src/index.css`

- [x] Task: تحديث الاختبار البصري وتشغيل الفحوص وحفظ checkpoint.
  - Acceptance: check/build/verify:seo/test:visual ناجحة بلا overflow.
  - Verify: الاختبار الآلي على 390 و768.
  - Files: `scripts/visual-smoke.mjs`, repository state and checkpoint metadata
