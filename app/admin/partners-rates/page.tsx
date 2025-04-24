"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Percent, DollarSign, Users, Link, BarChart } from "lucide-react"

// بيانات وهمية للشركاء - في التطبيق الحقيقي ستأتي من API
const partners = [
  {
    id: 1,
    name: "سارة عبدالله",
    email: "sara@example.com",
    phone: "0555789012",
    rate: 5,
    totalSales: 250000,
    earnings: 12500,
    status: "نشط",
    referralLink: "https://example.com/ref/sara",
  },
  {
    id: 2,
    name: "فهد الحربي",
    email: "fahad@example.com",
    phone: "0555345678",
    rate: 7.5,
    totalSales: 420000,
    earnings: 31500,
    status: "نشط",
    referralLink: "https://example.com/ref/fahad",
  },
  {
    id: 3,
    name: "محمد العتيبي",
    email: "mohammed@example.com",
    phone: "0555123789",
    rate: 5,
    totalSales: 180000,
    earnings: 9000,
    status: "نشط",
    referralLink: "https://example.com/ref/mohammed",
  },
  {
    id: 4,
    name: "عبدالله الشمري",
    email: "abdullah@example.com",
    phone: "0555987654",
    rate: 6,
    totalSales: 320000,
    earnings: 19200,
    status: "معلق",
    referralLink: "https://example.com/ref/abdullah",
  },
]

export default function AdminPartnersRatesPage() {
  const [isRateDialogOpen, setIsRateDialogOpen] = useState(false)
  const [defaultRate, setDefaultRate] = useState(5)
  const [activeTab, setActiveTab] = useState("partners")

  return (
    <div className="flex min-h-screen">
      <Sidebar isAdmin className="hidden lg:flex" />
      <div className="flex-1 space-y-6 p-6 lg:pr-80">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">نظام الشركاء والأرباح</h1>
            <p className="text-muted-foreground">إدارة الشركاء ونسب الأرباح وتتبع المبيعات</p>
          </div>
          <Button onClick={() => setIsRateDialogOpen(true)}>
            <Percent className="mr-2 h-4 w-4" />
            تعديل النسبة الافتراضية
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي مبيعات الشركاء</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,170,000 ريال</div>
              <p className="text-xs text-muted-foreground">+15.2% من الشهر الماضي</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي أرباح الشركاء</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">72,200 ريال</div>
              <p className="text-xs text-muted-foreground">+12.5% من الشهر الماضي</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">عدد الشركاء النشطين</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">من إجمالي 4 شركاء</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">متوسط نسبة الأرباح</CardTitle>
              <Percent className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5.9%</div>
              <p className="text-xs text-muted-foreground">النسبة الافتراضية: {defaultRate}%</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="partners" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 md:w-[400px]">
            <TabsTrigger value="partners">الشركاء</TabsTrigger>
            <TabsTrigger value="earnings">الأرباح</TabsTrigger>
            <TabsTrigger value="statistics">الإحصائيات</TabsTrigger>
          </TabsList>
          <TabsContent value="partners" className="space-y-6">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>الاسم</TableHead>
                      <TableHead>البريد الإلكتروني</TableHead>
                      <TableHead>نسبة الأرباح</TableHead>
                      <TableHead>إجمالي المبيعات</TableHead>
                      <TableHead>إجمالي الأرباح</TableHead>
                      <TableHead>الحالة</TableHead>
                      <TableHead>رابط الإحالة</TableHead>
                      <TableHead>الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {partners.map((partner) => (
                      <TableRow key={partner.id}>
                        <TableCell className="font-medium">{partner.name}</TableCell>
                        <TableCell>{partner.email}</TableCell>
                        <TableCell>{partner.rate}%</TableCell>
                        <TableCell>{partner.totalSales.toLocaleString()} ريال</TableCell>
                        <TableCell>{partner.earnings.toLocaleString()} ريال</TableCell>
                        <TableCell>
                          <Badge variant={partner.status === "نشط" ? "success" : "warning"}>{partner.status}</Badge>
                        </TableCell>
                        <TableCell className="flex items-center gap-2">
                          <Input
                            value={partner.referralLink}
                            readOnly
                            className="h-8 text-xs"
                            onClick={(e) => e.currentTarget.select()}
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => {
                              navigator.clipboard.writeText(partner.referralLink)
                            }}
                          >
                            <Link className="h-4 w-4" />
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            تعديل
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="earnings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>سجل الأرباح</CardTitle>
                <CardDescription>سجل مدفوعات الأرباح للشركاء</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                  بيانات سجل الأرباح ستظهر هنا
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="statistics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>إحصائيات الشركاء</CardTitle>
                <CardDescription>تحليل أداء الشركاء والمبيعات</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                  <BarChart className="h-16 w-16 text-muted-foreground/50" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* نافذة تعديل النسبة الافتراضية */}
        <Dialog open={isRateDialogOpen} onOpenChange={setIsRateDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>تعديل نسبة الأرباح الافتراضية</DialogTitle>
              <DialogDescription>
                حدد نسبة الأرباح الافتراضية للشركاء الجدد. يمكنك تعديل النسبة لكل شريك بشكل منفصل لاحقاً.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="rate">نسبة الأرباح</Label>
                  <span className="text-sm font-medium">{defaultRate}%</span>
                </div>
                <Slider
                  id="rate"
                  min={1}
                  max={20}
                  step={0.5}
                  value={[defaultRate]}
                  onValueChange={(value) => setDefaultRate(value[0])}
                />
                <p className="text-sm text-muted-foreground">
                  سيحصل الشركاء على {defaultRate}% من قيمة كل عملية بيع تتم من خلال رابط الإحالة الخاص بهم.
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsRateDialogOpen(false)}>
                إلغاء
              </Button>
              <Button type="submit" onClick={() => setIsRateDialogOpen(false)}>
                حفظ
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
