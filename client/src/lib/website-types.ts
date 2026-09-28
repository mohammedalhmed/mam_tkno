export type IntakeField = {
  id: string;
  label: string;
  placeholder: string;
  type?: 'text' | 'url' | 'textarea';
  required?: boolean;
};

export type OptionalFeature = {
  id: string;
  label: string;
  description: string;
};

export type FeatureRecommendation = {
  featureId: string;
  reason: string;
};

export type WebsiteType = {
  id: string;
  code: string;
  name: string;
  nameEn: string;
  summary: string;
  bestFor: string[];
  corePages: string[];
  optionalFeatures: OptionalFeature[];
  recommendedFeatures: FeatureRecommendation[];
  intakeFields: IntakeField[];
  components: string[];
  services: string[];
  additionalSections: string[];
  planningQuestions: string[];
  sources: string[];
  suggestionKeywords: string[];
  accent: string;
};

export const websiteTypes: WebsiteType[] = [
  {
    id: 'corporate',
    code: 'WEB-01',
    name: 'مواقع الشركات والخدمات',
    nameEn: 'Corporate Websites & Services',
    summary: 'موقع يعرّف بالشركة أو مقدم الخدمة ويحوّل اهتمام الزائر إلى استشارة أو تواصل أو حجز واضح.',
    bestFor: ['الشركات ومقدمي الخدمات المهنية', 'المنشآت التي تحتاج إلى بناء الثقة', 'العلامات التي تعتمد على طلبات الاستشارة'],
    corePages: ['الرئيسية', 'عن الشركة والفريق', 'الخدمات والحلول', 'دراسات الحالة', 'الأسئلة الشائعة', 'تواصل وطلب عرض'],
    optionalFeatures: [
      { id: 'corporate-blog', label: 'مدونة أو مركز موارد', description: 'مقالات وأدلة تساعد على بناء الثقة والظهور في البحث.' },
      { id: 'corporate-multilingual', label: 'لغات متعددة', description: 'نسخ عربية وإنجليزية أو لغات إضافية للمحتوى الأساسي.' },
      { id: 'corporate-crm', label: 'ربط CRM والنماذج', description: 'إرسال طلبات التواصل إلى بريد أو نظام إدارة عملاء.' },
      { id: 'corporate-notifications', label: 'إشعارات الطلبات', description: 'تنبيهات عند وصول استفسار أو طلب عرض جديد.' },
      { id: 'corporate-chat', label: 'محادثة عبر الموقع', description: 'قناة محادثة سريعة لأسئلة الزوار قبل التواصل الرسمي.' },
      { id: 'corporate-booking', label: 'حجز استشارة', description: 'اختيار موعد مناسب بدل الاكتفاء بنموذج التواصل.' },
    ],
    recommendedFeatures: [
      { featureId: 'corporate-crm', reason: 'ينظم طلبات التواصل وطلبات العرض في مسار واحد.' },
      { featureId: 'corporate-notifications', reason: 'ينبهك فور وصول استفسار أو طلب جديد.' },
    ],
    intakeFields: [
      { id: 'audience', label: 'من الجمهور أو العملاء المستهدفون؟', placeholder: 'مثال: شركات ناشئة ومتاجر متوسطة الحجم', required: true },
      { id: 'primaryGoal', label: 'ما الإجراء الأهم الذي تريده من الزائر؟', placeholder: 'مثال: طلب استشارة أو إرسال طلب عرض', required: true },
      { id: 'servicesOverview', label: 'ما الخدمات أو الحلول التي تقدمها؟', placeholder: 'اذكرها باختصار، ويمكن إضافة التفاصيل لاحقًا.', type: 'textarea' },
    ],
    components: ['صفحة رئيسية برسالة قيمة ودعوة إجراء', 'صفحات الخدمات والحلول', 'قسم نبذة وفريق ودراسات حالة', 'محتوى معرفي وأسئلة شائعة', 'نموذج تواصل وطلب عرض', 'تذييل بالاتصال والسياسات'],
    services: ['بحث الجمهور وهيكل المعلومات', 'استراتيجية المحتوى وكتابة الصفحات', 'تصميم UX/UI متجاوب', 'تطوير الموقع وإدارة المحتوى', 'تهيئة SEO والإتاحة', 'اختبارات الأداء والتحليلات والصيانة'],
    additionalSections: ['صفحة عن الشركة والفريق', 'دراسات حالة وشهادات موثقة', 'مدونة أو مركز موارد', 'صفحة فروع ومواقع', 'لغتان أو أكثر', 'تكامل CRM أو نماذج التواصل'],
    planningQuestions: ['من الجمهور الأساسي؟', 'ما الإجراء الرئيسي المطلوب من الزائر؟', 'ما الصفحات والمحتوى المتاح؟', 'هل توجد أنظمة أو لغات يجب دعمها؟'],
    sources: ['https://developers.google.com/search/docs/fundamentals/seo-starter-guide', 'https://www.w3.org/WAI/standards-guidelines/wcag/'],
    suggestionKeywords: ['شركة', 'شركات', 'مؤسسة', 'خدمات', 'استشارات', 'وكالة', 'corporate', 'company', 'business', 'services', 'agency', 'consulting'],
    accent: '#16d5df',
  },
  {
    id: 'ecommerce',
    code: 'WEB-02',
    name: 'المتاجر الإلكترونية',
    nameEn: 'Ecommerce',
    summary: 'واجهة تساعد العميل على اكتشاف المنتجات ومقارنتها ثم إتمام الطلب والدفع ومتابعة الشحن أو الاستلام.',
    bestFor: ['العلامات التي تبيع منتجات مباشرة', 'المتاجر متعددة الفئات', 'الأعمال التي تحتاج متغيرات ومخزونًا وشحنًا'],
    corePages: ['الرئيسية', 'المتجر والتصنيفات', 'صفحة المنتج', 'السلة والدفع', 'الشحن والإرجاع', 'تواصل وخدمة العملاء'],
    optionalFeatures: [
      { id: 'shop-auth', label: 'تسجيل الدخول وحساب العميل', description: 'حسابات العملاء والطلبات والعناوين المحفوظة.' },
      { id: 'shop-payment', label: 'الدفع الإلكتروني', description: 'بوابات دفع أو دفع عند الاستلام حسب السوق والمنصة.' },
      { id: 'shop-search', label: 'البحث والفلاتر المتقدمة', description: 'بحث وتصنيف ومقارنة تساعد على الوصول إلى المنتج.' },
      { id: 'shop-notifications', label: 'إشعارات الطلب والشحن', description: 'تحديثات حالة الطلب والدفع والشحن للعميل.' },
      { id: 'shop-reviews', label: 'التقييمات والأسئلة', description: 'مراجعات وأسئلة العملاء لبناء الثقة حول المنتج.' },
      { id: 'shop-loyalty', label: 'عضوية وولاء', description: 'نقاط ومكافآت وعروض خاصة للعملاء المتكررين.' },
      { id: 'shop-chat', label: 'محادثة ومساعدة قبل الشراء', description: 'إجابة سريعة عن المنتج والشحن والتوفر.' },
    ],
    recommendedFeatures: [
      { featureId: 'shop-payment', reason: 'يسهّل إتمام الطلب بدل ترك العميل عند خطوة الدفع.' },
      { featureId: 'shop-search', reason: 'يساعد العميل على الوصول إلى المنتج بسرعة داخل الكتالوج.' },
    ],
    intakeFields: [
      { id: 'productCatalog', label: 'ما المنتجات وعدد الفئات التقريبي؟', placeholder: 'مثال: عناية بالبشرة، 5 فئات، 80 منتجًا', required: true },
      { id: 'commercePlatform', label: 'ما المنصة أو طريقة البيع الحالية؟', placeholder: 'مثال: سلة، متجر قائم، أو ما زلت أبدأ', required: true },
      { id: 'shippingPayment', label: 'ما خيارات الدفع والشحن المطلوبة؟', placeholder: 'مثال: دفع إلكتروني، شحن محلي، استلام من الفرع', type: 'textarea' },
    ],
    components: ['التنقل والتصنيفات والبحث', 'صفحات الفئات والفلاتر', 'صفحة المنتج والمتغيرات', 'السلة وتعديل الكميات', 'الدفع والطلب كضيف', 'الشحن والإرجاع وتتبع الطلب'],
    services: ['هندسة كتالوج ورحلة العميل', 'تصميم المتجر وصفحات المنتج', 'تجربة البحث والفلاتر والمقارنة', 'تحسين الدفع والنماذج', 'اختبارات الاستخدام والإتاحة', 'SEO وبيانات المنتجات المنظمة'],
    additionalSections: ['قائمة الرغبات والمقارنة', 'تقييمات وأسئلة المنتجات', 'عضوية وولاء', 'مدونة ومحتوى إرشادي', 'تكامل الشحن والدفع', 'عروض وباقات مخصصة'],
    planningQuestions: ['ما عدد الفئات والمنتجات والمتغيرات؟', 'ما مسار الدفع والشحن والإرجاع؟', 'ما المنصة والأنظمة المطلوب ربطها؟', 'ما الأسواق واللغات والعملات؟'],
    sources: ['https://baymard.com/learn/checkout-flow-ux-optimization', 'https://developers.google.com/search/docs/appearance/structured-data/product'],
    suggestionKeywords: ['متجر', 'متاجر', 'منتجات', 'تجارة إلكترونية', 'تجارة', 'بيع', 'سلة', 'شوبيفاي', 'ecommerce', 'e-commerce', 'shop', 'store', 'products', 'shopify'],
    accent: '#83cfff',
  },
  {
    id: 'landing',
    code: 'WEB-03',
    name: 'صفحات الهبوط والحملات',
    nameEn: 'Landing Pages & Campaigns',
    summary: 'صفحة مركّزة حول هدف واحد مثل التسجيل أو طلب عرض أو تنزيل مورد أو شراء منتج، مع نتيجة قابلة للقياس.',
    bestFor: ['الحملات الإعلانية والبريدية', 'إطلاق منتج أو خدمة أو فعالية', 'جمع العملاء المحتملين والتنزيلات'],
    corePages: ['الصفحة الافتتاحية', 'القيمة والمزايا', 'دليل الثقة والأسئلة', 'النموذج أو الإجراء', 'صفحة الشكر والتأكيد'],
    optionalFeatures: [
      { id: 'landing-form', label: 'نموذج جمع العملاء', description: 'حقول قصيرة تصل إلى البريد أو CRM.' },
      { id: 'landing-payment', label: 'الدفع أو الحجز', description: 'تحويل الصفحة إلى شراء أو حجز مباشر.' },
      { id: 'landing-ab', label: 'نسخ متعددة للحملة', description: 'تهيئة نسخ مختلفة لاختبار الرسالة والتحويل.' },
      { id: 'landing-notifications', label: 'إشعارات فورية', description: 'تنبيه الفريق عند إرسال النموذج أو إتمام الإجراء.' },
      { id: 'landing-chat', label: 'محادثة قبل التحويل', description: 'إجابة الاعتراضات بسرعة قبل التسجيل أو الطلب.' },
      { id: 'landing-tracking', label: 'تتبع الحملات والتحليلات', description: 'قياس النقرات والإرسال ومصادر الزيارات.' },
    ],
    recommendedFeatures: [
      { featureId: 'landing-form', reason: 'يحافظ على التحويل الأساسي واضحًا وقابلًا للقياس.' },
      { featureId: 'landing-tracking', reason: 'يُظهر أي حملة أو مصدر يحقق النتيجة الأفضل.' },
    ],
    intakeFields: [
      { id: 'campaignOffer', label: 'ما العرض أو الإجراء المطلوب؟', placeholder: 'مثال: حجز جلسة مجانية أو تنزيل دليل', required: true },
      { id: 'campaignAudience', label: 'من الجمهور ومصدر الزيارات؟', placeholder: 'مثال: إعلانات Instagram لعملاء جدد', required: true },
      { id: 'campaignAssets', label: 'ما النصوص والصور أو الشهادات المتاحة؟', placeholder: 'اذكر ما هو جاهز وما يحتاج إلى إنتاج.', type: 'textarea' },
    ],
    components: ['رسالة افتتاحية وقيمة واضحة', 'شرح المشكلة والحل', 'مزايا ومخرجات ملموسة', 'دليل ثقة وأسئلة شائعة', 'نموذج أو زر تحويل', 'صفحة شكر وقياس النتائج'],
    services: ['بحث الجمهور والعرض', 'تصميم صفحة الحملة', 'كتابة العناوين والنصوص', 'تطوير سريع ومتجاوب', 'ربط النماذج والتحليلات', 'اختبار التحويل وSEO'],
    additionalSections: ['نسخ متعددة لاختبار A/B', 'صفحة شكر مخصصة', 'فيديو أو عرض تفاعلي', 'تكامل CRM والبريد', 'كوبون أو حجز موعد', 'تتبع مصادر الزيارات'],
    planningQuestions: ['ما هدف الحملة الوحيد؟', 'من الجمهور ومصدر الزيارات؟', 'ما العرض والأصول المتاحة؟', 'كيف ستُقاس النتيجة؟'],
    sources: ['https://www.nngroup.com/articles/homepage-design-principles/', 'https://www.w3.org/WAI/tutorials/forms/labels/'],
    suggestionKeywords: ['حملة', 'حملات', 'إعلان', 'إعلانات', 'هبوط', 'إطلاق', 'تسجيل', 'lead', 'landing', 'campaign', 'launch', 'marketing', 'advertising'],
    accent: '#ff7a0a',
  },
  {
    id: 'portfolio',
    code: 'WEB-04',
    name: 'مواقع الأعمال والملفات الشخصية',
    nameEn: 'Business & Portfolio Websites',
    summary: 'موقع يقدّم الشخص أو الفريق وخدماته وأعماله السابقة، ثم يحوّل التقييم إلى طلب استشارة أو فرصة عمل.',
    bestFor: ['المستقلين والمبدعين والخبراء', 'الوكالات والاستوديوهات', 'المهنيين الباحثين عن فرص أو شراكات'],
    corePages: ['الرئيسية والنبذة', 'الخدمات أو مجالات الخبرة', 'معرض الأعمال', 'دراسات الحالة', 'السيرة أو الفريق', 'التواصل والفرص'],
    optionalFeatures: [
      { id: 'portfolio-cv', label: 'سيرة ذاتية قابلة للتنزيل', description: 'نسخة منظمة للتحميل والمشاركة.' },
      { id: 'portfolio-blog', label: 'مدونة أو مقالات', description: 'محتوى يشرح الخبرة ويقوي الحضور المهني.' },
      { id: 'portfolio-testimonials', label: 'شهادات العملاء', description: 'آراء ونتائج موثقة عند توفر إذن النشر.' },
      { id: 'portfolio-booking', label: 'حجز مكالمة', description: 'اختيار وقت للتعارف أو مناقشة مشروع.' },
      { id: 'portfolio-chat', label: 'محادثة سريعة', description: 'تسهيل السؤال الأول قبل إرسال brief كامل.' },
      { id: 'portfolio-newsletter', label: 'اشتراك بالمحتوى', description: 'بناء قائمة مهتمين بالأعمال والمقالات.' },
    ],
    recommendedFeatures: [
      { featureId: 'portfolio-testimonials', reason: 'يعزز الثقة عندما يرى العميل نتائج وتجارب موثقة.' },
      { featureId: 'portfolio-booking', reason: 'يحوّل الاهتمام إلى مكالمة أو فرصة عمل بسهولة.' },
    ],
    intakeFields: [
      { id: 'portfolioSpecialty', label: 'ما تخصصك أو تخصص الفريق؟', placeholder: 'مثال: تصميم متاجر سلة وتجارب التجارة الإلكترونية', required: true },
      { id: 'portfolioAudience', label: 'من تريد أن يصل إليه الموقع؟', placeholder: 'مثال: أصحاب المتاجر والشركات الناشئة', required: true },
      { id: 'portfolioWork', label: 'ما الأعمال أو الروابط التي تريد عرضها؟', placeholder: 'ضع روابط أو اذكر المشاريع المتاحة.', type: 'textarea' },
    ],
    components: ['واجهة افتتاحية وتخصص واضح', 'مجالات الخبرة والخدمات', 'معرض أعمال قابل للتصنيف', 'صفحات دراسات حالة', 'نبذة عن الشخص أو الفريق', 'تواصل وروابط موثوقة'],
    services: ['اكتشاف الجمهور والأهداف', 'استراتيجية وتحرير المحتوى', 'تصميم UX/UI والهوية', 'تطوير الموقع وإدارة المشاريع', 'SEO والإتاحة والأداء', 'إطلاق وتحليلات وصيانة'],
    additionalSections: ['سيرة ذاتية قابلة للتنزيل', 'دراسات حالة موسعة', 'شهادات أو شعارات مصرح بها', 'مدونة أو مقالات', 'صفحة خدمات تفصيلية', 'نموذج طلب مشروع مشابه'],
    planningQuestions: ['ما الهدف التجاري أو المهني الأول؟', 'من صاحب القرار والجمهور؟', 'ما المشاريع والمحتوى المتاح؟', 'هل تحتاج إلى إدارة محتوى أو لغات؟'],
    sources: ['https://developers.google.com/search/docs/fundamentals/seo-starter-guide', 'https://www.w3.org/WAI/fundamentals/accessibility-intro/'],
    suggestionKeywords: ['شخصي', 'أعمال', 'ملف شخصي', 'بورتفوليو', 'معرض أعمال', 'مستقل', 'مبدع', 'portfolio', 'personal', 'freelance', 'creator', 'resume'],
    accent: '#d7baff',
  },
  {
    id: 'booking',
    code: 'WEB-05',
    name: 'مواقع الحجز والخدمات',
    nameEn: 'Booking & Service Websites',
    summary: 'واجهة تمكّن العميل من العثور على خدمة أو موعد، التحقق من التوفر، ثم إرسال حجز وتلقي تأكيد واضح.',
    bestFor: ['العيادات والصالونات ومراكز العافية', 'الفنادق والضيافة وتأجير العقارات', 'المطاعم والفعاليات والجولات', 'الخدمات المحلية متعددة الفروع'],
    corePages: ['الرئيسية والخدمات', 'صفحة تفاصيل الخدمة', 'التقويم والتوفر', 'بيانات العميل والدفع', 'تأكيد وتعديل الحجز', 'الفروع والتواصل'],
    optionalFeatures: [
      { id: 'booking-auth', label: 'حساب العميل والحجوزات', description: 'تسجيل الدخول وإدارة المواعيد السابقة والقادمة.' },
      { id: 'booking-payment', label: 'دفع مقدم أو عربون', description: 'تحصيل دفعة قبل تأكيد الموعد أو الخدمة.' },
      { id: 'booking-notifications', label: 'تذكيرات وإشعارات', description: 'تذكير العميل بالموعد وتحديثات التعديل والإلغاء.' },
      { id: 'booking-chat', label: 'محادثة مع مقدم الخدمة', description: 'أسئلة قبل الحجز أو توضيح متطلبات الموعد.' },
      { id: 'booking-waitlist', label: 'قائمة انتظار', description: 'طلب إشعار عند فتح موعد أو توفر مورد.' },
      { id: 'booking-reviews', label: 'تقييمات العملاء', description: 'عرض التجارب بعد إتمام الخدمة أو الحجز.' },
    ],
    recommendedFeatures: [
      { featureId: 'booking-notifications', reason: 'يقلل نسيان المواعيد ويرسل تحديثات الإلغاء والتعديل.' },
      { featureId: 'booking-auth', reason: 'يسمح للعميل بمراجعة حجوزاته القادمة والسابقة.' },
    ],
    intakeFields: [
      { id: 'bookingBusiness', label: 'ما نوع الخدمة أو النشاط؟', placeholder: 'مثال: عيادة أسنان، صالون، دورات تدريبية', required: true },
      { id: 'bookingRules', label: 'ما قواعد المواعيد والتوفر؟', placeholder: 'مثال: مدة الجلسة، الفروع، أوقات العمل، الإلغاء', required: true, type: 'textarea' },
      { id: 'bookingSystem', label: 'هل يوجد نظام حجز أو تقويم حالي؟', placeholder: 'اذكر النظام أو اكتب: لا يوجد حاليًا' },
    ],
    components: ['بحث الخدمة والتاريخ والوقت', 'نتائج وتصفية ومقارنة', 'تفاصيل الخدمة والقيود', 'تقويم واختيار وقت', 'بيانات العميل ومراجعة الحجز', 'تأكيد وتعديل وإلغاء'],
    services: ['بحث UX لتدفق الحجز', 'تصميم النتائج والتقويم', 'تطوير التوافر والقواعد', 'نماذج وصولية ورسائل أخطاء', 'صفحات الفروع والخرائط', 'تحليلات واختبار قابلية الاستخدام'],
    additionalSections: ['فروع وساعات العمل', 'خريطة وتعليمات الوصول', 'قائمة انتظار', 'تذكيرات البريد أو الرسائل', 'دفع مقدم أو عربون', 'سياسة إلغاء واضحة'],
    planningQuestions: ['ما نوع المورد أو الخدمة المحجوزة؟', 'ما قواعد التوفر والمدة؟', 'ما البيانات التي يجب جمعها؟', 'هل يوجد نظام حجز أو تقويم للتكامل؟'],
    sources: ['https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/datepicker-dialog/', 'https://developers.google.com/search/docs/appearance/structured-data/local-business'],
    suggestionKeywords: ['حجز', 'مواعيد', 'موعد', 'عيادة', 'صالون', 'فندق', 'مطعم', 'تأجير', 'فعاليات', 'booking', 'appointments', 'clinic', 'salon', 'hotel', 'restaurant'],
    accent: '#a9e4c4',
  },
  {
    id: 'saas',
    code: 'WEB-06',
    name: 'تطبيقات الويب ولوحات التحكم',
    nameEn: 'SaaS Web Apps & Dashboards',
    summary: 'واجهة رقمية تنظم مهام المستخدم وبياناته من خلال لوحة تحكم واضحة وحالات تحميل وفراغ وخطأ مفهومة.',
    bestFor: ['منتجات الاشتراك البرمجية', 'منصات إدارة الأعمال والعملاء', 'أدوات التحليلات والتقارير', 'أنظمة الفرق متعددة الأدوار'],
    corePages: ['الموقع التعريفي للمنتج', 'التسجيل وتهيئة الحساب', 'لوحة التحكم', 'الوحدات والبيانات', 'الفريق والصلاحيات', 'الإعدادات والدعم'],
    optionalFeatures: [
      { id: 'saas-auth', label: 'تسجيل الدخول والمصادقة', description: 'حسابات وصلاحيات واستعادة كلمة المرور أو SSO.' },
      { id: 'saas-subscription', label: 'اشتراكات وخطط', description: 'خطط استخدام وتجربة مجانية ودفع متكرر.' },
      { id: 'saas-notifications', label: 'إشعارات وسجل نشاط', description: 'تنبيهات داخلية وبريدية وتاريخ واضح للتغييرات.' },
      { id: 'saas-chat', label: 'محادثة ودعم داخل المنتج', description: 'مساعدة مباشرة مرتبطة بسياق المستخدم.' },
      { id: 'saas-integrations', label: 'تكاملات خارجية', description: 'ربط خدمات أو مصادر بيانات يحتاجها المنتج.' },
      { id: 'saas-analytics', label: 'تقارير ومؤشرات متقدمة', description: 'رسوم وفلاتر تساعد على المقارنة واتخاذ القرار.' },
    ],
    recommendedFeatures: [
      { featureId: 'saas-auth', reason: 'يحمي الحسابات والصلاحيات ويهيئ تجربة استخدام واضحة.' },
      { featureId: 'saas-analytics', reason: 'يحوّل بيانات المنتج إلى مؤشرات تساعد على القرار.' },
    ],
    intakeFields: [
      { id: 'saasUsers', label: 'من المستخدمون وما أدوارهم؟', placeholder: 'مثال: مدير، موظف مبيعات، محاسب', required: true },
      { id: 'saasCoreTask', label: 'ما أهم مهمة يجب إنجازها داخل النظام؟', placeholder: 'مثال: متابعة الطلبات وإصدار التقارير', required: true },
      { id: 'saasData', label: 'ما البيانات أو الأنظمة التي يجب ربطها؟', placeholder: 'اذكر التكاملات أو مصادر البيانات المتوقعة.', type: 'textarea' },
    ],
    components: ['صفحة تعريف وتجربة المنتج', 'التسجيل والتهيئة الأولية', 'تنقل جانبي أو علوي', 'لوحة مؤشرات وإجراءات', 'جداول وبيانات وفلاتر', 'الإعدادات والصلاحيات والنشاط'],
    services: ['بحث المستخدمين والأدوار', 'هندسة المعلومات والملاحة', 'تصميم UX/UI ونظام المكونات', 'تصميم الجداول والمؤشرات', 'تصميم الموقع التسويقي', 'تطوير الواجهة واختبارات الإتاحة'],
    additionalSections: ['تجربة مجانية أو عرض تجريبي', 'تهيئة onboarding', 'صلاحيات وفِرَق', 'إشعارات وسجل نشاط', 'تكاملات خارجية', 'حالات تحميل وفراغ متقدمة'],
    planningQuestions: ['من المستخدمون وما الصلاحيات؟', 'ما أهم المهام والوحدات في الإصدار الأول؟', 'هل المطلوب موقع تسويقي أم تطبيق موثّق؟', 'ما متطلبات العربية والأمان والتكاملات؟'],
    sources: ['https://www.nngroup.com/articles/dashboards-preattentive/', 'https://www.w3.org/WAI/tips/designing/'],
    suggestionKeywords: ['تطبيق', 'منصة', 'نظام', 'لوحة تحكم', 'برمجية', 'saas', 'dashboard', 'app', 'platform', 'software', 'system', 'subscription'],
    accent: '#f3b8d5',
  },
];

export const websiteTypeMap = new Map(websiteTypes.map((type) => [type.id, type]));
