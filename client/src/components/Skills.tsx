import { Code2, Palette, Zap, Search } from 'lucide-react';

const skillCategories = [
  {
    title: 'Frontend',
    icon: Code2,
    skills: ['React.js', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Radix UI'],
    color: 'from-blue-500 to-blue-600',
  },
  {
    title: 'Backend',
    icon: Zap,
    skills: ['PHP', 'Laravel', 'MySQL', 'REST APIs', 'Node.js'],
    color: 'from-green-500 to-green-600',
  },
  {
    title: 'Design & UX',
    icon: Palette,
    skills: ['UI/UX Design', 'Responsive Design', 'Mobile First', 'Figma', 'User Research'],
    color: 'from-purple-500 to-purple-600',
  },
  {
    title: 'Optimization',
    icon: Search,
    skills: ['SEO', 'Performance', 'Core Web Vitals', 'Schema.org', 'Technical SEO'],
    color: 'from-orange-500 to-orange-600',
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-20 px-4 bg-white">
      <div className="container">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">المهارات والتقنيات</h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            مجموعة شاملة من المهارات التقنية والتصميمية
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={index}
                className="p-8 rounded-xl bg-gradient-to-br from-white to-gray-50 border border-border hover:border-blue-200 transition-all duration-300 hover:shadow-lg animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${category.color} mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-foreground mb-4">{category.title}</h3>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 bg-white border border-border rounded-lg text-sm font-medium text-foreground hover:border-blue-300 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
