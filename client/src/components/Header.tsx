import { useEffect, useRef, useState } from 'react';
import { ArrowUpLeft, ChevronDown, Menu, X } from 'lucide-react';
import BrandMark from '@/components/BrandMark';

const navItems = [
  { label: 'البداية', href: '/#home', id: 'home' },
  { label: 'الخدمات', href: '/#services', id: 'services' },
  { label: 'الأعمال', href: '/#projects', id: 'projects' },
  { label: 'المنهجية', href: '/#skills', id: 'skills' },
  { label: 'الأسئلة', href: '/#faq', id: 'faq' },
];

const serviceGroups = [
  {
    code: '01 / TECHNOLOGY',
    title: 'البرمجة والحلول التقنية',
    description: 'مواقع، متاجر، تطبيقات وأنظمة تُبنى حول هدف تجاري واضح.',
    href: '/services/technology',
  },
  {
    code: '02 / DESIGN',
    title: 'الجرافيكس والتصميم',
    description: 'هويات وواجهات ومحتوى بصري يصنع حضورًا متسقًا للعلامة.',
    href: '/services/design',
  },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const servicesRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(scrollableHeight > 0 ? Math.min((window.scrollY / scrollableHeight) * 100, 100) : 0);

      const current = navItems.find((item) => {
        const element = document.getElementById(item.id);
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= 160 && rect.bottom >= 160;
      });
      if (current) setActiveSection(current.id);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setIsServicesOpen(false);
      if (isOpen) {
        setIsOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (isServicesOpen && servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false);
      }
    };

    document.body.style.overflow = isOpen ? 'hidden' : '';
    window.addEventListener('keydown', closeOnEscape);
    window.addEventListener('pointerdown', closeOnOutsideClick);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', closeOnEscape);
      window.removeEventListener('pointerdown', closeOnOutsideClick);
    };
  }, [isOpen, isServicesOpen]);

  const closeMobileMenu = () => {
    setIsOpen(false);
    setIsServicesOpen(false);
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
        <div className={`mx-auto max-w-7xl border transition-all duration-200 ${scrolled ? 'border-[#07101c]/14 bg-[#f4f0e6]/96 shadow-[0_14px_42px_rgba(7,16,28,.1)] backdrop-blur-xl' : 'border-[#07101c]/10 bg-[#f4f0e6]/88 backdrop-blur-md'}`}>
          <div className="relative flex min-h-[4.4rem] items-center gap-3 px-3 sm:px-5">
            <a href="/#home" className="group flex min-w-0 flex-1 items-center gap-3 lg:flex-none" aria-label="العودة إلى بداية موقع MAM_Tkno">
              <BrandMark size="sm" eager />
              <span className="min-w-0">
                <strong className="block truncate font-display text-base font-bold tracking-[-.035em] text-[#07101c] sm:text-lg">MAM_Tkno التقنية</strong>
                <span className="font-latin mt-1 block text-[8px] font-extrabold tracking-[.13em] text-[#2145a8]/60">PRODUCTS · DESIGN · SYSTEMS</span>
              </span>
            </a>

            <nav className="hidden flex-1 items-center justify-center gap-1 lg:flex" aria-label="التنقل الرئيسي">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                if (item.id === 'services') {
                  return (
                    <div ref={servicesRef} key={item.id} className="relative">
                      <button
                        type="button"
                        className={`flex min-h-11 items-center gap-1.5 px-3 text-sm font-bold transition-colors ${isActive ? 'text-[#07101c]' : 'text-[#07101c]/58 hover:text-[#07101c]'}`}
                        aria-expanded={isServicesOpen}
                        aria-haspopup="true"
                        onClick={() => setIsServicesOpen((value) => !value)}
                      >
                        {item.label}
                        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                        {isActive && <span className="absolute inset-x-3 bottom-0 h-0.5 bg-[#16d5df]" />}
                      </button>

                      {isServicesOpen && (
                        <div className="absolute right-1/2 top-[calc(100%+1rem)] w-[min(42rem,calc(100vw-2rem))] translate-x-1/2 border border-[#07101c]/14 bg-[#fbf8f0] p-3 shadow-[0_24px_70px_rgba(7,16,28,.16)]" role="menu">
                          <div className="grid gap-2 sm:grid-cols-2">
                            {serviceGroups.map((group) => (
                              <a key={group.code} href={group.href} className="focus-card border border-[#07101c]/10 bg-white/55 p-5" role="menuitem" onClick={() => setIsServicesOpen(false)}>
                                <span className="section-number">{group.code}</span>
                                <strong className="mt-3 block font-display text-lg font-bold text-[#07101c]">{group.title}</strong>
                                <span className="mt-2 block text-sm leading-7 text-[#07101c]/62">{group.description}</span>
                                <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-[#2145a8]">استكشف الخدمات <ArrowUpLeft className="h-4 w-4" /></span>
                              </a>
                            ))}
                          </div>
                          <a href="/#contact" className="mt-3 flex min-h-12 items-center justify-between bg-[#07101c] px-4 text-sm font-bold text-white" onClick={() => setIsServicesOpen(false)}>
                            ابدأ طلب مشروعك
                            <ArrowUpLeft className="h-4 w-4 text-[#16d5df]" aria-hidden="true" />
                          </a>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <a key={item.id} href={item.href} className={`relative flex min-h-11 items-center px-3 text-sm font-bold transition-colors ${isActive ? 'text-[#07101c]' : 'text-[#07101c]/58 hover:text-[#07101c]'}`}>
                    {item.label}
                    {isActive && <span className="absolute inset-x-3 bottom-0 h-0.5 bg-[#16d5df]" />}
                  </a>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              <a href="/#contact" className="hidden min-h-11 items-center gap-2 rounded-[.8rem] bg-[#16d5df] px-4 text-sm font-bold text-[#07101c] shadow-[3px_3px_0_#07101c] transition-transform duration-200 hover:-translate-y-0.5 sm:inline-flex">
                اطلب عرضًا
                <ArrowUpLeft className="h-4 w-4" aria-hidden="true" />
              </a>
              <button
                ref={menuButtonRef}
                type="button"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[.8rem] border border-[#07101c]/14 bg-white/60 text-[#07101c] lg:hidden"
                aria-label={isOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
                aria-expanded={isOpen}
                aria-controls="mobile-navigation"
                onClick={() => setIsOpen((value) => !value)}
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>

            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-[#07101c]/6" aria-hidden="true">
              <span className="block h-full bg-[#16d5df] transition-transform duration-150" style={{ transform: `scaleX(${scrollProgress / 100})`, transformOrigin: 'right center' }} />
            </span>
          </div>
        </div>
      </header>

      {isOpen && (
        <div id="mobile-navigation" className="fixed inset-0 z-40 pt-[5.8rem] lg:hidden">
          <button type="button" className="absolute inset-0 bg-[#07101c]/48 backdrop-blur-sm" onClick={closeMobileMenu} aria-label="إغلاق القائمة" />
          <nav className="relative mr-auto flex h-full w-[min(92vw,30rem)] flex-col overflow-y-auto border-r border-[#07101c]/12 bg-[#f4f0e6] p-5 shadow-[-24px_0_70px_rgba(7,16,28,.2)]" aria-label="قائمة الجوال">
            <div className="border-b border-[#07101c]/12 pb-5">
              <span className="section-number">MAM_TKNO / NAVIGATION</span>
              <p className="mt-2 font-display text-2xl font-bold text-[#07101c]">أين تريد أن نبدأ؟</p>
            </div>
            <div className="mt-4 space-y-1">
              {navItems.map((item, index) => (
                <a key={item.id} href={item.href} className={`flex min-h-14 items-center justify-between border-b border-[#07101c]/8 px-2 text-base font-bold ${activeSection === item.id ? 'text-[#07101c]' : 'text-[#07101c]/62'}`} onClick={closeMobileMenu}>
                  <span>{item.label}</span>
                  <span className="font-latin text-[10px] font-extrabold text-[#2145a8]/55">0{index + 1}</span>
                </a>
              ))}
            </div>
            <div className="mt-6 grid gap-2">
              {serviceGroups.map((group) => (
                <a key={group.code} href={group.href} className="border border-[#07101c]/12 bg-white/50 p-4" onClick={closeMobileMenu}>
                  <span className="section-number">{group.code}</span>
                  <strong className="mt-2 block font-display text-base text-[#07101c]">{group.title}</strong>
                </a>
              ))}
            </div>
            <a href="/#contact" className="mt-auto flex min-h-14 items-center justify-between bg-[#07101c] px-4 font-bold text-white" onClick={closeMobileMenu}>
              ابدأ طلبك
              <ArrowUpLeft className="h-5 w-5 text-[#16d5df]" />
            </a>
          </nav>
        </div>
      )}

      <a href="/#contact" className="mobile-cta-dock" aria-label="الانتقال إلى نموذج طلب عرض السعر">
        ابدأ طلب مشروعك
        <ArrowUpLeft className="h-5 w-5 text-[#16d5df]" aria-hidden="true" />
      </a>
    </>
  );
}
