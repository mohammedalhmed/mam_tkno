import { useState } from 'react';
import { ExternalLink, MonitorPlay, ShieldCheck } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

type LiveProjectPreviewProps = {
  project: {
    arabicTitle: string;
    title: string;
    url: string;
    image: string;
    sourceTitle: string;
    accentSoft: string;
    accentBorder: string;
    accent: string;
  };
  className?: string;
};

/**
 * المواقع الحية تمنع التضمين عبر frame-ancestors أو X-Frame-Options.
 * لذلك تعمل هذه النافذة كمشغّل واضح وآمن للمصدر الأصلي، بدلاً من iframe فارغ أو مكسور.
 */
export default function LiveProjectPreview({ project, className = '' }: LiveProjectPreviewProps) {
  const [hasLaunched, setHasLaunched] = useState(false);
  const domain = project.url.replace(/^https?:\/\//, '').replace(/\/$/, '');

  return (
    <Dialog onOpenChange={(open) => !open && setHasLaunched(false)}>
      <DialogTrigger asChild>
        <button type="button" className={className}>
          <MonitorPlay className="h-4 w-4" aria-hidden="true" />
          معاينة وتشغيل
        </button>
      </DialogTrigger>
      <DialogContent
        dir="rtl"
        className="max-h-[calc(100vh-1.25rem)] max-w-[min(94vw,70rem)] overflow-y-auto border-[#07101c]/18 bg-[#f8f5ec] p-0 text-right text-[#07101c] shadow-[0_28px_90px_rgba(7,16,28,.34)]"
      >
        <DialogHeader className="border-b border-[#07101c]/12 px-5 py-5 text-right sm:px-7">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-latin text-[9px] font-extrabold tracking-[.16em] text-[#147e87]">LIVE PROJECT / SOURCE LAUNCH</span>
            <span className={`border px-2 py-1 text-[9px] font-bold ${project.accentSoft} ${project.accentBorder} ${project.accent}`}>المصدر الأصلي</span>
          </div>
          <DialogTitle className="mt-3 font-display text-3xl font-[750] tracking-[-.035em] text-[#07101c] sm:text-4xl">تشغيل {project.arabicTitle}</DialogTitle>
          <DialogDescription className="mt-2 max-w-2xl text-right text-sm leading-7 text-[#07101c]/62">{project.sourceTitle}</DialogDescription>
        </DialogHeader>

        <div className="grid gap-0 lg:grid-cols-[minmax(0,1.25fr)_minmax(18rem,.75fr)]">
          <div className="border-b border-[#07101c]/12 p-4 lg:border-b-0 lg:border-l lg:p-6">
            <div className="overflow-hidden border border-[#07101c]/15 bg-[#07101c] shadow-[0_18px_50px_rgba(7,16,28,.18)]">
              <div className="flex min-h-10 items-center gap-2 border-b border-white/12 px-4 text-white/60">
                <span className="h-2 w-2 rounded-full bg-[#16d5df]" aria-hidden="true" />
                <span className="font-latin text-[10px] font-bold tracking-[.08em]">{domain}</span>
              </div>
              <img src={project.image} alt={`لقطة تعريفية لمشروع ${project.arabicTitle}`} className="aspect-[16/10] w-full object-cover" />
            </div>
            <p className="mt-3 text-xs leading-6 text-[#07101c]/52">هذه لقطة تعريفية من المشروع؛ التشغيل الفعلي يفتح من نطاق المشروع مباشرةً ليبقى التصفح آمنًا وسليمًا.</p>
          </div>

          <div className="flex flex-col justify-between gap-6 p-5 sm:p-7">
            <div>
              <div className="flex items-start gap-3 border-r-2 border-[#16d5df] pr-3">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#147e87]" aria-hidden="true" />
                <div>
                  <p className="text-sm font-extrabold">تشغيل من المصدر، لا تضمين مكسور</p>
                  <p className="mt-2 text-sm leading-7 text-[#07101c]/64">سياسة الحماية في المواقع الحية تمنع عرضها داخل إطار خارجي. لذلك يُفتح المشروع في تبويب جديد من مصدره الأصلي بدل إظهار معاينة محجوبة أو ناقصة.</p>
                </div>
              </div>
              {hasLaunched && <p role="status" className="mt-5 border border-[#a9e8ea] bg-[#e9fbfb] px-3 py-2 text-sm font-bold text-[#147e87]">تم إرسال طلب فتح المشروع الحي في تبويب جديد.</p>}
            </div>

            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setHasLaunched(true)}
              className="ink-button !min-h-12 w-full justify-center text-sm"
            >
              تشغيل الموقع الحي
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
