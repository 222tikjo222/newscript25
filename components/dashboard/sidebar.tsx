"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Car,
  Clock,
  History,
  DollarSign,
  Settings,
  CreditCard,
  Key,
  Link2,
  LogOut,
  Users,
  FileText,
  CheckSquare,
  Percent,
  ToggleLeft,
  BarChart3,
  FileCode,
  MessageSquare,
  Mail,
  Code,
  ImageIcon,
  Shield,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

interface SidebarNavProps {
  isAdmin?: boolean
}

export function DashboardSidebar({ isAdmin = false }: SidebarNavProps) {
  const pathname = usePathname()
  const [open, setOpen] = useState(true)

  const userNavItems = [
    {
      title: "لوحة التحكم",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "سياراتي المعروضة",
      href: "/dashboard/my-cars",
      icon: Car,
    },
    {
      title: "السيارات بانتظار الموافقة",
      href: "/dashboard/pending-cars",
      icon: Clock,
    },
    {
      title: "سجل المزادات",
      href: "/dashboard/auctions",
      icon: History,
    },
    {
      title: "سجل الأرباح",
      href: "/dashboard/earnings",
      icon: DollarSign,
    },
    {
      title: "إعدادات الحساب",
      href: "/dashboard/settings",
      icon: Settings,
    },
    {
      title: "إعدادات الدفع",
      href: "/dashboard/payment-settings",
      icon: CreditCard,
    },
    {
      title: "مفتاح API",
      href: "/dashboard/api-key",
      icon: Key,
    },
    {
      title: "روابط تكامل API",
      href: "/dashboard/api-integration",
      icon: Link2,
    },
  ]

  const adminNavItems = [
    {
      title: "لوحة التحكم",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      title: "إدارة المستخدمين",
      href: "/admin/users",
      icon: Users,
    },
    {
      title: "إدارة السيارات والمزادات",
      href: "/admin/cars",
      icon: Car,
    },
    {
      title: "مراجعة الطلبات الجديدة",
      href: "/admin/requests",
      icon: CheckSquare,
    },
    {
      title: "نسب الشركاء",
      href: "/admin/partners-rates",
      icon: Percent,
    },
    {
      title: "إعدادات الموقع",
      href: "/admin/site-settings",
      icon: Settings,
    },
    {
      title: "لوحة التحكم",
      href: "/admin/control-panel",
      icon: ToggleLeft,
    },
    {
      title: "إعدادات التواصل",
      href: "/admin/contact-settings",
      icon: MessageSquare,
    },
    {
      title: "إعدادات البريد",
      href: "/admin/mail-settings",
      icon: Mail,
    },
    {
      title: "إعدادات API",
      href: "/admin/api-settings",
      icon: Code,
    },
    {
      title: "بوابات الدفع",
      href: "/admin/payment-gateways",
      icon: CreditCard,
    },
    {
      title: "إدارة الإعلانات",
      href: "/admin/ad-management",
      icon: ImageIcon,
    },
    {
      title: "إعدادات الأمان",
      href: "/admin/security",
      icon: Shield,
    },
    {
      title: "إدارة المحتوى",
      href: "/admin/content",
      icon: FileText,
    },
    {
      title: "الإحصائيات والتقارير",
      href: "/admin/statistics",
      icon: BarChart3,
    },
    {
      title: "محرر Markdown",
      href: "/admin/markdown-editor",
      icon: FileCode,
    },
  ]

  const navItems = isAdmin ? adminNavItems : userNavItems

  return (
    <SidebarProvider defaultOpen={open} onOpenChange={setOpen}>
      <Sidebar className="border-l" side="right">
        <SidebarHeader className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <span className="text-xl font-bold">لوحة التحكم</span>
          </div>
          <SidebarTrigger />
        </SidebarHeader>
        <SidebarContent>
          <ScrollArea className="h-[calc(100vh-10rem)]">
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={pathname === item.href} className="flex justify-start">
                    <Link href={item.href}>
                      <item.icon className="h-5 w-5 ml-2 rtl:ml-0 rtl:mr-2" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </ScrollArea>
        </SidebarContent>
        <SidebarFooter className="p-4">
          <Button variant="outline" className="w-full justify-start" asChild>
            <Link href="/logout">
              <LogOut className="h-5 w-5 ml-2 rtl:ml-0 rtl:mr-2" />
              <span>تسجيل الخروج</span>
            </Link>
          </Button>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  )
}
