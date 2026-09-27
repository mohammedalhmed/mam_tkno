

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
