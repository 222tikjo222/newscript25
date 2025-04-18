"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save, Check, Send, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function MailSettingsPage() {
  const [settings, setSettings] = useState({
    smtpHost: "smtp.example.com",
    smtpPort: "587",
    smtpUsername: "your-username",
    smtpPassword: "your-password",
    smtpEncryption: "tls",
    fromName: "معرض السيارات",
    fromEmail: "no-reply@example.com",
    enableRegistrationEmails: true,
    enableOrderEmails: true,
    enablePasswordResetEmails: true,
  })
  const [isSaving, setIsSaving] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [isTestingSMTP, setIsTestingSMTP] = useState(false)
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null)

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

  const handleTestSMTP = () => {
    setIsTestingSMTP(true)
    setTestResult(null)

    // محاكاة اختبار SMTP
    setTimeout(() => {
      setIsTestingSMTP(false)
      // محاكاة نجاح الاختبار
      setTestResult({
        success: true,
        message: "تم الاتصال بخادم SMTP بنجاح وإرسال بريد اختباري.",
      })

      // إخفاء نتيجة الاختبار بعد 5 ثوانٍ
      setTimeout(() => {
        setTestResult(null)
      }, 5000)
    }, 2000)
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar isAdmin className="hidden lg:flex" />
      <div className="flex-1 space-y-6 p-6 lg:pr-80">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">إعدادات البريد</h1>
            <p className="text-muted-foreground">إعدادات خادم البريد الإلكتروني وإشعارات البريد</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleTestSMTP} disabled={isTestingSMTP}>
              {isTestingSMTP ? (
                "جاري الاختبار..."
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  اختبار الاتصال
                </>
              )}
            </Button>
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
        </div>

        {isSaved && (
          <Alert className="bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300">
            <Check className="h-4 w-4" />
            <AlertTitle>تم الحفظ بنجاح!</AlertTitle>
            <AlertDescription>تم حفظ إعدادات البريد بنجاح.</AlertDescription>
          </Alert>
        )}

        {testResult && (
          <Alert
            className={
              testResult.success
                ? "bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300"
                : "bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300"
            }
          >
            {testResult.success ? <Check className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
            <AlertTitle>{testResult.success ? "تم الاتصال بنجاح" : "فشل الاتصال"}</AlertTitle>
            <AlertDescription>{testResult.message}</AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader>
            <CardTitle>إعدادات SMTP</CardTitle>
            <CardDescription>إعدادات خادم البريد الإلكتروني الخارجي</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="smtp-host">خادم SMTP</Label>
                <Input
                  id="smtp-host"
                  value={settings.smtpHost}
                  onChange={(e) => handleSettingChange("smtpHost", e.target.value)}
                  placeholder="smtp.example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="smtp-port">منفذ SMTP</Label>
                <Input
                  id="smtp-port"
                  value={settings.smtpPort}
                  onChange={(e) => handleSettingChange("smtpPort", e.target.value)}
                  placeholder="587"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="smtp-username">اسم المستخدم</Label>
                <Input
                  id="smtp-username"
                  value={settings.smtpUsername}
                  onChange={(e) => handleSettingChange("smtpUsername", e.target.value)}
                  placeholder="your-username"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="smtp-password">كلمة المرور</Label>
                <Input
                  id="smtp-password"
                  type="password"
                  value={settings.smtpPassword}
                  onChange={(e) => handleSettingChange("smtpPassword", e.target.value)}
                  placeholder="your-password"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="smtp-encryption">نوع التشفير</Label>
              <Select
                value={settings.smtpEncryption}
                onValueChange={(value) => handleSettingChange("smtpEncryption", value)}
              >
                <SelectTrigger id="smtp-encryption">
                  <SelectValue placeholder="اختر نوع التشفير" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tls">TLS</SelectItem>
                  <SelectItem value="ssl">SSL</SelectItem>
                  <SelectItem value="none">بدون تشفير</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Separator />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="from-name">اسم المرسل</Label>
                <Input
                  id="from-name"
                  value={settings.fromName}
                  onChange={(e) => handleSettingChange("fromName", e.target.value)}
                  placeholder="اسم الموقع"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="from-email">بريد المرسل</Label>
                <Input
                  id="from-email"
                  value={settings.fromEmail}
                  onChange={(e) => handleSettingChange("fromEmail", e.target.value)}
                  placeholder="no-reply@example.com"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>إشعارات البريد</CardTitle>
            <CardDescription>إعدادات إرسال إشعارات البريد الإلكتروني</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="enable-registration-emails">إشعارات التسجيل</Label>
                <p className="text-sm text-muted-foreground">إرسال بريد إلكتروني عند تسجيل مستخدم جديد</p>
              </div>
              <Switch
                id="enable-registration-emails"
                checked={settings.enableRegistrationEmails}
                onCheckedChange={(checked) => handleSettingChange("enableRegistrationEmails", checked)}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="enable-order-emails">إشعارات الطلبات</Label>
                <p className="text-sm text-muted-foreground">إرسال بريد إلكتروني عند إنشاء أو تحديث طلب</p>
              </div>
              <Switch
                id="enable-order-emails"
                checked={settings.enableOrderEmails}
                onCheckedChange={(checked) => handleSettingChange("enableOrderEmails", checked)}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="enable-password-reset-emails">إشعارات إعادة تعيين كلمة المرور</Label>
                <p className="text-sm text-muted-foreground">إرسال بريد إلكتروني عند طلب إعادة تعيين كلمة المرور</p>
              </div>
              <Switch
                id="enable-password-reset-emails"
                checked={settings.enablePasswordResetEmails}
                onCheckedChange={(checked) => handleSettingChange("enablePasswordResetEmails", checked)}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
