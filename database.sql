-- إنشاء قاعدة البيانات
CREATE DATABASE IF NOT EXISTS auto_auction CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE auto_auction;

-- جدول المستخدمين
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    city VARCHAR(50),
    country VARCHAR(50),
    profile_image VARCHAR(255) DEFAULT 'assets/images/avatar.png',
    role ENUM('user', 'admin', 'partner') DEFAULT 'user',
    status ENUM('active', 'inactive', 'banned') DEFAULT 'active',
    partner_code VARCHAR(20) UNIQUE,
    balance DECIMAL(10, 2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- جدول السيارات
CREATE TABLE IF NOT EXISTS cars (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    make VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    year INT NOT NULL,
    mileage INT NOT NULL,
    fuel_type ENUM('petrol', 'diesel', 'electric', 'hybrid') NOT NULL,
    color VARCHAR(30) NOT NULL,
    transmission ENUM('automatic', 'manual') NOT NULL,
    engine_size VARCHAR(20) NOT NULL,
    description TEXT NOT NULL,
    features TEXT,
    price DECIMAL(10, 2) NOT NULL,
    sale_type ENUM('direct', 'auction') NOT NULL,
    status ENUM('pending', 'active', 'sold', 'rejected') DEFAULT 'pending',
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- جدول صور السيارات
CREATE TABLE IF NOT EXISTS car_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    car_id INT NOT NULL,
    image_path VARCHAR(255) NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (car_id) REFERENCES cars(id) ON DELETE CASCADE
);

-- جدول المزادات
CREATE TABLE IF NOT EXISTS auctions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    car_id INT NOT NULL,
    start_price DECIMAL(10, 2) NOT NULL,
    current_price DECIMAL(10, 2) NOT NULL,
    min_increment DECIMAL(10, 2) NOT NULL,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    status ENUM('pending', 'active', 'completed', 'cancelled') DEFAULT 'pending',
    winner_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (car_id) REFERENCES cars(id) ON DELETE CASCADE,
    FOREIGN KEY (winner_id) REFERENCES users(id) ON DELETE SET NULL
);

-- جدول المزايدات
CREATE TABLE IF NOT EXISTS bids (
    id INT AUTO_INCREMENT PRIMARY KEY,
    auction_id INT NOT NULL,
    user_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (auction_id) REFERENCES auctions(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- جدول المعاملات
CREATE TABLE IF NOT EXISTS transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    type ENUM('deposit', 'withdrawal', 'commission', 'sale', 'purchase') NOT NULL,
    status ENUM('pending', 'completed', 'failed', 'cancelled') DEFAULT 'pending',
    reference_id VARCHAR(100),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- جدول طلبات السحب
CREATE TABLE IF NOT EXISTS withdrawal_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    payment_method ENUM('bank_transfer', 'paypal') NOT NULL,
    payment_details TEXT NOT NULL,
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- جدول الإعدادات
CREATE TABLE IF NOT EXISTS settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(100) NOT NULL UNIQUE,
    setting_value TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- جدول الإشعارات
CREATE TABLE IF NOT EXISTS notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    link VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- جدول المواقع الفرعية للشركاء
CREATE TABLE IF NOT EXISTS partner_sites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    site_name VARCHAR(100) NOT NULL,
    site_url VARCHAR(255),
    site_logo VARCHAR(255),
    theme_color VARCHAR(20) DEFAULT '#2563eb',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- جدول مفاتيح API
CREATE TABLE IF NOT EXISTS api_keys (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    api_key VARCHAR(64) NOT NULL UNIQUE,
    is_active BOOLEAN DEFAULT TRUE,
    last_used TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- إدخال بيانات تجريبية للمستخدمين
INSERT INTO users (name, email, password, phone, role, status) VALUES
('مدير النظام', 'admin@autoauction.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '0500000000', 'admin', 'active'),
('أحمد محمد', 'ahmed@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '0511111111', 'user', 'active'),
('فهد السالم', 'fahad@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '0522222222', 'partner', 'active'),
('سارة الأحمد', 'sara@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '0533333333', 'user', 'active');

-- إدخال بيانات تجريبية للسيارات
INSERT INTO cars (user_id, title, make, model, year, mileage, fuel_type, color, transmission, engine_size, description, price, sale_type, status, featured) VALUES
(3, 'مرسيدس S-Class 2023', 'Mercedes-Benz', 'S-Class', 2023, 5000, 'petrol', 'أسود', 'automatic', '4.0L V8', 'سيارة فاخرة بحالة ممتازة مع جميع المواصفات', 320000.00, 'auction', 'active', 1),
(3, 'بي إم دبليو X7 2022', 'BMW', 'X7', 2022, 12000, 'petrol', 'أبيض', 'automatic', '3.0L', 'سيارة دفع رباعي فاخرة بحالة ممتازة', 280000.00, 'auction', 'active', 1),
(2, 'لكزس LX600 2023', 'Lexus', 'LX600', 2023, 3500, 'petrol', 'أسود', 'automatic', '3.5L V6', 'سيارة دفع رباعي فاخرة بحالة الوكالة', 420000.00, 'auction', 'active', 1),
(2, 'أودي A8 2022', 'Audi', 'A8', 2022, 8000, 'petrol', 'فضي', 'automatic', '3.0L V6', 'سيارة فاخرة بمواصفات عالية', 290000.00, 'auction', 'active', 1),
(3, 'رينج روفر سبورت 2023', 'Land Rover', 'Range Rover Sport', 2023, 2000, 'petrol', 'أسود', 'automatic', '3.0L', 'سيارة دفع رباعي فاخرة بحالة ممتازة', 450000.00, 'direct', 'active', 1),
(2, 'جي إم سي يوكن دينالي 2022', 'GMC', 'Yukon Denali', 2022, 15000, 'petrol', 'أبيض', 'automatic', '6.2L V8', 'سيارة دفع رباعي كبيرة بمواصفات كاملة', 320000.00, 'direct', 'active', 1),
(3, 'بورش كايين GTS 2023', 'Porsche', 'Cayenne GTS', 2023, 4500, 'petrol', 'أحمر', 'automatic', '4.0L V8', 'سيارة رياضية متعددة الاستخدامات بأداء عالي', 380000.00, 'direct', 'active', 1),
(2, 'مرسيدس G63 AMG 2022', 'Mercedes-Benz', 'G63 AMG', 2022, 10000, 'petrol', 'أسود', 'automatic', '4.0L V8', 'سيارة دفع رباعي فاخرة بأداء رياضي', 550000.00, 'direct', 'active', 1);

-- إدخال بيانات تجريبية لصور السيارات
INSERT INTO car_images (car_id, image_path, is_primary) VALUES
(1, 'assets/images/cars/mercedes-s-class.jpg', 1),
(2, 'assets/images/cars/bmw-x7.jpg', 1),
(3, 'assets/images/cars/lexus-lx600.jpg', 1),
(4, 'assets/images/cars/audi-a8.jpg', 1),
(5, 'assets/images/cars/range-rover.jpg', 1),
(6, 'assets/images/cars/gmc-yukon.jpg', 1),
(7, 'assets/images/cars/porsche-cayenne.jpg', 1),
(8, 'assets/images/cars/mercedes-g-class.jpg', 1);

-- إدخال بيانات تجريبية للمزادات
INSERT INTO auctions (car_id, start_price, current_price, min_increment, start_date, end_date, status) VALUES
(1, 300000.00, 320000.00, 5000.00, NOW() - INTERVAL 2 DAY, NOW() + INTERVAL 2 DAY, 'active'),
(2, 250000.00, 280000.00, 5000.00, NOW() - INTERVAL 3 DAY, NOW() + INTERVAL 1 DAY, 'active'),
(3, 400000.00, 420000.00, 10000.00, NOW() - INTERVAL 1 DAY, NOW() + INTERVAL 3 DAY, 'active'),
(4, 270000.00, 290000.00, 5000.00, NOW() - INTERVAL 2 DAY, NOW() + INTERVAL 1 DAY, 'active');

-- إدخال بيانات تجريبية للمزايدات
INSERT INTO bids (auction_id, user_id, amount) VALUES
(1, 2, 305000.00),
(1, 4, 310000.00),
(1, 2, 315000.00),
(1, 4, 320000.00),
(2, 2, 255000.00),
(2, 4, 260000.00),
(2, 2, 265000.00),
(2, 4, 270000.00),
(2, 2, 275000.00),
(2, 4, 280000.00),
(3, 2, 410000.00),
(3, 4, 420000.00),
(4, 2, 280000.00),
(4, 4, 285000.00),
(4, 2, 290000.00);

-- إدخال بيانات تجريبية للإعدادات
INSERT INTO settings (setting_key, setting_value) VALUES
('site_name', 'أوتو مزاد'),
('site_description', 'أفضل منصة لمزادات السيارات في الشرق الأوسط'),
('contact_email', 'info@autoauction.com'),
('contact_phone', '+966 12 345 6789'),
('contact_address', 'الرياض، المملكة العربية السعودية'),
('auction_fee', '5'),
('partner_commission', '5'),
('min_withdrawal', '500'),
('enable_dark_mode', 'true'),
('enable_contact', 'true'),
('enable_multilang', 'true'),
('default_lang', 'ar');

-- إدخال بيانات تجريبية للمواقع الفرعية للشركاء
INSERT INTO partner_sites (user_id, site_name, site_url, theme_color, is_active) VALUES
(3, 'سيارات فهد', 'fahad-cars', '#2563eb', 1);

-- إدخال بيانات تجريبية لمفاتيح API
INSERT INTO api_keys (user_id, api_key, is_active) VALUES
(3, '7f58dcc2e0b6c63f45f3f7a0c9e4b215a9b9b8b7a6a5a4a3a2a1a0a9a8a7a6a5', 1);
