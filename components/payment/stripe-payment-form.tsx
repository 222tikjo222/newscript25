"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { CheckCircle2, AlertCircle } from "lucide-react"
import { stripeConfig } from "@/config"

interface StripePaymentFormProps {
  clientSecret: string
  amount: number
  bidId: number
  onPaymentComplete: (paymentIntentId: string) => void
}

export function StripePaymentForm({ clientSecret, amount, bidId, onPaymentComplete }: StripePaymentFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const router = useRouter()

  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js لم يتم تحميله بعد
      return
    }

    setIsProcessing(true)
    setPaymentStatus("idle")
    setErrorMessage(null)

    try {
      const cardElement = elements.getElement(CardElement)

      if (!cardElement) {
        throw new Error("لم يتم العثور على عنصر البطاقة")
      }

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      })

      if (error) {
        setPaymentStatus("error")
        setErrorMessage(error.message || "حدث خطأ أثناء معالجة الدفع")
      } else if (paymentIntent.status === "succeeded") {
        setPaymentStatus("success")

        // تحديث حالة الدفع في قاعدة البيانات
        await fetch(`/api/payments/${bidId}/update`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            paymentIntentId: paymentIntent.id,
            status: "completed",
          }),
        })

        // استدعاء دالة الاستكمال
        onPaymentComplete(paymentIntent.id)
      }
    } catch (error) {
      console.error("خطأ في الدفع:", error)
      setPaymentStatus("error")
      setErrorMessage("حدث خطأ غير متوقع أثناء معالجة الدفع")
    } finally {
      setIsProcessing(false)
    }
  }

  const cardElementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#32325d",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
    hidePostalCode: true,
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>تفاصيل الدفع</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {paymentStatus === "success" && (
            <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900">
              <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
              <AlertTitle>تم الدفع بنجاح!</AlertTitle>
              <AlertDescription>تم معالجة الدفع بنجاح. سيتم توجيهك إلى صفحة تأكيد الطلب خلال لحظات.</AlertDescription>
            </Alert>
          )}

          {paymentStatus === "error" && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>فشل الدفع</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="card-element" className="text-sm font-medium">
                بيانات البطاقة
              </label>
              <div className="border rounded-md p-3">
                <CardElement id="card-element" options={cardElementOptions} />
              </div>
              <p className="text-xs text-muted-foreground">
                يتم معالجة بيانات البطاقة بشكل آمن بواسطة Stripe. نحن لا نخزن بيانات بطاقتك.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">ملخص الطلب</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">المبلغ الإجمالي</span>
                <span>
                  {amount.toLocaleString()} {stripeConfig.currency}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">ضريبة القيمة المضافة (15%)</span>
                <span>
                  {(amount * 0.15).toLocaleString()} {stripeConfig.currency}
                </span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-bold">
                <span>الإجمالي</span>
                <span>
                  {(amount * 1.15).toLocaleString()} {stripeConfig.currency}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className="w-full"
            disabled={isProcessing || !stripe || !elements || paymentStatus === "success"}
          >
            {isProcessing
              ? "جاري معالجة الدفع..."
              : `إتمام الدفع - ${(amount * 1.15).toLocaleString()} ${stripeConfig.currency}`}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
