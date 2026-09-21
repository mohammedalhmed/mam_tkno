import { useEffect, useRef } from 'react';
import { ArrowDownLeft, ArrowUpLeft, Code2, Palette, ShoppingBag } from 'lucide-react';

const proofPoints = [
  { icon: ShoppingBag, label: 'متاجر ومنتجات رقمية', detail: 'من الفكرة إلى واجهة قابلة للاستخدام' },
  { icon: Palette, label: 'تصميم وهوية بصرية', detail: 'نظام متسق لا مجرد ملفات منفصلة' },
  { icon: Code2, label: 'تنفيذ تقني واضح', detail: 'أداء واستجابة وتجربة عربية أولًا' },
];

export default function Hero() {
  const imageRef = useRef<HTMLElement>(null);
  const proofRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const imageFrame = imageRef.current;
    const proofItems = Array.from(proofRef.current?.querySelectorAll<HTMLElement>('.hero-reference__proof-item') ?? []);
    const revealItems = [imageFrame, ...proofItems].filter((item): item is HTMLElement => Boolean(item));
    if (!revealItems.length) return;

    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      revealItems.forEach((item) => item.classList.add('is-in-view'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -12% 0px' },
    );

    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="home" className="hero-reference relative overflow-hidden text-white" aria-labelledby="hero-title">
      <div className="hero-reference__grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="hero-reference__glow hero-reference__glow--top pointer-events-none" aria-hidden="true" />
      <div className="hero-reference__glow hero-reference__glow--bottom pointer-events-none" aria-hidden="true" />

      <div className="container relative z-10">
        <div className="hero-reference__layout">
          <div className="hero-reference__visual reveal-delayed">
            <div className="hero-reference__visual-label hero-reference-enter hero-reference-enter--label" aria-hidden="true">
              <span className="hero-reference__label-dot" />
              MAM_TKNO / DIGITAL LAB
            </div>

            <div className="hero-reference__orbit hero-reference__orbit--top hero-reference-enter hero-reference-enter--orbit" aria-hidden="true" />
            <div className="hero-reference__shape hero-reference__shape--right hero-reference-enter hero-reference-enter--shape-right" aria-hidden="true">
              <span />
            </div>
            <div className="hero-reference__shape hero-reference__shape--left hero-reference-enter hero-reference-enter--shape-left" aria-hidden="true">
              <span />
            </div>

            <figure ref={imageRef} className="hero-reference__image-frame hero-reference__image-frame--reveal">
              <div className="hero-reference__image-mask">
                <img
                  src="/manus-storage/mam-tkno-hero-tech-01_58bcbb7a.jpg"
                  alt="مشهد تقني يوضح واجهات متجر إلكتروني على حاسوب محمول وهاتف من خدمات MAM_Tkno"
                  fetchPriority="high"
                />
                <div className="hero-reference__image-overlay" aria-hidden="true" />
              </div>
              <figcaption className="hero-reference__image-caption">
                <span className="font-latin">PRODUCT / UI / CODE</span>
                <span>تصميم · تنفيذ · تحسين</span>
              </figcaption>
            </figure>

            <div className="hero-reference__floating-card hero-reference-enter hero-reference-enter--card" aria-hidden="true">
              <span className="font-latin">01 — 03</span>
              <strong>نظام رقمي واضح</strong>
            </div>
          </div>

          <div className="hero-reference__content reveal max-w-3xl">
            <div className="hero-reference__eyebrow">
              <span>استوديو إبداعي ومختبر تقني</span>
              <span className="font-latin">MAM_TKNO</span>
            </div>

            <h1 id="hero-title">
              نبني حضورك <span>الرقمي</span>
              <br />كنظام متكامل.
            </h1>

            <p className="hero-reference__description">
              نحوّل الاحتياج التجاري إلى منتج رقمي أو نظام بصري عربي واضح؛ من الاستراتيجية وتجربة المستخدم إلى التطوير والإطلاق.
            </p>

            <div className="hero-reference__actions">
              <a href="#contact" className="hero-reference__primary-action">
                طلب مشروع
                <ArrowUpLeft className="h-4 w-4" aria-hidden="true" />
              </a>
              <a href="#projects" className="hero-reference__secondary-action">
                شاهد الأعمال
                <ArrowDownLeft className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>

          </div>

          <div ref={proofRef} className="hero-reference__proof-grid" aria-label="مجالات MAM_Tkno">
            {proofPoints.map(({ icon: Icon, label, detail }) => (
              <div key={label} className="hero-reference__proof-item hero-reference__proof-item--reveal">
                <span className="hero-reference__proof-icon">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <span>
                  <strong>{label}</strong>
                  <small>{detail}</small>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="hero-reference__scroll-hint font-latin" aria-hidden="true">
        <span>SCROLL TO EXPLORE</span>
        <i />
      </div>
    </section>
  );
}
