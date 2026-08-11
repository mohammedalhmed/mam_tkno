/**
 * Product Systems Atelier — مصدر موحّد للمحتوى الموثّق.
 * بيانات المشاريع مستخلصة من صفحاتها العامة بتاريخ 11 أغسطس 2026.
 */

export type Project = {
  id: string;
  title: string;
  arabicTitle: string;
  url: string;
  image: string;
  eyebrow: string;
  sourceTitle: string;
  description: string;
  role: string;
  decision: string;
  facts: string[];
  tags: string[];
  accent: string;
  accentSoft: string;
  accentBorder: string;
};

export const projects: Project[] = [
  {
    id: 'bellabox',
    title: 'BellaBox',
    arabicTitle: 'بيلا بوكس',
    url: 'https://bellaboxksa.com/ar',
    image: '/manus-storage/project-bellabox-editorial_03f367d9.png',
    eyebrow: 'متجر سلة · تجميل وعناية',
    sourceTitle: 'متجر يوفر منتجات التجميل والعناية السعودية',
    description:
      'واجهة متجر تجميل تجمع منتجات العناية والمكياج من علامات عالمية، مع تنظيم واضح للفئات ومسار تسوق هادئ ينسجم مع طبيعة العلامة.',
    role: 'تحسين تجربة المستخدم، الأداء، والظهور في محركات البحث',
    decision: 'تقديم الفئات والعلامات في مسار واضح، مع إبقاء المحتوى الموسمي داعماً لقرار الشراء لا منافساً له.',
    facts: ['العناية والمكياج', 'الماركات التجارية', 'مدونة وعروض موسمية'],
    tags: ['Salla', 'UI/UX', 'SEO', 'Performance'],
    accent: 'text-[#8f3754]',
    accentSoft: 'bg-[#f2dfe5]',
    accentBorder: 'border-[#d8b8c4]',
  },
  {
    id: 'nerfona',
    title: 'NERFONA',
    arabicTitle: 'نيرفونا',
    url: 'https://nerfona.sa/',
    image: '/manus-storage/project-nerfona-editorial_7f8384da.png',
    eyebrow: 'متجر سلة · عناية شخصية',
    sourceTitle: 'مفهوم جديد للعناية الشخصية',
    description:
      'متجر غني بمنتجات العناية بالبشرة والجسم والفم والشعر، يدعم قرار الشراء بمحتوى تثقيفي وأسئلة شائعة وبنية معلومات واضحة.',
    role: 'تطوير الواجهات وتحسين SEO والبنية التقنية',
    decision: 'ربط تصفح المنتجات بالمحتوى التثقيفي والأسئلة الشائعة حتى يفهم الزائر الفائدة قبل الانتقال للشراء.',
    facts: ['عناية بالبشرة والجسم', 'عناية بالفم والأسنان', 'مقالات وأسئلة شائعة'],
    tags: ['Salla', 'Frontend', 'Content UX', 'SEO'],
    accent: 'text-[#42623b]',
    accentSoft: 'bg-[#e1ead8]',
    accentBorder: 'border-[#bfd0b3]',
  },
  {
    id: 'altaj',
    title: 'ALTAJ PLUS',
    arabicTitle: 'التاج بلس للديكور',
    url: 'https://altaj-plus.com/',
    image: '/manus-storage/project-altaj-editorial_8678083b.png',
    eyebrow: 'موقع خدمات · ديكور وتشطيب',
    sourceTitle: 'خبراء ورق الجدران والدهانات بالرياض',
    description:
      'موقع خدمات يعرّف بخيارات الديكور والتشطيب ويقود الزائر نحو طلب عرض سعر أو التواصل المباشر عبر واجهة مرتبة بصرياً.',
    role: 'تصميم واجهة الخدمات وتنظيم المحتوى ومسارات التواصل',
    decision: 'تجميع الخدمات المتعددة في مسارات مفهومة، وجعل طلب عرض السعر نقطة النهاية الواضحة لكل مسار.',
    facts: ['دهانات وورق جدران', 'جبس وترميم وتشطيب', 'معرض أعمال وطلب سعر'],
    tags: ['Web Design', 'Lead Generation', 'Responsive', 'SEO'],
    accent: 'text-[#6f315d]',
    accentSoft: 'bg-[#eadde7]',
    accentBorder: 'border-[#cfb6c9]',
  },
];

export const socialLinks = [
  {
    platform: 'github',
    label: 'GitHub',
    handle: 'mohammedalhmed',
    description: 'المستودعات والمشاريع البرمجية',
    url: 'https://github.com/mohammedalhmed',
  },
  {
    platform: 'facebook',
    label: 'Facebook',
    handle: 'MAMInTec',
    description: 'المحتوى التقني والتصميم',
    url: 'https://www.facebook.com/MAMInTec',
  },
  {
    platform: 'instagram',
    label: 'Instagram',
    handle: 'mam.rm7',
    description: 'الحساب الشخصي',
    url: 'https://www.instagram.com/mam.rm7',
  },
  {
    platform: 'instagram-work',
    label: 'Instagram',
    handle: 'tiknumidia',
    description: 'التصميم والمحتوى الرقمي',
    url: 'https://www.instagram.com/tiknumidia',
  },
] as const;

export const contactDetails = {
  email: 'mohammedalhmedi738@gmail.com',
  phone: '+967738738317',
  phoneDisplay: '+967 738 738 317',
  whatsapp: 'https://wa.me/qr/HWR572FKMTPEJ1',
  location: 'اليمن',
  map: 'https://maps.app.goo.gl/U9U6FzbXQcTAzpar9',
};
