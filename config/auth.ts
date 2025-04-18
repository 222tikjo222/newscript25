/**
 * تكوين المصادقة
 * يحتوي على إعدادات المصادقة والتفويض
 */

export const authConfig = {
  // مدة صلاحية الجلسة بالدقائق
  sessionLifetime: 60 * 24, // 24 ساعة

  // مفتاح التشفير للجلسة
  sessionSecret: "your-secret-key-change-this-in-production",

  // مدة صلاحية رمز إعادة تعيين كلمة المرور بالدقائق
  passwordResetTokenLifetime: 60, // ساعة واحدة

  // مدة صلاحية رمز التحقق من البريد الإلكتروني بالدقائق
  emailVerificationTokenLifetime: 60 * 24, // 24 ساعة

  // الحد الأقصى لعدد محاولات تسجيل الدخول الفاشلة
  maxLoginAttempts: 5,

  // مدة القفل بعد تجاوز الحد الأقصى لمحاولات تسجيل الدخول بالدقائق
  lockoutDuration: 30, // 30 دقيقة

  // تمكين المصادقة الثنائية
  enableTwoFactorAuth: false,

  // تمكين تسجيل الدخول الاجتماعي
  enableSocialLogin: true,

  // إعدادات تسجيل الدخول الاجتماعي
  socialLogin: {
    // إعدادات Google
    google: {
      clientId: "your-google-client-id",
      clientSecret: "your-google-client-secret",
    },

    // إعدادات Facebook
    facebook: {
      appId: "your-facebook-app-id",
      appSecret: "your-facebook-app-secret",
    },

    // إعدادات Twitter
    twitter: {
      consumerKey: "your-twitter-consumer-key",
      consumerSecret: "your-twitter-consumer-secret",
    },
  },

  // إعدادات JWT
  jwt: {
    // مفتاح التوقيع
    secret: "your-jwt-secret-key-change-this-in-production",

    // مدة الصلاحية بالثواني
    expiresIn: 86400, // 24 ساعة

    // خوارزمية التوقيع
    algorithm: "HS256",
  },
}

/**
 * الحصول على مدة صلاحية الجلسة
 * @returns {number} مدة صلاحية الجلسة بالدقائق
 */
export function getSessionLifetime(): number {
  return authConfig.sessionLifetime
}

/**
 * الحصول على مفتاح تشفير الجلسة
 * @returns {string} مفتاح تشفير الجلسة
 */
export function getSessionSecret(): string {
  return authConfig.sessionSecret
}

/**
 * الحصول على مدة صلاحية رمز إعادة تعيين كلمة المرور
 * @returns {number} مدة صلاحية رمز إعادة تعيين كلمة المرور بالدقائق
 */
export function getPasswordResetTokenLifetime(): number {
  return authConfig.passwordResetTokenLifetime
}

/**
 * الحصول على مدة صلاحية رمز التحقق من البريد الإلكتروني
 * @returns {number} مدة صلاحية رمز التحقق من البريد الإلكتروني بالدقائق
 */
export function getEmailVerificationTokenLifetime(): number {
  return authConfig.emailVerificationTokenLifetime
}

/**
 * الحصول على الحد الأقصى لعدد محاولات تسجيل الدخول الفاشلة
 * @returns {number} الحد الأقصى لعدد محاولات تسجيل الدخول الفاشلة
 */
export function getMaxLoginAttempts(): number {
  return authConfig.maxLoginAttempts
}

/**
 * الحصول على مدة القفل بعد تجاوز الحد الأقصى لمحاولات تسجيل الدخول
 * @returns {number} مدة القفل بالدقائق
 */
export function getLockoutDuration(): number {
  return authConfig.lockoutDuration
}

/**
 * التحقق مما إذا كانت المصادقة الثنائية ممكّنة
 * @returns {boolean} ما إذا كانت المصادقة الثنائية ممكّنة
 */
export function isTwoFactorAuthEnabled(): boolean {
  return authConfig.enableTwoFactorAuth
}

/**
 * التحقق مما إذا كان تسجيل الدخول الاجتماعي ممكّنًا
 * @returns {boolean} ما إذا كان تسجيل الدخول الاجتماعي ممكّنًا
 */
export function isSocialLoginEnabled(): boolean {
  return authConfig.enableSocialLogin
}

/**
 * الحصول على إعدادات تسجيل الدخول الاجتماعي
 * @returns {object} إعدادات تسجيل الدخول الاجتماعي
 */
export function getSocialLoginConfig(): typeof authConfig.socialLogin {
  return authConfig.socialLogin
}

/**
 * الحصول على إعدادات JWT
 * @returns {object} إعدادات JWT
 */
export function getJwtConfig(): typeof authConfig.jwt {
  return authConfig.jwt
}
