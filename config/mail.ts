/**
 * تكوين البريد الإلكتروني
 * يحتوي على إعدادات خادم البريد الإلكتروني
 */

export const mailConfig = {
  // نوع النقل
  driver: "smtp",

  // اسم المضيف
  host: "smtp.example.com",

  // رقم المنفذ
  port: 587,

  // اسم المستخدم
  username: "your-username",

  // كلمة المرور
  password: "your-password",

  // استخدام SSL/TLS
  secure: true,

  // عنوان البريد الإلكتروني للمرسل
  fromAddress: "no-reply@car-auction.example.com",

  // اسم المرسل
  fromName: "مزاد السيارات",

  // إعدادات إضافية
  options: {
    // تمكين التتبع
    enableTracking: true,

    // تمكين التحليلات
    enableAnalytics: true,

    // مهلة الاتصال بالثواني
    connectionTimeout: 30,
  },
}

/**
 * الحصول على إعدادات البريد الإلكتروني
 * @returns {object} إعدادات البريد الإلكتروني
 */
export function getMailConfig(): typeof mailConfig {
  return mailConfig
}

/**
 * الحصول على عنوان البريد الإلكتروني للمرسل
 * @returns {string} عنوان البريد الإلكتروني للمرسل
 */
export function getFromAddress(): string {
  return mailConfig.fromAddress
}

/**
 * الحصول على اسم المرسل
 * @returns {string} اسم المرسل
 */
export function getFromName(): string {
  return mailConfig.fromName
}

/**
 * الحصول على إعدادات SMTP
 * @returns {object} إعدادات SMTP
 */
export function getSmtpConfig(): {
  host: string
  port: number
  secure: boolean
  auth: {
    user: string
    pass: string
  }
} {
  return {
    host: mailConfig.host,
    port: mailConfig.port,
    secure: mailConfig.secure,
    auth: {
      user: mailConfig.username,
      pass: mailConfig.password,
    },
  }
}
