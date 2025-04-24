"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Search, Sun, Moon, Globe, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { uiConfig, siteConfig } from "@/config"

interface NavbarProps {
  user?: {
    name: string
    email: string
    image?: string
  } | null
}

export function Navbar({ user }: NavbarProps) {
  const pathname = usePathname()
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [isMounted, setIsMounted] = useState(false)
  const [language, setLanguage] = useState<"ar" | "en">("ar")

  // تحميل الثيم من localStorage عند تحميل الصفحة
  useEffect(() => {
    setIsMounted(true)
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null
    const savedLanguage = localStorage.getItem("language") as "ar" | "en" | null

    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.classList.toggle("dark", savedTheme === "dark")
    }

    if (savedLanguage) {
      setLanguage(savedLanguage)
      document.documentElement.dir = savedLanguage === "ar" ? "rtl" : "ltr"
      document.documentElement.lang = savedLanguage
    }
  }, [])

  // تغيير الثيم
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    document.documentElement.classList.toggle("dark", newTheme === "dark")
  }

  // تغيير اللغة
  const changeLanguage = (lang: "ar" | "en") => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr"
    document.documentElement.lang = lang
  }

  const navItems = [
    {
      title: "الرئيسية",
      href: "/",
    },
    {
      title: "سيارات للبيع",
      href: "/cars",
    },
    {
      title: "مزادات حالية",
      href: "/auctions",
    },
    {
      title: "أضف سيارة",
      href: "/add-car",
    },
  ]

  // إضافة زر التواصل إذا كان مفعلاً في الإعدادات
  if (uiConfig.showContactUs) {
    navItems.push({
      title: "تواصل معنا",
      href: "/contact",
    })
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-6 md:gap-8 lg:gap-10">
            <Link href="/" className="flex items-center space-x-2 rtl:space-x-reverse">
              <span className="text-xl font-bold">{siteConfig.name}</span>
            </Link>
            <nav className="hidden md:flex gap-6">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    pathname === item.href ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="بحث" className="hidden md:flex">
              <Search className="h-5 w-5" />
            </Button>

            {uiConfig.enableDarkMode && (
              <Button
                variant="ghost"
                size="icon"
                aria-label={theme === "light" ? "الوضع الليلي" : "الوضع النهاري"}
                onClick={toggleTheme}
              >
                {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </Button>
            )}

            {uiConfig.enableMultiLanguage && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="تغيير اللغة">
                    <Globe className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => changeLanguage("ar")}>العربية</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => changeLanguage("en")}>English</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {user ? (
              <>
                <Button variant="ghost" size="icon" aria-label="الإشعارات" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.image || ""} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard">لوحة التحكم</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/profile">الملف الشخصي</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings">الإعدادات</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/logout">تسجيل الخروج</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Button asChild variant="default" size="sm">
                <Link href="/auth/login">تسجيل الدخول</Link>
              </Button>
            )}

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="القائمة" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="p-0">
                <DashboardSidebar />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}

// Helper function
function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ")
}
