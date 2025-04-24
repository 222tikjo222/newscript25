/**
 * تكوين التطبيق
 * يحتوي على الإعدادات العامة للتطبيق
 */

export const appConfig = {
  // اسم التطبيق
  name: "مزاد السيارات",

  // وصف التطبيق
  description: "منصة مزادات السيارات الأولى في المملكة العربية السعودية",

  // عنوان URL الأساسي للتطبيق
  baseUrl: "https://car-auction.example.com",

  // اللغة الافتراضية
  locale: "ar",

  // المنطقة الزمنية الافتراضية
  timezone: "Asia/Riyadh",

  // إعدادات البريد الإلكتروني
  email: {
    // عنوان البريد الإلكتروني للدعم
    support: "support@car-auction.example.com",

    // عنوان البريد الإلكتروني للمبيعات
    sales: "sales@car-auction.example.com",

    // عنوان البريد الإلكتروني للإشعارات
    notifications: "no-reply@car-auction.example.com",
  },

  // إعدادات وسائل التواصل الاجتماعي
  social: {
    // رابط صفحة Facebook
    facebook: "https://facebook.com/carauction",

    // رابط حساب Twitter
    twitter: "https://twitter.com/carauction",

    // رابط حساب Instagram
    instagram: "https://instagram.com/carauction",

    // رابط قناة YouTube
    youtube: "https://youtube.com/carauction",
  },

  // إعدادات المزادات
  auction: {
    // المدة الافتراضية للمزاد بالأيام
    defaultDuration: 7,

    // الحد الأدنى للزيادة في المزايدة
    minBidIncrement: 500,

    // رسوم التسجيل في المزاد
    registrationFee: 100,

    // نسبة عمولة المنصة من سعر البيع النهائي
    commissionRate: 0.05,
  },

  // إعدادات الشركاء
  partners: {
    // نسبة الربح الافتراضية للشركاء
    defaultProfitRate: 0.02,

    // الحد الأدنى للمبلغ المطلوب للسحب
    minWithdrawalAmount: 1000,
  },
}

/**
 * الحصول على اسم التطبيق
 * @returns {string} اسم التطبيق
 */
export function getAppName(): string {
  return appConfig.name
}

/**
 * الحصول على وصف التطبيق
 * @returns {string} وصف التطبيق
 */
export function getAppDescription(): string {
  return appConfig.description
}

/**
 * الحصول على عنوان URL الأساسي للتطبيق
 * @returns {string} عنوان URL الأساسي للتطبيق
 */
export function getBaseUrl(): string {
  return appConfig.baseUrl
}

/**
 * الحصول على اللغة الافتراضية
 * @returns {string} اللغة الافتراضية
 */
export function getLocale(): string {
  return appConfig.locale
}

/**
 * الحصول على المنطقة الزمنية الافتراضية
 * @returns {string} المنطقة الزمنية الافتراضية
 */
export function getTimezone(): string {
  return appConfig.timezone
}

/**
 * الحصول على إعدادات البريد الإلكتروني
 * @returns {object} إعدادات البريد الإلكتروني
 */
export function getEmailConfig(): typeof appConfig.email {
  return appConfig.email
}

/**
 * الحصول على إعدادات وسائل التواصل الاجتماعي
 * @returns {object} إعدادات وسائل التواصل الاجتماعي
 */
export function getSocialConfig(): typeof appConfig.social {
  return appConfig.social
}

/**
 * الحصول على إعدادات المزادات
 * @returns {object} إعدادات المزادات
 */
export function getAuctionConfig(): typeof appConfig.auction {
  return appConfig.auction
}

/**
 * الحصول على إعدادات الشركاء
 * @returns {object} إعدادات الشركاء
 */
export function getPartnersConfig(): typeof appConfig.partners {
  return appConfig.partners
}
