<!-- Footer -->
<footer class="footer">
    <div class="container">
        <div class="footer__top">
            <div class="footer__logo">
                <img src="assets/images/logo.svg" alt="<?php echo $config['site_name']; ?>" class="logo-light">
                <img src="assets/images/logo-dark.svg" alt="<?php echo $config['site_name']; ?>" class="logo-dark">
            </div>
            
            <div class="footer__nav">
                <div class="footer__col">
                    <h4 class="footer__title">روابط سريعة</h4>
                    <ul class="footer__links">
                        <li><a href="index.php">الرئيسية</a></li>
                        <li><a href="index.php?page=cars">سيارات للبيع</a></li>
                        <li><a href="index.php?page=auctions">المزادات</a></li>
                        <li><a href="index.php?page=add-car">أضف سيارة</a></li>
                        <?php if ($config['enable_contact']): ?>
                        <li><a href="index.php?page=contact">تواصل معنا</a></li>
                        <?php endif; ?>
                    </ul>
                </div>
                
                <div class="footer__col">
                    <h4 class="footer__title">حسابي</h4>
                    <ul class="footer__links">
                        <li><a href="index.php?page=dashboard">لوحة التحكم</a></li>
                        <li><a href="index.php?page=profile">الملف الشخصي</a></li>
                        <li><a href="index.php?page=my-cars">سياراتي</a></li>
                        <li><a href="index.php?page=my-bids">مزايداتي</a></li>
                        <li><a href="index.php?page=settings">الإعدادات</a></li>
                    </ul>
                </div>
                
                <div class="footer__col">
                    <h4 class="footer__title">معلومات</h4>
                    <ul class="footer__links">
                        <li><a href="index.php?page=about">من نحن</a></li>
                        <li><a href="index.php?page=terms">الشروط والأحكام</a></li>
                        <li><a href="index.php?page=privacy">سياسة الخصوصية</a></li>
                        <li><a href="index.php?page=faq">الأسئلة الشائعة</a></li>
                        <li><a href="index.php?page=blog">المدونة</a></li>
                    </ul>
                </div>
                
                <div class="footer__col">
                    <h4 class="footer__title">تواصل معنا</h4>
                    <ul class="footer__contact">
                        <li><i class="fas fa-map-marker-alt"></i> <?php echo $config['contact_address']; ?></li>
                        <li><i class="fas fa-phone"></i> <?php echo $config['contact_phone']; ?></li>
                        <li><i class="fas fa-envelope"></i> <?php echo $config['contact_email']; ?></li>
                    </ul>
                    
                    <div class="footer__social">
                        <a href="#" class="social-link"><i class="fab fa-facebook-f"></i></a>
                        <a href="#" class="social-link"><i class="fab fa-twitter"></i></a>
                        <a href="#" class="social-link"><i class="fab fa-instagram"></i></a>
                        <a href="#" class="social-link"><i class="fab fa-linkedin-in"></i></a>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="footer__bottom">
            <p class="footer__copyright">© <?php echo date('Y'); ?> <?php echo $config['site_name']; ?>. جميع الحقوق محفوظة.</p>
            <div class="footer__payment">
                <span>طرق الدفع المقبولة:</span>
                <img src="assets/images/payment/visa.png" alt="Visa">
                <img src="assets/images/payment/mastercard.png" alt="Mastercard">
                <img src="assets/images/payment/paypal.png" alt="PayPal">
                <img src="assets/images/payment/mada.png" alt="Mada">
            </div>
        </div>
    </div>
</footer>
