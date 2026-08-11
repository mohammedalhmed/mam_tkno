import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

const projects = [
  {
    title: 'Bella Box',
    description: 'متجر إلكتروني متخصص في منتجات العناية والمكياج. عملت على تحسين تجربة المستخدم والأداء والظهور في محركات البحث.',
    image: '/manus-storage/projects-showcase_7eadb690.png',
    tags: ['E-Commerce', 'UI/UX', 'SEO', 'Performance'],
    link: 'https://bellaboxksa.com',
    color: 'from-pink-500 to-rose-500',
  },
  {
    title: 'NERFONA',
    description: 'متجر إلكتروني متخصص. أعمل حالياً على تطوير واجهات المستخدم وتحسين SEO والبنية التقنية.',
    image: '/manus-storage/projects-showcase_7eadb690.png',
    tags: ['Frontend', 'UI/UX', 'SEO', 'E-Commerce'],
    link: 'https://nerfona.sa',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'التاج بلاس',
    description: 'موقع لخدمات الديكورات. تم العمل على تقديم الخدمات والمحتوى بصورة احترافية وتنظيم المعلومات بطريقة فعّالة.',
    image: '/manus-storage/projects-showcase_7eadb690.png',
    tags: ['Web Design', 'Web Development', 'Services'],
    link: 'https://altaj-plus.com',
    color: 'from-amber-500 to-orange-500',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 px-4 bg-gradient-to-b from-white to-blue-50">
      <div className="container">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">أهم المشاريع</h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            مشاريع حقيقية تعكس خبرتي في تطوير المتاجر الإلكترونية والويب
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border hover:border-blue-200 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-48 overflow-hidden bg-gray-100">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2">{project.title}</h3>
                <p className="text-foreground/70 text-sm mb-4 line-clamp-3">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 bg-blue-50 text-blue-600 rounded-full border border-blue-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    className="w-full border-blue-200 text-blue-600 hover:bg-blue-50"
                  >
                    زيارة المشروع
                    <ExternalLink className="ml-2 w-4 h-4" />
                  </Button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
