/** Product Systems Atelier — تواصل واضح مع نموذج عملي وقنوات موثقة. */
import { useState, type ChangeEvent, type FormEvent } from 'react';
import { AlertCircle, ArrowUpLeft, CheckCircle2, Facebook, Github, Instagram, Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react';
import { contactDetails, socialLinks } from '@/lib/portfolio-data';

const iconMap = {
  github: Github,
  facebook: Facebook,
  instagram: Instagram,
  telegram: Send,
};

type ContactForm = {
  name: string;
  email: string;
  storeUrl: string;
  message: string;
};

type ContactField = keyof ContactForm;
type ContactErrors = Partial<Record<ContactField, string>>;

const initialForm: ContactForm = {
  name: '',
  email: '',
  storeUrl: '',
  message: '',
};

function validateForm(form: ContactForm): ContactErrors {
  const errors: ContactErrors = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const urlPattern = /^https?:\/\//i;

  if (!form.name.trim()) errors.name = 'اكتب اسمك أو اسم المتجر.';
  if (!form.email.trim()) errors.email = 'أدخل بريدك الإلكتروني.';
  else if (!emailPattern.test(form.email.trim())) errors.email = 'تحقق من صيغة البريد الإلكتروني.';
  if (form.storeUrl.trim() && !urlPattern.test(form.storeUrl.trim())) {
    errors.storeUrl = 'استخدم رابطًا يبدأ بـ https:// أو http://.';
  }
  if (!form.message.trim()) errors.message = 'اكتب نبذة قصيرة عن المطلوب.';
  else if (form.message.trim().length < 20) errors.message = 'اكتب 20 حرفًا على الأقل لتوضيح الطلب.';

  return errors;
}

export default function Contact() {
  const [form, setForm] = useState<ContactForm>(initialForm);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<'idle' | 'success'>('idle');
  const [mailtoHref, setMailtoHref] = useState('');

  const handleChange = (field: ContactField) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setStatus('idle');
    setMailtoHref('');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateForm(form);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus('idle');
      return;
    }

    const subject = `طلب مراجعة واجهة متجر من ${form.name.trim()}`;
    const body = [
      `الاسم أو المتجر: ${form.name.trim()}`,
      `البريد الإلكتروني: ${form.email.trim()}`,
      `رابط المتجر: ${form.storeUrl.trim() || 'لم يُذكر'}`,
      '',
      'تفاصيل الطلب:',
      form.message.trim(),
    ].join('\n');

    setMailtoHref(`mailto:${contactDetails.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
    setErrors({});
    setStatus('success');
  };

  const fieldClasses = (field: ContactField) =>
    `mt-2 w-full rounded-xl border bg-white/[.04] px-4 py-3 text-[0.95rem] text-white outline-none transition-colors placeholder:text-white/28 focus:border-[#16d5df] focus:bg-white/[.07] ${
      errors[field] ? 'border-red-300/80' : 'border-white/15'
    }`;

  return (
    <section id="contact" className="relative overflow-hidden bg-[#0b0f14] py-24 text-[#f7f3e8] md:py-32">
      <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-l from-[#16d5df] via-[#2145a8] to-[#16d5df]" />
      <div className="pointer-events-none absolute -left-32 top-24 h-96 w-96 rounded-full bg-[#16d5df]/10 blur-3xl" />
      <div className="container relative">
        <div className="grid gap-14 lg:grid-cols-[1.05fr_.95fr] lg:gap-20">
          <div>
            <span className="eyebrow text-[#16d5df]">التواصل</span>
            <span className="atelier-note mt-6 text-[#16d5df]">CHANNELS / VERIFIED</span>
            <h2 className="mt-7 max-w-4xl text-[clamp(2.65rem,10vw,6.4rem)] font-extrabold leading-[1.1] sm:text-[clamp(3rem,7vw,6.4rem)] sm:leading-[1.05]">عندك متجر يحتاج واجهة أقوى؟</h2>
            <p className="mt-7 max-w-2xl text-[1.05rem] leading-[1.95] text-white/62 sm:text-lg sm:leading-8 md:text-xl md:leading-9">
              أرسل رابط المتجر وما الذي تريد تحسينه. سأبدأ بمراجعة مختصرة تحدد الأولويات قبل الحديث عن التفاصيل.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a href={contactDetails.whatsapp} target="_blank" rel="noopener noreferrer" className="lime-button">
                <MessageCircle className="h-5 w-5" />
                تحدث عبر واتساب
                <ArrowUpLeft className="h-5 w-5" />
              </a>
              <a href={`mailto:${contactDetails.email}`} className="inline-flex min-h-13 items-center justify-center gap-2 rounded-xl border border-white/20 px-5 font-bold transition-colors hover:bg-white/8">
                <Mail className="h-5 w-5" />
                أرسل بريداً
              </a>
            </div>

            <div className="mt-12 grid gap-3 sm:grid-cols-3">
              <a href={`mailto:${contactDetails.email}`} className="border-t border-white/18 pt-4 text-sm text-white/58 hover:text-white">
                <Mail className="mb-3 h-5 w-5 text-[#16d5df]" />
                <span className="block text-xs text-white/35">البريد</span>
                <span className="font-latin mt-1 block break-all text-[0.72rem] leading-5 sm:text-xs">{contactDetails.email}</span>
              </a>
              <a href={`tel:${contactDetails.phone}`} className="border-t border-white/18 pt-4 text-sm text-white/58 hover:text-white">
                <Phone className="mb-3 h-5 w-5 text-[#16d5df]" />
                <span className="block text-xs text-white/35">الهاتف</span>
                <span className="font-latin mt-1 block text-[0.72rem] leading-5 sm:text-xs">{contactDetails.phoneDisplay}</span>
              </a>
              <a href={contactDetails.map} target="_blank" rel="noopener noreferrer" className="border-t border-white/18 pt-4 text-sm text-white/58 hover:text-white">
                <MapPin className="mb-3 h-5 w-5 text-[#16d5df]" />
                <span className="block text-xs text-white/35">الموقع</span>
                <span className="mt-1 block text-[0.92rem] leading-6 sm:text-base">{contactDetails.location}</span>
              </a>
            </div>
          </div>

          <div className="lg:border-r lg:border-white/15 lg:pr-10">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="atelier-stamp mb-3 text-[#16d5df]">MAHMOUD / STORE · UI · SYSTEMS</p>
                <p className="text-xs font-bold text-[#16d5df]">نموذج بداية سريعة</p>
                <h3 className="mt-2 text-2xl font-extrabold">خلّنا نحدد نقطة البداية</h3>
              </div>
              <span className="font-latin text-xs font-bold text-white/28">01 FORM</span>
            </div>

            <form onSubmit={handleSubmit} noValidate className="rounded-[1.25rem_.3rem_1.25rem_.3rem] border border-white/15 bg-white/[.035] p-5 sm:p-6">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="text-sm font-bold text-white/78">الاسم أو اسم المتجر</label>
                  <input id="contact-name" name="name" value={form.name} onChange={handleChange('name')} className={fieldClasses('name')} autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'contact-name-error' : undefined} />
                  {errors.name && <p id="contact-name-error" className="mt-2 flex items-center gap-1.5 text-xs leading-5 text-red-200"><AlertCircle className="h-3.5 w-3.5 shrink-0" />{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="contact-email" className="text-sm font-bold text-white/78">البريد الإلكتروني</label>
                  <input id="contact-email" name="email" type="email" dir="ltr" value={form.email} onChange={handleChange('email')} className={fieldClasses('email')} autoComplete="email" inputMode="email" placeholder="name@example.com" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'contact-email-error' : undefined} />
                  {errors.email && <p id="contact-email-error" className="mt-2 flex items-center gap-1.5 text-xs leading-5 text-red-200"><AlertCircle className="h-3.5 w-3.5 shrink-0" />{errors.email}</p>}
                </div>
              </div>

              <div className="mt-5">
                <label htmlFor="contact-store-url" className="text-sm font-bold text-white/78">رابط المتجر <span className="font-normal text-white/38">(اختياري)</span></label>
                <input id="contact-store-url" name="storeUrl" type="url" dir="ltr" value={form.storeUrl} onChange={handleChange('storeUrl')} className={fieldClasses('storeUrl')} autoComplete="url" placeholder="https://store.example" aria-invalid={Boolean(errors.storeUrl)} aria-describedby={errors.storeUrl ? 'contact-store-url-error' : undefined} />
                {errors.storeUrl && <p id="contact-store-url-error" className="mt-2 flex items-center gap-1.5 text-xs leading-5 text-red-200"><AlertCircle className="h-3.5 w-3.5 shrink-0" />{errors.storeUrl}</p>}
              </div>

              <div className="mt-5">
                <label htmlFor="contact-message" className="text-sm font-bold text-white/78">ما الذي تريد تحسينه؟</label>
                <textarea id="contact-message" name="message" value={form.message} onChange={handleChange('message')} className={`${fieldClasses('message')} min-h-32 resize-y`} rows={5} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'contact-message-error' : undefined} placeholder="مثلاً: أحتاج ترتيب صفحة المنتج وتحسين تجربة الجوال..." />
                {errors.message && <p id="contact-message-error" className="mt-2 flex items-center gap-1.5 text-xs leading-5 text-red-200"><AlertCircle className="h-3.5 w-3.5 shrink-0" />{errors.message}</p>}
              </div>

              <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <button type="submit" className="lime-button min-h-12 w-full text-sm sm:w-auto">
                  جهّز رسالة التواصل
                  <Send className="h-4 w-4" />
                </button>
                <p className="text-xs leading-5 text-white/38">لن تُرسل البيانات إلى خادم. سيتم تجهيز رسالة بريد لك قبل الإرسال.</p>
              </div>

              {status === 'success' && mailtoHref && (
                <div className="mt-5 flex items-start gap-3 rounded-xl border border-[#16d5df]/45 bg-[#16d5df]/10 p-4 text-sm leading-7 text-white/80" role="status" aria-live="polite">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#16d5df]" />
                  <p>
                    تم تجهيز الرسالة بنجاح. <a href={mailtoHref} className="font-bold text-[#16d5df] underline decoration-[#16d5df]/50 underline-offset-4">افتح برنامج البريد لإرسالها</a>.
                  </p>
                </div>
              )}
            </form>

            <div className="mb-6 mt-12 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold text-[#16d5df]">الحسابات الشخصية</p>
                <h3 className="mt-2 text-2xl font-extrabold">تابع العمل والمحتوى</h3>
              </div>
              <span className="font-latin text-xs font-bold text-white/28">04 LINKS</span>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {socialLinks.map((social) => {
                const Icon = iconMap[social.platform];
                return (
                  <a
                    key={`${social.platform}-${social.handle}`}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group min-h-44 rounded-[1rem_.25rem_1rem_.25rem] border border-white/15 bg-white/[.035] p-5 transition-all duration-200 hover:-translate-y-1 hover:border-[#16d5df]/70 hover:bg-white/[.07]"
                    aria-label={`فتح ${social.label} باسم ${social.handle}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex h-10 w-10 items-center justify-center rounded-[.65rem_.15rem_.65rem_.15rem] bg-[#16d5df] text-[#07164f]">
                        <Icon className="h-5 w-5" />
                      </span>
                      <ArrowUpLeft className="h-5 w-5 text-white/35 transition-colors group-hover:text-[#16d5df]" />
                    </div>
                    <p className="font-latin mt-6 text-[0.95rem] font-extrabold leading-6 sm:text-base">@{social.handle}</p>
                    <p className="mt-2 text-[0.82rem] leading-6 text-white/48 sm:text-sm">{social.description}</p>
                  </a>
                );
              })}
            </div>
            <p className="mt-5 text-xs leading-6 text-white/35">
              تم التحقق من الروابط العامة الظاهرة في الملف الشخصي وقت تحديث الموقع.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
