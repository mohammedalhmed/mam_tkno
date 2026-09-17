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
    <section id="contact" className="contact-system surface-ink section-pad relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 tech-grid opacity-20" aria-hidden="true" />
      <div className="container relative">
        <div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
          <div className="contact-system__intro">
            <span className="font-latin text-[10px] font-extrabold tracking-[.14em] text-[#16d5df]">05 / START A CONVERSATION</span>
            <h2 className="mt-6 max-w-3xl font-display text-[clamp(3rem,8vw,6.7rem)] font-[750] leading-[1.04] tracking-[-.05em] text-white">فكرة واضحة،<br /><span className="text-[#16d5df]">خطوة تالية بسيطة.</span></h2>
            <p className="mt-7 max-w-xl text-base leading-8 text-white/62 sm:text-lg">
              أرسل رابطًا، وصفًا مختصرًا، أو حتى سؤالًا أوليًا. سنرتب الفكرة في مسار يمكن البدء منه، دون وعود أو نطاقات مبهمة.
            </p>

            <div className="contact-system__actions mt-9 grid gap-3 sm:grid-cols-2">
              <a href={contactDetails.whatsapp} target="_blank" rel="noopener noreferrer" className="lime-button">
                <MessageCircle className="h-5 w-5" />
                ابدأ عبر واتساب
                <ArrowUpLeft className="h-5 w-5" />
              </a>
              <a href={`mailto:${contactDetails.email}`} className="inline-flex min-h-13 items-center justify-center gap-2 border border-white/20 px-5 font-bold transition-colors hover:border-[#16d5df] hover:bg-white/8">
                <Mail className="h-5 w-5" />
                أرسل بريداً
              </a>
            </div>

            <div className="contact-system__channels mt-12 border-y border-white/14">
              <div className="grid gap-px bg-white/14 sm:grid-cols-3">
                <a href={`mailto:${contactDetails.email}`} className="group bg-[#07101c] p-4 text-sm text-white/58 transition-colors hover:bg-white/[.05] hover:text-white">
                  <Mail className="mb-5 h-5 w-5 text-[#16d5df]" />
                  <span className="block text-[10px] font-bold tracking-[.12em] text-white/35">EMAIL</span>
                  <span className="font-latin mt-2 block break-all text-[0.7rem] leading-5 sm:text-xs">{contactDetails.email}</span>
                </a>
                <a href={`tel:${contactDetails.phone}`} className="group bg-[#07101c] p-4 text-sm text-white/58 transition-colors hover:bg-white/[.05] hover:text-white">
                  <Phone className="mb-5 h-5 w-5 text-[#16d5df]" />
                  <span className="block text-[10px] font-bold tracking-[.12em] text-white/35">PHONE</span>
                  <span className="font-latin mt-2 block text-[0.7rem] leading-5 sm:text-xs">{contactDetails.phoneDisplay}</span>
                </a>
                <a href={contactDetails.map} target="_blank" rel="noopener noreferrer" className="group bg-[#07101c] p-4 text-sm text-white/58 transition-colors hover:bg-white/[.05] hover:text-white">
                  <MapPin className="mb-5 h-5 w-5 text-[#16d5df]" />
                  <span className="block text-[10px] font-bold tracking-[.12em] text-white/35">BASE</span>
                  <span className="mt-2 block text-[0.86rem] leading-6">{contactDetails.location}</span>
                </a>
              </div>
            </div>
          </div>

          <div className="contact-system__form lg:border-r lg:border-white/15 lg:pr-10">
            <QuoteRequest />

            <div className="contact-system__social-heading mb-5 mt-12 flex items-end justify-between gap-4 border-b border-white/14 pb-5">
              <div>
                <p className="font-latin text-[10px] font-extrabold tracking-[.14em] text-[#16d5df]">PUBLIC CHANNELS</p>
                <h3 className="mt-2 font-display text-2xl font-bold">تابع العمل والمحتوى</h3>
              </div>
              <span className="font-latin text-xs font-bold text-white/28">04 LINKS</span>
            </div>

            <div className="contact-system__social-grid grid gap-px border border-white/14 bg-white/14 sm:grid-cols-2">
              {socialLinks.map((social) => {
                const Icon = iconMap[social.platform];
                return (
                  <a
                    key={`${social.platform}-${social.handle}`}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group min-h-32 bg-[#07101c] p-5 transition-colors duration-200 hover:bg-white/[.07]"
                    aria-label={`فتح ${social.label} باسم ${social.handle}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex h-10 w-10 items-center justify-center border border-[#16d5df]/35 bg-[#16d5df]/10 text-[#16d5df]">
                        <Icon className="h-5 w-5" />
                      </span>
                      <ArrowUpLeft className="h-5 w-5 text-white/35 transition-colors group-hover:text-[#16d5df]" />
                    </div>
                    <p className="font-latin mt-5 text-[0.95rem] font-extrabold leading-6 sm:text-base">@{social.handle}</p>
                    <p className="mt-1 text-[0.82rem] leading-6 text-white/48 sm:text-sm">{social.description}</p>
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
