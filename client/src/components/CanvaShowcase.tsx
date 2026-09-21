import { useMemo, useState } from 'react';
import { ArrowUpLeft, ExternalLink, Filter, MessageCircle, Presentation } from 'lucide-react';
import { canvaCategories, canvaDesigns, type CanvaCategoryId } from '@/lib/canva-designs';
import { contactDetails } from '@/lib/portfolio-data';

function buildWhatsAppUrl(title: string, categoryLabel: string, shareUrl: string) {
  const message = [
    'السلام عليكم MAM_Tkno،',
    '',
    `أرغب بطلب واستفسار حول العمل: ${title}`,
    `الفئة: ${categoryLabel}`,
    `رابط العرض: ${shareUrl}`,
    '',
    'أرغب في معرفة التفاصيل والتكلفة والمدة المناسبة لتنفيذ عمل مشابه.',
  ].join('\n');

  return `${contactDetails.whatsapp}?text=${encodeURIComponent(message)}`;
}

export default function CanvaShowcase() {
  const [activeCategory, setActiveCategory] = useState<CanvaCategoryId>('all');
  const categoryLabels = useMemo(
    () => new Map<CanvaCategoryId, string>([
      ['all', 'كل الأعمال'],
      ...canvaCategories.map((category) => [category.id, category.label] as const),
    ]),
    [],
  );
  const visibleDesigns = activeCategory === 'all'
    ? canvaDesigns
    : canvaDesigns.filter((design) => design.categoryId === activeCategory);
  const activeCategoryLabel = activeCategory === 'all'
    ? 'كل الأعمال'
    : categoryLabels.get(activeCategory) ?? 'تصميمات بصرية';

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
            <p>تصفح الأعمال حسب الفئة، افتح العرض الكامل، أو أرسل طلبًا واستفسارًا عن العمل المحدد مباشرة إلى واتساب MAM_Tkno.</p>
          </div>
        </header>

        <div className="canva-showcase__filters" role="tablist" aria-label="تصنيف أعمال التصميم">
          <div className="canva-showcase__filter-lead">
            <Filter className="h-4 w-4" aria-hidden="true" />
            <span>تصنيف الأعمال</span>
          </div>
          <button
            type="button"
            role="tab"
            aria-selected={activeCategory === 'all'}
            className={`canva-filter ${activeCategory === 'all' ? 'is-active' : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            كل الأعمال <span>{canvaDesigns.length}</span>
          </button>
          {canvaCategories.map((category) => {
            const count = canvaDesigns.filter((design) => design.categoryId === category.id).length;
            return (
              <button
                key={category.id}
                type="button"
                role="tab"
                aria-selected={activeCategory === category.id}
                className={`canva-filter ${activeCategory === category.id ? 'is-active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.shortLabel} <span>{count}</span>
              </button>
            );
          })}
        </div>

        <div className="canva-showcase__results" aria-live="polite">
          <span>{activeCategoryLabel}</span>
          <span>{visibleDesigns.length} {visibleDesigns.length === 1 ? 'عمل' : 'أعمال'}</span>
        </div>

        {visibleDesigns.length > 0 ? (
          <div className="canva-showcase__grid">
            {visibleDesigns.map((design, index) => {
              const categoryLabel = categoryLabels.get(design.categoryId) ?? 'تصميمات بصرية';
              const whatsappUrl = buildWhatsAppUrl(design.title, categoryLabel, design.shareUrl);
              return (
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
                      <span className="canva-kicker">{categoryLabel}</span>
                      <h3>{design.title}</h3>
                      <p>{design.note}</p>
                    </div>
                    <div className="canva-design-card__actions">
                      <a href={design.shareUrl} target="_blank" rel="noopener noreferrer" className="canva-design-card__link">
                        {design.embedUrl ? 'فتح العرض الكامل' : 'فتح رابط المشاركة'}
                        <ArrowUpLeft className="h-4 w-4" aria-hidden="true" />
                      </a>
                      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="canva-design-card__whatsapp">
                        طلب واستفسار
                        <MessageCircle className="h-4 w-4" aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="canva-showcase__empty">
            <Presentation className="h-7 w-7" aria-hidden="true" />
            <div>
              <strong>هذه الفئة جاهزة لأعمالك القادمة.</strong>
              <p>{activeCategory !== 'all' ? canvaCategories.find((category) => category.id === activeCategory)?.description : 'أضف أعمالك القادمة إلى الفئة المناسبة.'}</p>
            </div>
          </div>
        )}

        <p className="canva-showcase__note">
          إذا كان رابط Canva يفتح وضع التحرير أو يعرض صفحة فارغة داخل الإطار، أعد مشاركته من Canva عبر <strong>Anyone with the link → Can view</strong> ثم أرسل الرابط الجديد.
          <ExternalLink className="mx-1 inline-block h-3.5 w-3.5 align-[-2px]" aria-hidden="true" />
        </p>
      </div>
    </section>
  );
}
