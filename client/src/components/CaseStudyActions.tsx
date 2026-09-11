import { Check, Copy, Share2 } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'wouter';
import type { CaseStudy } from '@/lib/case-studies';

export default function CaseStudyActions({ study }: { study: CaseStudy }) {
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : `/case-studies/${study.projectId}`;
  const shareData = { title: `دراسة حالة: ${study.arabicTitle} | MAM_Tkno`, text: study.summary, url: shareUrl };

  const handleShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') return;
      }
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.prompt('انسخ رابط دراسة الحالة:', shareUrl);
    }
  };

  const requestHref = `/?project=${encodeURIComponent(study.projectId)}&service=${encodeURIComponent(study.similarServiceId)}#contact`;

  return (
    <div className="flex flex-wrap gap-3" aria-label="إجراءات دراسة الحالة">
      <button type="button" onClick={handleShare} className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-white/20 px-4 text-sm font-extrabold text-white transition-all hover:-translate-y-0.5 hover:border-[#16d5df] hover:bg-[#16d5df]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16d5df]">
        {copied ? <Check className="h-4 w-4 text-[#c8ff2b]" aria-hidden="true" /> : <Share2 className="h-4 w-4 text-[#16d5df]" aria-hidden="true" />}
        {copied ? 'تم نسخ الرابط' : 'مشاركة المشروع'}
        {copied && <Copy className="h-3.5 w-3.5 text-[#c8ff2b]" aria-hidden="true" />}
      </button>
      <Link href={requestHref} className="lime-button min-h-12 text-sm">
        اطلب مشروعًا مشابهًا
      </Link>
    </div>
  );
}
