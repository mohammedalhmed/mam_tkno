import { existsSync, readFileSync } from 'node:fs';

const root = new URL('..', import.meta.url).pathname;
const read = (relativePath) => readFileSync(new URL(`../${relativePath}`, import.meta.url), 'utf8');
const failures = [];

const requiredFiles = [
  'client/src/lib/seo.ts',
  'client/src/lib/case-studies.ts',
  'client/src/lib/portfolio-data.ts',
  'client/src/pages/CaseStudy.tsx',
  'client/src/pages/Home.tsx',
];

for (const file of requiredFiles) {
  if (!existsSync(`${root}${file}`)) failures.push(`الملف المطلوب غير موجود: ${file}`);
}

const seo = read('client/src/lib/seo.ts');
const caseStudies = read('client/src/lib/case-studies.ts');
const portfolio = read('client/src/lib/portfolio-data.ts');
const caseStudyPage = read('client/src/pages/CaseStudy.tsx');
const home = read('client/src/pages/Home.tsx');

for (const token of ['SITE_URL', 'setPageMetadata', 'setJsonLd', 'canonical', 'og:url']) {
  if (!seo.includes(token)) failures.push(`ملف seo.ts لا يحتوي على المؤشر المتوقع: ${token}`);
}

for (const token of ["'@type': 'CreativeWork'", "'@type': 'BreadcrumbList'", "setJsonLd('case-study-jsonld'"]) {
  if (!caseStudyPage.includes(token)) failures.push(`صفحة دراسة الحالة لا تحتوي على بنية SEO المتوقعة: ${token}`);
}

const projectIds = [...portfolio.matchAll(/\bid: '([a-z0-9-]+)'/g)].map((match) => match[1]);
if (projectIds.length === 0) failures.push('تعذر استخراج معرفات المشاريع من portfolio-data.ts');

for (const id of projectIds) {
  if (!caseStudies.includes(`${id}: {`)) failures.push(`لا توجد بيانات دراسة حالة مستقلة للمشروع: ${id}`);
  if (!caseStudyPage.includes('study.media.find')) failures.push('لا تستخدم صفحة دراسة الحالة مصدر الصورة من نموذج الدراسة.');
}

const imageEntries = [...portfolio.matchAll(/image: '([^']+)'/g)].map((match) => match[1]);
for (const image of imageEntries) {
  if (!image.startsWith('/manus-storage/')) failures.push(`مسار صورة غير متوافق مع تخزين الويب: ${image}`);
}

if (!home.includes('setPageMetadata(HOME_METADATA)')) {
  failures.push('الصفحة الرئيسية لا تعيد metadata الافتراضية عند تحميل المسار.');
}

if (failures.length > 0) {
  console.error('SEO verification failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`SEO verification passed: ${projectIds.length} case-study project(s), ${imageEntries.length} image path(s).`);
