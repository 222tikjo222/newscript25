"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Upload, Save, Check } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function AdminContentPage() {
  const [activeTab, setActiveTab] = useState("general")
  const [settings, setSettings] = useState({
    siteName: "معرض السيارات",
    siteDescription: "معرض سيارات فاخرة بأسعار تنافسية وخدمات متميزة",
    contactEmail: "info@example.com",
    phoneNumber: "+966555123456",
    enableDarkMode: true,
    enableMultiLanguage: true,
    showContactButton: true,
    primaryColor: "#2563eb",
    secondaryColor: "#f59e0b",
    accentColor: "#10b981",
  })
  const [isSaving, setIsSaving] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

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
            <h1 className="text-3xl font-bold tracking-tight">إدارة المحتوى</h1>
            <p className="text-muted-foreground">تخصيص وإدارة محتوى الموقع والإعدادات العامة</p>
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
            <AlertDescription>تم حفظ التغييرات بنجاح وتطبيقها على الموقع.</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 md:w-[400px]">
            <TabsTrigger value="general">الإعدادات العامة</TabsTrigger>
            <TabsTrigger value="appearance">المظهر</TabsTrigger>
            <TabsTrigger value="features">الميزات</TabsTrigger>
          </TabsList>
          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>الإعدادات العامة</CardTitle>
                <CardDescription>إعدادات الموقع الأساسية</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="site-name">اسم الموقع</Label>
                  <Input
                    id="site-name"
                    value={settings.siteName}
                    onChange={(e) => handleSettingChange("siteName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="site-description">وصف الموقع</Label>
                  <Textarea
                    id="site-description"
                    value={settings.siteDescription}
                    onChange={(e) => handleSettingChange("siteDescription", e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact-email">البريد الإلكتروني للتواصل</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      value={settings.contactEmail}
                      onChange={(e) => handleSettingChange("contactEmail", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone-number">رقم الهاتف</Label>
                    <Input
                      id="phone-number"
                      value={settings.phoneNumber}
                      onChange={(e) => handleSettingChange("phoneNumber", e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="logo">شعار الموقع</Label>
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-md border flex items-center justify-center bg-muted">
                      <span className="text-sm text-muted-foreground">الشعار</span>
                    </div>
                    <Button variant="outline" type="button">
                      <Upload className="mr-2 h-4 w-4" />
                      تحميل شعار جديد
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="appearance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>المظهر</CardTitle>
                <CardDescription>تخصيص مظهر الموقع والألوان</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">الألوان</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="primary-color">اللون الرئيسي</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="primary-color"
                          value={settings.primaryColor}
                          onChange={(e) => handleSettingChange("primaryColor", e.target.value)}
                        />
                        <div className="h-8 w-8 rounded-md border" style={{ backgroundColor: settings.primaryColor }} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="secondary-color">اللون الثانوي</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="secondary-color"
                          value={settings.secondaryColor}
                          onChange={(e) => handleSettingChange("secondaryColor", e.target.value)}
                        />
                        <div
                          className="h-8 w-8 rounded-md border"
                          style={{ backgroundColor: settings.secondaryColor }}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="accent-color">لون التمييز</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="accent-color"
                          value={settings.accentColor}
                          onChange={(e) => handleSettingChange("accentColor", e.target.value)}
                        />
                        <div className="h-8 w-8 rounded-md border" style={{ backgroundColor: settings.accentColor }} />
                      </div>
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">معاينة</h3>
                  <div className="border rounded-md p-4">
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className="h-8 w-24 rounded-md flex items-center justify-center text-white"
                        style={{ backgroundColor: settings.primaryColor }}
                      >
                        زر رئيسي
                      </div>
                      <div
                        className="h-8 w-24 rounded-md flex items-center justify-center text-white"
                        style={{ backgroundColor: settings.secondaryColor }}
                      >
                        زر ثانوي
                      </div>
                      <div
                        className="h-8 w-24 rounded-md flex items-center justify-center text-white"
                        style={{ backgroundColor: settings.accentColor }}
                      >
                        زر تمييز
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>اسم الموقع:</span>
                      <span className="font-bold" style={{ color: settings.primaryColor }}>
                        {settings.siteName}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="features" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>الميزات</CardTitle>
                <CardDescription>تفعيل وتعطيل ميزات الموقع</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="dark-mode">الوضع الليلي</Label>
                      <p className="text-sm text-muted-foreground">تفعيل خيار الوضع الليلي للمستخدمين</p>
                    </div>
                    <Switch
                      id="dark-mode"
                      checked={settings.enableDarkMode}
                      onCheckedChange={(checked) => handleSettingChange("enableDarkMode", checked)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="multi-language">تعدد اللغات</Label>
                      <p className="text-sm text-muted-foreground">تفعيل دعم تعدد اللغات في الموقع</p>
                    </div>
                    <Switch
                      id="multi-language"
                      checked={settings.enableMultiLanguage}
                      onCheckedChange={(checked) => handleSettingChange("enableMultiLanguage", checked)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="contact-button">زر التواصل</Label>
                      <p className="text-sm text-muted-foreground">إظهار زر "تواصل معنا" في القائمة الرئيسية</p>
                    </div>
                    <Switch
                      id="contact-button"
                      checked={settings.showContactButton}
                      onCheckedChange={(checked) => handleSettingChange("showContactButton", checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
