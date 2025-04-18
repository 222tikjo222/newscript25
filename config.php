<?php
// معلومات الاتصال بقاعدة البيانات
define('DB_SERVER', 'localhost');
define('DB_USERNAME', 'username'); // قم بتغيير اسم المستخدم الخاص بك
define('DB_PASSWORD', 'password'); // قم بتغيير كلمة المرور الخاصة بك
define('DB_NAME', 'auto_auction'); // قم بتغيير اسم قاعدة البيانات الخاصة بك

// محاولة الاتصال بقاعدة البيانات
$conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);

// التحقق من الاتصال
if($conn === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}

// تعيين ترميز الاتصال إلى UTF-8
mysqli_set_charset($conn, "utf8mb4");

// إعدادات الموقع
$config = [
    'site_name' => 'أوتو مزاد',
    'site_url' => 'https://www.autoauction.com', // قم بتغييره إلى رابط موقعك
    'admin_email' => 'admin@autoauction.com',
    'currency' => 'ريال',
    'currency_symbol' => 'ر.س',
    'auction_fee' => 5, // نسبة عمولة الموقع من المزادات (%)
    'partner_commission' => 5, // نسبة عمولة الشركاء (%)
    'min_withdrawal' => 500, // الحد الأدنى لطلب سحب الأرباح
    'enable_dark_mode' => true,
    'enable_contact' => true,
    'enable_multilang' => true,
    'default_lang' => 'ar',
    'available_langs' => ['ar', 'en'],
    'stripe_public_key' => 'your_stripe_public_key',
    'stripe_secret_key' => 'your_stripe_secret_key',
    'paypal_client_id' => 'your_paypal_client_id',
    'paypal_secret' => 'your_paypal_secret',
];

// دالة لتنظيف المدخلات
function clean_input($data) {
    global $conn;
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    $data = mysqli_real_escape_string($conn, $data);
    return $data;
}

// دالة للتحقق من تسجيل دخول المستخدم
function is_logged_in() {
    return isset($_SESSION['user_id']);
}

// دالة للتحقق من صلاحيات المستخدم
function is_admin() {
    return isset($_SESSION['user_role']) && $_SESSION['user_role'] == 'admin';
}

// دالة للتحقق من صلاحيات الشريك
function is_partner() {
    return isset($_SESSION['user_role']) && $_SESSION['user_role'] == 'partner';
}

// دالة لإعادة توجيه المستخدم
function redirect($url) {
    header("Location: $url");
    exit;
}

// دالة لإنشاء رسالة تنبيه
function set_message($message, $type = 'success') {
    $_SESSION['message'] = $message;
    $_SESSION['message_type'] = $type;
}

// دالة لعرض رسالة التنبيه
function display_message() {
    if(isset($_SESSION['message'])) {
        $message = $_SESSION['message'];
        $type = $_SESSION['message_type'];
        unset($_SESSION['message']);
        unset($_SESSION['message_type']);
        return "<div class='alert alert-{$type}'>{$message}</div>";
    }
    return '';
}

// دالة لتحويل التاريخ إلى صيغة عربية
function format_date($date) {
    $months = [
        'January' => 'يناير',
        'February' => 'فبراير',
        'March' => 'مارس',
        'April' => 'أبريل',
        'May' => 'مايو',
        'June' => 'يونيو',
        'July' => 'يوليو',
        'August' => 'أغسطس',
        'September' => 'سبتمبر',
        'October' => 'أكتوبر',
        'November' => 'نوفمبر',
        'December' => 'ديسمبر'
    ];
    
    $formatted = date('j F Y', strtotime($date));
    
    foreach($months as $en => $ar) {
        $formatted = str_replace($en, $ar, $formatted);
    }
    
    return $formatted;
}

// دالة لتنسيق المبالغ المالية
function format_currency($amount) {
    global $config;
    return number_format($amount, 0) . ' ' . $config['currency_symbol'];
}

// بدء الجلسة
session_start();
?>
