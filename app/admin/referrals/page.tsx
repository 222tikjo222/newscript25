"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save, Check, Users, DollarSign, Copy, BarChart3 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ReferralsPage() {
  const [activeTab, setActiveTab] = useState("settings")
  const [settings, setSettings] = useState({
    enableReferrals: true,
    referralCommission: 5,
    secondLevelCommission: 1,
    minWithdrawal: 100,
    withdrawalFee: 10,
    expiryDays: 30,
    requireVerification: true,
  })
  const [isSaving, setIsSaving] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  // بيانات وهمية للإحالات
  const referrals = [
    {
      id: 1,
      referrer: "أحمد محمد",
      referrer_id: 101,
      referred: "خالد العمري",
      referred_id: 201,
      date: "2023-08-15",
      status: "active",
      commission: 150,
      paid: true,
    },
    {
      id: 2,
      referrer: "سارة عبدالله",
      referrer_id: 102,
      referred: "نورة السعيد",
      referred_id: 202,
      date: "2023-08-10",
      status: "active",
      commission: 75,
      paid: false,
    },
    {
      id: 3,
      referrer: "فهد الحربي",
      referrer_id: 103,
      referred: "محمد العتيبي",
      referred_id: 203,
      date: "2023-08-05",
      status: "inactive",
      commission: 0,
      paid: false,
    },
  ]

  // بيانات وهمية للمدفوعات
  const payments = [
    {
      id: 1,
      user: "أحمد محمد",
      user_id: 101,
      amount: 500,
      date: "2023-07-30",
      method: "bank_transfer",
      status: "completed",
    },
    {
      id: 2,
      user: "سارة عبدالله",
      user_id: 102,
      amount: 250,
      date: "2023-07-15",
      method: "paypal",
      status: "pending",
    },
    {
      id: 3,
      user: "فهد الحربي",
      user_id: 103,
      amount: 100,
      date: "2023-07-01",
      method: "bank_transfer",
      status: "completed",
    },
  ]

  const handleSettingChange = (key: string, value: any) => {
    setSettings({
      ...settings,
      [key]: value,
    })
  }

  const handleSave = () => {
    setIsSaving(true)

    // محاكاة عملية الحفظ
    setTimeout(() => {
      setIsSaving(false)
      setIsSaved(true)

      // إخفاء رسالة النجاح بعد 3 ثوانٍ
      setTimeout(() => {
        setIsSaved(false)
      }, 3000)
    }, 1500)
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText("https://example.com/ref/ADMIN123")
    setIsCopied(true)

    // إعادة تعيين حالة النسخ بعد 2 ثانية
    setTimeout(() => {
      setIsCopied(false)
    }, 2000)
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar isAdmin className="hidden lg:flex" />
      <div className="flex-1 space-y-6 p-6 lg:pr-80">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">نظام الإحالة</h1>
            <p className="text-muted-foreground">إدارة نظام الإحالة والعمولات</p>
          </div>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              "جاري الحفظ..."
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                حفظ التغييرات
              </>
            )}
          </Button>
        </div>

        {isSaved && (
          <Alert className="bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300">
            <Check className="h-4 w-4" />
            <AlertTitle>تم الحفظ بنجاح!</AlertTitle>
            <AlertDescription>تم حفظ إعدادات نظام الإحالة بنجاح.</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي العمولات</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15,750 ريال</div>
              <p className="text-xs text-muted-foreground">+12.5% من الشهر الماضي</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي الإحالات</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">245</div>
              <p className="text-xs text-muted-foreground">+8.2% من الشهر الماضي</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="settings" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 md:w-[400px]">
            <TabsTrigger value="settings">الإعدادات</TabsTrigger>
            <TabsTrigger value="referrals">الإحالات</TabsTrigger>
            <TabsTrigger value="payments">المدفوعات</TabsTrigger>
          </TabsList>
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>إعدادات نظام الإحالة</CardTitle>
                <CardDescription>تخصيص إعدادات نظام الإحالة والعمولات</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enable-referrals">تفعيل نظام الإحالة</Label>
                    <p className="text-sm text-muted-foreground">تفعيل أو إيقاف نظام الإحالة في الموقع</p>
                  </div>
                  <Switch
                    id="enable-referrals"
                    checked={settings.enableReferrals}
                    onCheckedChange={(checked) => handleSettingChange("enableReferrals", checked)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="referral-commission">نسبة عمولة الإحالة المباشرة (%)</Label>
                  <Input
                    id="referral-commission"
                    type="number"
                    min="0"
                    max="100"
                    value={settings.referralCommission}
                    onChange={(e) => handleSettingChange("referralCommission", Number(e.target.value))}
                  />
                  <p className="text-xs text-muted-foreground">
                    النسبة المئوية من قيمة المشتريات التي سيحصل عليها المستخدم عند إحالة مستخدم جديد
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="second-level-commission">نسبة عمولة الإحالة الثانوية (%)</Label>
                  <Input
                    id="second-level-commission"
                    type="number"
                    min="0"
                    max="100"
                    value={settings.secondLevelCommission}
                    onChange={(e) => handleSettingChange("secondLevelCommission", Number(e.target.value))}
                  />
                  <p className="text-xs text-muted-foreground">
                    النسبة المئوية من قيمة المشتريات التي سيحصل عليها المستخدم عند قيام المستخدم المُحال بإحالة مستخدم
                    آخر
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="min-withdrawal">الحد الأدنى للسحب (ريال)</Label>
                  <Input
                    id="min-withdrawal"
                    type="number"
                    min="0"
                    value={settings.minWithdrawal}
                    onChange={(e) => handleSettingChange("minWithdrawal", Number(e.target.value))}
                  />
                  <p className="text-xs text-muted-foreground">
                    الحد الأدنى للمبلغ الذي يمكن للمستخدم سحبه من رصيد العمولات
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="withdrawal-fee">رسوم السحب (ريال)</Label>
                  <Input
                    id="withdrawal-fee"
                    type="number"
                    min="0"
                    value={settings.withdrawalFee}
                    onChange={(e) => handleSettingChange("withdrawalFee", Number(e.target.value))}
                  />
                  <p className="text-xs text-muted-foreground">رسوم ثابتة تخصم من كل عملية سحب للعمولات</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expiry-days">مدة صلاحية الإحالة (بالأيام)</Label>
                  <Input
                    id="expiry-days"
                    type="number"
                    min="0"
                    value={settings.expiryDays}
                    onChange={(e) => handleSettingChange("expiryDays", Number(e.target.value))}
                  />
                  <p className="text-xs text-muted-foreground">
                    عدد الأيام التي تظل فيها الإحالة صالحة بعد النقر على رابط الإحالة
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="require-verification">طلب التحقق للمشاركة</Label>
                    <p className="text-sm text-muted-foreground">طلب تحقق المستخدم قبل المشاركة في برنامج الإحالة</p>
                  </div>
                  <Switch
                    id="require-verification"
                    checked={settings.requireVerification}
                    onCheckedChange={(checked) => handleSettingChange("requireVerification", checked)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>رابط الإحالة الخاص بك</CardTitle>
                <CardDescription>استخدم هذا الرابط لإحالة مستخدمين جدد</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex">
                  <Input value="https://example.com/ref/ADMIN123" readOnly className="rounded-l-none" />
                  <Button variant="outline" className="rounded-r-none" onClick={handleCopyLink}>
                    {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    <span className="sr-only">نسخ</span>
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">إجمالي النقرات: 1,245</span>
                  <span className="text-sm text-muted-foreground">معدل التحويل: 8.2%</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="referrals" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>سجل الإحالات</CardTitle>
                <CardDescription>قائمة بجميع الإحالات في النظام</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>المُحيل</TableHead>
                        <TableHead>المُحال</TableHead>
                        <TableHead>التاريخ</TableHead>
                        <TableHead>الحالة</TableHead>
                        <TableHead>العمولة</TableHead>
                        <TableHead>تم الدفع</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {referrals.map((referral) => (
                        <TableRow key={referral.id}>
                          <TableCell className="font-medium">{referral.referrer}</TableCell>
                          <TableCell>{referral.referred}</TableCell>
                          <TableCell>{referral.date}</TableCell>
                          <TableCell>
                            <Badge variant={referral.status === "active" ? "success" : "secondary"}>
                              {referral.status === "active" ? "نشط" : "غير نشط"}
                            </Badge>
                          </TableCell>
                          <TableCell>{referral.commission} ريال</TableCell>
                          <TableCell>
                            <Badge variant={referral.paid ? "outline" : "secondary"}>
                              {referral.paid ? "نعم" : "لا"}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>إحصائيات الإحالات</CardTitle>
                <CardDescription>إحصائيات وتحليلات نظام الإحالة</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-muted rounded-md">
                  <div className="flex flex-col items-center text-muted-foreground">
                    <BarChart3 className="h-16 w-16 mb-2" />
                    <p>سيتم عرض الرسم البياني هنا</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>سجل المدفوعات</CardTitle>
                <CardDescription>قائمة بجميع مدفوعات العمولات</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>المستخدم</TableHead>
                        <TableHead>المبلغ</TableHead>
                        <TableHead>التاريخ</TableHead>
                        <TableHead>طريقة الدفع</TableHead>
                        <TableHead>الحالة</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {payments.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell className="font-medium">{payment.user}</TableCell>
                          <TableCell>{payment.amount} ريال</TableCell>
                          <TableCell>{payment.date}</TableCell>
                          <TableCell>{payment.method === "bank_transfer" ? "تحويل بنكي" : "PayPal"}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                payment.status === "completed"
                                  ? "success"
                                  : payment.status === "pending"
                                    ? "outline"
                                    : "destructive"
                              }
                            >
                              {payment.status === "completed"
                                ? "مكتمل"
                                : payment.status === "pending"
                                  ? "قيد الانتظار"
                                  : "مرفوض"}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>طلبات السحب الجديدة</CardTitle>
                <CardDescription>طلبات سحب العمولات التي تنتظر الموافقة</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>المستخدم</TableHead>
                        <TableHead>المبلغ</TableHead>
                        <TableHead>تاريخ الطلب</TableHead>
                        <TableHead>طريقة الدفع</TableHead>
                        <TableHead>الإجراءات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">سارة عبدالله</TableCell>
                        <TableCell>250 ريال</TableCell>
                        <TableCell>2023-08-15</TableCell>
                        <TableCell>PayPal</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="h-8 px-2 text-xs">
                              موافقة
                            </Button>
                            <Button variant="outline" size="sm" className="h-8 px-2 text-xs text-destructive">
                              رفض
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">محمد العتيبي</TableCell>
                        <TableCell>150 ريال</TableCell>
                        <TableCell>2023-08-14</TableCell>
                        <TableCell>تحويل بنكي</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="h-8 px-2 text-xs">
                              موافقة
                            </Button>
                            <Button variant="outline" size="sm" className="h-8 px-2 text-xs text-destructive">
                              رفض
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
