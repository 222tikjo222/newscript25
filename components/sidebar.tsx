"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Car,
  ChevronLeft,
  Home,
  Menu,
  Users,
  X,
  Gavel,
  Clock,
  DollarSign,
  CreditCard,
  Key,
  Link2,
  LogOut,
  UserCog,
  FileCheck,
  Percent,
  Palette,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface SidebarProps {
  className?: string
  isAdmin?: boolean
}

export function Sidebar({ className, isAdmin = false }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const [unreadNotifications, setUnreadNotifications] = useState(3)

  // مثال لبيانات المستخدم - في التطبيق الحقيقي ستأتي من API
  const user = {
    name: "محمد العمري",
    role: isAdmin ? "مدير" : "مستخدم",
    avatar: "/avatars/user-avatar.png",
  }

  // قائمة العناصر للمستخدم العادي
  const userNavItems = [
    {
      title: "لوحة التحكم",
      href: "/dashboard",
      icon: Home,
    },
    {
      title: "سياراتي المعروضة",
      href: "/dashboard/my-cars",
      icon: Car,
    },
    {
      title: "السيارات بانتظار الموافقة",
      href: "/dashboard/pending-cars",
      icon: FileCheck,
      badge: 2,
    },
    {
      title: "سجل المزادات",
      href: "/dashboard/auctions-history",
      icon: Clock,
    },
    {
      title: "سجل الأرباح",
      href: "/dashboard/earnings",
      icon: DollarSign,
    },
    {
      title: "إعدادات الحساب",
      href: "/dashboard/account-settings",
      icon: UserCog,
    },
    {
      title: "إعدادات الدفع",
      href: "/dashboard/payment-settings",
      icon: CreditCard,
    },
    {
      title: "مفتاح API",
      href: "/dashboard/api-keys",
      icon: Key,
    },
    {
      title: "روابط تكامل API",
      href: "/dashboard/api-integration",
      icon: Link2,
    },
  ]

  // قائمة العناصر للمدير
  const adminNavItems = [
    {
      title: "لوحة التحكم",
      href: "/admin",
      icon: Home,
    },
    {
      title: "إدارة المستخدمين",
      href: "/admin/users",
      icon: Users,
    },
    {
      title: "إدارة السيارات",
      href: "/admin/cars",
      icon: Car,
    },
    {
      title: "إدارة المزادات",
      href: "/admin/auctions",
      icon: Gavel,
    },
    {
      title: "مراجعة الطلبات",
      href: "/admin/requests",
      icon: FileCheck,
      badge: 5,
    },
    {
      title: "نسب الشركاء",
      href: "/admin/partners-rates",
      icon: Percent,
    },
    {
      title: "طلبات السحب",
      href: "/admin/withdrawal-requests",
      icon: DollarSign,
      badge: 3,
    },
    {
      title: "بوابات الدفع",
      href: "/admin/payment-gateways",
      icon: CreditCard,
    },
    {
      title: "الإحصائيات والتقارير",
      href: "/admin/statistics",
      icon: BarChart3,
    },
    {
      title: "إدارة المحتوى",
      href: "/admin/content",
      icon: Palette,
      submenu: [
        {
          title: "الإعدادات العامة",
          href: "/admin/content/general",
        },
        {
          title: "الشعار والألوان",
          href: "/admin/content/branding",
        },
        {
          title: "وصف الموقع",
          href: "/admin/content/description",
        },
      ],
    },
  ]

  // اختيار القائمة المناسبة بناءً على نوع المستخدم
  const navItems = isAdmin ? adminNavItems : userNavItems

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Toggle */}
      <div className="flex items-center justify-between p-4 lg:hidden">
        <Button variant="ghost" size="icon" onClick={() => setMobileOpen(true)} aria-label="فتح القائمة الجانبية">
          <Menu className="h-6 w-6" />
        </Button>
        <div className="font-bold">{isAdmin ? "لوحة تحكم المدير" : "لوحة التحكم"}</div>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex w-72 flex-col border-l bg-background transition-all duration-300 ease-in-out",
          collapsed && "w-16",
          !mobileOpen && "hidden lg:flex",
          className,
        )}
      >
        <div className="flex h-14 items-center justify-between border-b px-4">
          <div className={cn("font-bold", collapsed && "hidden")}>{isAdmin ? "لوحة تحكم المدير" : "معرض السيارات"}</div>
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCollapsed(!collapsed)}
              className="hidden lg:flex"
              aria-label={collapsed ? "توسيع القائمة" : "طي القائمة"}
            >
              <ChevronLeft className={cn("h-4 w-4", collapsed && "rotate-180")} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileOpen(false)}
              className="lg:hidden"
              aria-label="إغلاق القائمة"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <ScrollArea className="flex-1 py-2">
          <nav className="grid gap-1 px-2">
            {navItems.map((item) =>
              item.submenu ? (
                <Collapsible key={item.href} className="group/collapsible">
                  <CollapsibleTrigger asChild>
                    <div
                      className={cn(
                        "flex items-center justify-between gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground cursor-pointer",
                        pathname.startsWith(item.href) && "bg-accent text-accent-foreground",
                        collapsed && "justify-center px-0",
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="h-5 w-5" />
                        {!collapsed && <span>{item.title}</span>}
                      </div>
                      {!collapsed && (
                        <ChevronLeft className="h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                      )}
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className={cn(collapsed && "hidden")}>
                    <div className="pr-8 border-r mr-4 mt-1">
                      {item.submenu.map((subitem) => (
                        <Link
                          key={subitem.href}
                          href={subitem.href}
                          onClick={() => setMobileOpen(false)}
                          className={cn(
                            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                            pathname === subitem.href && "bg-accent text-accent-foreground",
                          )}
                        >
                          <span>{subitem.title}</span>
                        </Link>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                    pathname === item.href && "bg-accent text-accent-foreground",
                    collapsed && "justify-center px-0",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {!collapsed && (
                    <>
                      <span>{item.title}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="mr-auto">
                          {item.badge}
                        </Badge>
                      )}
                    </>
                  )}
                  {collapsed && item.badge && (
                    <Badge variant="secondary" className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              ),
            )}

            {/* زر تسجيل الخروج */}
            <Link
              href="/auth/logout"
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground mt-4",
                collapsed && "justify-center px-0",
              )}
            >
              <LogOut className="h-5 w-5" />
              {!collapsed && <span>تسجيل الخروج</span>}
            </Link>
          </nav>
        </ScrollArea>
        <div className="border-t p-4">
          <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
            <Avatar>
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            {!collapsed && (
              <div>
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.role}</p>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  )
}
