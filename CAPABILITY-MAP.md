# Capability Map: MAM_Tkno Agency Website

## Purpose

هذه الخريطة تفكك طلب تحويل الموقع الشخصي إلى موقع وكالة MAM_Tkno إلى قدرات مستقلة قابلة للتطوير والاختبار. تم اختيار معرفات ثابتة بصيغة kebab-case، ولن تُعاد تسميتها أثناء التنفيذ.

## Capability Modules

| Module id | المسؤولية | يعتمد على |
|---|---|---|
| brand-foundation | هوية MAM_Tkno، الرسائل، اللغة البصرية، نظام الألوان والخطوط | — |
| information-architecture | هيكل الموقع، التنقل، الأقسام، مسارات الخدمات، الروابط النظيفة | brand-foundation |
| service-catalog | عرض قسمي البرمجة والحلول التقنية والجرافيكس والتصميم مع صفحات الخدمات الفرعية | information-architecture |
| portfolio-case-studies | معرض الأعمال، الوسائط المتعددة، صفحات دراسة الحالة، المشاركة، طلب مشروع مشابه | service-catalog |
| lead-quotation-flow | نموذج طلب التعاقد/عرض السعر متعدد الخطوات والمنطق الشرطي وCTAs | service-catalog, portfolio-case-studies |
| seo-discoverability | SEO التقني، Open Graph، Schema LocalBusiness/ProfessionalService، sitemap، AI discovery | information-architecture, service-catalog |
| accessibility-performance | WCAG، النصوص البديلة، الفوكس، الأداء، Core Web Vitals، الاستجابة | brand-foundation, information-architecture |
| multilingual-rtl | البنية الجاهزة للعربية RTL مع قابلية إضافة الإنجليزية لاحقًا | information-architecture, brand-foundation |

## Dependency Direction

الاتجاه أحادي: `brand-foundation → information-architecture → service-catalog → portfolio-case-studies → lead-quotation-flow`.

تعمل `seo-discoverability` بعد تثبيت بنية المعلومات والخدمات، بينما تتحقق `accessibility-performance` عبر جميع الوحدات من البداية وحتى الاختبار النهائي. تعمل `multilingual-rtl` بعد تثبيت بنية المعلومات ونظام الهوية، ولا تعتمد على نموذج الطلب إلا إذا أضيفت ترجمة محتوى النموذج.

## Build Order

1. `brand-foundation`
2. `information-architecture`
3. `service-catalog`
4. `portfolio-case-studies`
5. `lead-quotation-flow`
6. `seo-discoverability`
7. `multilingual-rtl`
8. `accessibility-performance` كمسار تحقق مستمر ثم بوابة إطلاق نهائية

## Scope Boundary

هذه الخريطة تشمل إعادة بناء الواجهة وتجربة المستخدم والمحتوى الهيكلي في مشروع React/Vite الثابت الحالي. التخزين الدائم للمشاريع، استقبال الطلبات على خادم، رفع الملفات، إدارة العملاء، والمصادقة غير متاحة في المشروع الثابت الحالي وتحتاج قرارًا مستقلًا لترقية المشروع إلى full-stack.

## Review Gate

لا يبدأ تنفيذ الكود قبل مراجعة المستخدم لهذه الحدود والاعتماديات، خصوصًا قرار ترقية المشروع من static frontend إلى full-stack إذا كان نموذج الطلب يجب أن يحفظ الطلبات أو يرسلها إلى لوحة إدارة أو بريد خادمي.
