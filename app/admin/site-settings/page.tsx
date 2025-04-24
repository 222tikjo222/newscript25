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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, Save, Check, Globe, Moon, Sun } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function SiteSettingsPage() {
  const [activeTab, setActiveTab] = useState("general")
  const [settings, setSettings] = useState({
    siteName: "معرض السيارات",
    siteDescription: "معرض سيارات فاخرة بأسعار تنافسية وخدمات متميزة",
    siteKeywords: "سيارات, مزاد, سيارات فاخرة, بيع سيارات, شراء سيارات",
    contactEmail: "info@example.com",
    phoneNumber: "+966555123456",
    defaultLanguage: "ar",
    enableMultiLanguage: true,
    enableDarkMode: true,
    favicon: null,
    logo: null,
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
            <h1 className="text-3xl font-bold tracking-tight">إعدادات الموقع العامة</h1>
            <p className="text-muted-foreground">تخصيص وإدارة الإعدادات العامة للموقع</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center space-x-2 space-x-reverse border rounded-md p-1">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Sun className="h-4 w-4" />
              </Button>
              <Button variant="default" size="icon" className="h-8 w-8">
                <Moon className="h-4 w-4" />
              </Button>
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
        </div>

        {isSaved && (
          <Alert className="bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300">
            <Check className="h-4 w-4" />
            <AlertTitle>تم الحفظ بنجاح!</AlertTitle>
            <AlertDescription>تم حفظ إعدادات الموقع العامة بنجاح.</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 md:w-[400px]">
            <TabsTrigger value="general">عام</TabsTrigger>
            <TabsTrigger value="appearance">المظهر</TabsTrigger>
            <TabsTrigger value="language">اللغة</TabsTrigger>
          </TabsList>
          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>المعلومات الأساسية</CardTitle>
                <CardDescription>المعلومات الأساسية للموقع</CardDescription>
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
                <div className="space-y-2">
                  <Label htmlFor="site-keywords">الكلمات المفتاحية</Label>
                  <Textarea
                    id="site-keywords"
                    value={settings.siteKeywords}
                    onChange={(e) => handleSettingChange("siteKeywords", e.target.value)}
                    placeholder="أدخل الكلمات المفتاحية مفصولة بفواصل"
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
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="appearance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>الشعار والأيقونة</CardTitle>
                <CardDescription>تخصيص شعار الموقع وأيقونة المتصفح</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="logo">شعار الموقع</Label>
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-32 rounded-md border flex items-center justify-center bg-muted">
                        <span className="text-sm text-muted-foreground">الشعار</span>
                      </div>
                      <Button variant="outline" type="button">
                        <Upload className="mr-2 h-4 w-4" />
                        تحميل شعار جديد
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      يفضل استخدام صورة بصيغة PNG أو SVG بخلفية شفافة. الحجم المثالي: 200×60 بكسل.
                    </p>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Label htmlFor="favicon">أيقونة المتصفح (Favicon)</Label>
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-md border flex items-center justify-center bg-muted">
                        <span className="text-xs text-muted-foreground">أيقونة</span>
                      </div>
                      <Button variant="outline" type="button">
                        <Upload className="mr-2 h-4 w-4" />
                        تحميل أيقونة جديدة
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      يفضل استخدام صورة مربعة بصيغة ICO أو PNG. الحجم المثالي: 32×32 بكسل.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>وضع العرض</CardTitle>
                <CardDescription>إعدادات الوضع الليلي والنهاري</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="dark-mode">تفعيل الوضع الليلي</Label>
                    <p className="text-sm text-muted-foreground">السماح للمستخدمين بتبديل وضع العرض</p>
                  </div>
                  <Switch
                    id="dark-mode"
                    checked={settings.enableDarkMode}
                    onCheckedChange={(checked) => handleSettingChange("enableDarkMode", checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="language" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>إعدادات اللغة</CardTitle>
                <CardDescription>تخصيص إعدادات اللغة للموقع</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="default-language">اللغة الافتراضية</Label>
                    <Select
                      value={settings.defaultLanguage}
                      onValueChange={(value) => handleSettingChange("defaultLanguage", value)}
                    >
                      <SelectTrigger id="default-language">
                        <SelectValue placeholder="اختر اللغة الافتراضية" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ar">العربية</SelectItem>
                        <SelectItem value="en">الإنجليزية</SelectItem>
                        <SelectItem value="fr">الفرنسية</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="multi-language">تفعيل تعدد اللغات</Label>
                      <p className="text-sm text-muted-foreground">السماح للمستخدمين بتغيير لغة الموقع</p>
                    </div>
                    <Switch
                      id="multi-language"
                      checked={settings.enableMultiLanguage}
                      onCheckedChange={(checked) => handleSettingChange("enableMultiLanguage", checked)}
                    />
                  </div>
                  {settings.enableMultiLanguage && (
                    <div className="pt-4">
                      <Label className="mb-2 block">اللغات المتاحة</Label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <Switch id="lang-ar" defaultChecked />
                          <Label htmlFor="lang-ar" className="flex items-center gap-2">
                            <Globe className="h-4 w-4" />
                            العربية
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <Switch id="lang-en" defaultChecked />
                          <Label htmlFor="lang-en" className="flex items-center gap-2">
                            <Globe className="h-4 w-4" />
                            الإنجليزية
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <Switch id="lang-fr" />
                          <Label htmlFor="lang-fr" className="flex items-center gap-2">
                            <Globe className="h-4 w-4" />
                            الفرنسية
                          </Label>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
