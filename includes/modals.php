<!-- Login Modal -->
<div class="modal" id="loginModal">
    <div class="modal__overlay"></div>
    <div class="modal__content">
        <div class="modal__header">
            <h3 class="modal__title">تسجيل الدخول</h3>
            <button class="modal__close"><i class="fas fa-times"></i></button>
        </div>
        <div class="modal__body">
            <form class="login-form" action="index.php?page=login-process" method="post">
                <div class="form-group">
                    <label for="email">البريد الإلكتروني</label>
                    <input type="email" id="email" name="email" placeholder="أدخل بريدك الإلكتروني" required>
                </div>
                <div class="form-group">
                    <label for="password">كلمة المرور</label>
                    <div class="password-input">
                        <input type="password" id="password" name="password" placeholder="أدخل كلمة المرور" required>
                        <button type="button" class="password-toggle"><i class="fas fa-eye"></i></button>
                    </div>
                </div>
                <div class="form-group form-check">
                    <input type="checkbox" id="remember" name="remember">
                    <label for="remember">تذكرني</label>
                    <a href="index.php?page=forgot-password" class="forgot-password">نسيت كلمة المرور؟</a>
                </div>
                <button type="submit" class="btn btn-primary btn-block">تسجيل الدخول</button>
            </form>
            <div class="social-login">
                <p>أو سجل الدخول باستخدام</p>
                <div class="social-buttons">
                    <a href="index.php?page=social-login&provider=google" class="btn btn-social btn-google"><i class="fab fa-google"></i> Google</a>
                    <a href="index.php?page=social-login&provider=facebook" class="btn btn-social btn-facebook"><i class="fab fa-facebook-f"></i> Facebook</a>
                </div>
            </div>
            <div class="register-link">
                <p>ليس لديك حساب؟ <a href="index.php?page=register">إنشاء حساب جديد</a></p>
            </div>
        </div>
    </div>
</div>

<!-- Bid Modal -->
<div class="modal" id="bidModal">
    <div class="modal__overlay"></div>
    <div class="modal__content">
        <div class="modal__header">
            <h3 class="modal__title">تقديم مزايدة جديدة</h3>
            <button class="modal__close"><i class="fas fa-times"></i></button>
        </div>
        <div class="modal__body">
            <form class="bid-form" action="index.php?page=place-bid" method="post">
                <input type="hidden" id="auction_id" name="auction_id" value="">
                <div class="form-group">
                    <label for="current_price">السعر الحالي</label>
                    <input type="text" id="current_price" readonly>
                </div>
                <div class="form-group">
                    <label for="min_bid">الحد الأدنى للمزايدة</label>
                    <input type="text" id="min_bid" readonly>
                </div>
                <div class="form-group">
                    <label for="bid_amount">قيمة المزايدة</label>
                    <input type="number" id="bid_amount" name="bid_amount" min="0" step="1000" required>
                    <small class="form-text">يجب أن تكون قيمة المزايدة أكبر من السعر الحالي والحد الأدنى للمزايدة</small>
                </div>
                <button type="submit" class="btn btn-primary btn-block">تأكيد المزايدة</button>
            </form>
            <div class="bid-terms">
                <p>بالضغط على زر "تأكيد المزايدة"، أنت توافق على <a href="index.php?page=terms">شروط وأحكام</a> المزايدة في الموقع.</p>
            </div>
        </div>
    </div>
</div>

<!-- Delete Confirmation Modal -->
<div class="modal" id="deleteModal">
    <div class="modal__overlay"></div>
    <div class="modal__content">
        <div class="modal__header">
            <h3 class="modal__title">تأكيد الحذف</h3>
            <button class="modal__close"><i class="fas fa-times"></i></button>
        </div>
        <div class="modal__body">
            <p>هل أنت متأكد من رغبتك في حذف هذا العنصر؟ لا يمكن التراجع عن هذا الإجراء.</p>
            <div class="modal__actions">
                <form id="deleteForm" action="" method="post">
                    <input type="hidden" id="delete_id" name="id" value="">
                    <button type="button" class="btn btn-outline modal__close">إلغاء</button>
                    <button type="submit" class="btn btn-danger">تأكيد الحذف</button>
                </form>
            </div>
        </div>
    </div>
</div>

<!-- Notification Modal -->
<div class="modal" id="notificationModal">
    <div class="modal__overlay"></div>
    <div class="modal__content">
        <div class="modal__header">
            <h3 class="modal__title">إشعار</h3>
            <button class="modal__close"><i class="fas fa-times"></i></button>
        </div>
        <div class="modal__body">
            <p id="notificationMessage"></p>
            <div class="modal__actions">
                <button type="button" class="btn btn-primary modal__close">موافق</button>
            </div>
        </div>
    </div>
</div>
