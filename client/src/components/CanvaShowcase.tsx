import { ArrowUpLeft, ExternalLink, Presentation } from 'lucide-react';
import { canvaDesigns } from '@/lib/canva-designs';

export default function CanvaShowcase() {
  return (
    <section id="canva-designs" className="canva-showcase relative overflow-hidden" aria-labelledby="canva-designs-title">
      <div className="canva-page-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="container relative">
        <header className="canva-showcase__header">
          <div>
            <span className="canva-chip">04 / CANVA WORK</span>
            <p className="mt-4 text-sm font-bold text-[#83cfff]">معرض التصاميم البصرية</p>
          </div>
          <div>
            <h2 id="canva-designs-title">تصاميم تُعرض كما صُممت.</h2>
            <p>استعرض نماذج الهوية والتصميم من روابط Canva العامة. يفتح العرض التفاعلي داخل الموقع عندما يكون الرابط منشورًا بصيغة view.</p>
          </div>
        </header>

        <div className="canva-showcase__grid">
          {canvaDesigns.map((design, index) => (
            <article key={design.id} className={`canva-design-card ${design.embedUrl ? 'canva-design-card--embedded' : 'canva-design-card--pending'}`}>
              {design.embedUrl ? (
                <div className="canva-design-card__embed">
                  <iframe
                    src={design.embedUrl}
                    title={`معاينة ${design.title}`}
                    loading="lazy"
                    allow="fullscreen"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                </div>
              ) : (
                <div className="canva-design-card__placeholder">
                  <Presentation className="h-8 w-8" aria-hidden="true" />
                  <span className="font-latin">0{index + 1} / PUBLIC VIEW NEEDED</span>
                </div>
              )}

              <div className="canva-design-card__body">
                <div>
                  <span className="canva-kicker">{design.category}</span>
                  <h3>{design.title}</h3>
                  <p>{design.note}</p>
                </div>
                <a href={design.shareUrl} target="_blank" rel="noopener noreferrer" className="canva-design-card__link">
                  {design.embedUrl ? 'فتح العرض الكامل' : 'فتح رابط المشاركة'}
                  <ArrowUpLeft className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>

        <p className="canva-showcase__note">
          إذا كان الرابط يفتح وضع التحرير أو يعرض صفحة فارغة داخل الإطار، أعد مشاركته من Canva عبر <strong>Anyone with the link → Can view</strong> ثم أرسل الرابط الجديد.
          <ExternalLink className="mx-1 inline-block h-3.5 w-3.5 align-[-2px]" aria-hidden="true" />
        </p>
      </div>
    </section>
  );
}
