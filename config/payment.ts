/**
 * تكوين المدفوعات
 * يحتوي على إعدادات بوابات الدفع
 */

export const paymentConfig = {
  // بوابة الدفع الافتراضية
  default: "stripe",

  // إعدادات Stripe
  stripe: {
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
  },

  // إعدادات PayPal
  paypal: {
    // معرف العميل
    clientId: "your-paypal-client-id",

    // المفتاح السري
    clientSecret: "your-paypal-client-secret",

    // عملة الدفع الافتراضية
    currency: "USD",

    // إعدادات إضافية
    options: {
      // تمكين وضع الاختبار
      sandbox: true,

      // اللغة الافتراضية للواجهة
      locale: "ar_SA",
    },
  },

  // إعدادات مدى
  mada: {
    // معرف التاجر
    merchantId: "your-mada-merchant-id",

    // المفتاح السري
    secretKey: "your-mada-secret-key",

    // عملة الدفع الافتراضية
    currency: "SAR",

    // إعدادات إضافية
    options: {
      // تمكين وضع الاختبار
      testMode: true,
    },
  },

  // إعدادات Apple Pay
  applePay: {
    // معرف التاجر
    merchantId: "your-apple-pay-merchant-id",

    // شهادة التاجر
    merchantCertificate: "your-apple-pay-merchant-certificate",

    // المفتاح الخاص
    privateKey: "your-apple-pay-private-key",

    // عملة الدفع الافتراضية
    currency: "SAR",

    // إعدادات إضافية
    options: {
      // تمكين وضع الاختبار
      testMode: true,
    },
  },
}

/**
 * الحصول على بوابة الدفع الافتراضية
 * @returns {string} بوابة الدفع الافتراضية
 */
export function getDefaultPaymentGateway(): string {
  return paymentConfig.default
}

/**
 * الحصول على إعدادات Stripe
 * @returns {object} إعدادات Stripe
 */
export function getStripeConfig(): typeof paymentConfig.stripe {
  return paymentConfig.stripe
}

/**
 * الحصول على مفتاح Stripe القابل للنشر
 * @returns {string} مفتاح Stripe القابل للنشر
 */
export function getStripePublishableKey(): string {
  return paymentConfig.stripe.publishableKey
}

/**
 * الحصول على المفتاح السري لـ Stripe
 * @returns {string} المفتاح السري لـ Stripe
 */
export function getStripeSecretKey(): string {
  return paymentConfig.stripe.secretKey
}

/**
 * الحصول على سر Webhook الخاص بـ Stripe
 * @returns {string} سر Webhook الخاص بـ Stripe
 */
export function getStripeWebhookSecret(): string {
  return paymentConfig.stripe.webhookSecret
}

/**
 * الحصول على إعدادات PayPal
 * @returns {object} إعدادات PayPal
 */
export function getPayPalConfig(): typeof paymentConfig.paypal {
  return paymentConfig.paypal
}

/**
 * الحصول على إعدادات مدى
 * @returns {object} إعدادات مدى
 */
export function getMadaConfig(): typeof paymentConfig.mada {
  return paymentConfig.mada
}
