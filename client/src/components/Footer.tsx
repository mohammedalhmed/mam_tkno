import { ArrowUpLeft, Github, Instagram, Mail, MessageCircle, Send } from 'lucide-react';
import { contactDetails, socialLinks } from '@/lib/portfolio-data';
import BrandMark from '@/components/BrandMark';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const instagram = socialLinks.find((social) => social.platform === 'instagram');
  const telegram = socialLinks.find((social) => social.platform === 'telegram');

  return (
    <footer className="relative overflow-hidden border-t border-white/12 bg-[#0b0f14] pb-8 pt-14 text-[#f7f3e8]">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-l from-[#16d5df] via-[#2145a8] to-[#ff7a0a]" />
      <div className="pointer-events-none absolute -bottom-32 -right-24 h-72 w-72 rounded-full bg-[#2145a8]/18 blur-3xl" />
      <div className="container relative">
        <div className="flex flex-col gap-8 border-b border-white/12 pb-10 md:flex-row md:items-end md:justify-between">
          <a href="#home" className="group flex items-center gap-4" aria-label="العودة إلى بداية الصفحة">
            <BrandMark size="lg" onDark />
            <div>
              <p className="font-['Alexandria'] text-2xl font-black tracking-[-.04em]">
                محمد الحضرمي <span className="text-[#ff7a0a]">/</span>
              </p>
              <p className="font-latin mt-1.5 text-[10px] font-extrabold tracking-[.16em] text-[#16d5df]/70">MAHMOUD / STORE · UI · SYSTEMS</p>
              <p className="mt-3 max-w-xs text-sm font-semibold leading-7 text-white/48">استوديو صغير لواجهات متاجر سلة: رؤية واضحة، قرار موثق، وكود قابل للنمو.</p>
            </div>
          </a>

          <div className="flex flex-wrap gap-2.5">
            <a href="https://github.com/mohammedalhmed" target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/18 bg-white/[.03] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#16d5df] hover:text-[#16d5df]" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </a>
            {instagram && (
              <a href={instagram.url} target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/18 bg-white/[.03] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#16d5df] hover:text-[#16d5df]" aria-label={`إنستجرام @${instagram.handle}`}>
                <Instagram className="h-5 w-5" />
              </a>
            )}
            {telegram && (
              <a href={telegram.url} target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/18 bg-white/[.03] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#16d5df] hover:text-[#16d5df]" aria-label={`تلجرام @${telegram.handle}`}>
                <Send className="h-5 w-5" />
              </a>
            )}
            <a href={`mailto:${contactDetails.email}`} className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/18 bg-white/[.03] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#16d5df] hover:text-[#16d5df]" aria-label="البريد الإلكتروني">
              <Mail className="h-5 w-5" />
            </a>
            <a href={contactDetails.whatsapp} target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/18 bg-white/[.03] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#16d5df] hover:text-[#16d5df]" aria-label="واتساب">
              <MessageCircle className="h-5 w-5" />
            </a>
            <a href="#home" className="flex min-h-11 items-center gap-2 rounded-xl border border-white/18 bg-white/[.03] px-4 text-sm font-bold transition-all duration-200 hover:-translate-y-0.5 hover:border-[#16d5df] hover:text-[#16d5df]">
              للأعلى
              <ArrowUpLeft className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-7 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} محمد الحضرمي. محتوى البورتفوليو محفوظ.</p>
          <p className="font-latin">DESIGNED FOR COMMERCE · BUILT FOR SALLA</p>
        </div>
      </div>
    </footer>
  );
}
