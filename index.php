<?php
// تضمين ملف التكوين
require_once 'config.php';

// تحديد الصفحة الحالية
$page = isset($_GET['page']) ? clean_input($_GET['page']) : 'home';

// تحديد عنوان الصفحة
$page_title = 'الرئيسية';
switch ($page) {
    case 'cars':
        $page_title = 'سيارات للبيع';
        break;
    case 'auctions':
        $page_title = 'المزادات';
        break;
    case 'add-car':
        $page_title = 'أضف سيارة';
        break;
    case 'car-details':
        $page_title = 'تفاصيل السيارة';
        break;
    case 'auction-details':
        $page_title = 'تفاصيل المزاد';
        break;
    case 'dashboard':
        $page_title = 'لوحة التحكم';
        break;
    case 'profile':
        $page_title = 'الملف الشخصي';
        break;
    case 'login':
        $page_title = 'تسجيل الدخول';
        break;
    case 'register':
        $page_title = 'إنشاء حساب';
        break;
    case 'contact':
        $page_title = 'تواصل معنا';
        break;
    case 'about':
        $page_title = 'من نحن';
        break;
    default:
        $page_title = 'الرئيسية';
}

// استعلام للحصول على المزادات المميزة
$featured_auctions_query = "SELECT a.*, c.title, c.make, c.model, c.year, c.mileage, c.fuel_type, c.color, ci.image_path 
                           FROM auctions a 
                           JOIN cars c ON a.car_id = c.id 
                           JOIN car_images ci ON c.id = ci.car_id 
                           WHERE a.status = 'active' AND ci.is_primary = 1 
                           ORDER BY a.created_at DESC 
                           LIMIT 4";
$featured_auctions_result = mysqli_query($conn, $featured_auctions_query);

// استعلام للحصول على السيارات المميزة للبيع المباشر
$featured_cars_query = "SELECT c.*, ci.image_path 
                       FROM cars c 
                       JOIN car_images ci ON c.id = ci.car_id 
                       WHERE c.status = 'active' AND c.sale_type = 'direct' AND c.featured = 1 AND ci.is_primary = 1 
                       ORDER BY c.created_at DESC 
                       LIMIT 4";
$featured_cars_result = mysqli_query($conn, $featured_cars_query);
?>

<!DOCTYPE html>
<html lang="ar" dir="rtl" data-theme="<?php echo isset($_COOKIE['theme']) ? $_COOKIE['theme'] : 'light'; ?>">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $page_title; ?> - <?php echo $config['site_name']; ?></title>
    <link rel="stylesheet" href="assets/css/main.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
</head>
<body>
    <?php include 'includes/header.php'; ?>
    
    <?php
    // عرض رسائل النظام
    echo display_message();
    
    // تضمين محتوى الصفحة المطلوبة
    $file_path = 'pages/' . $page . '.php';
    if (file_exists($file_path)) {
        include $file_path;
    } else {
        include 'pages/404.php';
    }
    ?>
    
    <?php include 'includes/footer.php'; ?>
    
    <?php include 'includes/modals.php'; ?>
    
    <!-- Back to Top Button -->
    <button class="back-to-top" aria-label="العودة للأعلى">
        <i class="fas fa-arrow-up"></i>
    </button>
    
    <script src="assets/js/main.js"></script>
</body>
</html>
