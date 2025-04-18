import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function ServicesPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">خدماتنا</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        <div>
          <h2 className="text-2xl font-bold mb-4">خدمات متكاملة</h2>
          <p className="text-muted-foreground mb-4">
            نقدم في معرض السيارات مجموعة متكاملة من الخدمات لتلبية جميع احتياجات عملائنا الكرام، بدءاً من اختيار السيارة
            المناسبة وحتى خدمات ما بعد البيع.
          </p>
          <p className="text-muted-foreground mb-4">
            يتميز فريقنا بالخبرة والاحترافية العالية، ونحرص على تقديم خدمات ذات جودة عالية تضمن رضا عملائنا وتفوق
            توقعاتهم.
          </p>
          <p className="text-muted-foreground mb-6">
            سواء كنت تبحث عن شراء سيارة جديدة، أو بيع سيارتك الحالية، أو الحصول على خدمات الصيانة، فإن فريقنا جاهز
            لمساعدتك وتقديم أفضل الحلول المناسبة لك.
          </p>

          <Button asChild>
            <Link href="/contact">
              تواصل معنا
              <ArrowLeft className="mr-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="relative h-[400px] rounded-lg overflow-hidden">
          <Image src="/sleek-auto-display.png" alt="خدمات معرض السيارات" fill className="object-cover" />
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-center">خدماتنا الرئيسية</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Check className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">بيع وشراء السيارات</h3>
              <p className="text-muted-foreground mb-4">
                نوفر مجموعة واسعة من السيارات الفاخرة من مختلف العلامات التجارية العالمية. كما نقدم خدمة شراء سيارتك
                الحالية بأفضل الأسعار.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-primary ml-2" />
                  <span>سيارات جديدة ومستعملة</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-primary ml-2" />
                  <span>تقييم مجاني للسيارات</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-primary ml-2" />
                  <span>خيارات تمويل متنوعة</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Check className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">الصيانة والإصلاح</h3>
              <p className="text-muted-foreground mb-4">
                نقدم خدمات صيانة وإصلاح متكاملة لجميع أنواع السيارات، مع استخدام أحدث التقنيات وقطع الغيار الأصلية.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-primary ml-2" />
                  <span>صيانة دورية شاملة</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-primary ml-2" />
                  <span>إصلاح الأعطال الميكانيكية</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-primary ml-2" />
                  <span>خدمة الطوارئ على الطريق</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Check className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">خدمات ما بعد البيع</h3>
              <p className="text-muted-foreground mb-4">
                نهتم بعملائنا حتى بعد إتمام عملية البيع، ونقدم مجموعة من الخدمات لضمان رضاهم التام.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-primary ml-2" />
                  <span>ضمان شامل</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-primary ml-2" />
                  <span>خدمة العملاء على مدار الساعة</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-primary ml-2" />
                  <span>برامج الولاء والمكافآت</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-center">خدمات إضافية</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">التأمين</h3>
              <p className="text-muted-foreground">
                نقدم خدمات التأمين الشامل والتأمين ضد الغير بأفضل الأسعار وأفضل شركات التأمين.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">تسجيل المركبات</h3>
              <p className="text-muted-foreground">نساعدك في إنهاء إجراءات تسجيل وترخيص سيارتك بسهولة وسرعة.</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">الفحص الفني</h3>
              <p className="text-muted-foreground">
                نقدم خدمة الفحص الفني الشامل للسيارات قبل الشراء لضمان سلامتها وجودتها.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">قطع الغيار</h3>
              <p className="text-muted-foreground">نوفر قطع غيار أصلية لجميع أنواع السيارات بضمان الجودة والأداء.</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="py-12 bg-muted rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4">احصل على خدماتنا المتميزة</h2>
        <p className="text-muted-foreground mb-6 max-w-[600px] mx-auto">
          نحن ملتزمون بتقديم أفضل الخدمات لعملائنا الكرام. تواصل معنا اليوم للحصول على استشارة مجانية.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/contact">طلب خدمة</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/cars">تصفح السيارات</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
