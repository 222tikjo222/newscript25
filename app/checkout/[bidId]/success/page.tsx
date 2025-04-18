"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { bids, getCarById } from "@/lib/data"

export default function CheckoutSuccessPage({ params }: { params: { bidId: string } }) {
  const searchParams = useSearchParams()
  const paymentIntentId = searchParams.get("payment_intent_id")
  const [isVerifying, setIsVerifying] = useState(!!paymentIntentId)
  const [isVerified, setIsVerified] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const bidId = Number(params.bidId)
  const bid = bids.find((b) => b.id === bidId)

  useEffect(() => {
    if (paymentIntentId) {
      const verifyPayment = async () => {
        try {
          // في تطبيق حقيقي، سنقوم بالتحقق من حالة الدفع من خلال API
          // مثال:
          // const response = await fetch(`/api/payments/verify?payment_intent_id=${paymentIntentId}`)
          // const data = await response.json()
          // if (data.verified) setIsVerified(true)

          // محاكاة للتحقق من الدفع
          await new Promise((resolve) => setTimeout(resolve, 1500))
          setIsVerified(true)
        } catch (error) {
          console.error("خطأ في التحقق من الدفع:", error)
          setError("فشل التحقق من حالة الدفع. يرجى الاتصال بخدمة العملاء.")
        } finally {
          setIsVerifying(false)
        }
      }

      verifyPayment()
    }
  }, [paymentIntentId])

  if (!bid) {
    return (
      <div className="container py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">المزايدة غير موجودة</h1>
        <p className="text-muted-foreground mb-6">لم يتم العثور على المزايدة المطلوبة</p>
        <Button asChild>
          <Link href="/profile/bids">العودة إلى المزايدات</Link>
        </Button>
      </div>
    )
  }

  const car = getCarById(bid.car_id)

  if (!car) {
    return (
      <div className="container py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">خطأ في البيانات</h1>
        <p className="text-muted-foreground mb-6">لم يتم العثور على بيانات السيارة</p>
        <Button asChild>
          <Link href="/profile/bids">العودة إلى المزايدات</Link>
        </Button>
      </div>
    )
  }

  // إنشاء رقم مرجعي وهمي للطلب
  const orderReference = `ORD-${Date.now().toString().slice(-6)}`

  if (isVerifying) {
    return (
      <div className="container py-12">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
              <CardTitle className="text-2xl">جاري التحقق من الدفع...</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground">
                يرجى الانتظار بينما نتحقق من اكتمال عملية الدفع الخاصة بك.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container py-12">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-red-100 dark:bg-red-900/20 p-3 rounded-full">
                  <AlertCircle className="h-12 w-12 text-red-600 dark:text-red-400" />
                </div>
              </div>
              <CardTitle className="text-2xl">خطأ في التحقق من الدفع</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground">{error}</p>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button asChild className="w-full">
                <Link href={`/checkout/${bidId}`}>إعادة المحاولة</Link>
              </Button>
              <Button variant="outline" asChild className="w-full">
                <Link href="/profile/bids">العودة إلى المزايدات</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-full">
                <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <CardTitle className="text-2xl">تم الدفع بنجاح!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <p className="text-muted-foreground">
                شكراً لإتمام عملية الدفع. تم استلام طلبك وسيتم التواصل معك قريباً لتحديد موعد استلام السيارة.
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">الرقم المرجعي للطلب</p>
              <p className="font-bold text-lg">{orderReference}</p>
              {paymentIntentId && (
                <>
                  <p className="text-sm text-muted-foreground mt-2">رقم عملية الدفع</p>
                  <p className="font-mono text-xs">{paymentIntentId}</p>
                </>
              )}
            </div>

            <div className="space-y-4">
              <h3 className="font-bold">تفاصيل الطلب</h3>
              <div className="flex items-center gap-4">
                <div className="relative h-20 w-32 rounded-md overflow-hidden">
                  <Image src={car.image || "/placeholder.svg"} alt={car.title} fill className="object-cover" />
                </div>
                <div>
                  <h4 className="font-bold">{car.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {car.model} {car.year}
                  </p>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">مبلغ المزايدة</span>
                  <span>{bid.amount.toLocaleString()} ريال</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">ضريبة القيمة المضافة (15%)</span>
                  <span>{(bid.amount * 0.15).toLocaleString()} ريال</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-bold">
                  <span>الإجمالي</span>
                  <span>{(bid.amount * 1.15).toLocaleString()} ريال</span>
                </div>
              </div>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-bold mb-2">الخطوات التالية</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• سيتم إرسال تفاصيل الطلب إلى بريدك الإلكتروني.</li>
                <li>• سيتواصل معك فريق خدمة العملاء خلال 24 ساعة لتحديد موعد استلام السيارة.</li>
                <li>• يمكنك الاطلاع على تفاصيل الطلب في صفحة "طلباتي".</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button asChild className="w-full">
              <Link href="/profile/orders">عرض طلباتي</Link>
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link href="/">العودة إلى الصفحة الرئيسية</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
