"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { StripeProvider } from "@/components/payment/stripe-provider"
import { StripePaymentForm } from "@/components/payment/stripe-payment-form"
import { bids, getCarById, getAuctionById, getPaymentForBid } from "@/lib/data"
import { stripeConfig } from "@/config"

export default function CheckoutPage({ params }: { params: { bidId: string } }) {
  const router = useRouter()
  const [clientSecret, setClientSecret] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const bidId = Number(params.bidId)
  const bid = bids.find((b) => b.id === bidId)

  useEffect(() => {
    if (!bid) return

    const fetchPaymentIntent = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("/api/payments/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: bid.amount,
            bidId: bid.id,
            metadata: {
              carId: bid.car_id,
              userId: bid.user_id,
            },
          }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || "حدث خطأ أثناء إنشاء نية الدفع")
        }

        const data = await response.json()
        setClientSecret(data.clientSecret)
      } catch (error) {
        console.error("خطأ في إنشاء نية الدفع:", error)
        setError(error instanceof Error ? error.message : "حدث خطأ غير متوقع")
      } finally {
        setIsLoading(false)
      }
    }

    fetchPaymentIntent()
  }, [bid])

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
  const auction = getAuctionById(bid.car_id)
  const payment = getPaymentForBid(bidId)

  // إذا كان الدفع مكتمل بالفعل، نوجه المستخدم إلى صفحة التأكيد
  if (payment && payment.status === "completed") {
    router.push(`/checkout/${bidId}/success`)
    return null
  }

  const handlePaymentComplete = (paymentIntentId: string) => {
    // في تطبيق حقيقي، سنقوم بتحديث حالة الدفع في قاعدة البيانات
    setTimeout(() => {
      router.push(`/checkout/${bidId}/success?payment_intent_id=${paymentIntentId}`)
    }, 2000)
  }

  if (!car || !auction) {
    return (
      <div className="container py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">خطأ في البيانات</h1>
        <p className="text-muted-foreground mb-6">لم يتم العثور على بيانات السيارة أو المزاد</p>
        <Button asChild>
          <Link href="/profile/bids">العودة إلى المزايدات</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" asChild className="mr-2">
          <Link href="/profile/bids">
            <ArrowLeft className="h-4 w-4 ml-2" />
            العودة إلى المزايدات
          </Link>
        </Button>
      </div>

      <h1 className="text-3xl font-bold mb-8">إتمام الشراء</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900 p-4 rounded-md">
              <h3 className="text-red-800 dark:text-red-400 font-medium">حدث خطأ</h3>
              <p className="text-red-700 dark:text-red-300">{error}</p>
              <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
                إعادة المحاولة
              </Button>
            </div>
          ) : clientSecret ? (
            <StripeProvider options={{ clientSecret }}>
              <StripePaymentForm
                clientSecret={clientSecret}
                amount={bid.amount}
                bidId={bidId}
                onPaymentComplete={handlePaymentComplete}
              />
            </StripeProvider>
          ) : null}
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">ملخص المزايدة</h2>
              <div className="flex items-center gap-4 mb-4">
                <div className="relative h-20 w-32 rounded-md overflow-hidden">
                  <Image src={car.image || "/placeholder.svg"} alt={car.title} fill className="object-cover" />
                </div>
                <div>
                  <h3 className="font-bold">{car.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {car.model} {car.year}
                  </p>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">مبلغ المزايدة</span>
                  <span>
                    {bid.amount.toLocaleString()} {stripeConfig.currency}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">ضريبة القيمة المضافة (15%)</span>
                  <span>
                    {(bid.amount * 0.15).toLocaleString()} {stripeConfig.currency}
                  </span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-bold">
                  <span>الإجمالي</span>
                  <span>
                    {(bid.amount * 1.15).toLocaleString()} {stripeConfig.currency}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="bg-muted p-4 rounded-lg">
            <h3 className="font-bold mb-2">ملاحظات هامة</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• يجب إتمام عملية الدفع خلال 3 أيام من انتهاء المزاد.</li>
              <li>• سيتم التواصل معك لتحديد موعد استلام السيارة بعد إتمام عملية الدفع.</li>
              <li>• يمكنك الاطلاع على تفاصيل الطلب في صفحة "طلباتي" بعد إتمام عملية الدفع.</li>
              <li>• يتم معالجة بيانات البطاقة بشكل آمن بواسطة Stripe. نحن لا نخزن بيانات بطاقتك.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
