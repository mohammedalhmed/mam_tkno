import { useMemo, useState, type CSSProperties } from 'react';
import { ArrowUpLeft, Check, ExternalLink, Layers3, Send, X } from 'lucide-react';
import { contactDetails } from '@/lib/portfolio-data';
import { websiteTypes, type WebsiteType } from '@/lib/website-types';

function buildWhatsAppUrl(type: WebsiteType, services: string[], sections: string[], notes: string) {
  const message = [
    'السلام عليكم MAM_Tkno،',
    '',
    'هذا هو اختياري المبدئي لنوع الموقع:',
    `${type.name} — ${type.nameEn}`,
    '',
    'الخدمات المطلوبة:',
    ...(services.length ? services.map((service) => `- ${service}`) : ['- أحتاج توجيهًا لاختيار الخدمات']),
    '',
    'الأقسام أو الإضافات المطلوبة:',
    ...(sections.length ? sections.map((section) => `- ${section}`) : ['- لم أحدد إضافات بعد']),
    '',
    `ملاحظات أولية: ${notes.trim() || 'لا توجد ملاحظات إضافية.'}`,
    '',
    'أرغب في إعداد دراسة شاملة للنطاق والتكاليف والمدة ثم استلام عرض سعر مناسب.',
  ].join('\n');

  return `${contactDetails.whatsapp}?text=${encodeURIComponent(message)}`;
}

function toggleValue(values: string[], value: string) {
  return values.includes(value) ? values.filter((item) => item !== value) : [...values, value];
}

export default function WebsiteTypes() {
  const [selectedTypeId, setSelectedTypeId] = useState(websiteTypes[0].id);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedSections, setSelectedSections] = useState<string[]>([]);
  const [notes, setNotes] = useState('');

  const selectedType = useMemo(
    () => websiteTypes.find((type) => type.id === selectedTypeId) ?? websiteTypes[0],
    [selectedTypeId],
  );
  const whatsappUrl = useMemo(
    () => buildWhatsAppUrl(selectedType, selectedServices, selectedSections, notes),
    [notes, selectedSections, selectedServices, selectedType],
  );

  const chooseType = (typeId: string) => {
    setSelectedTypeId(typeId);
    setSelectedServices([]);
    setSelectedSections([]);
    setNotes('');
    window.setTimeout(() => document.getElementById('website-type-builder')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0);
  };

  return (
    <section id="website-types" className="website-types relative overflow-hidden border-y border-white/10 bg-[#061437] py-20 text-white sm:py-28" aria-labelledby="website-types-title">
      <div className="canva-page-grid pointer-events-none absolute inset-0 opacity-55" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-40 top-16 h-96 w-96 rounded-full bg-[#16d5df]/10 blur-3xl" aria-hidden="true" />
      <div className="container relative">
        <header className="website-types__header grid gap-8 border-b border-white/14 pb-10 lg:grid-cols-[.72fr_1.28fr] lg:items-end lg:gap-16">
          <div>
            <span className="canva-chip">03 / WEBSITE MAP</span>
            <p className="mt-4 text-sm font-bold text-[#83cfff]">صنّف فكرتك قبل أن نبدأ بناءها</p>
          </div>
          <div>
            <h2 id="website-types-title" className="max-w-4xl font-display text-4xl font-[750] leading-[1.1] tracking-[-.045em] text-white sm:text-5xl lg:text-6xl">ما نوع الموقع الذي تحتاجه؟</h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-white/68">استكشف تصنيفات عملية، ثم اختر النوع والخدمات والأقسام الإضافية الأقرب لفكرتك. هذا الاختيار لا يلزمك، لكنه يساعدنا على إعداد دراسة نطاق وتكلفة أكثر وضوحًا.</p>
          </div>
        </header>

        <div className="website-types__grid mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {websiteTypes.map((type) => {
            const isSelected = type.id === selectedTypeId;
            return (
              <article key={type.id} className={`website-type-card ${isSelected ? 'is-selected' : ''}`} style={{ '--website-type-accent': type.accent } as CSSProperties}>
                <div className="website-type-card__top">
                  <span className="font-latin text-[10px] font-extrabold tracking-[.14em]" style={{ color: type.accent }}>{type.code}</span>
                  <Layers3 className="h-5 w-5" style={{ color: type.accent }} aria-hidden="true" />
                </div>
                <h3>{type.name}</h3>
                <p className="website-type-card__english">{type.nameEn}</p>
                <p className="website-type-card__summary">{type.summary}</p>
                <div className="website-type-card__preview">
                  <div>
                    <span>يتكون من</span>
                    <ul>{type.components.slice(0, 3).map((item) => <li key={item}>{item}</li>)}</ul>
                  </div>
                  <div>
                    <span>يشمل خدمات</span>
                    <ul>{type.services.slice(0, 2).map((item) => <li key={item}>{item}</li>)}</ul>
                  </div>
                </div>
                <div className="website-type-card__meta">
                  <span>{type.components.length} مكونات أساسية</span>
                  <span>{type.services.length} خدمات ممكنة</span>
                </div>
                <button type="button" className="website-type-card__button" onClick={() => chooseType(type.id)} aria-pressed={isSelected}>
                  {isSelected ? 'هذا هو اختياري' : 'اختر هذا التصنيف'}
                  {isSelected ? <Check className="h-4 w-4" aria-hidden="true" /> : <ArrowUpLeft className="h-4 w-4" aria-hidden="true" />}
                </button>
              </article>
            );
          })}
        </div>

        <div id="website-type-builder" className="website-type-builder mt-16 scroll-mt-28" aria-labelledby="website-type-builder-title">
          <div className="website-type-builder__intro">
            <span className="canva-kicker">SELECTED TYPE / {selectedType.code}</span>
            <h3 id="website-type-builder-title">{selectedType.name}</h3>
            <p>{selectedType.summary}</p>
            <div className="website-type-builder__best-for">
              <strong>يناسب غالبًا:</strong>
              <ul>{selectedType.bestFor.map((item) => <li key={item}><Check className="h-3.5 w-3.5" aria-hidden="true" />{item}</li>)}</ul>
            </div>
            <div className="website-type-builder__sources">
              <span>مراجع مختارة</span>
              {selectedType.sources.map((source) => <a key={source} href={source} target="_blank" rel="noopener noreferrer" aria-label={`فتح المصدر ${source}`}><ExternalLink className="h-3.5 w-3.5" aria-hidden="true" /></a>)}
            </div>
          </div>

          <div className="website-type-builder__form">
            <fieldset>
              <legend>الخدمات التي تريد مناقشتها</legend>
              <div className="website-type-builder__options">
                {selectedType.services.map((service) => {
                  const checked = selectedServices.includes(service);
                  return <label key={service} className={checked ? 'is-checked' : ''}><input type="checkbox" checked={checked} onChange={() => setSelectedServices((values) => toggleValue(values, service))} /><span>{service}</span><Check className="h-4 w-4" aria-hidden="true" /></label>;
                })}
              </div>
            </fieldset>

            <fieldset className="mt-7">
              <legend>أقسام أو إضافات للموقع</legend>
              <div className="website-type-builder__options">
                {selectedType.additionalSections.map((section) => {
                  const checked = selectedSections.includes(section);
                  return <label key={section} className={checked ? 'is-checked' : ''}><input type="checkbox" checked={checked} onChange={() => setSelectedSections((values) => toggleValue(values, section))} /><span>{section}</span><Check className="h-4 w-4" aria-hidden="true" /></label>;
                })}
              </div>
            </fieldset>

            <label className="website-type-builder__notes mt-7">
              <span>ملاحظات أو فكرة أولية <small>(اختياري)</small></span>
              <textarea value={notes} onChange={(event) => setNotes(event.target.value)} rows={4} placeholder="مثال: أريد موقعًا عربيًا لمتجر قائم، وأحتاج ربطه بخدمة شحن..." />
            </label>

            <div className="website-type-builder__summary" aria-live="polite">
              <div><span>التصنيف</span><strong>{selectedType.name}</strong></div>
              <div><span>الخدمات</span><strong>{selectedServices.length} محددة</strong></div>
              <div><span>الإضافات</span><strong>{selectedSections.length} محددة</strong></div>
            </div>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="website-type-builder__submit">
              أرسل اختياري لمراجعة النطاق
              <Send className="h-4 w-4" aria-hidden="true" />
            </a>
            <p className="website-type-builder__hint">سيفتح الزر واتساب برسالة منظمة. راجعها وأرسلها عندما تكون جاهزًا، ثم نرتب دراسة شاملة للتكلفة والمدة وعرض السعر.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
