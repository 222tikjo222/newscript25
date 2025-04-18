/**
 * تكوين Stripe
 * يحتوي على مفاتيح API الخاصة بـ Stripe
 * يمكن تعديل هذه القيم يدويًا عند رفع المشروع على الاستضافة
 */

export const stripeConfig = {
  // مفتاح Stripe القابل للنشر (للواجهة الأمامية)
  publishableKey: "pk_test_51NXtYXXXXXXXXXXXXXXXXXXX",

  // المفتاح السري لـ Stripe (للخادم)
  secretKey: "sk_test_51NXtYXXXXXXXXXXXXXXXXXXX",

  // سر Webhook الخاص بـ Stripe
  webhookSecret: "whsec_XXXXXXXXXXXXXXXXXXXXXXXX",

  // عملة الدفع الافتراضية
  currency: "SAR",

  // إعدادات إضافية
  options: {
    // تمكين وضع الاختبار
    testMode: true,

    // اللغة الافتراضية للواجهة
    locale: "ar",

    // تمكين الدفع بالأقساط
    allowInstallments: true,
  },
}

/**
 * الحصول على مفتاح Stripe القابل للنشر
 * @returns {string} مفتاح Stripe القابل للنشر
 */
export function getPublishableKey(): string {
  return stripeConfig.publishableKey
}

/**
 * الحصول على المفتاح السري لـ Stripe
 * @returns {string} المفتاح السري لـ Stripe
 */
export function getSecretKey(): string {
  return stripeConfig.secretKey
}

/**
 * الحصول على سر Webhook الخاص بـ Stripe
 * @returns {string} سر Webhook الخاص بـ Stripe
 */
export function getWebhookSecret(): string {
  return stripeConfig.webhookSecret
}

/**
 * الحصول على عملة الدفع الافتراضية
 * @returns {string} عملة الدفع الافتراضية
 */
export function getCurrency(): string {
  return stripeConfig.currency
}

/**
 * التحقق مما إذا كان وضع الاختبار ممكّنًا
 * @returns {boolean} ما إذا كان وضع الاختبار ممكّنًا
 */
export function isTestMode(): boolean {
  return stripeConfig.options.testMode
}
