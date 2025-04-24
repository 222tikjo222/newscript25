"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save, Check, Shield, Clock, Search } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function SecuritySettingsPage() {
  const [activeTab, setActiveTab] = useState("general")
  const [settings, setSettings] = useState({
    enableRecaptcha: true,
    recaptchaSiteKey: "6LcXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    recaptchaSecretKey: "6LcXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    maxLoginAttempts: 5,
    lockoutDuration: 30,
    passwordMinLength: 8,
    requireSpecialChars: true,
    requireUppercase: true,
    requireNumbers: true,
    sessionTimeout: 60,
    enableTwoFactor: false,
  })
  const [isSaving, setIsSaving] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  // بيانات وهمية لسجل الدخول
  const loginLogs = [
    {
      id: 1,
      username: "admin@example.com",
      ip: "192.168.1.1",
      status: "success",
      timestamp: "2023-08-15 14:32:45",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    },
    {
      id: 2,
      username: "user@example.com",
      ip: "192.168.1.2",
      status: "failed",
      timestamp: "2023-08-15 13:21:10",
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    },
    {
      id: 3,
      username: "partner@example.com",
      ip: "192.168.1.3",
      status: "success",
      timestamp: "2023-08-15 12:15:30",
      userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15",
    },
    {
      id: 4,
      username: "hacker@example.com",
      ip: "192.168.1.4",
      status: "blocked",
      timestamp: "2023-08-15 11:45:22",
      userAgent: "Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36",
    },
    {
      id: 5,
      username: "admin@example.com",
      ip: "192.168.1.1",
      status: "success",
      timestamp: "2023-08-14 10:30:15",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    },
  ]

  // بيانات وهمية للمستخدمين المحظورين
  const blockedUsers = [
    {
      id: 1,
      username: "hacker@example.com",
      ip: "192.168.1.4",
      reason: "محاولات دخول متكررة",
      blockedAt: "2023-08-15 11:45:22",
      blockedUntil: "2023-08-16 11:45:22",
    },
    {
      id: 2,
      username: "spammer@example.com",
      ip: "192.168.1.5",
      reason: "نشاط مشبوه",
      blockedAt: "2023-08-14 09:30:15",
      blockedUntil: "2023-08-21 09:30:15",
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

  return (
    <div className="flex min-h-screen">
      <Sidebar isAdmin className="hidden lg:flex" />
      <div className="flex-1 space-y-6 p-6 lg:pr-80">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">إعدادات الأمان</h1>
            <p className="text-muted-foreground">إدارة إعدادات الأمان وحماية الموقع</p>
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
            <AlertDescription>تم حفظ إعدادات الأمان بنجاح.</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 md:w-[400px]">
            <TabsTrigger value="general">عام</TabsTrigger>
            <TabsTrigger value="login">سجل الدخول</TabsTrigger>
            <TabsTrigger value="blocked">المستخدمون المحظورون</TabsTrigger>
          </TabsList>
          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>حماية reCAPTCHA</CardTitle>
                <CardDescription>إعدادات Google reCAPTCHA لحماية النماذج من الروبوتات</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enable-recaptcha">تفعيل reCAPTCHA</Label>
                    <p className="text-sm text-muted-foreground">حماية نماذج الموقع من الروبوتات</p>
                  </div>
                  <Switch
                    id="enable-recaptcha"
                    checked={settings.enableRecaptcha}
                    onCheckedChange={(checked) => handleSettingChange("enableRecaptcha", checked)}
                  />
                </div>
                {settings.enableRecaptcha && (
                  <>
                    <Separator />
                    <div className="space-y-2">
                      <Label htmlFor="recaptcha-site-key">مفتاح الموقع (Site Key)</Label>
                      <Input
                        id="recaptcha-site-key"
                        value={settings.recaptchaSiteKey}
                        onChange={(e) => handleSettingChange("recaptchaSiteKey", e.target.value)}
                        placeholder="أدخل مفتاح الموقع"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="recaptcha-secret-key">المفتاح السري (Secret Key)</Label>
                      <Input
                        id="recaptcha-secret-key"
                        type="password"
                        value={settings.recaptchaSecretKey}
                        onChange={(e) => handleSettingChange("recaptchaSecretKey", e.target.value)}
                        placeholder="أدخل المفتاح السري"
                      />
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>إعدادات تسجيل الدخول</CardTitle>
                <CardDescription>إعدادات أمان تسجيل الدخول وكلمات المرور</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="max-login-attempts">الحد الأقصى لمحاولات الدخول الفاشلة</Label>
                    <Input
                      id="max-login-attempts"
                      type="number"
                      min="1"
                      max="10"
                      value={settings.maxLoginAttempts}
                      onChange={(e) => handleSettingChange("maxLoginAttempts", Number.parseInt(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lockout-duration">مدة الحظر (بالدقائق)</Label>
                    <Input
                      id="lockout-duration"
                      type="number"
                      min="5"
                      value={settings.lockoutDuration}
                      onChange={(e) => handleSettingChange("lockoutDuration", Number.parseInt(e.target.value))}
                    />
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label htmlFor="password-min-length">الحد الأدنى لطول كلمة المرور</Label>
                  <Input
                    id="password-min-length"
                    type="number"
                    min="6"
                    max="20"
                    value={settings.passwordMinLength}
                    onChange={(e) => handleSettingChange("passwordMinLength", Number.parseInt(e.target.value))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="require-special-chars">تتطلب أحرف خاصة</Label>
                    <p className="text-sm text-muted-foreground">يجب أن تحتوي كلمة المرور على أحرف خاصة</p>
                  </div>
                  <Switch
                    id="require-special-chars"
                    checked={settings.requireSpecialChars}
                    onCheckedChange={(checked) => handleSettingChange("requireSpecialChars", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="require-uppercase">تتطلب أحرف كبيرة</Label>
                    <p className="text-sm text-muted-foreground">يجب أن تحتوي كلمة المرور على أحرف كبيرة</p>
                  </div>
                  <Switch
                    id="require-uppercase"
                    checked={settings.requireUppercase}
                    onCheckedChange={(checked) => handleSettingChange("requireUppercase", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="require-numbers">تتطلب أرقام</Label>
                    <p className="text-sm text-muted-foreground">يجب أن تحتوي كلمة المرور على أرقام</p>
                  </div>
                  <Switch
                    id="require-numbers"
                    checked={settings.requireNumbers}
                    onCheckedChange={(checked) => handleSettingChange("requireNumbers", checked)}
                  />
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label htmlFor="session-timeout">مدة انتهاء الجلسة (بالدقائق)</Label>
                  <Input
                    id="session-timeout"
                    type="number"
                    min="15"
                    value={settings.sessionTimeout}
                    onChange={(e) => handleSettingChange("sessionTimeout", Number.parseInt(e.target.value))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enable-two-factor">تفعيل المصادقة الثنائية</Label>
                    <p className="text-sm text-muted-foreground">تمكين المصادقة الثنائية للمستخدمين</p>
                  </div>
                  <Switch
                    id="enable-two-factor"
                    checked={settings.enableTwoFactor}
                    onCheckedChange={(checked) => handleSettingChange("enableTwoFactor", checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="login" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>سجل تسجيل الدخول</CardTitle>
                <CardDescription>سجل محاولات تسجيل الدخول إلى الموقع</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input className="pl-10 pr-3" placeholder="بحث عن مستخدم أو عنوان IP..." />
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px] mr-2">
                      <SelectValue placeholder="الحالة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">جميع الحالات</SelectItem>
                      <SelectItem value="success">ناجح</SelectItem>
                      <SelectItem value="failed">فاشل</SelectItem>
                      <SelectItem value="blocked">محظور</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>المستخدم</TableHead>
                        <TableHead>عنوان IP</TableHead>
                        <TableHead>الحالة</TableHead>
                        <TableHead>الوقت</TableHead>
                        <TableHead>متصفح المستخدم</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {loginLogs.map((log) => (
                        <TableRow key={log.id}>
                          <TableCell className="font-medium">{log.username}</TableCell>
                          <TableCell className="font-mono text-xs">{log.ip}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                log.status === "success"
                                  ? "success"
                                  : log.status === "failed"
                                    ? "destructive"
                                    : "outline"
                              }
                            >
                              {log.status === "success" ? "ناجح" : log.status === "failed" ? "فاشل" : "محظور"}
                            </Badge>
                          </TableCell>
                          <TableCell className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {log.timestamp}
                          </TableCell>
                          <TableCell className="truncate max-w-[200px]" title={log.userAgent}>
                            {log.userAgent.substring(0, 30)}...
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="blocked" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>المستخدمون المحظورون</CardTitle>
                <CardDescription>قائمة المستخدمين المحظورين من الوصول إلى الموقع</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>المستخدم</TableHead>
                        <TableHead>عنوان IP</TableHead>
                        <TableHead>سبب الحظر</TableHead>
                        <TableHead>تاريخ الحظر</TableHead>
                        <TableHead>ينتهي في</TableHead>
                        <TableHead>الإجراءات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {blockedUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.username}</TableCell>
                          <TableCell className="font-mono text-xs">{user.ip}</TableCell>
                          <TableCell>{user.reason}</TableCell>
                          <TableCell>{user.blockedAt}</TableCell>
                          <TableCell>{user.blockedUntil}</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              رفع الحظر
                            </Button>
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
                <CardTitle>حظر مستخدم جديد</CardTitle>
                <CardDescription>إضافة مستخدم جديد إلى قائمة الحظر</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="block-username">البريد الإلكتروني أو اسم المستخدم</Label>
                    <Input id="block-username" placeholder="أدخل البريد الإلكتروني أو اسم المستخدم" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="block-ip">عنوان IP (اختياري)</Label>
                    <Input id="block-ip" placeholder="أدخل عنوان IP" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="block-reason">سبب الحظر</Label>
                  <Input id="block-reason" placeholder="أدخل سبب الحظر" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="block-duration">مدة الحظر</Label>
                    <Select defaultValue="1d">
                      <SelectTrigger id="block-duration">
                        <SelectValue placeholder="اختر مدة الحظر" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1h">ساعة واحدة</SelectItem>
                        <SelectItem value="1d">يوم واحد</SelectItem>
                        <SelectItem value="1w">أسبوع واحد</SelectItem>
                        <SelectItem value="1m">شهر واحد</SelectItem>
                        <SelectItem value="permanent">دائم</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button>
                  <Shield className="mr-2 h-4 w-4" />
                  حظر المستخدم
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
