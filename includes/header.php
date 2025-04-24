<!-- Header -->
<header class="header">
    <div class="container">
        <div class="header__wrapper">
            <div class="header__logo">
                <a href="index.php">
                    <img src="assets/images/logo.svg" alt="<?php echo $config['site_name']; ?>" class="logo-light">
                    <img src="assets/images/logo-dark.svg" alt="<?php echo $config['site_name']; ?>" class="logo-dark">
                </a>
            </div>
            
            <nav class="header__nav">
                <ul class="nav__list">
                    <li class="nav__item"><a href="index.php" class="nav__link <?php echo $page == 'home' ? 'active' : ''; ?>">الرئيسية</a></li>
                    <li class="nav__item"><a href="index.php?page=cars" class="nav__link <?php echo $page == 'cars' ? 'active' : ''; ?>">سيارات للبيع</a></li>
                    <li class="nav__item"><a href="index.php?page=auctions" class="nav__link <?php echo $page == 'auctions' ? 'active' : ''; ?>">المزادات</a></li>
                    <li class="nav__item"><a href="index.php?page=add-car" class="nav__link <?php echo $page == 'add-car' ? 'active' : ''; ?>">أضف سيارة</a></li>
                    <?php if ($config['enable_contact']): ?>
                    <li class="nav__item"><a href="index.php?page=contact" class="nav__link <?php echo $page == 'contact' ? 'active' : ''; ?>">تواصل معنا</a></li>
                    <?php endif; ?>
                </ul>
            </nav>
            
            <div class="header__actions">
                <button class="btn-icon theme-toggle" id="themeToggle" aria-label="تبديل الوضع">
                    <i class="fas <?php echo isset($_COOKIE['theme']) && $_COOKIE['theme'] == 'dark' ? 'fa-sun' : 'fa-moon'; ?>"></i>
                </button>
                
                <?php if ($config['enable_multilang']): ?>
                <div class="dropdown language-dropdown">
                    <button class="btn-icon dropdown-toggle" aria-label="تغيير اللغة">
                        <i class="fas fa-globe"></i>
                    </button>
                    <div class="dropdown-menu">
                        <?php foreach ($config['available_langs'] as $lang): ?>
                        <a href="?lang=<?php echo $lang; ?>" class="dropdown-item <?php echo isset($_SESSION['lang']) && $_SESSION['lang'] == $lang ? 'active' : ''; ?>" data-lang="<?php echo $lang; ?>">
                            <?php echo $lang == 'ar' ? 'العربية' : 'English'; ?>
                        </a>
                        <?php endforeach; ?>
                    </div>
                </div>
                <?php endif; ?>
                
                <button class="btn-icon search-toggle" aria-label="بحث">
                    <i class="fas fa-search"></i>
                </button>
                
                <?php if (is_logged_in()): ?>
                <div class="user-menu">
                    <button class="btn-icon user-toggle" aria-label="حسابي">
                        <img src="<?php echo $_SESSION['profile_image']; ?>" alt="<?php echo $_SESSION['name']; ?>" class="user-avatar">
                    </button>
                    <div class="dropdown-menu">
                        <a href="index.php?page=dashboard" class="dropdown-item">لوحة التحكم</a>
                        <a href="index.php?page=profile" class="dropdown-item">الملف الشخصي</a>
                        <a href="index.php?page=my-cars" class="dropdown-item">سياراتي</a>
                        <a href="index.php?page=my-bids" class="dropdown-item">مزايداتي</a>
                        <a href="index.php?page=settings" class="dropdown-item">الإعدادات</a>
                        <a href="index.php?page=logout" class="dropdown-item logout">تسجيل الخروج</a>
                    </div>
                </div>
                <?php else: ?>
                <a href="index.php?page=login" class="btn btn-primary">تسجيل الدخول</a>
                <?php endif; ?>
                
                <button class="btn-icon sidebar-toggle" id="sidebarToggle" aria-label="القائمة الجانبية">
                    <i class="fas fa-bars"></i>
                </button>
            </div>
        </div>
    </div>
</header>

<!-- Search Overlay -->
<div class="search-overlay">
    <div class="container">
        <div class="search-form">
            <form action="index.php" method="get">
                <input type="hidden" name="page" value="search">
                <input type="text" name="q" placeholder="ابحث عن سيارات، مزادات..." class="search-input">
                <button type="submit" class="search-btn">
                    <i class="fas fa-search"></i>
                </button>
                <button type="button" class="search-close">
                    <i class="fas fa-times"></i>
                </button>
            </form>
        </div>
    </div>
</div>

<!-- Sidebar -->
<aside class="sidebar">
    <div class="sidebar__overlay"></div>
    <div class="sidebar__content">
        <div class="sidebar__header">
            <div class="sidebar__logo">
                <img src="assets/images/logo.svg" alt="<?php echo $config['site_name']; ?>" class="logo-light">
                <img src="assets/images/logo-dark.svg" alt="<?php echo $config['site_name']; ?>" class="logo-dark">
            </div>
            <button class="sidebar__close">
                <i class="fas fa-times"></i>
            </button>
        </div>
        
        <?php if (is_logged_in()): ?>
        <div class="sidebar__user">
            <img src="<?php echo $_SESSION['profile_image']; ?>" alt="<?php echo $_SESSION['name']; ?>" class="sidebar__avatar">
            <div class="sidebar__user-info">
                <h4 class="sidebar__user-name"><?php echo $_SESSION['name']; ?></h4>
                <p class="sidebar__user-role">
                    <?php 
                    if ($_SESSION['user_role'] == 'admin') echo 'مدير';
                    elseif ($_SESSION['user_role'] == 'partner') echo 'شريك';
                    else echo 'مستخدم';
                    ?>
                </p>
            </div>
        </div>
        <?php endif; ?>
        
        <nav class="sidebar__nav">
            <ul class="sidebar__list">
                <?php if (is_logged_in()): ?>
                <li class="sidebar__item">
                    <a href="index.php?page=dashboard" class="sidebar__link <?php echo $page == 'dashboard' ? 'active' : ''; ?>">
                        <i class="fas fa-tachometer-alt"></i>
                        <span>لوحة التحكم</span>
                    </a>
                </li>
                <li class="sidebar__item">
                    <a href="index.php?page=active-cars" class="sidebar__link <?php echo $page == 'active-cars' ? 'active' : ''; ?>">
                        <i class="fas fa-car"></i>
                        <span>السيارات المفعّلة</span>
                    </a>
                </li>
                <li class="sidebar__item">
                    <a href="index.php?page=pending-cars" class="sidebar__link <?php echo $page == 'pending-cars' ? 'active' : ''; ?>">
                        <i class="fas fa-clock"></i>
                        <span>السيارات بانتظار الموافقة</span>
                    </a>
                </li>
                <li class="sidebar__item">
                    <a href="index.php?page=active-auctions" class="sidebar__link <?php echo $page == 'active-auctions' ? 'active' : ''; ?>">
                        <i class="fas fa-gavel"></i>
                        <span>المزادات النشطة</span>
                    </a>
                </li>
                <li class="sidebar__item">
                    <a href="index.php?page=sales-history" class="sidebar__link <?php echo $page == 'sales-history' ? 'active' : ''; ?>">
                        <i class="fas fa-history"></i>
                        <span>سجل المبيعات</span>
                    </a>
                </li>
                <li class="sidebar__item">
                    <a href="index.php?page=profits" class="sidebar__link <?php echo $page == 'profits' ? 'active' : ''; ?>">
                        <i class="fas fa-dollar-sign"></i>
                        <span>أرباحي</span>
                    </a>
                </li>
                <li class="sidebar__item">
                    <a href="index.php?page=account-settings" class="sidebar__link <?php echo $page == 'account-settings' ? 'active' : ''; ?>">
                        <i class="fas fa-user-cog"></i>
                        <span>إعدادات الحساب</span>
                    </a>
                </li>
                <li class="sidebar__item">
                    <a href="index.php?page=payment-settings" class="sidebar__link <?php echo $page == 'payment-settings' ? 'active' : ''; ?>">
                        <i class="fas fa-credit-card"></i>
                        <span>إعدادات الدفع</span>
                    </a>
                </li>
                <?php if (is_admin() || is_partner()): ?>
                <li class="sidebar__item">
                    <a href="index.php?page=api-key" class="sidebar__link <?php echo $page == 'api-key' ? 'active' : ''; ?>">
                        <i class="fas fa-key"></i>
                        <span>مفتاح API</span>
                    </a>
                </li>
                <li class="sidebar__item">
                    <a href="index.php?page=integration" class="sidebar__link <?php echo $page == 'integration' ? 'active' : ''; ?>">
                        <i class="fas fa-link"></i>
                        <span>روابط التكامل</span>
                    </a>
                </li>
                <?php endif; ?>
                <li class="sidebar__item">
                    <a href="index.php?page=logout" class="sidebar__link logout">
                        <i class="fas fa-sign-out-alt"></i>
                        <span>تسجيل الخروج</span>
                    </a>
                </li>
                <?php else: ?>
                <li class="sidebar__item">
                    <a href="index.php" class="sidebar__link <?php echo $page == 'home' ? 'active' : ''; ?>">
                        <i class="fas fa-home"></i>
                        <span>الرئيسية</span>
                    </a>
                </li>
                <li class="sidebar__item">
                    <a href="index.php?page=cars" class="sidebar__link <?php echo $page == 'cars' ? 'active' : ''; ?>">
                        <i class="fas fa-car"></i>
                        <span>سيارات للبيع</span>
                    </a>
                </li>
                <li class="sidebar__item">
                    <a href="index.php?page=auctions" class="sidebar__link <?php echo $page == 'auctions' ? 'active' : ''; ?>">
                        <i class="fas fa-gavel"></i>
                        <span>المزادات</span>
                    </a>
                </li>
                <li class="sidebar__item">
                    <a href="index.php?page=add-car" class="sidebar__link <?php echo $page == 'add-car' ? 'active' : ''; ?>">
                        <i class="fas fa-plus-circle"></i>
                        <span>أضف سيارة</span>
                    </a>
                </li>
                <li class="sidebar__item">
                    <a href="index.php?page=about" class="sidebar__link <?php echo $page == 'about' ? 'active' : ''; ?>">
                        <i class="fas fa-info-circle"></i>
                        <span>من نحن</span>
                    </a>
                </li>
                <?php if ($config['enable_contact']): ?>
                <li class="sidebar__item">
                    <a href="index.php?page=contact" class="sidebar__link <?php echo $page == 'contact' ? 'active' : ''; ?>">
                        <i class="fas fa-envelope"></i>
                        <span>تواصل معنا</span>
                    </a>
                </li>
                <?php endif; ?>
                <li class="sidebar__item">
                    <a href="index.php?page=login" class="sidebar__link <?php echo $page == 'login' ? 'active' : ''; ?>">
                        <i class="fas fa-sign-in-alt"></i>
                        <span>تسجيل الدخول</span>
                    </a>
                </li>
                <li class="sidebar__item">
                    <a href="index.php?page=register" class="sidebar__link <?php echo $page == 'register' ? 'active' : ''; ?>">
                        <i class="fas fa-user-plus"></i>
                        <span>إنشاء حساب</span>
                    </a>
                </li>
                <?php endif; ?>
            </ul>
        </nav>
    </div>
</aside>
