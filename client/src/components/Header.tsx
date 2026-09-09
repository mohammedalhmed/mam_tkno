import { ArrowUpLeft, Menu, MoveUpLeft, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import BrandMark from '@/components/BrandMark';

const navItems = [
  { label: 'البداية', href: '#home' },
  { label: 'المشاريع', href: '#projects' },
  { label: 'الخبرات', href: '#skills' },
  { label: 'آلية العمل', href: '#services' },
  { label: 'الأسئلة', href: '#faq' },
  { label: 'التواصل', href: '#contact' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(scrollableHeight > 0 ? Math.min((window.scrollY / scrollableHeight) * 100, 100) : 0);

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

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [isOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-200 ${
        scrolled ? 'bg-[#f7f3e8]/95 shadow-[0_14px_42px_rgba(7,22,79,.1)] backdrop-blur-xl' : 'bg-[#f7f3e8]/72 backdrop-blur-md'
      }`}
    >
      <div className={`container flex items-center justify-between gap-4 transition-[height] duration-200 ${scrolled ? 'h-[4.5rem]' : 'h-20'}`}>
        <a href="#home" className="group flex min-w-0 items-center gap-3" aria-label="العودة إلى بداية الصفحة">
          <BrandMark size="sm" eager />
          <div className="min-w-0 leading-none">
            <strong className="block font-display text-[1.03rem] font-extrabold leading-6 tracking-[-.025em] text-[#07164f] sm:text-xl">
              محمد الحضرمي <span className="text-[#ff7a0a]">/</span>
            </strong>
            <span className="font-latin mt-1.5 block whitespace-nowrap text-[0.58rem] font-extrabold leading-4 tracking-[.1em] text-[#2145a8]/65 sm:text-[9px] sm:tracking-[.16em]">MAHMOUD / STORE · UI · SYSTEMS</span>
          </div>
        </a>

        <nav className="hidden items-center gap-2 rounded-full border border-[#07164f]/10 bg-white/45 p-1.5 shadow-sm lg:flex" aria-label="التنقل الرئيسي">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.slice(1);
            return (
              <a
                key={item.href}
                href={item.href}
                  className={`relative rounded-full px-4 py-2 text-[0.92rem] font-bold transition-colors ${
                  isActive ? 'bg-[#07164f] text-white' : 'text-[#07164f]/58 hover:bg-white/75 hover:text-[#07164f]'
                }`}
              >
                {item.label}
                {isActive && <span className="absolute -bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#16d5df]" />}
              </a>
            );
          })}
        </nav>

        <a href="#contact" className="brand-button hidden !min-h-11 text-sm sm:inline-flex">
          ناقش مشروعك
          <ArrowUpLeft className="h-4 w-4" aria-hidden="true" />
        </a>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#07164f]/15 bg-white/70 text-[#07164f] shadow-sm transition-colors hover:bg-white lg:hidden"
          aria-label={isOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsOpen((value) => !value)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-[2px] overflow-hidden bg-[#07164f]/8" aria-hidden="true">
        <span
          className="block h-full bg-gradient-to-l from-[#16d5df] via-[#2145a8] to-[#ff7a0a] transition-transform duration-150"
          style={{ transform: `scaleX(${scrollProgress / 100})`, transformOrigin: 'right center' }}
        />
      </div>

      {isOpen && (
        <div id="mobile-navigation" className="fixed inset-x-0 bottom-0 top-20 z-40 lg:hidden">
          <button type="button" className="absolute inset-0 bg-[#07164f]/38 backdrop-blur-sm" onClick={() => setIsOpen(false)} aria-label="إغلاق القائمة" />
          <nav className="relative mx-3 overflow-hidden rounded-b-[1.75rem] border border-[#07164f]/12 bg-[#f7f3e8] shadow-[0_28px_80px_rgba(7,22,79,.25)]" aria-label="قائمة الجوال">
            <div className="border-b border-[#07164f]/10 bg-gradient-to-l from-[#16d5df]/12 via-transparent to-[#2145a8]/8 px-5 py-5">
              <p className="font-display text-lg font-extrabold text-[#07164f]">انتقل إلى القسم</p>
              <p className="mt-1 text-xs font-semibold text-[#07164f]/50">واجهة مختصرة، وكل قسم له هدف واضح.</p>
            </div>
            <div className="p-3">
              {navItems.map((item, index) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`group flex items-center justify-between rounded-xl px-3 py-3.5 font-bold transition-colors ${
                    activeSection === item.href.slice(1) ? 'bg-[#07164f] text-white' : 'text-[#07164f] hover:bg-white'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <span className="flex items-center gap-3">
                    <span className={`font-latin text-[10px] ${activeSection === item.href.slice(1) ? 'text-[#16d5df]' : 'text-[#2145a8]/45'}`}>0{index + 1}</span>
                    {item.label}
                  </span>
                  <MoveUpLeft className="h-4 w-4 opacity-45 transition-transform duration-200 group-hover:-translate-x-1" />
                </a>
              ))}
              <a href="#contact" className="brand-button mt-3 w-full" onClick={() => setIsOpen(false)}>
                ابدأ محادثة
                <ArrowUpLeft className="h-4 w-4" />
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
