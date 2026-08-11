/** Product Systems Atelier — هيدر زجاجي حاد، علامة Lime، وتنقل RTL واضح. */
import { ArrowUpLeft, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const navItems = [
  { label: 'البداية', href: '#home' },
  { label: 'المشاريع', href: '#projects' },
  { label: 'الخبرات', href: '#skills' },
  { label: 'آلية العمل', href: '#services' },
  { label: 'التواصل', href: '#contact' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
      const sections = navItems.map((item) => item.href.slice(1));
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= 130 && rect.bottom >= 130;
      });
      if (current) setActiveSection(current);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-200 ${
        scrolled ? 'bg-[#f7f3e8]/92 shadow-[0_12px_40px_rgba(11,15,20,.08)] backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <div className="container flex h-20 items-center justify-between gap-5">
        <a href="#home" className="group flex items-center gap-3" aria-label="العودة إلى بداية الصفحة">
          <span className="relative block h-13 w-13 shrink-0">
            <span className="absolute -inset-1 bg-[#cbff59] [clip-path:polygon(0_0,88%_0,100%_22%,100%_100%,12%_100%,0_78%)]" />
            <img
              src="/manus-storage/mahmoud-logo-mark_6f3d8856.png"
              alt="رمز هندسي يجمع واجهة المتصفح والحركة إلى الأمام"
              className="relative h-13 w-13 bg-[#0b0f14] object-contain p-1.5 transition-transform duration-200 group-hover:-rotate-3"
            />
            <span className="absolute -bottom-1 -right-1 h-3 w-3 border-2 border-[#f7f3e8] bg-[#ff6b35]" />
          </span>
          <div className="leading-none">
            <strong className="block font-['Alexandria'] text-sm font-extrabold">محمد الحضرمي <span className="text-[#ff6b35]">/</span></strong>
            <span className="font-latin mt-1.5 block text-[9px] font-extrabold tracking-[.12em] text-[#0b0f14]/50">STORE · UI · SYSTEMS</span>
          </div>
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="التنقل الرئيسي">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.slice(1);
            return (
              <a
                key={item.href}
                href={item.href}
                className={`relative py-2 text-sm font-bold transition-colors ${
                  isActive ? 'text-[#0b0f14]' : 'text-[#0b0f14]/55 hover:text-[#0b0f14]'
                }`}
              >
                {item.label}
                <span
                  className={`absolute inset-x-0 -bottom-0.5 h-1 origin-right bg-[#cbff59] transition-transform duration-200 ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        <a href="#contact" className="ink-button hidden !min-h-11 text-sm sm:inline-flex">
          ناقش مشروعك
          <ArrowUpLeft className="h-4 w-4" aria-hidden="true" />
        </a>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#0b0f14]/20 bg-[#f7f3e8] lg:hidden"
          aria-label={isOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((value) => !value)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isOpen && (
        <nav className="border-t border-[#0b0f14]/15 bg-[#f7f3e8] px-4 pb-5 pt-3 shadow-2xl lg:hidden" aria-label="قائمة الجوال">
          <div className="container flex flex-col gap-1 !px-0">
            {navItems.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                className="flex items-center justify-between border-b border-[#0b0f14]/10 px-2 py-3.5 font-bold"
                onClick={() => setIsOpen(false)}
              >
                <span>{item.label}</span>
                <span className="font-latin text-xs text-[#0b0f14]/45">0{index + 1}</span>
              </a>
            ))}
            <a href="#contact" className="lime-button mt-3" onClick={() => setIsOpen(false)}>
              ابدأ محادثة
              <ArrowUpLeft className="h-4 w-4" />
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
