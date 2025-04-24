import { NextResponse } from "next/server"
import Stripe from "stripe"
import { stripeConfig } from "@/config"

const stripe = new Stripe(stripeConfig.secretKey, {
  apiVersion: "2023-10-16",
})

export async function POST(request: Request, { params }: { params: { bidId: string } }) {
  try {
    const bidId = params.bidId
    const body = await request.json()
    const { paymentIntentId, status } = body

    // التحقق من البيانات المطلوبة
    if (!paymentIntentId || !status) {
      return NextResponse.json({ error: "معرف نية الدفع والحالة مطلوبان" }, { status: 400 })
    }

    // التحقق من حالة الدفع في Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

    if (paymentIntent.status !== "succeeded") {
      return NextResponse.json({ error: "لم يتم اكتمال الدفع بعد" }, { status: 400 })
    }

    // في تطبيق حقيقي، هنا سنقوم بتحديث حالة الدفع في قاعدة البيانات
    // مثال: await db.payments.update({ where: { bidId }, data: { status } })

    return NextResponse.json({
      success: true,
      message: "تم تحديث حالة الدفع بنجاح",
    })
  } catch (error) {
    console.error("خطأ في تحديث حالة الدفع:", error)
    return NextResponse.json({ error: "حدث خطأ أثناء تحديث حالة الدفع" }, { status: 500 })
  }
}
