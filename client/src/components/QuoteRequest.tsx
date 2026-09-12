import { useEffect, useMemo, useState, type ChangeEvent } from 'react';
import { AlertCircle, ArrowLeft, ArrowRight, CheckCircle2, ClipboardList, Mail, MessageCircle, Send } from 'lucide-react';
import { allServices, serviceCategories, type ServiceCategoryKey } from '@/lib/services';
import { contactDetails } from '@/lib/portfolio-data';

type ProjectCategory = ServiceCategoryKey | 'unsure';
type QuoteStep = 1 | 2 | 3 | 4;

type QuoteForm = {
  category: ProjectCategory;
  serviceId: string;
  storeUrl: string;
  platform: string;
  brandStage: string;
  timeline: string;
  budget: string;
  name: string;
  email: string;
  phone: string;
  details: string;
};

type QuoteErrors = Partial<Record<keyof QuoteForm, string>>;

const STORAGE_KEY = 'mam-tkno-quote-draft';

const initialForm: QuoteForm = {
  category: 'technology',
  serviceId: '',
  storeUrl: '',
  platform: '',
  brandStage: '',
  timeline: '',
  budget: '',
  name: '',
  email: '',
  phone: '',
  details: '',
};

const steps = [
  { number: 1, label: 'المجال', note: 'ما الذي تريد بناءه؟' },
  { number: 2, label: 'الخدمة', note: 'نقطة البداية' },
  { number: 3, label: 'التفاصيل', note: 'السياق والاحتياج' },
  { number: 4, label: 'المراجعة', note: 'قبل الإرسال' },
] as const;

function getSavedForm(): QuoteForm {
  if (typeof window === 'undefined') return initialForm;
  let savedForm = initialForm;
  try {
    const saved = window.sessionStorage.getItem(STORAGE_KEY);
    savedForm = saved ? { ...initialForm, ...JSON.parse(saved) } : initialForm;
  } catch {
    savedForm = initialForm;
  }

  const params = new URLSearchParams(window.location.search);
  const requestedService = params.get('service') || '';
  const projectId = params.get('project') || '';
  const serviceCategory = allServices.find((service) => service.id === requestedService)
    ? serviceCategories.technology.services.some((service) => service.id === requestedService) ? 'technology' : 'design'
    : savedForm.category;

  return {
    ...savedForm,
    category: serviceCategory as ProjectCategory,
    serviceId: requestedService && allServices.some((service) => service.id === requestedService) ? requestedService : savedForm.serviceId,
    details: projectId && !savedForm.details ? `أرغب في مشروع مشابه لدراسة الحالة: ${projectId}. ` : savedForm.details,
  };
}

function categoryLabel(category: ProjectCategory) {
  if (category === 'technology') return 'البرمجة والحلول التقنية';
  if (category === 'design') return 'الجرافيكس والتصميم';
  return 'ما زلت أستكشف الخيارات';
}

function fieldClass(hasError = false) {
  return `mt-2 w-full rounded-none border bg-white/[.045] px-4 py-3 text-[0.95rem] text-white outline-none transition-colors placeholder:text-white/28 focus:border-[#16d5df] focus:bg-white/[.085] focus:ring-2 focus:ring-[#16d5df]/20 ${hasError ? 'border-red-300/90' : 'border-white/16'}`;
}

function ErrorMessage({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 flex items-center gap-1.5 text-xs leading-5 text-red-200" role="alert">
      <AlertCircle className="h-3.5 w-3.5 shrink-0" />
      {message}
    </p>
  );
}

export default function QuoteRequest() {
  const [form, setForm] = useState<QuoteForm>(getSavedForm);
  const [step, setStep] = useState<QuoteStep>(1);
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [mailtoHref, setMailtoHref] = useState('');
  const [whatsappHref, setWhatsappHref] = useState('');

  const selectedService = useMemo(() => allServices.find((service) => service.id === form.serviceId), [form.serviceId]);
  const selectedCategory = form.category === 'technology' || form.category === 'design' ? serviceCategories[form.category] : null;
  const availableServices = form.category === 'technology' || form.category === 'design'
    ? selectedCategory?.services ?? []
    : allServices;

  useEffect(() => {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    } catch {
      // Session storage is an enhancement; the form remains usable when unavailable.
    }
  }, [form]);

  const updateField = (field: keyof QuoteForm) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = event.target.value;
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setMailtoHref('');
    setWhatsappHref('');
  };

  const updateCategory = (category: ProjectCategory) => {
    setForm((current) => ({ ...current, category, serviceId: '' }));
    setErrors({});
    setMailtoHref('');
    setWhatsappHref('');
  };

  const validateStep = (currentStep: QuoteStep): QuoteErrors => {
    const nextErrors: QuoteErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const urlPattern = /^https?:\/\//i;

    if (currentStep === 1 && !form.category) nextErrors.category = 'اختر المجال الأقرب لفكرتك.';
    if (currentStep === 2) {
      if (!form.serviceId) nextErrors.serviceId = 'اختر الخدمة التي تمثل نقطة البداية.';
      if (form.storeUrl.trim() && !urlPattern.test(form.storeUrl.trim())) nextErrors.storeUrl = 'استخدم رابطًا يبدأ بـ https:// أو http://.';
      if (form.category === 'technology' && form.serviceId === 'mobile-apps' && !form.platform) nextErrors.platform = 'اختر المنصة المستهدفة.';
      if (form.category === 'design' && ['brand-identity', 'marketing-design', 'product-print'].includes(form.serviceId) && !form.brandStage) {
        nextErrors.brandStage = 'اختر مرحلة العلامة أو الحملة.';
      }
    }
    if (currentStep === 3) {
      if (!form.name.trim()) nextErrors.name = 'اكتب اسمك أو اسم الجهة.';
      if (!form.email.trim()) nextErrors.email = 'أدخل بريدك الإلكتروني.';
      else if (!emailPattern.test(form.email.trim())) nextErrors.email = 'تحقق من صيغة البريد الإلكتروني.';
      if (!form.details.trim()) nextErrors.details = 'اكتب نبذة قصيرة عن المطلوب.';
      else if (form.details.trim().length < 20) nextErrors.details = 'اكتب 20 حرفًا على الأقل لتوضيح الطلب.';
    }
    return nextErrors;
  };

  const goNext = () => {
    const nextErrors = validateStep(step);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
    setErrors({});
    setStep((current) => Math.min(4, current + 1) as QuoteStep);
  };

  const goBack = () => {
    setErrors({});
    setStep((current) => Math.max(1, current - 1) as QuoteStep);
  };

  const handleSubmit = () => {
    const nextErrors = validateStep(3);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStep(3);
      return;
    }

    const subject = `طلب عرض سعر من ${form.name.trim()}`;
    const body = [
      `الاسم أو الجهة: ${form.name.trim()}`,
      `البريد الإلكتروني: ${form.email.trim()}`,
      `الهاتف: ${form.phone.trim() || 'لم يُذكر'}`,
      `المجال: ${categoryLabel(form.category)}`,
      `الخدمة: ${selectedService?.title || 'أحتاج توجيهًا لاختيار الخدمة'}`,
      `الرابط: ${form.storeUrl.trim() || 'لم يُذكر'}`,
      `المنصة: ${form.platform || 'لم تُحدد'}`,
      `مرحلة العلامة: ${form.brandStage || 'لم تُحدد'}`,
      `المدة المتوقعة: ${form.timeline || 'لم تُحدد'}`,
      `النطاق التقريبي: ${form.budget || 'لم يُحدد'}`,
      '',
      'تفاصيل الطلب:',
      form.details.trim(),
    ].join('\n');

    setMailtoHref(`mailto:${contactDetails.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
    const whatsappMessage = [
      'مرحبًا MAM_Tkno، أريد طلب عرض سعر.',
      '',
      `الاسم أو الجهة: ${form.name.trim()}`,
      `البريد الإلكتروني: ${form.email.trim()}`,
      `الهاتف: ${form.phone.trim() || 'لم يُذكر'}`,
      `المجال: ${categoryLabel(form.category)}`,
      `الخدمة: ${selectedService?.title || 'أحتاج توجيهًا لاختيار الخدمة'}`,
      `الرابط: ${form.storeUrl.trim() || 'لم يُذكر'}`,
      `المدة المتوقعة: ${form.timeline || 'لم تُحدد'}`,
      '',
      'تفاصيل الطلب:',
      form.details.trim(),
    ].join('\n');
    setWhatsappHref(`${contactDetails.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`);
    setErrors({});
  };

  const conditionalLabel = form.serviceId === 'mobile-apps'
    ? 'ما المنصة الأساسية؟'
    : form.category === 'design'
      ? 'ما مرحلة العلامة أو الحملة؟'
      : 'هل لديك رابط حالي نراجعه؟';

  return (
    <div className="border border-white/16 bg-[#0b1420]/82 p-5 shadow-[12px_12px_0_rgba(22,213,223,.12)] backdrop-blur-sm sm:p-7">
      <div className="mb-7 flex items-start justify-between gap-4 border-b border-white/12 pb-5">
        <div>
          <p className="font-latin text-[10px] font-extrabold tracking-[.15em] text-[#16d5df]">MAM_TKNO / PROJECT BRIEF</p>
          <h3 className="mt-3 font-display text-2xl font-bold leading-tight text-white">لنحدّد نقطة البداية.</h3>
          <p className="mt-2 text-xs leading-6 text-white/45">احفظ ما كتبته داخل هذه الجلسة، ثم أرسل الملخص بالطريقة التي تناسبك.</p>
        </div>
        <span className="font-latin shrink-0 border border-[#16d5df]/30 px-2.5 py-1.5 text-xs font-bold text-[#16d5df]">0{step} / 04</span>
      </div>

      <ol className="mb-8 grid grid-cols-4 gap-1" aria-label="مراحل طلب عرض السعر">
        {steps.map((item) => {
          const isActive = item.number === step;
          const isComplete = item.number < step;
          return (
            <li key={item.number} className="min-w-0">
              <div className={`h-1.5 transition-colors ${isComplete || isActive ? 'bg-[#16d5df]' : 'bg-white/12'}`} />
              <p className={`mt-2 truncate text-[0.68rem] font-bold sm:text-xs ${isActive ? 'text-[#16d5df]' : 'text-white/42'}`}>{item.label}</p>
              <span className="hidden text-[0.65rem] text-white/25 sm:block">{item.note}</span>
            </li>
          );
        })}
      </ol>

      {step === 1 && (
        <div role="group" aria-labelledby="quote-category-title">
          <p id="quote-category-title" className="text-sm font-bold text-white/82">أي مسار يناسبك الآن؟</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {([
              { key: 'technology' as const, label: 'البرمجة والحلول التقنية', code: 'DEV / 06 SERVICES', accent: '#16d5df' },
              { key: 'design' as const, label: 'الجرافيكس والتصميم', code: 'GRAPHICS / 03 SERVICES', accent: '#ff7a0a' },
              { key: 'unsure' as const, label: 'أحتاج توجيهًا', code: 'DISCOVERY / OPEN', accent: '#c8ff2b' },
            ]).map((option) => {
              const selected = form.category === option.key;
              return (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => updateCategory(option.key)}
                  className={`group min-h-32 border p-4 text-right transition-all duration-200 hover:-translate-y-1 hover:bg-white/[.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16d5df] ${selected ? 'border-[#16d5df] bg-[#16d5df]/10 shadow-[0_0_0_1px_rgba(22,213,223,.25),0_0_30px_rgba(22,213,223,.12)]' : 'border-white/15 bg-white/[.025]'}`}
                  aria-pressed={selected}
                >
                  <span className="block text-[0.65rem] font-bold" style={{ color: option.accent }}>{option.code}</span>
                  <span className="mt-5 block text-sm font-extrabold leading-6 text-white/88">{option.label}</span>
                  <span className={`mt-2 block h-1 w-8 rounded-full transition-all ${selected ? 'w-14' : 'bg-white/15 group-hover:w-12'}`} style={{ backgroundColor: selected ? option.accent : undefined }} />
                </button>
              );
            })}
          </div>
          <ErrorMessage id="quote-category-error" message={errors.category} />
        </div>
      )}

      {step === 2 && (
        <div className="space-y-5">
          <div>
            <label htmlFor="quote-service" className="text-sm font-bold text-white/82">ما الخدمة الأقرب لاحتياجك؟</label>
            <select id="quote-service" value={form.serviceId} onChange={updateField('serviceId')} className={fieldClass(Boolean(errors.serviceId))} aria-invalid={Boolean(errors.serviceId)} aria-describedby={errors.serviceId ? 'quote-service-error' : undefined}>
              <option value="" className="bg-[#10161d]">اختر خدمة</option>
              {availableServices.map((service) => <option key={service.id} value={service.id} className="bg-[#10161d]">{service.code} — {service.title}</option>)}
            </select>
            <ErrorMessage id="quote-service-error" message={errors.serviceId} />
          </div>

          {form.serviceId && (
            <div className="border-r-2 border-[#16d5df] bg-[#16d5df]/[.06] p-4 text-sm leading-7 text-white/65">
              <p className="font-bold text-[#16d5df]">{selectedService?.title}</p>
              <p className="mt-1">{selectedService?.summary}</p>
            </div>
          )}

          {(form.category === 'technology' || form.category === 'unsure') && (
            <div>
              <label htmlFor="quote-store-url" className="text-sm font-bold text-white/82">{conditionalLabel} <span className="font-normal text-white/38">(اختياري)</span></label>
              <input id="quote-store-url" type="url" dir="ltr" value={form.storeUrl} onChange={updateField('storeUrl')} className={fieldClass(Boolean(errors.storeUrl))} placeholder="https://example.com" aria-invalid={Boolean(errors.storeUrl)} aria-describedby={errors.storeUrl ? 'quote-store-url-error' : undefined} />
              <ErrorMessage id="quote-store-url-error" message={errors.storeUrl} />
            </div>
          )}

          {form.serviceId === 'mobile-apps' && (
            <div>
              <label htmlFor="quote-platform" className="text-sm font-bold text-white/82">ما المنصة الأساسية؟</label>
              <select id="quote-platform" value={form.platform} onChange={updateField('platform')} className={fieldClass(Boolean(errors.platform))} aria-invalid={Boolean(errors.platform)} aria-describedby={errors.platform ? 'quote-platform-error' : undefined}>
                <option value="" className="bg-[#10161d]">اختر المنصة</option>
                <option value="ios" className="bg-[#10161d]">iOS</option>
                <option value="android" className="bg-[#10161d]">Android</option>
                <option value="both" className="bg-[#10161d]">iOS وAndroid</option>
                <option value="undecided" className="bg-[#10161d]">لم أحدد بعد</option>
              </select>
              <ErrorMessage id="quote-platform-error" message={errors.platform} />
            </div>
          )}

          {form.category === 'design' && form.serviceId && (
            <div>
              <label htmlFor="quote-brand-stage" className="text-sm font-bold text-white/82">ما مرحلة العلامة أو الحملة؟</label>
              <select id="quote-brand-stage" value={form.brandStage} onChange={updateField('brandStage')} className={fieldClass(Boolean(errors.brandStage))} aria-invalid={Boolean(errors.brandStage)} aria-describedby={errors.brandStage ? 'quote-brand-stage-error' : undefined}>
                <option value="" className="bg-[#10161d]">اختر المرحلة</option>
                <option value="new" className="bg-[#10161d]">علامة جديدة</option>
                <option value="rebrand" className="bg-[#10161d]">إعادة بناء الهوية</option>
                <option value="campaign" className="bg-[#10161d]">حملة أو إطلاق</option>
                <option value="existing" className="bg-[#10161d]">لدي مواد وأحتاج تطويرها</option>
              </select>
              <ErrorMessage id="quote-brand-stage-error" message={errors.brandStage} />
            </div>
          )}

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="quote-timeline" className="text-sm font-bold text-white/82">متى تريد البدء؟ <span className="font-normal text-white/38">(اختياري)</span></label>
              <select id="quote-timeline" value={form.timeline} onChange={updateField('timeline')} className={fieldClass()}>
                <option value="" className="bg-[#10161d]">لم أحدد بعد</option>
                <option value="urgent" className="bg-[#10161d]">خلال أسبوعين</option>
                <option value="month" className="bg-[#10161d]">خلال شهر</option>
                <option value="quarter" className="bg-[#10161d]">خلال 1–3 أشهر</option>
                <option value="exploring" className="bg-[#10161d]">أستكشف الفكرة</option>
              </select>
            </div>
            <div>
              <label htmlFor="quote-budget" className="text-sm font-bold text-white/82">النطاق التقريبي <span className="font-normal text-white/38">(اختياري)</span></label>
              <select id="quote-budget" value={form.budget} onChange={updateField('budget')} className={fieldClass()}>
                <option value="" className="bg-[#10161d]">أفضل مناقشته</option>
                <option value="starter" className="bg-[#10161d]">مشروع تأسيسي</option>
                <option value="growth" className="bg-[#10161d]">مشروع نمو</option>
                <option value="custom" className="bg-[#10161d]">نطاق مخصص</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="quote-name" className="text-sm font-bold text-white/82">الاسم أو اسم الجهة</label>
              <input id="quote-name" value={form.name} onChange={updateField('name')} className={fieldClass(Boolean(errors.name))} autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'quote-name-error' : undefined} />
              <ErrorMessage id="quote-name-error" message={errors.name} />
            </div>
            <div>
              <label htmlFor="quote-email" className="text-sm font-bold text-white/82">البريد الإلكتروني</label>
              <input id="quote-email" type="email" dir="ltr" value={form.email} onChange={updateField('email')} className={fieldClass(Boolean(errors.email))} autoComplete="email" inputMode="email" placeholder="name@example.com" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'quote-email-error' : undefined} />
              <ErrorMessage id="quote-email-error" message={errors.email} />
            </div>
          </div>
          <div>
            <label htmlFor="quote-phone" className="text-sm font-bold text-white/82">رقم التواصل <span className="font-normal text-white/38">(اختياري)</span></label>
            <input id="quote-phone" type="tel" dir="ltr" value={form.phone} onChange={updateField('phone')} className={fieldClass()} autoComplete="tel" inputMode="tel" placeholder="+966 ..." />
          </div>
          <div>
            <label htmlFor="quote-details" className="text-sm font-bold text-white/82">صف الفكرة أو التحدي الذي تريد حله</label>
            <textarea id="quote-details" value={form.details} onChange={updateField('details')} className={`${fieldClass(Boolean(errors.details))} min-h-36 resize-y`} rows={6} aria-invalid={Boolean(errors.details)} aria-describedby={errors.details ? 'quote-details-error' : undefined} placeholder="ما الذي تريد بناءه أو تحسينه؟ وما النتيجة التي تتوقعها؟" />
            <ErrorMessage id="quote-details-error" message={errors.details} />
          </div>
        </div>
      )}

      {step === 4 && (
        <div>
          <div className="flex items-start gap-3 border-r-2 border-[#16d5df] bg-[#16d5df]/[.06] p-4 text-sm leading-7 text-white/72">
            <ClipboardList className="mt-1 h-5 w-5 shrink-0 text-[#16d5df]" />
            <p>راجع التفاصيل قبل تجهيز الرسالة. لن تُرسل البيانات إلى خادم؛ ستجهز لك رسالة منظمة لتراجعها ثم ترسلها عبر واتساب أو البريد.</p>
          </div>
          <dl className="mt-5 divide-y divide-white/10 border border-white/12 bg-white/[.025]">
            <div className="grid gap-1 p-4 sm:grid-cols-[8rem_1fr] sm:gap-4"><dt className="text-xs font-bold text-white/38">المجال</dt><dd className="text-sm font-bold text-white/82">{categoryLabel(form.category)}</dd></div>
            <div className="grid gap-1 p-4 sm:grid-cols-[8rem_1fr] sm:gap-4"><dt className="text-xs font-bold text-white/38">الخدمة</dt><dd className="text-sm font-bold text-white/82">{selectedService?.title || 'توجيه لاختيار الخدمة'}</dd></div>
            <div className="grid gap-1 p-4 sm:grid-cols-[8rem_1fr] sm:gap-4"><dt className="text-xs font-bold text-white/38">البداية</dt><dd className="text-sm text-white/72">{form.timeline || 'لم تُحدد'} · {form.budget || 'نطاق غير محدد'}</dd></div>
            <div className="grid gap-1 p-4 sm:grid-cols-[8rem_1fr] sm:gap-4"><dt className="text-xs font-bold text-white/38">التواصل</dt><dd className="font-latin text-sm text-white/72">{form.name || '—'} · {form.email || '—'}</dd></div>
            <div className="grid gap-1 p-4 sm:grid-cols-[8rem_1fr] sm:gap-4"><dt className="text-xs font-bold text-white/38">الاحتياج</dt><dd className="whitespace-pre-wrap text-sm leading-7 text-white/72">{form.details || '—'}</dd></div>
          </dl>
        </div>
      )}

      <div className="mt-7 flex flex-col-reverse gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
        {step > 1 ? (
          <button type="button" onClick={goBack} className="inline-flex min-h-12 items-center justify-center gap-2 border border-white/18 px-5 text-sm font-bold text-white/72 transition-colors hover:border-white/35 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16d5df]">
            <ArrowRight className="h-4 w-4" /> العودة
          </button>
        ) : <span className="hidden sm:block" />}

        {step < 4 ? (
          <button type="button" onClick={goNext} className="lime-button min-h-12 w-full text-sm sm:w-auto">
            متابعة
            <ArrowLeft className="h-4 w-4" />
          </button>
        ) : (
          <button type="button" onClick={handleSubmit} className="lime-button min-h-12 w-full text-sm sm:w-auto">
            جهّز رسالة الطلب
            <Send className="h-4 w-4" />
          </button>
        )}
      </div>

      {mailtoHref && (
        <div className="mt-5 flex items-start gap-3 border border-[#16d5df]/45 bg-[#16d5df]/10 p-4 text-sm leading-7 text-white/80" role="status" aria-live="polite">
          <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#16d5df]" />
          <p>
            تم تجهيز الطلب بنجاح. <a href={mailtoHref} className="font-bold text-[#16d5df] underline decoration-[#16d5df]/50 underline-offset-4"><Mail className="mb-0.5 mr-1 inline h-4 w-4" />افتح برنامج البريد لإرساله</a>.
            {whatsappHref && <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="mr-3 inline-flex items-center gap-1 font-bold text-[#c8ff2b] underline decoration-[#c8ff2b]/50 underline-offset-4"><MessageCircle className="h-4 w-4" />أرسل عبر واتساب</a>}
          </p>
        </div>
      )}
    </div>
  );
}
