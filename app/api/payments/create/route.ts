import { NextResponse } from "next/server"
import Stripe from "stripe"
import { stripeConfig } from "@/config"

const stripe = new Stripe(stripeConfig.secretKey, {
  apiVersion: "2023-10-16", // استخدم أحدث إصدار من API
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { amount, bidId, metadata } = body

    // التحقق من البيانات المطلوبة
    if (!amount || !bidId) {
      return NextResponse.json({ error: "المبلغ ومعرف المزايدة مطلوبان" }, { status: 400 })
    }

    // تحويل المبلغ إلى وحدات صغيرة (بالهللة)
    // Stripe يتوقع المبلغ بأصغر وحدة عملة (مثلاً: الهللة للريال السعودي)
    const amountInSmallestUnit = Math.round(amount * 115) // إضافة 15% ضريبة القيمة المضافة

    // إنشاء نية الدفع
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInSmallestUnit,
      currency: stripeConfig.currency,
      metadata: {
        bidId: bidId.toString(),
        ...metadata,
      },
      automatic_payment_methods: {
        enabled: true,
      },
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    })
  } catch (error) {
    console.error("خطأ في إنشاء نية الدفع:", error)
    return NextResponse.json({ error: "حدث خطأ أثناء إنشاء نية الدفع" }, { status: 500 })
  }
}
