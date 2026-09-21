export type CanvaDesign = {
  id: string;
  title: string;
  category: string;
  shareUrl: string;
  embedUrl?: string;
  note: string;
};

export const canvaDesigns: CanvaDesign[] = [
  {
    id: 'nerfona-whitening-device',
    title: 'جهاز تبييض NERFONA',
    category: 'تصميم منتج · عرض متعدد الصفحات',
    shareUrl: 'https://canva.link/nerfona-whitening-device',
    embedUrl: 'https://www.canva.com/design/DAHVkYT6jd8/hYFCGLl_jH0cg0ozNa3NgA/view?embed',
    note: 'عرض عام جاهز للتضمين داخل الموقع.',
  },
  {
    id: 'canva-design-02',
    title: 'تصميم Canva 02',
    category: 'تصميم بصري · رابط مشاركة',
    shareUrl: 'https://canva.link/q519qymqspqgaqc',
    note: 'يحتاج الرابط الحالي إلى إعادة مشاركة بصيغة عرض عام view.',
  },
  {
    id: 'canva-design-03',
    title: 'تصميم Canva 03',
    category: 'تصميم بصري · رابط مشاركة',
    shareUrl: 'https://canva.link/a6yugih4vpmvf1v',
    note: 'يحتاج الرابط الحالي إلى إعادة مشاركة بصيغة عرض عام view.',
  },
  {
    id: 'bab-al-yemen-spices',
    title: 'هوية باب اليمن للبهارات',
    category: 'هوية بصرية · شعار وتطبيقات',
    shareUrl: 'https://canva.link/zg189n7uhkfcbx7',
    note: 'الرابط الحالي يفتح وضع التحرير؛ يلزم رابط عرض عام للزوار.',
  },
];
