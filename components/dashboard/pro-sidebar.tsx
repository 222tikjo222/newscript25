"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  LayoutDashboard,
  Gavel,
  Car,
  ShoppingBag,
  Ticket,
  CreditCard,
  Users,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight,
  ChevronLeft,
  PlusCircle,
  Clock,
  History,
  DollarSign,
  Share2,
  UserPlus,
  Wallet,
  Gift,
  Code,
  FileText,
  Globe,
  ToggleLeft,
  Mail,
  ChevronDown,
  Sun,
  Moon,
} from "lucide-react"

interface ProSidebarProps {
  className?: string
}

interface NavItem {
  title: string
  href: string
  icon: React.ElementType
  badge?: string | number
  submenu?: NavItem[]
}

export function ProSidebar({ className }: ProSidebarProps) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)
  const { theme, setTheme } = useTheme()

  // Dummy user data - would come from API/auth in real app
  const user = {
    name: "محمد العمري",
    email: "mohammed@example.com",
    avatar: "/abstract-automotive-emblem.png",
    balance: 5250.75,
    currency: "ريال",
  }

  // Navigation items with submenu support
  const navItems: NavItem[] = [
    {
      title: "لوحة التحكم",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "إنشاء مزاد جديد",
      href: "/dashboard/new-auction",
      icon: Gavel,
    },
    {
      title: "السيارات المعروضة",
      href: "/dashboard/car-listings",
      icon: Car,
      badge: 12,
    },
    {
      title: "الطلبات",
      href: "/dashboard/orders",
      icon: ShoppingBag,
    },
    {
      title: "الاشتراكات",
      href: "/dashboard/subscriptions",
      icon: Clock,
    },
    {
      title: "عرض تلقائي مجدول",
      href: "/dashboard/drip-feed",
      icon: History,
    },
    {
      title: "التذاكر والدعم الفني",
      href: "/dashboard/tickets",
      icon: Ticket,
      badge: 3,
    },
    {
      title: "سجل المعاملات",
      href: "/dashboard/transaction-logs",
      icon: DollarSign,
    },
    {
      title: "إدارة الفروع",
      href: "/dashboard/child-panel",
      icon: Share2,
    },
    {
      title: "نظام الشركاء",
      href: "/dashboard/affiliate",
      icon: UserPlus,
    },
    {
      title: "إدارة المستخدمين",
      href: "#",
      icon: Users,
      submenu: [
        {
          title: "المستخدمين",
          href: "/dashboard/users",
          icon: Users,
        },
        {
          title: "المتابعين",
          href: "/dashboard/subscribers",
          icon: UserPlus,
        },
      ],
    },
    {
      title: "المدفوعات",
      href: "#",
      icon: CreditCard,
      submenu: [
        {
          title: "إعدادات الدفع",
          href: "/dashboard/payment-settings",
          icon: Settings,
        },
        {
          title: "إضافة رصيد",
          href: "/dashboard/add-funds",
          icon: Wallet,
        },
        {
          title: "مكافآت الدفع",
          href: "/dashboard/bonuses",
          icon: Gift,
        },
      ],
    },
    {
      title: "إعدادات API",
      href: "#",
      icon: Code,
      submenu: [
        {
          title: "مزودي API",
          href: "/dashboard/api-providers",
          icon: Code,
        },
        {
          title: "وثائق الربط",
          href: "/dashboard/api-documentation",
          icon: FileText,
        },
      ],
    },
    {
      title: "إعدادات النظام",
      href: "#",
      icon: Settings,
      submenu: [
        {
          title: "اللغات",
          href: "/dashboard/language",
          icon: Globe,
        },
        {
          title: "إعدادات إضافية",
          href: "/dashboard/extra-settings",
          icon: PlusCircle,
        },
        {
          title: "وضع الصيانة",
          href: "/dashboard/maintenance-mode",
          icon: ToggleLeft,
        },
        {
          title: "إعدادات البريد",
          href: "/dashboard/smtp-settings",
          icon: Mail,
        },
      ],
    },
    {
      title: "الأسئلة الشائعة",
      href: "/dashboard/faq",
      icon: HelpCircle,
    },
  ]

  // Handle submenu toggle
  const toggleSubmenu = (title: string) => {
    setOpenSubmenu(openSubmenu === title ? null : title)
  }

  // Check if a menu item or its children are active
  const isActive = (item: NavItem): boolean => {
    if (pathname === item.href) return true
    if (item.submenu) {
      return item.submenu.some((subItem) => isActive(subItem))
    }
    return false
  }

  // Toggle theme between light and dark
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <div
      className={cn(
        "fixed inset-y-0 right-0 z-20 flex flex-col border-l bg-background transition-all duration-300",
        collapsed ? "w-[70px]" : "w-[280px]",
        className,
      )}
    >
      {/* Sidebar Header with Logo */}
      <div className="flex h-16 items-center justify-between border-b px-4">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <Image
              src="/abstract-automotive-emblem.png"
              alt="مزاد السيارات"
              width={32}
              height={32}
              className="rounded-md"
            />
            <span className="text-lg font-bold">مزاد السيارات</span>
          </div>
        )}
        <Button variant="ghost" size="icon" onClick={() => setCollapsed(!collapsed)} className="ml-auto">
          {collapsed ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>
      </div>

      {/* User Profile Section */}
      <div className={cn("flex items-center border-b p-4", collapsed ? "flex-col" : "gap-3")}>
        <Avatar className={cn("h-10 w-10", collapsed && "mb-2")}>
          <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>

        {!collapsed && (
          <div className="flex-1 overflow-hidden">
            <p className="truncate font-medium">{user.name}</p>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                {user.balance.toLocaleString()} {user.currency}
              </Badge>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={toggleTheme}>
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Menu */}
      <ScrollArea className="flex-1">
        <div className="px-2 py-2">
          {navItems.map((item) =>
            item.submenu ? (
              <Collapsible
                key={item.title}
                open={openSubmenu === item.title}
                onOpenChange={() => toggleSubmenu(item.title)}
                className={cn("mb-1 overflow-hidden", isActive(item) && "bg-accent/50 rounded-md")}
              >
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className={cn("w-full justify-between px-3 py-2 h-auto", isActive(item) && "text-primary")}
                  >
                    <div className="flex items-center">
                      <item.icon className={cn("h-5 w-5 ml-3", collapsed && "mx-auto")} />
                      {!collapsed && <span>{item.title}</span>}
                    </div>
                    {!collapsed && <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />}
                  </Button>
                </CollapsibleTrigger>
                {!collapsed && (
                  <CollapsibleContent className="pr-8 border-r mr-4 mt-1">
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className={cn(
                          "flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-accent",
                          pathname === subItem.href && "bg-accent text-primary font-medium",
                        )}
                      >
                        <subItem.icon className="h-4 w-4" />
                        <span>{subItem.title}</span>
                      </Link>
                    ))}
                  </CollapsibleContent>
                )}
              </Collapsible>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 mb-1 hover:bg-accent",
                  pathname === item.href && "bg-accent text-primary font-medium",
                )}
              >
                <div className="relative">
                  <item.icon className={cn("h-5 w-5", collapsed && "mx-auto")} />
                  {item.badge && (
                    <Badge className="absolute -top-1 -right-1 h-4 min-w-4 p-0 flex items-center justify-center text-[10px] bg-primary text-primary-foreground">
                      {item.badge}
                    </Badge>
                  )}
                </div>
                {!collapsed && <span>{item.title}</span>}
              </Link>
            ),
          )}
        </div>
      </ScrollArea>

      {/* Logout Button */}
      <div className="border-t p-4">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start text-red-500 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/20",
            collapsed && "justify-center px-0",
          )}
        >
          <LogOut className={cn("h-5 w-5 ml-3", collapsed && "mx-auto")} />
          {!collapsed && <span>تسجيل الخروج</span>}
        </Button>
      </div>
    </div>
  )
}
