export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-white py-12 px-4">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg flex items-center justify-center font-bold">
                M
              </div>
              <span className="font-bold text-lg">محمد</span>
            </div>
            <p className="text-white/70 text-sm">
              مطور ومصمم ويب متخصص في تطوير المتاجر الإلكترونية والويب
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-4">الروابط السريعة</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li><a href="#home" className="hover:text-white transition-colors">الرئيسية</a></li>
              <li><a href="#projects" className="hover:text-white transition-colors">المشاريع</a></li>
              <li><a href="#skills" className="hover:text-white transition-colors">المهارات</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">الخدمات</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">الخدمات</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li><a href="#services" className="hover:text-white transition-colors">تطوير المتاجر الإلكترونية</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">تصميم وتطوير الويب</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">تحسين الأداء والـ SEO</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">التواصل</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li><a href="mailto:mohammedalhmedi738@gmail.com" className="hover:text-white transition-colors">البريد الإلكتروني</a></li>
              <li><a href="tel:+967738738317" className="hover:text-white transition-colors">الهاتف</a></li>
              <li><a href="https://wa.me/qr/HWR572FKMTPEJ1" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">واتساب</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-white/60">
            <p>&copy; {currentYear} محمد أبو السرور. جميع الحقوق محفوظة.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">سياسة الخصوصية</a>
              <a href="#" className="hover:text-white transition-colors">شروط الاستخدام</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
