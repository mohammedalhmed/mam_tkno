/** Product Systems Atelier — تواصل واضح مع نموذج عملي وقنوات موثقة. */
import { ArrowUpLeft, Facebook, Github, Instagram, Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react';
import { contactDetails, socialLinks } from '@/lib/portfolio-data';
import QuoteRequest from '@/components/QuoteRequest';

const iconMap = {
  github: Github,
  facebook: Facebook,
  instagram: Instagram,
  telegram: Send,
};

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-[#0b0f14] py-24 text-[#f7f3e8] md:py-32">
      <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-l from-[#16d5df] via-[#2145a8] to-[#16d5df]" />
      <div className="pointer-events-none absolute -left-32 top-24 h-96 w-96 rounded-full bg-[#16d5df]/10 blur-3xl" />
      <div className="container relative">
        <div className="grid gap-14 lg:grid-cols-[1.05fr_.95fr] lg:gap-20">
          <div>
            <span className="eyebrow text-[#16d5df]">التواصل</span>
            <span className="atelier-note mt-6 text-[#16d5df]">CHANNELS / VERIFIED</span>
            <h2 className="mt-7 max-w-4xl text-[clamp(2.65rem,10vw,6.4rem)] font-extrabold leading-[1.1] sm:text-[clamp(3rem,7vw,6.4rem)] sm:leading-[1.05]">عندك فكرة تحتاج تقنية وتصميمًا أوضح؟</h2>
            <p className="mt-7 max-w-2xl text-[1.05rem] leading-[1.95] text-white/62 sm:text-lg sm:leading-8 md:text-xl md:leading-9">
              أرسل فكرة المشروع أو رابط المنتج وما الذي تريد تحسينه. نبدأ بمراجعة مختصرة تحدد الأولويات قبل الحديث عن التفاصيل.
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
            <QuoteRequest />

            <div className="mb-6 mt-12 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold text-[#16d5df]">حسابات MAM_Tkno</p>
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
              تم التحقق من الحسابات العامة الرسمية لـ MAM_Tkno وقت تحديث الموقع.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
