/**
 * تكوين التخزين
 * يحتوي على إعدادات تخزين الملفات
 */

export const storageConfig = {
  // نوع التخزين الافتراضي
  default: "local",

  // إعدادات التخزين المحلي
  local: {
    // المسار الأساسي للتخزين المحلي
    basePath: "public/uploads",

    // عنوان URL الأساسي للوصول إلى الملفات
    baseUrl: "/uploads",
  },

  // إعدادات Amazon S3
  s3: {
    // منطقة AWS
    region: "us-east-1",

    // اسم الحاوية
    bucket: "your-bucket-name",

    // مفتاح الوصول
    accessKey: "your-access-key",

    // المفتاح السري
    secretKey: "your-secret-key",

    // عنوان URL الأساسي للوصول إلى الملفات
    baseUrl: "https://your-bucket-name.s3.amazonaws.com",
  },

  // إعدادات تحميل الصور
  images: {
    // الحد الأقصى لحجم الملف بالبايت
    maxFileSize: 5 * 1024 * 1024, // 5 ميجابايت

    // أنواع MIME المسموح بها
    allowedMimeTypes: ["image/jpeg", "image/png", "image/webp"],

    // الأبعاد الافتراضية للصور المصغرة
    thumbnailDimensions: {
      width: 200,
      height: 200,
    },

    // الأبعاد الافتراضية للصور المتوسطة
    mediumDimensions: {
      width: 800,
      height: 600,
    },

    // الأبعاد الافتراضية للصور الكبيرة
    largeDimensions: {
      width: 1920,
      height: 1080,
    },
  },

  // إعدادات تحميل المستندات
  documents: {
    // الحد الأقصى لحجم الملف بالبايت
    maxFileSize: 10 * 1024 * 1024, // 10 ميجابايت

    // أنواع MIME المسموح بها
    allowedMimeTypes: [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ],
  },
}

/**
 * الحصول على نوع التخزين الافتراضي
 * @returns {string} نوع التخزين الافتراضي
 */
export function getDefaultStorageType(): string {
  return storageConfig.default
}

/**
 * الحصول على إعدادات التخزين المحلي
 * @returns {object} إعدادات التخزين المحلي
 */
export function getLocalStorageConfig(): typeof storageConfig.local {
  return storageConfig.local
}

/**
 * الحصول على إعدادات Amazon S3
 * @returns {object} إعدادات Amazon S3
 */
export function getS3Config(): typeof storageConfig.s3 {
  return storageConfig.s3
}

/**
 * الحصول على إعدادات تحميل الصور
 * @returns {object} إعدادات تحميل الصور
 */
export function getImageUploadConfig(): typeof storageConfig.images {
  return storageConfig.images
}

/**
 * الحصول على إعدادات تحميل المستندات
 * @returns {object} إعدادات تحميل المستندات
 */
export function getDocumentUploadConfig(): typeof storageConfig.documents {
  return storageConfig.documents
}

/**
 * الحصول على المسار الكامل للتخزين المحلي
 * @param {string} path - المسار النسبي
 * @returns {string} المسار الكامل
 */
export function getLocalStoragePath(path = ""): string {
  return `${storageConfig.local.basePath}/${path}`.replace(/\/+/g, "/")
}

/**
 * الحصول على عنوان URL الكامل للتخزين المحلي
 * @param {string} path - المسار النسبي
 * @returns {string} عنوان URL الكامل
 */
export function getLocalStorageUrl(path = ""): string {
  return `${storageConfig.local.baseUrl}/${path}`.replace(/\/+/g, "/")
}

/**
 * الحصول على عنوان URL الكامل لـ Amazon S3
 * @param {string} path - المسار النسبي
 * @returns {string} عنوان URL الكامل
 */
export function getS3Url(path = ""): string {
  return `${storageConfig.s3.baseUrl}/${path}`.replace(/\/+/g, "/")
}
