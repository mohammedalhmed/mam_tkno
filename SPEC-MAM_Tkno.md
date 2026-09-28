

## 22. Website brief builder refinement

### Objective
إعادة تنظيم قسم تصنيفات المواقع بحيث تكون بيانات البطاقات قابلة للمسح السريع، ثم تحويل لوحة التخصيص من اختيار خدمات عام إلى نموذج brief عملي مرتبط بنوع الموقع المختار.

### Builder contract
- إزالة كتلة «الخدمات التي تريد مناقشتها» من الواجهة.
- إضافة بيانات مشروع عامة: اسم/عنوان الموقع (مطلوب)، المجال (مطلوب)، الشعار أو العلامة (اختياري)، معلومات التواصل (اختياري)، روابط التواصل الاجتماعي (اختياري)، رابط قائم (اختياري)، الجمهور والهدف والملاحظات.
- إضافة أسئلة قصيرة متخصصة لكل نوع موقع حتى تختلف البيانات المطلوبة بين متجر، حجز، محفظة، شركة، حملة، أو SaaS.
- تجهيز الصفحات الأساسية تلقائيًا عند اختيار التصنيف، وتحديدها مسبقًا داخل مجموعة «الأساس المقترح». يمكن للعميل تعديلها قبل الإرسال.
- فصل الإضافات الاختيارية إلى خيارات مستقلة تشمل حسب النوع: تسجيل الدخول والمصادقة، الإشعارات، المحادثة، الدفع، الاشتراكات، البحث والفلاتر، الحجوزات، التقييمات، التكاملات، وغيرها.
- إرسال brief واحد إلى واتساب يحتوي بيانات الهوية والحقول المتخصصة والصفحات الأساسية والإضافات والملاحظات. لا يوجد إرسال تلقائي إلى خادم أو حفظ دائم.

### Card information hierarchy
كل بطاقة تعرض: الكود والنوع، ملخصًا من سطرين، ثلاثة مؤشرات نطاق، قائمة قصيرة بالصفحات الأساسية، وقائمة قصيرة بقدرات التخصيص، ثم CTA واحد. لا تعرض البطاقة قوائم خدمات طويلة أو نصوصًا متداخلة.

### Acceptance criteria
- تظهر البطاقات بمعلومات مقسمة بصريًا إلى هوية، ملخص، مؤشرات، أساس الموقع، خيارات التخصيص، وCTA.
- عند اختيار نوع جديد، تتحدث الأسئلة والصفحات الأساسية والإضافات تلقائيًا، وتُحدد الصفحات الأساسية افتراضيًا.
- لا تظهر عبارة أو fieldset بعنوان «الخدمات التي تريد مناقشتها».
- لا يعمل زر واتساب قبل إدخال الحقول المطلوبة، وتظهر رسالة عربية مفهومة تحدد النواقص.
- يظل القسم RTL ومتجاوبًا بلا overflow عند 390 و768 و1280، مع keyboard focus وaria-live للحالة.

## 23. Guided brief entry and mobile modal

### Objective
تحسين تجربة إدخال بيانات العميل عبر تقسيم brief إلى خمس خطوات قصيرة، مع تخصيص العناوين والأسئلة حسب نوع الموقع، وإظهار النموذج داخل نافذة منبثقة على الهاتف لتقليل طول الصفحة والحفاظ على التركيز.

### Interaction contract
تظل بيانات العميل محفوظة محليًا أثناء الانتقال بين الخطوات. الخطوتان الأولى والثانية تتحققان من الحقول المطلوبة قبل السماح بالمتابعة. الصفحات الأساسية والإضافات تبقى اختيارات مستقلة، والخطوة الأخيرة تعرض ملخصًا وزر واتساب. على الهاتف يفتح CTA البطاقة النافذة ويوقف تمرير الصفحة خلفها، مع إغلاق واضح وزر رجوع/التالي ثابتين نسبيًا.

### Acceptance criteria
- خمس خطوات واضحة مع حالة active وcomplete، ويمكن العودة لتعديل أي خطوة دون فقد البيانات.
- الهاتف يعرض النموذج كـ dialog full-screen تقريبًا، ويخفي الباني inline حتى لا يطول التمرير.
- الحقول المطلوبة تُشرح قبل الانتقال، وتظهر رسالة نقص عربية عند المحاولة.
- اختيار نوع من البطاقات يفتح النموذج مباشرة على الهاتف، بينما يحافظ سطح المكتب على التخطيط التحريري.
- نجاح check/build/verify:seo/test:visual مع عدم وجود overflow عند 390 و768 و1280.

## 24. Focused modal presentation

### Objective
استبدال عرض الباني الحالي بعرض modal حقيقي داخل نفس الصفحة والوجهة. يبقى القسم الحالي ظاهرًا خلف طبقة معتمة ومموهة، بينما تظهر بطاقة النموذج في مركز الشاشة مع عنوان النوع، الخطوات، المحتوى، وزر إغلاق واضح في الزاوية.

### Interaction contract
اختيار أي تصنيف يفتح النافذة مباشرة دون نقل المستخدم لمسار آخر. الخلفية لا تستقبل التفاعل ولا تمرر الصفحة أثناء العرض. زر الإغلاق يعيد المستخدم إلى بطاقات التصنيفات في نفس موضع الصفحة، وتبقى كل البيانات والاختيارات محفوظة عند الإغلاق وإعادة الفتح.

### Acceptance criteria
- modal مركزي مناسب للهاتف وسطح المكتب، بحد أقصى للعرض وارتفاع قابل للتمرير داخليًا.
- backdrop داكن مع blur واضح يفصل النموذج عن المحتوى الخلفي.
- زر إغلاق في زاوية البطاقة، قابل للوحة المفاتيح وله aria-label واضح.
- لا يظهر باني إضافي inline خلف الصفحة، ولا يحدث نقل أو overflow أفقي.
- دعم Escape لإغلاق النافذة عند فتحها، مع عودة التركيز إلى زر التصنيف إن أمكن.

## 25. UX audit: modal layering and intake simplification

### Study findings
- **Layering failure:** the section reveal transform can establish a containing block for fixed descendants; when combined with a fixed header, the dialog may render outside the viewport or appear behind the header.
- **Mobile density:** the first step exposed six fields in a narrow column. Only the site title and industry are needed to begin a useful conversation; brand, contact, social, and existing URL are supporting material, not blockers.
- **Cognitive load:** five steps are acceptable, but the feature step initially exposes every option at once. The first view should show the most common options and reveal the rest only on request.
- **Clarity:** optional identity/contact data should be collected as one clearly labelled note instead of several similarly weighted inputs.

### Updated experience contract
1. Modal layer is above the fixed header and covers the full viewport with a dimmed, blurred backdrop.
2. The first step contains two required fields only: site name/title and industry.
3. Type-specific requirements remain in the second step and use concise labels.
4. Supporting links/brand/contact details are collected in one optional notes field in the review step.
5. The feature step initially shows four common options and an explicit “show more” control.
6. Closing returns to the homepage at the same scroll position without losing the brief.

### Acceptance criteria
- No modal content intersects the fixed header at 390x818, 768x1024, or desktop widths.
- Dialog and first input are visible within 100ms after opening; backdrop covers the full viewport.
- Step 1 renders exactly two required inputs and no repeated contact/social fields.
- Feature step exposes a compact initial set and expands on demand.
- Escape, close button, and backdrop close restore the homepage view and preserve state.
