/**
 * ملف التكوين الرئيسي للتطبيق
 * يمكن تعديل هذه القيم يدويًا عند رفع المشروع على الاستضافة
 */

// تكوين Stripe
export const stripeConfig = {
  publishableKey: "pk_test_51NXxXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  secretKey: "sk_test_51NXxXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  webhookSecret: "whsec_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  currency: "SAR",
}

// تكوين الموقع
export const siteConfig = {
  name: "أوتو مزاد",
  description: "منصة مزادات السيارات الأولى في المملكة العربية السعودية",
  url: "https://autoauction.sa",
  ogImage: "https://autoauction.sa/og-image.jpg",
  links: {
    twitter: "https://twitter.com/autoauction",
    github: "https://github.com/autoauction",
  },
}

// تكوين API
export const apiConfig = {
  baseUrl: "https://api.autoauction.sa",
  timeout: 10000,
  retries: 3,
}

// تكوين الشركاء
export const partnersConfig = {
  commissionRate: 5, // نسبة العمولة للشركاء (5%)
  minimumWithdrawal: 100, // الحد الأدنى للسحب
  paymentMethods: ["bank_transfer", "paypal", "wallet"],
}

// تكوين واجهة المستخدم
export const uiConfig = {
  showContactUs: true,
  enableDarkMode: true,
  enableMultiLanguage: true,
  defaultLanguage: "ar",
  supportedLanguages: ["ar", "en"],
}
