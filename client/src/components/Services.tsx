import { ShoppingCart, Smartphone, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const services = [
  {
    icon: ShoppingCart,
    title: 'تطوير المتاجر الإلكترونية',
    description: 'تطوير وتحسين المتاجر الإلكترونية مع التركيز على تجربة المستخدم والأداء والظهور في محركات البحث.',
    features: ['واجهات حديثة', 'تحسين UX', 'SEO متقدم', 'أداء عالي'],
  },
  {
    icon: Smartphone,
    title: 'تصميم وتطوير الويب',
    description: 'تصميم وتطوير مواقع ويب متجاوبة وحديثة تجمع بين الجمال والوظيفية والأداء.',
    features: ['Responsive Design', 'Mobile First', 'Modern UI', 'Fast Loading'],
  },
  {
    icon: Zap,
    title: 'تحسين الأداء والـ SEO',
    description: 'تحليل وتحسين أداء المواقع وتهيئتها لمحركات البحث لزيادة الظهور والزيارات.',
    features: ['Core Web Vitals', 'Technical SEO', 'Performance', 'Analytics'],
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 px-4 bg-gradient-to-b from-blue-50 to-white">
      <div className="container">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">الخدمات</h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            خدمات متكاملة لتطوير وتحسين منتجاتك الرقمية
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="p-8 rounded-xl bg-white border border-border hover:border-blue-300 transition-all duration-300 hover:shadow-xl group animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex p-4 rounded-lg bg-blue-50 mb-6 group-hover:bg-blue-100 transition-colors">
                  <Icon className="w-8 h-8 text-blue-600" />
                </div>

                <h3 className="text-2xl font-bold text-foreground mb-3">{service.title}</h3>
                <p className="text-foreground/70 mb-6">{service.description}</p>

                <ul className="space-y-2 mb-6">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center text-sm text-foreground/80">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  variant="outline"
                  className="w-full border-blue-200 text-blue-600 hover:bg-blue-50"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  اعرف المزيد
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
