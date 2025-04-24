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
import { Save, Check, Copy, RefreshCw, AlertCircle, Clock } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ApiSettingsPage() {
  const [activeTab, setActiveTab] = useState("settings")
  const [settings, setSettings] = useState({
    enableApi: true,
    apiUrl: "https://car-auction.example.com/api/v1",
    autoGenerateKeys: true,
    rateLimit: "100",
    apiTimeout: "30",
  })
  const [isSaving, setIsSaving] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [isGeneratingKey, setIsGeneratingKey] = useState(false)
  const [apiKey, setApiKey] = useState("sk_live_51NXtYXXXXXXXXXXXXXXXXXXX")
  const [isCopied, setIsCopied] = useState(false)

  // بيانات وهمية لسجل نشاطات API
  const apiLogs = [
    {
      id: 1,
      endpoint: "/api/v1/cars",
      method: "GET",
      status: 200,
      user: "ahmed@example.com",
      timestamp: "2023-08-15 14:32:45",
      ip: "192.168.1.1",
    },
    {
      id: 2,
      endpoint: "/api/v1/auctions",
      method: "POST",
      status: 201,
      user: "admin@example.com",
      timestamp: "2023-08-15 13:21:10",
      ip: "192.168.1.2",
    },
    {
      id: 3,
      endpoint: "/api/v1/users",
      method: "GET",
      status: 403,
      user: "user@example.com",
      timestamp: "2023-08-15 12:15:30",
      ip: "192.168.1.3",
    },
    {
      id: 4,
      endpoint: "/api/v1/bids",
      method: "POST",
      status: 400,
      user: "partner@example.com",
      timestamp: "2023-08-15 11:45:22",
      ip: "192.168.1.4",
    },
    {
      id: 5,
      endpoint: "/api/v1/cars/5",
      method: "PUT",
      status: 200,
      user: "admin@example.com",
      timestamp: "2023-08-15 10:30:15",
      ip: "192.168.1.2",
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

  const handleGenerateKey = () => {
    setIsGeneratingKey(true)

    // محاكاة عملية إنشاء مفتاح API جديد
    setTimeout(() => {
      setIsGeneratingKey(false)
      // إنشاء مفتاح API عشوائي
      const newKey =
        "sk_live_" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
      setApiKey(newKey)
    }, 1500)
  }

  const handleCopyKey = () => {
    navigator.clipboard.writeText(apiKey)
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
            <h1 className="text-3xl font-bold tracking-tight">إعدادات API</h1>
            <p className="text-muted-foreground">إدارة إعدادات واجهة برمجة التطبيقات (API)</p>
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
            <AlertDescription>تم حفظ إعدادات API بنجاح.</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="settings" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 md:w-[400px]">
            <TabsTrigger value="settings">الإعدادات</TabsTrigger>
            <TabsTrigger value="keys">مفاتيح API</TabsTrigger>
            <TabsTrigger value="logs">سجل النشاطات</TabsTrigger>
          </TabsList>
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>إعدادات API الأساسية</CardTitle>
                <CardDescription>إعدادات واجهة برمجة التطبيقات الأساسية</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enable-api">تفعيل API</Label>
                    <p className="text-sm text-muted-foreground">تمكين استخدام واجهة برمجة التطبيقات</p>
                  </div>
                  <Switch
                    id="enable-api"
                    checked={settings.enableApi}
                    onCheckedChange={(checked) => handleSettingChange("enableApi", checked)}
                  />
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label htmlFor="api-url">رابط API</Label>
                  <Input
                    id="api-url"
                    value={settings.apiUrl}
                    onChange={(e) => handleSettingChange("apiUrl", e.target.value)}
                    placeholder="https://example.com/api/v1"
                  />
                  <p className="text-xs text-muted-foreground">
                    هذا هو الرابط الأساسي الذي سيستخدمه المطورون للوصول إلى API الخاص بك
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-generate-keys">إنشاء مفاتيح API تلقائياً</Label>
                    <p className="text-sm text-muted-foreground">إنشاء مفاتيح API تلقائياً للمستخدمين الجدد</p>
                  </div>
                  <Switch
                    id="auto-generate-keys"
                    checked={settings.autoGenerateKeys}
                    onCheckedChange={(checked) => handleSettingChange("autoGenerateKeys", checked)}
                  />
                </div>
                <Separator />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="rate-limit">حد الطلبات (في الدقيقة)</Label>
                    <Input
                      id="rate-limit"
                      value={settings.rateLimit}
                      onChange={(e) => handleSettingChange("rateLimit", e.target.value)}
                      placeholder="100"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="api-timeout">مهلة الاتصال (بالثواني)</Label>
                    <Input
                      id="api-timeout"
                      value={settings.apiTimeout}
                      onChange={(e) => handleSettingChange("apiTimeout", e.target.value)}
                      placeholder="30"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="keys" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>مفتاح API الرئيسي</CardTitle>
                <CardDescription>إدارة مفتاح API الرئيسي للموقع</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="api-key">مفتاح API الحالي</Label>
                  <div className="flex">
                    <Input id="api-key" value={apiKey} readOnly className="rounded-l-none" />
                    <Button variant="outline" className="rounded-r-none" onClick={handleCopyKey}>
                      {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      <span className="sr-only">نسخ</span>
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    هذا المفتاح سري للغاية. لا تشاركه مع أي شخص ولا تستخدمه في التطبيقات العامة.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" onClick={handleGenerateKey} disabled={isGeneratingKey}>
                    {isGeneratingKey ? (
                      "جاري الإنشاء..."
                    ) : (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        إنشاء مفتاح جديد
                      </>
                    )}
                  </Button>
                </div>
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>تحذير!</AlertTitle>
                  <AlertDescription>
                    إنشاء مفتاح جديد سيؤدي إلى إبطال المفتاح الحالي. تأكد من تحديث جميع التطبيقات التي تستخدم المفتاح
                    الحالي.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="logs" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>سجل نشاطات API</CardTitle>
                <CardDescription>عرض سجل نشاطات واجهة برمجة التطبيقات</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>النقطة النهائية</TableHead>
                        <TableHead>الطريقة</TableHead>
                        <TableHead>الحالة</TableHead>
                        <TableHead>المستخدم</TableHead>
                        <TableHead>الوقت</TableHead>
                        <TableHead>عنوان IP</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {apiLogs.map((log) => (
                        <TableRow key={log.id}>
                          <TableCell className="font-mono text-xs">{log.endpoint}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                log.method === "GET"
                                  ? "outline"
                                  : log.method === "POST"
                                    ? "default"
                                    : log.method === "PUT"
                                      ? "secondary"
                                      : "destructive"
                              }
                            >
                              {log.method}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                log.status >= 200 && log.status < 300
                                  ? "success"
                                  : log.status >= 400 && log.status < 500
                                    ? "destructive"
                                    : "outline"
                              }
                            >
                              {log.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{log.user}</TableCell>
                          <TableCell className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {log.timestamp}
                          </TableCell>
                          <TableCell className="font-mono text-xs">{log.ip}</TableCell>
                        </TableRow>
                      ))}
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
