import { useEffect, useMemo, useState, type ChangeEvent, type CSSProperties, type MouseEvent } from 'react';
import { ArrowUpLeft, Check, ChevronLeft, ChevronRight, CircleAlert, ExternalLink, Layers3, Send, X } from 'lucide-react';
import { contactDetails } from '@/lib/portfolio-data';
import { websiteTypes, type WebsiteType } from '@/lib/website-types';

type BriefForm = {
  siteTitle: string;
  industry: string;
  brandDetails: string;
  contactInfo: string;
  socialLinks: string;
  existingUrl: string;
};

type BuilderStep = 1 | 2 | 3 | 4 | 5;

const initialBrief: BriefForm = {
  siteTitle: '',
  industry: '',
  brandDetails: '',
  contactInfo: '',
  socialLinks: '',
  existingUrl: '',
};

const stepLabels: Array<{ id: BuilderStep; label: string; shortLabel: string }> = [
  { id: 1, label: 'بيانات المشروع', shortLabel: 'الهوية' },
  { id: 2, label: 'تفاصيل النوع', shortLabel: 'التفاصيل' },
  { id: 3, label: 'الصفحات الأساسية', shortLabel: 'الصفحات' },
  { id: 4, label: 'الإضافات', shortLabel: 'الإضافات' },
  { id: 5, label: 'المراجعة والإرسال', shortLabel: 'المراجعة' },
];

function toggleValue(values: string[], value: string) {
  return values.includes(value) ? values.filter((item) => item !== value) : [...values, value];
}

function buildWhatsAppUrl(
  type: WebsiteType,
  brief: BriefForm,
  intakeValues: Record<string, string>,
  selectedPages: string[],
  selectedFeatures: string[],
  notes: string,
) {
  const featureLabels = type.optionalFeatures
    .filter((feature) => selectedFeatures.includes(feature.id))
    .map((feature) => feature.label);
  const lines = [
    'السلام عليكم MAM_Tkno،',
    '',
    'أرغب في تجهيز دراسة نطاق وعرض سعر لموقع جديد.',
    '',
    `نوع الموقع: ${type.name} — ${type.nameEn}`,
    `اسم / عنوان الموقع: ${brief.siteTitle.trim() || 'غير مكتمل'}`,
    `المجال: ${brief.industry.trim() || 'غير مكتمل'}`,
    `الشعار أو العلامة التجارية: ${brief.brandDetails.trim() || 'لم يحدد بعد'}`,
    `معلومات التواصل: ${brief.contactInfo.trim() || 'لم تحدد بعد'}`,
    `روابط التواصل الاجتماعي: ${brief.socialLinks.trim() || 'لم تحدد بعد'}`,
    `رابط قائم: ${brief.existingUrl.trim() || 'لا يوجد'}`,
    '',
    'الصفحات الأساسية المختارة:',
    ...(selectedPages.length ? selectedPages.map((page) => `- ${page}`) : ['- أحتاج اقتراح الصفحات المناسبة']),
    '',
    'الإضافات والوظائف الاختيارية:',
    ...(featureLabels.length ? featureLabels.map((feature) => `- ${feature}`) : ['- لا توجد إضافات محددة بعد']),
    '',
    'بيانات خاصة بهذا النوع:',
    ...type.intakeFields.flatMap((field) => [`${field.label}: ${intakeValues[field.id]?.trim() || 'لم يذكر'}`]),
    '',
    `ملاحظات إضافية: ${notes.trim() || 'لا توجد ملاحظات إضافية.'}`,
    '',
    'أرجو مراجعة المتطلبات وإعداد دراسة شاملة للنطاق والتكاليف والمدة ثم إرسال عرض سعر مناسب.',
  ];

  return `${contactDetails.whatsapp}?text=${encodeURIComponent(lines.join('\n'))}`;
}

export default function WebsiteTypes() {
  const [selectedTypeId, setSelectedTypeId] = useState(websiteTypes[0].id);
  const [brief, setBrief] = useState<BriefForm>(initialBrief);
  const [intakeValues, setIntakeValues] = useState<Record<string, string>>({});
  const [selectedPages, setSelectedPages] = useState<string[]>(websiteTypes[0].corePages);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [activeStep, setActiveStep] = useState<BuilderStep>(1);
  const [attempted, setAttempted] = useState(false);
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);

  const selectedType = useMemo(
    () => websiteTypes.find((type) => type.id === selectedTypeId) ?? websiteTypes[0],
    [selectedTypeId],
  );
  const identityMissing = useMemo(() => {
    const missing: string[] = [];
    if (!brief.siteTitle.trim()) missing.push('اسم / عنوان الموقع');
    if (!brief.industry.trim()) missing.push('المجال');
    return missing;
  }, [brief.industry, brief.siteTitle]);
  const typeMissing = useMemo(
    () => selectedType.intakeFields.filter((field) => field.required && !intakeValues[field.id]?.trim()).map((field) => field.label),
    [intakeValues, selectedType],
  );
  const missingRequired = [...identityMissing, ...typeMissing];
  const isReady = missingRequired.length === 0;
  const whatsappUrl = useMemo(
    () => buildWhatsAppUrl(selectedType, brief, intakeValues, selectedPages, selectedFeatures, notes),
    [brief, intakeValues, notes, selectedFeatures, selectedPages, selectedType],
  );

  useEffect(() => {
    if (!isBuilderOpen || !window.matchMedia('(max-width: 767px)').matches) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isBuilderOpen]);

  const chooseType = (typeId: string) => {
    const nextType = websiteTypes.find((type) => type.id === typeId) ?? websiteTypes[0];
    setSelectedTypeId(nextType.id);
    setSelectedPages(nextType.corePages);
    setSelectedFeatures([]);
    setIntakeValues({});
    setActiveStep(1);
    setAttempted(false);
    if (window.matchMedia('(max-width: 767px)').matches) {
      setIsBuilderOpen(true);
      return;
    }
    window.setTimeout(() => document.getElementById('website-type-builder')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0);
  };

  const updateBrief = (field: keyof BriefForm) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setBrief((current) => ({ ...current, [field]: event.target.value }));
    setAttempted(false);
  };

  const updateIntake = (fieldId: string) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setIntakeValues((values) => ({ ...values, [fieldId]: event.target.value }));
    setAttempted(false);
  };

  const validateStep = (step: BuilderStep) => {
    if (step === 1 && identityMissing.length) {
      setAttempted(true);
      return false;
    }
    if (step === 2 && typeMissing.length) {
      setAttempted(true);
      return false;
    }
    setAttempted(false);
    return true;
  };

  const goNext = () => {
    if (!validateStep(activeStep) || activeStep === 5) return;
    setActiveStep((step) => Math.min(5, step + 1) as BuilderStep);
  };

  const goBack = () => {
    setAttempted(false);
    setActiveStep((step) => Math.max(1, step - 1) as BuilderStep);
  };

  const handleSubmitClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (isReady) return;
    event.preventDefault();
    setAttempted(true);
    setActiveStep(identityMissing.length ? 1 : 2);
  };

  const closeBuilder = () => setIsBuilderOpen(false);

  return (
    <section id="website-types" className="website-types relative overflow-hidden border-y border-white/10 bg-[#061437] py-20 text-white sm:py-28" aria-labelledby="website-types-title">
      <div className="canva-page-grid pointer-events-none absolute inset-0 opacity-55" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-40 top-16 h-96 w-96 rounded-full bg-[#16d5df]/10 blur-3xl" aria-hidden="true" />
      <div className="container relative">
        <header className="website-types__header grid gap-8 border-b border-white/14 pb-10 lg:grid-cols-[.72fr_1.28fr] lg:items-end lg:gap-16">
          <div>
            <span className="canva-chip">03 / WEBSITE MAP</span>
            <p className="mt-4 text-sm font-bold text-[#83cfff]">مخطط واضح قبل أن نبدأ بناء الموقع</p>
          </div>
          <div>
            <h2 id="website-types-title" className="max-w-4xl font-display text-4xl font-[750] leading-[1.1] tracking-[-.045em] text-white sm:text-5xl lg:text-6xl">اختر نوع الموقع، ثم ابنِ brief مشروعك.</h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-white/68">كل بطاقة تلخص شكل الموقع ونطاقه. بعد الاختيار، ستجد الصفحات الأساسية محددة تلقائيًا، ثم تضيف بيانات مشروعك والوظائف التي تحتاجها فقط.</p>
          </div>
        </header>

        <div className="website-types__grid mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {websiteTypes.map((type) => {
            const isSelected = type.id === selectedTypeId;
            return (
              <article key={type.id} className={`website-type-card ${isSelected ? 'is-selected' : ''}`} style={{ '--website-type-accent': type.accent } as CSSProperties}>
                <div className="website-type-card__top">
                  <span className="font-latin text-[10px] font-extrabold tracking-[.14em]" style={{ color: type.accent }}>{type.code}</span>
                  <Layers3 className="h-5 w-5" style={{ color: type.accent }} aria-hidden="true" />
                </div>
                <h3>{type.name}</h3>
                <p className="website-type-card__english">{type.nameEn}</p>
                <p className="website-type-card__summary">{type.summary}</p>
                <div className="website-type-card__facts" aria-label={`نطاق ${type.name}`}>
                  <div><strong>{type.corePages.length}</strong><span>صفحات أساسية</span></div>
                  <div><strong>{type.optionalFeatures.length}</strong><span>إضافات ممكنة</span></div>
                  <div><strong>{type.intakeFields.length + 2}</strong><span>بيانات brief</span></div>
                </div>
                <div className="website-type-card__preview">
                  <div>
                    <span>الأساس المقترح</span>
                    <ul>{type.corePages.slice(0, 3).map((page) => <li key={page}>{page}</li>)}</ul>
                  </div>
                  <div>
                    <span>تخصيصات متاحة</span>
                    <ul>{type.optionalFeatures.slice(0, 3).map((feature) => <li key={feature.id}>{feature.label}</li>)}</ul>
                  </div>
                </div>
                <button type="button" className="website-type-card__button" onClick={() => chooseType(type.id)} aria-pressed={isSelected}>
                  {isSelected ? 'خصص هذا النوع' : 'اختر هذا التصنيف'}
                  {isSelected ? <ChevronLeft className="h-4 w-4" aria-hidden="true" /> : <ArrowUpLeft className="h-4 w-4" aria-hidden="true" />}
                </button>
              </article>
            );
          })}
        </div>

        <div id="website-type-builder" className={`website-type-builder mt-16 scroll-mt-28 ${isBuilderOpen ? 'is-mobile-modal' : ''}`} aria-labelledby="website-type-builder-title" role={isBuilderOpen ? 'dialog' : undefined} aria-modal={isBuilderOpen ? true : undefined}>
          <button type="button" className="website-type-builder__close" onClick={closeBuilder} aria-label="إغلاق نموذج تخصيص الموقع"><X className="h-5 w-5" aria-hidden="true" /></button>
          <div className="website-type-builder__intro">
            <span className="canva-kicker">SELECTED TYPE / {selectedType.code}</span>
            <h3 id="website-type-builder-title">{selectedType.name}</h3>
            <p>{selectedType.summary}</p>
            <div className="website-type-builder__best-for">
              <strong>يناسب غالبًا:</strong>
              <ul>{selectedType.bestFor.map((item) => <li key={item}><Check className="h-3.5 w-3.5" aria-hidden="true" />{item}</li>)}</ul>
            </div>
            <div className="website-type-builder__scope-note"><Layers3 className="h-4 w-4" aria-hidden="true" /><span>الخطوات تحفظ اختياراتك تلقائيًا، والصفحات الأساسية تبدأ محددة حسب نوع الموقع.</span></div>
            <div className="website-type-builder__sources">
              <span>مراجع مختارة</span>
              {selectedType.sources.map((source) => <a key={source} href={source} target="_blank" rel="noopener noreferrer" aria-label={`فتح المصدر ${source}`}><ExternalLink className="h-3.5 w-3.5" aria-hidden="true" /></a>)}
            </div>
          </div>

          <div className="website-type-builder__form">
            <nav className="website-type-builder__steps" aria-label="خطوات تخصيص الموقع">
              {stepLabels.map((step) => <button key={step.id} type="button" data-builder-step={step.id} className={activeStep === step.id ? 'is-active' : activeStep > step.id ? 'is-complete' : ''} onClick={() => setActiveStep(step.id)} aria-current={activeStep === step.id ? 'step' : undefined}><span>{String(step.id).padStart(2, '0')}</span><strong>{step.shortLabel}</strong><small>{step.label}</small></button>)}
            </nav>

            {activeStep === 1 && <section className="website-type-builder__section" aria-labelledby="brief-identity-title">
              <div className="website-type-builder__section-heading"><span>01</span><div><h4 id="brief-identity-title">بيانات المشروع</h4><p>ابدأ بالمعلومات التي تساعدنا على فهم هوية الموقع واتجاهه.</p></div></div>
              <div className="website-type-builder__field-grid">
                <label className="website-type-builder__field"><span>اسم / عنوان الموقع <b>*</b></span><input autoFocus value={brief.siteTitle} onChange={updateBrief('siteTitle')} placeholder="مثال: متجر نبتة للعناية الطبيعية" required aria-required="true" /></label>
                <label className="website-type-builder__field"><span>المجال <b>*</b></span><input value={brief.industry} onChange={updateBrief('industry')} placeholder="مثال: تجارة إلكترونية للعناية بالبشرة" required aria-required="true" /></label>
                <label className="website-type-builder__field"><span>الشعار أو العلامة التجارية <small>(إن وجدت)</small></span><input value={brief.brandDetails} onChange={updateBrief('brandDetails')} placeholder="رابط الشعار أو وصف الهوية والألوان" /></label>
                <label className="website-type-builder__field"><span>معلومات التواصل <small>(إن وجدت)</small></span><input value={brief.contactInfo} onChange={updateBrief('contactInfo')} placeholder="البريد، الهاتف، واتساب، الموقع" /></label>
                <label className="website-type-builder__field"><span>روابط التواصل الاجتماعي <small>(إن وجدت)</small></span><input value={brief.socialLinks} onChange={updateBrief('socialLinks')} placeholder="Instagram / Facebook / X ..." dir="ltr" /></label>
                <label className="website-type-builder__field"><span>رابط موقع قائم <small>(اختياري)</small></span><input type="url" value={brief.existingUrl} onChange={updateBrief('existingUrl')} placeholder="https://example.com" dir="ltr" /></label>
              </div>
            </section>}

            {activeStep === 2 && <section className="website-type-builder__section" aria-labelledby="brief-type-title">
              <div className="website-type-builder__section-heading"><span>02</span><div><h4 id="brief-type-title">تفاصيل {selectedType.name}</h4><p>أسئلة قصيرة تختلف حسب نوع الموقع الذي اخترته.</p></div></div>
              <div className="website-type-builder__field-grid website-type-builder__field-grid--specialized">
                {selectedType.intakeFields.map((field) => {
                  const FieldTag = field.type === 'textarea' ? 'textarea' : 'input';
                  return <label key={field.id} className="website-type-builder__field"><span>{field.label} {field.required && <b>*</b>}</span><FieldTag {...(field.type === 'url' ? { type: 'url' } : {})} value={intakeValues[field.id] ?? ''} onChange={updateIntake(field.id)} placeholder={field.placeholder} rows={field.type === 'textarea' ? 3 : undefined} required={field.required} aria-required={field.required ? 'true' : undefined} /></label>;
                })}
              </div>
            </section>}

            {activeStep === 3 && <fieldset className="website-type-builder__section">
              <div className="website-type-builder__section-heading"><span>03</span><div><h4>الصفحات الأساسية المقترحة</h4><p>هذه الصفحات محددة تلقائيًا ويمكنك إلغاء أي صفحة لا تحتاجها.</p></div></div>
              <div className="website-type-builder__options website-type-builder__options--pages">
                {selectedType.corePages.map((page) => {
                  const checked = selectedPages.includes(page);
                  return <label key={page} className={checked ? 'is-checked' : ''}><input type="checkbox" checked={checked} onChange={() => setSelectedPages((values) => toggleValue(values, page))} /><span>{page}</span><Check className="h-4 w-4" aria-hidden="true" /></label>;
                })}
              </div>
            </fieldset>}

            {activeStep === 4 && <fieldset className="website-type-builder__section">
              <div className="website-type-builder__section-heading"><span>04</span><div><h4>إضافات ووظائف أخرى</h4><p>اختر الوظائف التابعة لهذا النوع التي تريد مناقشتها ضمن النطاق.</p></div></div>
              <div className="website-type-builder__feature-options">
                {selectedType.optionalFeatures.map((feature) => {
                  const checked = selectedFeatures.includes(feature.id);
                  return <label key={feature.id} className={checked ? 'is-checked' : ''}><input type="checkbox" checked={checked} onChange={() => setSelectedFeatures((values) => toggleValue(values, feature.id))} /><span><strong>{feature.label}</strong><small>{feature.description}</small></span><Check className="h-4 w-4" aria-hidden="true" /></label>;
                })}
              </div>
            </fieldset>}

            {activeStep === 5 && <section className="website-type-builder__section" aria-labelledby="brief-review-title">
              <div className="website-type-builder__section-heading"><span>05</span><div><h4 id="brief-review-title">مراجعة وإرسال brief</h4><p>راجع اختياراتك وأضف أي سياق يساعدنا على إعداد الدراسة.</p></div></div>
              <label className="website-type-builder__notes website-type-builder__notes--step"><span>ملاحظات إضافية <small>(اختياري)</small></span><textarea autoFocus value={notes} onChange={(event) => setNotes(event.target.value)} rows={4} placeholder="مثال: أريد موقعًا عربيًا أولًا، وأحتاج ربطه بخدمة شحن أو نظام قائم..." /></label>
              <div className="website-type-builder__summary" aria-live="polite">
                <div><span>التصنيف</span><strong>{selectedType.name}</strong></div>
                <div><span>الصفحات</span><strong>{selectedPages.length} محددة</strong></div>
                <div><span>الإضافات</span><strong>{selectedFeatures.length} محددة</strong></div>
              </div>
              {attempted && !isReady && <p className="website-type-builder__error" role="alert"><CircleAlert className="h-4 w-4" aria-hidden="true" />أكمل البيانات المطلوبة: {missingRequired.join('، ')}.</p>}
              <a href={isReady ? whatsappUrl : undefined} target={isReady ? '_blank' : undefined} rel={isReady ? 'noopener noreferrer' : undefined} className={`website-type-builder__submit ${!isReady ? 'is-disabled' : ''}`} onClick={handleSubmitClick} aria-disabled={!isReady}>أرسل brief لمراجعة النطاق<Send className="h-4 w-4" aria-hidden="true" /></a>
              <p className="website-type-builder__hint">بعد الإرسال ستفتح رسالة واتساب جاهزة للمراجعة. لا يتم إرسال البيانات تلقائيًا أو حفظها في الموقع.</p>
            </section>}

            {attempted && activeStep !== 5 && ((activeStep === 1 && identityMissing.length) || (activeStep === 2 && typeMissing.length)) ? <p className="website-type-builder__error" role="alert"><CircleAlert className="h-4 w-4" aria-hidden="true" />أكمل: {(activeStep === 1 ? identityMissing : typeMissing).join('، ')}.</p> : null}
            <div className="website-type-builder__step-actions">
              {activeStep > 1 && <button type="button" className="website-type-builder__step-button website-type-builder__step-button--back" onClick={goBack}><ChevronRight className="h-4 w-4" aria-hidden="true" />السابق</button>}
              {activeStep < 5 && <button type="button" className="website-type-builder__step-button" onClick={goNext}>التالي: {stepLabels[activeStep].shortLabel}<ChevronLeft className="h-4 w-4" aria-hidden="true" /></button>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
