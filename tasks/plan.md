

## Feature Slice: Website brief builder refinement

### Build order
1. توسيع `website-types.ts` بإضافة `corePages` و`optionalFeatures` و`intakeFields` لكل تصنيف.
2. إعادة تصميم بطاقة التصنيف بهرم معلومات واضح: هوية، ملخص، مؤشرات، صفحات أساسية، وقدرات اختيارية.
3. إزالة اختيار الخدمات من `WebsiteTypes.tsx` واستبداله بنموذج بيانات المشروع العامة والأسئلة المتخصصة.
4. تحديد الصفحات الأساسية تلقائيًا عند تغيير التصنيف، وإتاحة تعديلها، ثم عرض الإضافات والوظائف الاختيارية التابعة لنوع الموقع.
5. بناء رسالة brief مفصلة إلى واتساب مع تحقق من الحقول المطلوبة، وتحديث الاختبار البصري ليتحقق من default pages وoptional features والحقول المطلوبة.
6. تشغيل check/build/verify:seo/test:visual، مراجعة 390 و768 و1280، ثم حفظ checkpoint.

### Design direction
Cards as mini scope maps: each card acts like a compact project brief, not a service menu. The builder uses a two-column editorial layout on desktop and a single reading column on mobile. Required identity fields are visually marked; core pages use a calmer selected state, optional capabilities use a higher-contrast selectable state.

### Exit gate
لا يوجد قسم خدمات، الصفحات الأساسية محددة مسبقًا حسب النوع، الإضافات متخصصة لكل نوع، الرسالة تحتوي brief كاملًا، الحقول المطلوبة تمنع الإرسال الناقص، والفحوص البصرية لا تكشف overflow.
