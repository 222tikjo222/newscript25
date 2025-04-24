"use client"

import { useState } from "react"
import { DollarSign, Users, Gavel, FileCheck } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Sidebar } from "@/components/sidebar"
import { AdminStatisticsChart } from "@/components/admin/statistics-chart"
import { AdminLatestUsers } from "@/components/admin/latest-users"
import { AdminLatestAuctions } from "@/components/admin/latest-auctions"

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex min-h-screen">
      <Sidebar isAdmin className="hidden lg:flex" />
      <div className="flex-1 space-y-6 p-6 lg:pr-80">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">لوحة تحكم المدير</h1>
            <p className="text-muted-foreground">مرحباً بك في لوحة تحكم إدارة معرض السيارات</p>
          </div>
          <div className="flex items-center gap-2">
            <Button>إضافة سيارة جديدة</Button>
          </div>
        </div>

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 md:w-[400px]">
            <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
            <TabsTrigger value="analytics">التحليلات</TabsTrigger>
            <TabsTrigger value="reports">التقارير</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">إجمالي المبيعات</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,250,000 ريال</div>
                  <p className="text-xs text-muted-foreground">+20.1% من الشهر الماضي</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">عدد المزادات النشطة</CardTitle>
                  <Gavel className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">+5% من الشهر الماضي</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">عدد المستخدمين</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3,456</div>
                  <p className="text-xs text-muted-foreground">+12.5% من الشهر الماضي</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">طلبات بانتظار المراجعة</CardTitle>
                  <FileCheck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5</div>
                  <p className="text-xs text-muted-foreground">جديد</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="lg:col-span-4">
                <CardHeader>
                  <CardTitle>إحصائيات المبيعات</CardTitle>
                  <CardDescription>إجمالي المبيعات والمزادات خلال الـ 30 يوم الماضية</CardDescription>
                </CardHeader>
                <CardContent>
                  <AdminStatisticsChart />
                </CardContent>
              </Card>
              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle>أحدث المستخدمين</CardTitle>
                  <CardDescription>المستخدمين الجدد المسجلين في النظام</CardDescription>
                </CardHeader>
                <CardContent>
                  <AdminLatestUsers />
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>أحدث المزادات</CardTitle>
                  <CardDescription>آخر المزادات النشطة في النظام</CardDescription>
                </CardHeader>
                <CardContent>
                  <AdminLatestAuctions />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>تحليلات المبيعات</CardTitle>
                <CardDescription>تحليل مفصل للمبيعات والمزادات</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                  بيانات التحليلات ستظهر هنا
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>التقارير</CardTitle>
                <CardDescription>تقارير مفصلة عن أداء الموقع</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                  بيانات التقارير ستظهر هنا
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
