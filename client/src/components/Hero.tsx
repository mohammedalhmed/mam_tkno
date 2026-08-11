import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <section id="home" className="pt-32 pb-20 px-4 relative overflow-hidden min-h-screen flex items-center">
      <div className="absolute inset-0 -z-10">
        <img
          src="/manus-storage/hero-background_5bac5b80.png"
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent"></div>
      </div>

      <div className="container">
        <div className="max-w-2xl">
          <div className="inline-block mb-4 px-4 py-2 bg-blue-50 rounded-full border border-blue-200">
            <span className="text-sm font-medium text-blue-600">مرحباً بك في بورتفوليوي</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            محمد أبو السرور
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
              مطور ومصمم ويب
            </span>
          </h1>

          <p className="text-lg text-foreground/80 mb-8 leading-relaxed">
            متخصص في تطوير واجهات المتاجر الإلكترونية والويب، مع التركيز على تجربة المستخدم والأداء والظهور في محركات البحث. أحول الأفكار إلى منتجات رقمية فعّالة.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-base"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              عرض المشاريع
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              className="px-8 py-6 text-base border-2"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              تواصل معي
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-border">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-sm text-foreground/60">مشروع مكتمل</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">30+</div>
              <div className="text-sm text-foreground/60">عميل راضي</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">5+</div>
              <div className="text-sm text-foreground/60">سنوات خبرة</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
