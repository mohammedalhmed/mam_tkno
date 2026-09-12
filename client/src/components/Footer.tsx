import { ArrowUpLeft, ArrowUpRight, Github, Instagram, Mail, MessageCircle, Send } from 'lucide-react';
import { contactDetails, socialLinks } from '@/lib/portfolio-data';
import BrandMark from '@/components/BrandMark';

const footerNav = [
  { label: 'المشاريع', href: '#projects' },
  { label: 'الخبرات', href: '#skills' },
  { label: 'آلية العمل', href: '#services' },
  { label: 'الأسئلة', href: '#faq' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const instagram = socialLinks.find((social) => social.platform === 'instagram');
  const telegram = socialLinks.find((social) => social.platform === 'telegram');

  return (
    <footer className="surface-ink relative overflow-hidden pb-6 pt-16 sm:pt-20">
      <div className="pointer-events-none absolute inset-0 tech-grid opacity-15" aria-hidden="true" />

      <div className="container relative">
        <div className="grid gap-12 border-b border-white/15 pb-14 lg:grid-cols-[1.35fr_.7fr_.9fr] lg:gap-16">
          <div className="max-w-2xl">
            <div className="mb-7 flex items-center gap-3">
              <span className="font-latin text-[10px] font-bold tracking-[.22em] text-[#16d5df]">NEXT / MOVE</span>
              <span className="h-px w-12 bg-[#16d5df]/60" />
            </div>
            <h2 className="max-w-xl font-display text-[2.4rem] font-[750] leading-[1.18] tracking-[-.06em] text-white sm:text-[3.5rem] lg:text-[4.25rem]">
              منتجك القادم
              <span className="block text-[#16d5df]">يبدأ من قرار واضح.</span>
            </h2>
            <p className="mt-6 max-w-md text-[0.98rem] font-semibold leading-8 text-white/58 sm:text-lg">إذا كنت تبحث عن شريك يحوّل فكرتك إلى تجربة رقمية واضحة ونظام يمكن تطويره بثقة، فلنتحدث عن الخطوة الأولى.</p>
            <a href="#contact" className="lime-button mt-8">
              ابدأ مشروعك الآن
              <ArrowUpLeft className="h-5 w-5 transition-transform duration-200 group-hover:-translate-x-1 group-hover:-translate-y-1" />
            </a>
          </div>

          <div>
            <p className="font-latin text-[10px] font-bold tracking-[.2em] text-[#16d5df]">EXPLORE / 02</p>
            <nav className="mt-5 space-y-1" aria-label="روابط الفوتر">
              {footerNav.map((item, index) => (
                <a key={item.href} href={item.href} className="group flex items-center justify-between border-b border-white/10 py-3 text-[0.95rem] font-bold text-white/70 transition-colors hover:border-[#16d5df]/60 hover:text-white">
                  <span className="flex items-center gap-3"><span className="font-latin text-[9px] text-[#16d5df]/65">0{index + 1}</span>{item.label}</span>
                  <ArrowUpRight className="h-4 w-4 -translate-x-1 translate-y-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
                </a>
              ))}
            </nav>
          </div>

          <div>
            <p className="font-latin text-[10px] font-bold tracking-[.2em] text-[#16d5df]">CONNECT / 03</p>
            <div className="mt-5 border border-white/13 bg-white/[.04] p-4">
              <a href={`mailto:${contactDetails.email}`} className="group flex items-start gap-3 p-2 transition-colors hover:bg-white/[.07]">
                <Mail className="mt-1 h-4 w-4 shrink-0 text-[#16d5df]" />
                <span className="min-w-0"><span className="block text-xs font-bold text-white/45">البريد الإلكتروني</span><span className="mt-1 block break-all text-sm font-bold text-white/85">{contactDetails.email}</span></span>
              </a>
              <div className="my-3 h-px bg-white/10" />
              <a href={contactDetails.whatsapp} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 p-2 text-sm font-bold text-white/75 transition-colors hover:bg-white/[.07] hover:text-white">
                <MessageCircle className="h-4 w-4 text-[#16d5df]" /> تواصل سريع عبر واتساب
              </a>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <a href="https://github.com/mohammedalhmed" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center border border-white/15 bg-white/[.04] transition-all duration-200 hover:-translate-y-1 hover:border-[#16d5df] hover:text-[#16d5df]" aria-label="GitHub"><Github className="h-4 w-4" /></a>
              {instagram && <a href={instagram.url} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center border border-white/15 bg-white/[.04] transition-all duration-200 hover:-translate-y-1 hover:border-[#16d5df] hover:text-[#16d5df]" aria-label={`إنستجرام @${instagram.handle}`}><Instagram className="h-4 w-4" /></a>}
              {telegram && <a href={telegram.url} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center border border-white/15 bg-white/[.04] transition-all duration-200 hover:-translate-y-1 hover:border-[#16d5df] hover:text-[#16d5df]" aria-label={`تلجرام @${telegram.handle}`}><Send className="h-4 w-4" /></a>}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-7 pt-8 sm:flex-row sm:items-end sm:justify-between">
          <a href="#home" className="group flex items-center gap-3" aria-label="العودة إلى بداية الصفحة">
            <BrandMark size="sm" onDark />
            <div>
              <p className="font-display text-lg font-extrabold leading-5 text-white">MAM_Tkno <span className="text-[#16d5df]">/</span></p>
              <p className="font-latin mt-1 text-[9px] font-bold tracking-[.14em] text-[#16d5df]/65">STRATEGY · DESIGN · BUILD</p>
            </div>
          </a>
          <div className="flex flex-col gap-1 text-[0.7rem] font-semibold leading-6 text-white/35 sm:items-end">
            <p>© {currentYear} MAM_Tkno. جميع الحقوق محفوظة.</p>
            <p className="font-latin tracking-[.13em]">DESIGNED FOR IMPACT · BUILT TO SCALE</p>
          </div>
          <a href="#home" className="group flex h-11 w-11 items-center justify-center border border-white/15 bg-white/[.04] text-white/70 transition-all duration-200 hover:-translate-y-1 hover:border-[#16d5df] hover:text-[#16d5df] sm:shrink-0" aria-label="العودة إلى الأعلى"><ArrowUpLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" /></a>
        </div>
      </div>
    </footer>
  );
}
