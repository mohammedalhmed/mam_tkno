# العمارة التقنية

## الوضع الحالي

المشروع static frontend مبني على React 19 وTypeScript وVite وTailwind 4، مع خادم Express placeholder للتوافق والنشر. لا توجد قاعدة بيانات أو API خاص ببيانات brief.

## طبقات الكود

| الطبقة | الملفات | المسؤولية |
|---|---|---|
| الصفحة | `client/src/pages/Home.tsx` | ترتيب الأقسام وإدارة loading |
| العرض | `client/src/components/` | الهيدر، البطاقات، modal، الخطوات |
| البيانات | `client/src/lib/website-types.ts` | الأنواع والكلمات الدالة والصفحات والإضافات |
| بيانات الهوية | `client/src/lib/portfolio-data.ts` | المشاريع، التواصل، الحسابات |
| SEO | `client/index.html`, `client/src/lib/seo.ts` | metadata وJSON-LD |
| الاختبار | `scripts/visual-smoke.mjs` | Playwright على 390 و768 ومسارات أساسية |
| التصميم | `client/src/index.css` | tokens، RTL، responsive، modal، الحركة |

## الحالة داخل WebsiteTypes

```text
selectedTypeId
brief { siteTitle, industry }
intakeValues
selectedPages
selectedFeatures
notes
activeStep
isBuilderOpen
manualTypeOverride
```

### اشتقاق الحالة

- `selectedType = websiteTypes[selectedTypeId]`
- `industrySuggestion = rank(websiteTypes, brief.industry)`
- `recommendedFeatureIds = selectedType.recommendedFeatures`
- `missingRequired = identityMissing + typeMissing`
- `whatsappUrl = serialize(all brief state)`

## قواعد المطابقة

1. تطبيع النص: حروف صغيرة، إزالة التشكيل، توحيد الهمزات والتاء المربوطة.
2. تجاهل النص الأقل من 3 أحرف.
3. كل كلمة دالة تطابق جزءًا من المجال تحصل على score.
4. العبارات متعددة الكلمات تحصل على وزن أعلى.
5. أعلى score واضح يغير النوع؛ النص العام لا يغير الحالة.

## حدود الخصوصية والبيانات

- الحالة لا تغادر المتصفح إلا عند ضغط العميل على رابط واتساب.
- لا تُحفظ بيانات العميل في مستودع أو قاعدة بيانات.
- لا تُضاف مفاتيح سرية إلى كود الواجهة.
- يجب عند إضافة backend لاحقًا تحديد الموافقة، سياسة الاحتفاظ، وحماية بيانات التواصل قبل التنفيذ.

## مخاطر تقنية

| الخطر | المعالجة |
|---|---|
| transform أسلاف modal | تعطيل transform أثناء الفتح وقياس dialog |
| كثافة الخطوات على الهاتف | modal بعمود واحد وتسلسل من 5 خطوات |
| اقتراح خاطئ | كلمات دالة محدودة + تعديل يدوي |
| فقد الحالة عند تغيير النوع | التغيير مقصود ويعرض صفحات/إضافات النوع الجديد |
| ادعاء تكامل غير موجود | توثيق الحدود في README وPROJECT-DATA |
| تضخم bundle | إبقاء الصور في Manus Storage ومراجعة lazy imports |
