import Image from "next/image"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">من نحن</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        <div>
          <h2 className="text-2xl font-bold mb-4">قصتنا</h2>
          <p className="text-muted-foreground mb-4">
            تأسس معرض السيارات في عام 2010 بهدف تقديم تجربة فريدة لعملائنا في مجال بيع وشراء السيارات الفاخرة. منذ ذلك
            الحين، نمت شركتنا لتصبح واحدة من أكبر معارض السيارات الفاخرة في المملكة العربية السعودية.
          </p>
          <p className="text-muted-foreground mb-4">
            نحن نفخر بتقديم مجموعة متنوعة من السيارات الفاخرة من أشهر العلامات التجارية العالمية، مع التركيز على الجودة
            والموثوقية والخدمة المتميزة.
          </p>
          <p className="text-muted-foreground mb-6">
            رؤيتنا هي أن نكون الوجهة الأولى لعشاق السيارات الفاخرة في المملكة، من خلال تقديم أفضل المنتجات والخدمات التي
            تلبي تطلعات عملائنا وتتجاوز توقعاتهم.
          </p>

          <div className="space-y-2">
            <div className="flex items-center">
              <Check className="h-5 w-5 text-primary ml-2" />
              <span>أكثر من 10 سنوات من الخبرة</span>
            </div>
            <div className="flex items-center">
              <Check className="h-5 w-5 text-primary ml-2" />
              <span>فريق من الخبراء المتخصصين</span>
            </div>
            <div className="flex items-center">
              <Check className="h-5 w-5 text-primary ml-2" />
              <span>أكثر من 1000 سيارة تم بيعها</span>
            </div>
            <div className="flex items-center">
              <Check className="h-5 w-5 text-primary ml-2" />
              <span>خدمة عملاء متميزة على مدار الساعة</span>
            </div>
          </div>
        </div>

        <div className="relative h-[400px] rounded-lg overflow-hidden">
          <Image src="/sleek-auto-display.png" alt="معرض السيارات" fill className="object-cover" />
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-center">قيمنا</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-muted p-6 rounded-lg text-center">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">الجودة</h3>
            <p className="text-muted-foreground">
              نلتزم بتقديم أفضل السيارات ذات الجودة العالية والمواصفات المتميزة لعملائنا.
            </p>
          </div>
          <div className="bg-muted p-6 rounded-lg text-center">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">الثقة</h3>
            <p className="text-muted-foreground">
              نبني علاقات طويلة الأمد مع عملائنا على أساس الثقة والشفافية في جميع تعاملاتنا.
            </p>
          </div>
          <div className="bg-muted p-6 rounded-lg text-center">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">الابتكار</h3>
            <p className="text-muted-foreground">
              نسعى دائماً لتطوير خدماتنا وتقديم حلول مبتكرة تلبي احتياجات عملائنا المتغيرة.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-center">فريقنا</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="relative w-40 h-40 rounded-full overflow-hidden mx-auto mb-4 bg-muted">
              <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-primary">م</div>
            </div>
            <h3 className="text-lg font-bold">محمد العمري</h3>
            <p className="text-muted-foreground">المدير التنفيذي</p>
          </div>
          <div className="text-center">
            <div className="relative w-40 h-40 rounded-full overflow-hidden mx-auto mb-4 bg-muted">
              <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-primary">أ</div>
            </div>
            <h3 className="text-lg font-bold">أحمد الشمري</h3>
            <p className="text-muted-foreground">مدير المبيعات</p>
          </div>
          <div className="text-center">
            <div className="relative w-40 h-40 rounded-full overflow-hidden mx-auto mb-4 bg-muted">
              <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-primary">س</div>
            </div>
            <h3 className="text-lg font-bold">سارة القحطاني</h3>
            <p className="text-muted-foreground">مديرة خدمة العملاء</p>
          </div>
          <div className="text-center">
            <div className="relative w-40 h-40 rounded-full overflow-hidden mx-auto mb-4 bg-muted">
              <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-primary">ف</div>
            </div>
            <h3 className="text-lg font-bold">فهد الدوسري</h3>
            <p className="text-muted-foreground">مدير الصيانة</p>
          </div>
        </div>
      </div>

      <div className="py-12 bg-muted rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4">هل أنت مستعد للانضمام إلى عائلتنا؟</h2>
        <p className="text-muted-foreground mb-6 max-w-[600px] mx-auto">
          نحن نتطلع دائماً للترحيب بعملاء جدد في معرضنا. تواصل معنا اليوم لاستكشاف مجموعتنا المتميزة من السيارات الفاخرة.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/cars">تصفح السيارات</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/contact">تواصل معنا</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
