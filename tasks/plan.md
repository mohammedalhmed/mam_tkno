

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

## Feature Slice: Guided brief entry and mobile modal

### Build order
1. تحويل واجهة الباني إلى state machine بسيطة من خمس خطوات: الهوية، تفاصيل النوع، الصفحات، الإضافات، المراجعة.
2. نقل التحقق إلى حدود الخطوتين الأولى والثانية مع رسائل نقص واضحة، والإبقاء على بيانات الخطوات السابقة.
3. إضافة dialog mobile يفتح من بطاقة التصنيف، يمنع scroll الخلفية، ويقدم close/back/next وsticky step navigation.
4. الإبقاء على الباني التحريري لسطح المكتب مع intro sticky، وإخفاء النسخة inline على الهاتف.
5. تحديث اختبار Playwright ليتحقق من فتح modal، التنقل، الحقول المطلوبة، الصفحات الافتراضية، رابط واتساب، وعدم overflow.
6. تشغيل check/build/verify:seo/test:visual ثم حفظ checkpoint.

### Exit gate
تجربة إدخال مركزة لا تفقد البيانات، modal الهاتف قابل للإغلاق والتنقل بالكيبورد، desktop لا يتراجع بصريًا، والرسالة النهائية لا تتفعل قبل اكتمال الحقول المطلوبة.

## Feature Slice: Focused modal presentation

### Build order
1. تحويل builder إلى modal واحد يظهر فوق الصفحة في كل المقاسات بدل النسخة inline/الممتدة.
2. إضافة backdrop مستقل بتمويه وطبقة تعتيم، مع منع تفاعل وتمرير الخلفية.
3. إعادة ضبط بطاقة الحوار: header مختصر، close corner، خطوات واضحة، ومحتوى داخلي قابل للتمرير.
4. دعم Escape والإغلاق مع بقاء البيانات، ثم معاينة الهاتف وسطح المكتب.
5. تحديث اختبار المتصفح ليثبت وجود modal/backdrop وإغلاقه وعدم overflow، ثم حفظ checkpoint.

### Exit gate
المستخدم يرى نفس الصفحة خلف modal مموه، ويستطيع فتح/إغلاق النموذج دون فقد البيانات أو تغيير الوجهة، مع نجاح check/build/verify:seo/test:visual.
