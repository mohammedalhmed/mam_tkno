/** Product Systems Atelier — تذييل مختصر بلا روابط وهمية، يكرر القنوات الأساسية فقط. */
import { ArrowUpLeft, Github, Mail, MessageCircle } from 'lucide-react';
import { contactDetails } from '@/lib/portfolio-data';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/12 bg-[#0b0f14] pb-8 pt-12 text-[#f7f3e8]">
      <div className="container">
        <div className="flex flex-col gap-8 border-b border-white/12 pb-10 md:flex-row md:items-end md:justify-between">
          <a href="#home" className="flex items-center gap-4">
            <span className="relative block h-14 w-14 shrink-0">
              <span className="absolute -inset-1 bg-[#cbff59] [clip-path:polygon(0_0,88%_0,100%_22%,100%_100%,12%_100%,0_78%)]" />
              <img
                src="/manus-storage/mahmoud-logo-mark_6f3d8856.png"
                alt="رمز هندسي يجمع واجهة المتصفح والحركة إلى الأمام"
                className="relative h-14 w-14 bg-[#f7f3e8] object-contain p-1.5"
              />
              <span className="absolute -bottom-1 -right-1 h-3 w-3 border-2 border-[#0b0f14] bg-[#ff6b35]" />
            </span>
            <div>
              <p className="font-['Alexandria'] text-lg font-extrabold">محمد الحضرمي <span className="text-[#ff6b35]">/</span></p>
              <p className="font-latin mt-1 text-[10px] font-extrabold tracking-[.12em] text-white/40">STORE · UI · SYSTEMS</p>
            </div>
          </a>

          <div className="flex flex-wrap gap-3">
            <a href="https://github.com/mohammedalhmed" target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center border border-white/18 hover:border-[#cbff59] hover:text-[#cbff59]" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </a>
            <a href={`mailto:${contactDetails.email}`} className="flex h-11 w-11 items-center justify-center border border-white/18 hover:border-[#cbff59] hover:text-[#cbff59]" aria-label="البريد الإلكتروني">
              <Mail className="h-5 w-5" />
            </a>
            <a href={contactDetails.whatsapp} target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center border border-white/18 hover:border-[#cbff59] hover:text-[#cbff59]" aria-label="واتساب">
              <MessageCircle className="h-5 w-5" />
            </a>
            <a href="#home" className="flex min-h-11 items-center gap-2 border border-white/18 px-4 text-sm font-bold hover:border-[#cbff59] hover:text-[#cbff59]">
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
