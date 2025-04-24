import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, CheckCircle, Clock, Gavel, ShieldCheck } from "lucide-react"

export const metadata: Metadata = {
  title: "كيف تعمل المزادات | معرض السيارات",
  description: "تعرف على كيفية المشاركة في مزادات السيارات",
}

export default function HowItWorksPage() {
  return (
    <div className="container py-8">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" asChild className="mr-2">
          <Link href="/auctions">
            <ArrowLeft className="h-4 w-4 ml-2" />
            العودة للمزادات
          </Link>
        </Button>
      </div>

      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">كيف تعمل المزادات؟</h1>
        <p className="text-muted-foreground max-w-[800px] mx-auto">
          نظام المزادات لدينا سهل وآمن. اتبع الخطوات التالية للمشاركة في مزاداتنا والحصول على فرصة لشراء سيارة أحلامك
          بأفضل سعر.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">1. إنشاء حساب</h3>
            <p className="text-muted-foreground">
              قم بإنشاء حساب في موقعنا للتمكن من المشاركة في المزادات. سيتم التحقق من هويتك لضمان أمان المزادات.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">2. تصفح المزادات</h3>
            <p className="text-muted-foreground">
              تصفح المزادات النشطة واختر السيارة التي ترغب في المزايدة عليها. يمكنك الاطلاع على تفاصيل السيارة والوقت
              المتبقي للمزاد.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Gavel className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">3. تقديم المزايدة</h3>
            <p className="text-muted-foreground">
              قدم مزايدتك بالمبلغ الذي ترغب به، مع مراعاة الحد الأدنى للمزايدة. سيتم إشعارك في حال تم تجاوز عرضك.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">4. الفوز بالمزاد</h3>
            <p className="text-muted-foreground">
              إذا كنت صاحب أعلى مزايدة عند انتهاء المزاد، ستفوز بالسيارة وسيتم التواصل معك لإتمام عملية الشراء.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-muted p-6 rounded-lg mb-12">
        <h2 className="text-2xl font-bold mb-4">قواعد المزاد</h2>
        <ul className="space-y-2">
          <li className="flex items-start">
            <CheckCircle className="h-5 w-5 text-primary ml-2 mt-0.5" />
            <span>يجب أن تكون مسجلاً في الموقع للمشاركة في المزادات.</span>
          </li>
          <li className="flex items-start">
            <CheckCircle className="h-5 w-5 text-primary ml-2 mt-0.5" />
            <span>الحد الأدنى للمزايدة هو 1,000 ريال فوق السعر الحالي.</span>
          </li>
          <li className="flex items-start">
            <CheckCircle className="h-5 w-5 text-primary ml-2 mt-0.5" />
            <span>لا يمكن سحب المزايدة بعد تقديمها.</span>
          </li>
          <li className="flex items-start">
            <CheckCircle className="h-5 w-5 text-primary ml-2 mt-0.5" />
            <span>يجب إتمام عملية الشراء خلال 3 أيام من انتهاء المزاد.</span>
          </li>
          <li className="flex items-start">
            <CheckCircle className="h-5 w-5 text-primary ml-2 mt-0.5" />
            <span>
              في حال عدم إتمام عملية الشراء، سيتم تغريم المزايد بنسبة 5% من قيمة المزايدة وسيتم تقديم السيارة للمزايد
              التالي.
            </span>
          </li>
        </ul>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">مستعد للمشاركة؟</h2>
        <p className="text-muted-foreground mb-6 max-w-[600px] mx-auto">
          ابدأ الآن بتصفح المزادات النشطة وقم بالمزايدة على سيارة أحلامك.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/auctions">تصفح المزادات</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/auth/register">إنشاء حساب</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
