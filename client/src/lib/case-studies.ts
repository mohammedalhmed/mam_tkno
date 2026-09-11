import { projects, type Project } from '@/lib/portfolio-data';

export type CaseStudyMedia = {
  type: 'image' | 'video' | 'mockup' | 'prototype';
  src?: string;
  alt: string;
  label: string;
};

export type CaseStudy = {
  projectId: Project['id'];
  title: string;
  arabicTitle: string;
  category: string;
  summary: string;
  problem: string;
  solution: string;
  deliverables: string[];
  outcome: string;
  outcomeStatus: 'documented' | 'pending-approval';
  services: string[];
  media: CaseStudyMedia[];
  similarServiceId: string;
};

const caseStudyDetails: Record<Project['id'], Omit<CaseStudy, 'projectId' | 'title' | 'arabicTitle' | 'category' | 'media'>> = {
  bellabox: {
    summary: 'تجربة متجر تجميل توازن بين كثافة المنتجات وهدوء قرار الشراء.',
    problem: 'يحتاج متجر العناية والجمال إلى تنظيم الفئات والعلامات والمحتوى الموسمي بحيث لا يطغى العرض البصري على الوصول إلى المنتج.',
    solution: 'إعادة ترتيب نقاط الدخول، وتوضيح العلاقة بين الفئات والعلامات والمحتوى، مع تحسين الواجهة والأداء والظهور في البحث ضمن نطاق العمل المتاح.',
    deliverables: ['تحسين تجربة المستخدم', 'تنظيم الفئات والعلامات', 'مراجعة الأداء والظهور في البحث'],
    outcome: 'المخرجات المتاحة للمراجعة هي واجهة المتجر العامة، بنية الفئات، والمحتوى الموسمي الظاهر في الموقع. لا نعرض أرقام أداء غير منشورة.',
    outcomeStatus: 'documented',
    services: ['تحسين واجهات المتاجر', 'SEO والأداء'],
    similarServiceId: 'web-commerce',
  },
  nerfona: {
    summary: 'تجربة متجر عناية شخصية تجعل المحتوى التثقيفي جزءًا من قرار الشراء.',
    problem: 'تحتاج منتجات العناية إلى سياق يشرح الفائدة والاستخدام، لا إلى شبكة منتجات منفصلة عن الأسئلة التي تدور في ذهن الزائر.',
    solution: 'ربط تصفح المنتجات بالمحتوى التثقيفي والأسئلة الشائعة، مع بناء واجهات واضحة ودعم البنية التقنية والظهور في محركات البحث.',
    deliverables: ['تطوير الواجهات', 'تنظيم المحتوى والأسئلة الشائعة', 'تحسين SEO والبنية التقنية'],
    outcome: 'المخرجات القابلة للمراجعة هي تجربة المتجر العامة، صفحات المحتوى، والأسئلة الشائعة المنشورة. النتائج الرقمية التفصيلية تحتاج اعتمادًا منفصلًا.',
    outcomeStatus: 'documented',
    services: ['تطوير المواقع', 'SEO وحلول الذكاء الاصطناعي'],
    similarServiceId: 'web-commerce',
  },
  altaj: {
    summary: 'موقع خدمات يختصر تعدد خدمات الديكور في مسار مفهوم لطلب العرض.',
    problem: 'تعدد خدمات التشطيب والديكور قد يربك الزائر إذا لم يجد نقطة وصول واضحة لكل احتياج ومسار تواصل مباشر.',
    solution: 'تجميع الخدمات في بنية قابلة للمسح، إبراز معرض الأعمال، وجعل طلب عرض السعر نقطة نهاية واضحة لمسار المستخدم.',
    deliverables: ['تصميم واجهة الخدمات', 'تنظيم المحتوى ومسارات التواصل', 'تجهيز تجربة متجاوبة لطلب السعر'],
    outcome: 'المراجعة الحالية تغطي صفحات الموقع العامة ومسارات الخدمات وطلب العرض. لا تُضاف تحويلات أو أرقام عملاء قبل توفير مصدر موثق.',
    outcomeStatus: 'documented',
    services: ['تصميم مواقع الخدمات', 'توليد العملاء المحتملين'],
    similarServiceId: 'web-commerce',
  },
};

export const caseStudies: CaseStudy[] = projects.map((project) => ({
  projectId: project.id,
  title: project.title,
  arabicTitle: project.arabicTitle,
  category: project.eyebrow,
  media: [{ type: 'image', src: project.image, alt: `معاينة مشروع ${project.arabicTitle}`, label: 'المعاينة الرئيسية' }],
  ...caseStudyDetails[project.id],
}));

export function getCaseStudy(projectId?: string) {
  return caseStudies.find((study) => study.projectId === projectId);
}
