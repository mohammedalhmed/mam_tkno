export type CanvaCategoryId =
  | 'all'
  | 'brand-marks'
  | 'visual-identity'
  | 'products-devices'
  | 'official-documents'
  | 'promotional-events'
  | 'banners'
  | 'cv'
  | 'uncategorized';

export type CanvaCategory = {
  id: Exclude<CanvaCategoryId, 'all'>;
  label: string;
  shortLabel: string;
  description: string;
};

export type CanvaDesign = {
  id: string;
  title: string;
  categoryId: CanvaCategoryId;
  shareUrl: string;
  embedUrl?: string;
  note: string;
};

export const canvaCategories: CanvaCategory[] = [
  {
    id: 'brand-marks',
    label: 'شعارات وعلامات تجارية',
    shortLabel: 'شعارات وعلامات',
    description: 'شعارات وأنظمة علامة مختصرة قابلة للتطبيق.',
  },
  {
    id: 'visual-identity',
    label: 'هوية بصرية متكاملة',
    shortLabel: 'هوية بصرية',
    description: 'منظومة بصرية متكاملة من الشعار إلى التطبيقات.',
  },
  {
    id: 'products-devices',
    label: 'منتجات وأجهزة',
    shortLabel: 'منتجات وأجهزة',
    description: 'عروض المنتجات والأجهزة والتفاصيل التقنية.',
  },
  {
    id: 'official-documents',
    label: 'مستندات رسمية',
    shortLabel: 'مستندات رسمية',
    description: 'قوالب ومستندات واضحة للاستخدام الرسمي.',
  },
  {
    id: 'promotional-events',
    label: 'تصميمات دعائية ومناسبات',
    shortLabel: 'دعائية ومناسبات',
    description: 'تصاميم الحملات والإعلانات والمناسبات.',
  },
  {
    id: 'banners',
    label: 'تصميمات بنرات',
    shortLabel: 'بنرات',
    description: 'بنرات رقمية ومطبوعة بمقاسات متعددة.',
  },
  {
    id: 'cv',
    label: 'سير ذاتية CV',
    shortLabel: 'سير ذاتية CV',
    description: 'سير ذاتية احترافية قابلة للقراءة والطباعة.',
  },
  {
    id: 'uncategorized',
    label: 'بانتظار التصنيف',
    shortLabel: 'أعمال جديدة',
    description: 'أعمال مضافة حديثًا ولم يُعتمد تصنيفها بعد.',
  },
];

export const canvaDesigns: CanvaDesign[] = [
  {
    id: 'nerfona-whitening-device',
    title: 'جهاز تبييض NERFONA',
    categoryId: 'products-devices',
    shareUrl: 'https://canva.link/nerfona-whitening-device',
    embedUrl: 'https://www.canva.com/design/DAHVkYT6jd8/hYFCGLl_jH0cg0ozNa3NgA/view?embed',
    note: 'عرض عام جاهز للتضمين داخل الموقع.',
  },
  {
    id: 'canva-design-02',
    title: 'تصميم Canva 02',
    categoryId: 'uncategorized',
    shareUrl: 'https://canva.link/q519qymqspqgaqc',
    note: 'يحتاج الرابط الحالي إلى إعادة مشاركة بصيغة عرض عام view وتصنيف العمل.',
  },
  {
    id: 'canva-design-03',
    title: 'تصميم Canva 03',
    categoryId: 'uncategorized',
    shareUrl: 'https://canva.link/a6yugih4vpmvf1v',
    note: 'يحتاج الرابط الحالي إلى إعادة مشاركة بصيغة عرض عام view وتصنيف العمل.',
  },
  {
    id: 'bab-al-yemen-spices',
    title: 'هوية باب اليمن للبهارات',
    categoryId: 'visual-identity',
    shareUrl: 'https://canva.link/zg189n7uhkfcbx7',
    note: 'الرابط الحالي يفتح وضع التحرير؛ يلزم رابط عرض عام للزوار.',
  },
];
