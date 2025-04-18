import { NextResponse } from "next/server"
import { headers } from "next/headers"
import Stripe from "stripe"
import { stripeConfig } from "@/config"

const stripe = new Stripe(stripeConfig.secretKey, {
  apiVersion: "2023-10-16",
})

export async function POST(request: Request) {
  const body = await request.text()
  const signature = headers().get("stripe-signature") || ""

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, stripeConfig.webhookSecret)
  } catch (error) {
    console.error("خطأ في التحقق من توقيع Webhook:", error)
    return NextResponse.json({ error: "خطأ في التحقق من توقيع Webhook" }, { status: 400 })
  }

  // معالجة الأحداث المختلفة من Stripe
  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      console.log(`تم اكتمال الدفع: ${paymentIntent.id}`)

      // استخراج معرف المزايدة من البيانات الوصفية
      const bidId = paymentIntent.metadata.bidId

      if (bidId) {
        // في تطبيق حقيقي، هنا سنقوم بتحديث حالة الدفع في قاعدة البيانات
        // مثال: await db.payments.update({ where: { bidId }, data: { status: "completed" } })
        // يمكن أيضًا إنشاء طلب جديد وإرسال إشعار للمستخدم
        // مثال: await db.orders.create({ data: { bidId, paymentId: paymentIntent.id, ... } })
        // مثال: await sendNotification(userId, "تم اكتمال الدفع بنجاح")
      }
      break

    case "payment_intent.payment_failed":
      const failedPaymentIntent = event.data.object as Stripe.PaymentIntent
      console.log(`فشل الدفع: ${failedPaymentIntent.id}`)

      // في تطبيق حقيقي، هنا سنقوم بتحديث حالة الدفع في قاعدة البيانات
      // وإرسال إشعار للمستخدم
      break

    default:
      console.log(`نوع الحدث غير معالج: ${event.type}`)
  }

  return NextResponse.json({ received: true })
}

export const config = {
  api: {
    bodyParser: false,
  },
}
