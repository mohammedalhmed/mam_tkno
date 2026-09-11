import { useEffect, useState } from 'react';
import { ArrowUpLeft, ChevronDown, Menu, MoveUpLeft, X } from 'lucide-react';
import BrandMark from '@/components/BrandMark';

const navItems = [
  { label: 'البداية', href: '/#home', id: 'home' },
  { label: 'المشاريع', href: '/#projects', id: 'projects' },
  { label: 'المنهجية', href: '/#services', id: 'services' },
  { label: 'الأسئلة', href: '/#faq', id: 'faq' },
  { label: 'التواصل', href: '/#contact', id: 'contact' },
];

const serviceGroups = [
  {
    code: 'DEV / 01',
    title: 'البرمجة والحلول التقنية',
    description: 'منتجات رقمية، متاجر، تطبيقات وأنظمة قابلة للنمو.',
    href: '/#services',
    links: [
      { label: 'تطوير المواقع والمتاجر', href: '/services/technology' },
      { label: 'تطبيقات الجوال', href: '/services/technology' },
      { label: 'الأنظمة الإدارية', href: '/services/technology' },
    ],
  },
  {
    code: 'GRAPH / 02',
    title: 'الجرافيكس والتصميم',
    description: 'هوية بصرية وتجارب واجهة تجعل العلامة قابلة للتذكر.',
    href: '/#services',
    links: [
      { label: 'الهوية البصرية', href: '/services/design' },
      { label: 'واجهات وتجارب المستخدم', href: '/services/design' },
      { label: 'المحتوى البصري والطباعة', href: '/services/design' },
    ],
  },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 28);
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(scrollableHeight > 0 ? Math.min((window.scrollY / scrollableHeight) * 100, 100) : 0);

      const current = [...navItems.map((item) => item.id), 'skills'].find((section) => {
        const element = document.getElementById(section);
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= 150 && rect.bottom >= 150;
      });
      if (current) setActiveSection(current === 'skills' ? 'services' : current);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        setIsServicesOpen(false);
      }
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [isOpen]);

  const closeMobileMenu = () => {
    setIsOpen(false);
    setIsServicesOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-5">
      <div className={`container transition-all duration-300 ${scrolled ? 'max-w-6xl' : 'max-w-7xl'}`}>
        <div className={`relative flex items-center gap-3 overflow-visible rounded-[1.4rem] border px-3 py-2.5 transition-all duration-300 sm:gap-5 sm:px-4 ${scrolled ? 'border-[#07164f]/12 bg-[#f7f3e8]/96 shadow-[0_18px_50px_rgba(7,22,79,.14)] backdrop-blur-xl' : 'border-[#07164f]/10 bg-[#f7f3e8]/78 shadow-[0_8px_24px_rgba(7,22,79,.06)] backdrop-blur-md'}`}>
          <a href="#home" className="group flex min-w-0 flex-1 items-center gap-2.5 sm:flex-none sm:gap-3.5" aria-label="العودة إلى بداية موقع MAM_Tkno">
            <div className="relative shrink-0">
              <BrandMark size="sm" eager />
              <span className="absolute -bottom-1 -left-1 h-2 w-2 rounded-full border-2 border-[#f7f3e8] bg-[#16d5df]" />
            </div>
            <div className="min-w-0 leading-none">
              <div className="flex items-center gap-1.5">
                <span className="font-latin text-[9px] font-bold tracking-[.18em] text-[#2145a8]/55">MAM / 01</span>
                <span className="h-1 w-1 rounded-full bg-[#ff7a0a]" />
              </div>
              <strong className="mt-1 block truncate font-display text-[1.08rem] font-extrabold leading-5 tracking-[-.035em] text-[#07164f] sm:text-[1.22rem]">MAM_Tkno</strong>
              <span className="mt-1 block font-latin text-[8px] font-bold tracking-[.14em] text-[#2145a8]/50">DIGITAL PRODUCTS / STUDIO</span>
            </div>
          </a>

          <nav className="hidden flex-1 items-center justify-center gap-0.5 lg:flex" aria-label="التنقل الرئيسي">
            {navItems.slice(0, 2).map((item, index) => {
              const isActive = activeSection === item.id;
              return (
                <a key={item.href} href={item.href} className={`group relative flex items-center gap-1.5 rounded-xl px-3 py-2 text-[0.84rem] font-bold transition-all duration-200 ${isActive ? 'bg-[#07164f] text-white shadow-[0_6px_16px_rgba(7,22,79,.16)]' : 'text-[#07164f]/55 hover:bg-white/75 hover:text-[#07164f]'}`}>
                  <span className={`font-latin text-[8px] tracking-[.08em] transition-colors ${isActive ? 'text-[#16d5df]' : 'text-[#2145a8]/35 group-hover:text-[#2145a8]/70'}`}>0{index + 1}</span>
                  {item.label}
                  {isActive && <span className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#ff7a0a]" />}
                </a>
              );
            })}

            <div className="relative" onMouseEnter={() => setIsServicesOpen(true)} onMouseLeave={() => setIsServicesOpen(false)}>
              <button type="button" className={`group relative flex items-center gap-1.5 rounded-xl px-3 py-2 text-[0.84rem] font-bold transition-all duration-200 ${activeSection === 'services' ? 'bg-[#07164f] text-white shadow-[0_6px_16px_rgba(7,22,79,.16)]' : 'text-[#07164f]/55 hover:bg-white/75 hover:text-[#07164f]'}`} aria-expanded={isServicesOpen} aria-haspopup="true" onClick={() => setIsServicesOpen((value) => !value)}>
                <span className={`font-latin text-[8px] tracking-[.08em] ${activeSection === 'services' ? 'text-[#16d5df]' : 'text-[#2145a8]/35'}`}>03</span>
                الخدمات
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                {activeSection === 'services' && <span className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#ff7a0a]" />}
              </button>

              {isServicesOpen && (
                <div className="absolute right-1/2 top-[calc(100%+0.75rem)] w-[min(42rem,calc(100vw-2rem))] translate-x-1/2 rounded-2xl border border-[#07164f]/12 bg-[#f7f3e8] p-3 shadow-[0_24px_70px_rgba(7,22,79,.2)]" role="menu" onMouseEnter={() => setIsServicesOpen(true)}>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {serviceGroups.map((group) => (
                      <div key={group.code} className="rounded-xl border border-[#07164f]/10 bg-white/60 p-4">
                        <a href={group.href} className="group block" onClick={() => setIsServicesOpen(false)}>
                          <span className="font-latin text-[9px] font-bold tracking-[.17em] text-[#2145a8]/55">{group.code}</span>
                          <span className="mt-2 block font-display text-lg font-extrabold text-[#07164f] group-hover:text-[#147e87]">{group.title}</span>
                          <span className="mt-2 block text-sm leading-6 text-[#0b0f14]/60">{group.description}</span>
                        </a>
                        <div className="mt-3 space-y-1 border-t border-[#07164f]/10 pt-3">
                          {group.links.map((link) => (
                            <a key={link.label} href={link.href} className="flex items-center justify-between rounded-lg px-2 py-1.5 text-xs font-bold text-[#07164f]/65 transition-colors hover:bg-[#16d5df]/15 hover:text-[#07164f]" onClick={() => setIsServicesOpen(false)}>
                              {link.label}
                              <MoveUpLeft className="h-3.5 w-3.5" aria-hidden="true" />
                            </a>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <a href="/#contact" className="mt-3 flex items-center justify-between rounded-xl bg-[#07164f] px-4 py-3 text-sm font-extrabold text-white transition-colors hover:bg-[#2145a8]" onClick={() => setIsServicesOpen(false)}>
                    اطلب عرض سعر مخصص
                    <ArrowUpLeft className="h-4 w-4 text-[#16d5df]" aria-hidden="true" />
                  </a>
                </div>
              )}
            </div>

            {navItems.slice(3).map((item, index) => {
              const isActive = activeSection === item.id;
              return (
                <a key={item.href} href={item.href} className={`group relative flex items-center gap-1.5 rounded-xl px-3 py-2 text-[0.84rem] font-bold transition-all duration-200 ${isActive ? 'bg-[#07164f] text-white shadow-[0_6px_16px_rgba(7,22,79,.16)]' : 'text-[#07164f]/55 hover:bg-white/75 hover:text-[#07164f]'}`}>
                  <span className={`font-latin text-[8px] tracking-[.08em] transition-colors ${isActive ? 'text-[#16d5df]' : 'text-[#2145a8]/35 group-hover:text-[#2145a8]/70'}`}>0{index + 4}</span>
                  {item.label}
                  {isActive && <span className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#ff7a0a]" />}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a href="/#contact" className="group hidden min-h-11 items-center gap-2 rounded-xl bg-[#16d5df] px-4 text-[0.8rem] font-extrabold text-[#07164f] shadow-[4px_4px_0_#07164f] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#73eef3] active:translate-y-0 active:shadow-[2px_2px_0_#07164f] sm:inline-flex">
              اطلب عرضًا
              <ArrowUpLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </a>
            <button type="button" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#07164f]/12 bg-white/60 text-[#07164f] transition-all duration-200 hover:border-[#16d5df] hover:bg-white active:scale-95 lg:hidden" aria-label={isOpen ? 'إغلاق القائمة' : 'فتح القائمة'} aria-expanded={isOpen} aria-controls="mobile-navigation" onClick={() => setIsOpen((value) => !value)}>
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          <div className="absolute inset-x-0 bottom-0 h-[2px] overflow-hidden bg-[#07164f]/7" aria-hidden="true">
            <span className="block h-full bg-gradient-to-l from-[#16d5df] via-[#2145a8] to-[#ff7a0a] transition-transform duration-150" style={{ transform: `scaleX(${scrollProgress / 100})`, transformOrigin: 'right center' }} />
          </div>
        </div>
      </div>

      {isOpen && (
        <div id="mobile-navigation" className="fixed inset-x-0 bottom-0 top-[5.7rem] z-40 px-3 sm:px-5 lg:hidden">
          <button type="button" className="absolute inset-0 bg-[#07164f]/45 backdrop-blur-sm" onClick={closeMobileMenu} aria-label="إغلاق القائمة" />
          <nav className="relative mx-auto max-w-7xl overflow-y-auto rounded-[1.5rem] border border-[#07164f]/12 bg-[#f7f3e8] shadow-[0_28px_80px_rgba(7,22,79,.28)]" aria-label="قائمة الجوال">
            <div className="flex items-end justify-between border-b border-[#07164f]/10 bg-[radial-gradient(circle_at_100%_0%,rgba(22,213,223,.18),transparent_38%),linear-gradient(120deg,rgba(255,122,10,.1),transparent_45%)] px-5 py-5">
              <div>
                <span className="font-latin text-[9px] font-bold tracking-[.2em] text-[#2145a8]/50">AGENCY / 02</span>
                <p className="mt-1 font-display text-xl font-extrabold text-[#07164f]">استكشف خدمات الوكالة</p>
              </div>
              <span className="font-latin text-4xl font-black leading-none tracking-[-.08em] text-[#07164f]/10">MAM_TK</span>
            </div>
            <div className="p-3">
              {navItems.slice(0, 2).map((item, index) => (
                <a key={item.href} href={item.href} className={`group flex items-center justify-between rounded-xl px-3 py-3.5 font-bold transition-all duration-200 ${activeSection === item.id ? 'bg-[#07164f] text-white' : 'text-[#07164f] hover:bg-white'}`} onClick={closeMobileMenu}>
                  <span className="flex items-center gap-3"><span className={`font-latin text-[10px] ${activeSection === item.id ? 'text-[#16d5df]' : 'text-[#2145a8]/45'}`}>0{index + 1}</span>{item.label}</span>
                  <MoveUpLeft className="h-4 w-4 opacity-45 transition-transform duration-200 group-hover:-translate-x-1 group-hover:-translate-y-1" />
                </a>
              ))}
              <div className="my-2 rounded-xl border border-[#07164f]/10 bg-white/45 p-2">
                <div className="flex items-center justify-between px-2 py-2 text-xs font-extrabold text-[#07164f]">
                  <span><span className="mr-2 font-latin text-[10px] text-[#2145a8]/45">03</span>الخدمات</span>
                  <ChevronDown className="h-4 w-4 text-[#147e87]" aria-hidden="true" />
                </div>
                {serviceGroups.map((group) => (
                  <div key={group.code} className="mt-1 border-t border-[#07164f]/8 px-2 pt-2">
                    <a href={group.href} className="block rounded-lg py-2 text-sm font-bold text-[#07164f] hover:bg-[#16d5df]/15" onClick={closeMobileMenu}>{group.title}</a>
                    <div className="grid gap-1 pb-1">
                      {group.links.map((link) => <a key={link.label} href={link.href} className="rounded-md px-2 py-1 text-xs text-[#07164f]/60 hover:bg-white" onClick={closeMobileMenu}>{link.label}</a>)}
                    </div>
                  </div>
                ))}
              </div>
              {navItems.slice(3).map((item, index) => (
                <a key={item.href} href={item.href} className={`group flex items-center justify-between rounded-xl px-3 py-3.5 font-bold transition-all duration-200 ${activeSection === item.id ? 'bg-[#07164f] text-white' : 'text-[#07164f] hover:bg-white'}`} onClick={closeMobileMenu}>
                  <span className="flex items-center gap-3"><span className={`font-latin text-[10px] ${activeSection === item.id ? 'text-[#16d5df]' : 'text-[#2145a8]/45'}`}>0{index + 4}</span>{item.label}</span>
                  <MoveUpLeft className="h-4 w-4 opacity-45 transition-transform duration-200 group-hover:-translate-x-1 group-hover:-translate-y-1" />
                </a>
              ))}
              <a href="/#contact" className="group mt-3 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#16d5df] font-extrabold text-[#07164f] shadow-[4px_4px_0_#07164f] transition-all duration-200 hover:bg-[#73eef3] active:translate-y-0.5 active:shadow-[2px_2px_0_#07164f]" onClick={closeMobileMenu}>
                ابدأ مشروعك
                <ArrowUpLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
