import { Mail, Phone, MapPin, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Contact() {
  return (
    <section id="contact" className="py-20 px-4 bg-white">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">تواصل معي</h2>
            <p className="text-lg text-foreground/60">
              هل لديك مشروع في الذهن؟ دعنا نتحدث عن كيفية تحويله إلى واقع
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8 animate-slide-in">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-blue-50">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">البريد الإلكتروني</h3>
                  <a
                    href="mailto:mohammedalhmedi738@gmail.com"
                    className="text-foreground/70 hover:text-blue-600 transition-colors"
                  >
                    mohammedalhmedi738@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-blue-50">
                  <Phone className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">الهاتف</h3>
                  <a
                    href="tel:+967738738317"
                    className="text-foreground/70 hover:text-blue-600 transition-colors"
                  >
                    +967 738738317
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-blue-50">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">الموقع</h3>
                  <a
                    href="https://maps.app.goo.gl/U9U6FzbXQcTAzpar9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/70 hover:text-blue-600 transition-colors"
                  >
                    اليمن
                  </a>
                </div>
              </div>

              <div className="pt-8 border-t border-border">
                <h3 className="font-bold text-foreground mb-4">تابعني على</h3>
                <div className="flex gap-4">
                  <a
                    href="https://www.facebook.com/MAMInTec"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a
                    href="https://wa.me/qr/HWR572FKMTPEJ1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 border border-blue-200 flex flex-col justify-center animate-fade-in-up">
              <h3 className="text-2xl font-bold text-foreground mb-4">جاهز للبدء؟</h3>
              <p className="text-foreground/70 mb-8">
                دعنا نناقش مشروعك ونحدد كيفية تحويل رؤيتك إلى واقع رقمي فعّال.
              </p>
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-base w-full"
                onClick={() => window.location.href = 'mailto:mohammedalhmedi738@gmail.com'}
              >
                أرسل لي رسالة
              </Button>
              <p className="text-sm text-foreground/60 text-center mt-4">
                أو اتصل بي مباشرة على +967 738738317
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
