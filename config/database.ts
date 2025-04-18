/**
 * تكوين قاعدة البيانات
 * يحتوي على إعدادات الاتصال بقاعدة البيانات
 */

export const databaseConfig = {
  // نوع قاعدة البيانات
  driver: "mysql",

  // اسم المضيف
  host: "localhost",

  // رقم المنفذ
  port: 3306,

  // اسم قاعدة البيانات
  database: "car_auction",

  // اسم المستخدم
  username: "root",

  // كلمة المرور
  password: "",

  // خيارات إضافية
  options: {
    // تمكين التخزين المؤقت للاستعلامات
    enableQueryCache: true,

    // الحد الأقصى لعدد الاتصالات في المجمع
    poolMax: 10,

    // الحد الأدنى لعدد الاتصالات في المجمع
    poolMin: 2,

    // مهلة الاتصال بالثواني
    connectionTimeout: 30,

    // مهلة الاستعلام بالثواني
    queryTimeout: 60,
  },
}

/**
 * الحصول على سلسلة اتصال قاعدة البيانات
 * @returns {string} سلسلة اتصال قاعدة البيانات
 */
export function getConnectionString(): string {
  const { driver, host, port, database, username, password } = databaseConfig
  return `${driver}://${username}:${password}@${host}:${port}/${database}`
}

/**
 * الحصول على إعدادات قاعدة البيانات
 * @returns {object} إعدادات قاعدة البيانات
 */
export function getDatabaseConfig(): typeof databaseConfig {
  return databaseConfig
}

/**
 * الحصول على خيارات قاعدة البيانات
 * @returns {object} خيارات قاعدة البيانات
 */
export function getDatabaseOptions(): typeof databaseConfig.options {
  return databaseConfig.options
}
