export const SITE_URL = 'https://mahmoudfolio-izrbytxa.manus.space';

export type PageMetadata = {
  title: string;
  description: string;
  canonicalPath: string;
  ogType?: 'website' | 'article';
  image?: string;
};

export const HOME_METADATA: PageMetadata = {
  title: 'MAM_Tkno | وكالة تقنية وتصميمية للمنتجات الرقمية',
  description: 'MAM_Tkno وكالة تقنية وتصميمية تبني مواقع ومنتجات رقمية وهويات بصرية واضحة، سريعة، ومتجاوبة للعلامات التجارية.',
  canonicalPath: '/',
  ogType: 'website',
  image: `${SITE_URL}/manus-storage/mam-tkno-hero-tech-01_58bcbb7a.jpg`,
};

function upsertMeta(attribute: 'name' | 'property', key: string, content: string) {
  let meta = document.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute(attribute, key);
    document.head.appendChild(meta);
  }
  meta.content = content;
}

export function setPageMetadata(metadata: PageMetadata) {
  document.title = metadata.title;
  const canonicalUrl = `${SITE_URL}${metadata.canonicalPath}`;
  upsertMeta('name', 'description', metadata.description);
  upsertMeta('property', 'og:title', metadata.title);
  upsertMeta('property', 'og:description', metadata.description);
  upsertMeta('property', 'og:type', metadata.ogType ?? 'website');
  upsertMeta('property', 'og:url', canonicalUrl);
  if (metadata.image) upsertMeta('property', 'og:image', metadata.image);
  upsertMeta('name', 'twitter:title', metadata.title);
  upsertMeta('name', 'twitter:description', metadata.description);
  if (metadata.image) upsertMeta('name', 'twitter:image', metadata.image);

  let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = canonicalUrl;
}

export function setJsonLd(id: string, data: Record<string, unknown> | null) {
  const existing = document.getElementById(id);
  existing?.remove();
  if (!data) return;
  const script = document.createElement('script');
  script.id = id;
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}
