"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Menu, X, User, ShoppingCart, LogIn, Search, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { NotificationDropdown } from "./notifications/notification-dropdown"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Sidebar } from "./sidebar"
import { ModeToggle } from "@/components/mode-toggle"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  // هذا مجرد مثال - في التطبيق الحقيقي سيتم التحقق من حالة المستخدم
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [showContactButton, setShowContactButton] = useState(true)
  const { theme, setTheme } = useTheme()

  // مثال لمعرف المستخدم - في التطبيق الحقيقي سيتم جلبه من نظام المصادقة
  const userId = 1

  // التحقق من إعدادات الموقع (في التطبيق الحقيقي ستأتي من API)
  useEffect(() => {
    // محاكاة جلب إعدادات الموقع
    const fetchSettings = () => {
      // هنا سيتم استدعاء API لجلب الإعدادات
      setShowContactButton(true) // مثال
    }

    fetchSettings()
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2 rtl:space-x-reverse">
            <span className="inline-block font-bold text-xl">معرض السيارات</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
              الرئيسية
            </Link>
            <Link href="/cars" className="text-sm font-medium transition-colors hover:text-primary">
              سيارات للبيع
            </Link>
            <Link href="/auctions" className="text-sm font-medium transition-colors hover:text-primary">
              مزادات حالية
            </Link>
            <Link href="/add-car" className="text-sm font-medium transition-colors hover:text-primary">
              أضف سيارة
            </Link>
            {showContactButton && (
              <Link href="/contact" className="text-sm font-medium transition-colors hover:text-primary">
                تواصل معنا
              </Link>
            )}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          {/* زر البحث */}
          <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(!isSearchOpen)}>
            <Search className="h-5 w-5" />
            <span className="sr-only">بحث</span>
          </Button>

          {/* زر تبديل الوضع الليلي/النهاري */}
          <ModeToggle />

          {/* زر تغيير اللغة */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Globe className="h-5 w-5" />
                <span className="sr-only">تغيير اللغة</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => (document.documentElement.dir = "rtl")}>العربية</DropdownMenuItem>
              <DropdownMenuItem onClick={() => (document.documentElement.dir = "ltr")}>English</DropdownMenuItem>
              <DropdownMenuItem>Français</DropdownMenuItem>
              <DropdownMenuItem>Español</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {isLoggedIn ? (
            <>
              {/* زر الإشعارات */}
              <NotificationDropdown userId={userId} />

              {/* زر المفضلة */}
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">المفضلة</span>
              </Button>

              {/* صورة المستخدم */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/avatars/user-avatar.png" alt="صورة المستخدم" />
                      <AvatarFallback>م</AvatarFallback>
                    </Avatar>
                    <span className="sr-only">حسابي</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="p-0">
                  <Sidebar />
                </SheetContent>
              </Sheet>
            </>
          ) : (
            <Button variant="ghost" size="sm" className="hidden md:flex" asChild>
              <Link href="/auth/login">
                <LogIn className="h-4 w-4 ml-2" />
                تسجيل الدخول
              </Link>
            </Button>
          )}

          {/* زر القائمة للجوال */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">القائمة</span>
          </Button>
        </div>
      </div>

      {/* شريط البحث */}
      {isSearchOpen && (
        <div className="border-t border-b py-2">
          <div className="container flex items-center">
            <Input
              placeholder="ابحث عن سيارة..."
              className="flex-1"
              autoFocus
              onKeyDown={(e) => e.key === "Escape" && setIsSearchOpen(false)}
            />
            <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}

      {/* قائمة الجوال */}
      {isMenuOpen && (
        <div className="container md:hidden">
          <nav className="flex flex-col gap-4 py-4">
            <Link
              href="/"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              الرئيسية
            </Link>
            <Link
              href="/cars"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              سيارات للبيع
            </Link>
            <Link
              href="/auctions"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              مزادات حالية
            </Link>
            <Link
              href="/add-car"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              أضف سيارة
            </Link>
            {showContactButton && (
              <Link
                href="/contact"
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                تواصل معنا
              </Link>
            )}
            <div className="flex gap-4 pt-2">
              {isLoggedIn ? (
                <>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link href="/profile" onClick={() => setIsMenuOpen(false)}>
                      <User className="h-4 w-4 ml-2" />
                      حسابي
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link href="/profile/favorites" onClick={() => setIsMenuOpen(false)}>
                      <ShoppingCart className="h-4 w-4 ml-2" />
                      المفضلة
                    </Link>
                  </Button>
                </>
              ) : (
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="/auth/login" onClick={() => setIsMenuOpen(false)}>
                    <LogIn className="h-4 w-4 ml-2" />
                    تسجيل الدخول
                  </Link>
                </Button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
