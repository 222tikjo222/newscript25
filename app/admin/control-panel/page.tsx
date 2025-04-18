"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Save, Check, AlertTriangle, Info } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ControlPanelPage() {
  const [activeTab, setActiveTab] = useState("site")
  const [settings, setSettings] = useState({
    siteEnabled: true,
    maintenanceMessage: "الموقع قيد الصيانة حالياً. يرجى العودة لاحقاً.",
    registrationEnabled: true,
    auctionsEnabled: true,
    carsListingEnabled: true,
    contactPageEnabled: true,
    faqPageEnabled: true,
    aboutPageEnabled: true,
    termsPageEnabled: true,
    privacyPageEnabled: true,
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
            <h1 className="text-3xl font-bold tracking-tight">لوحة التحكم</h1>
            <p className="text-muted-foreground">التحكم في تشغيل وإيقاف ميزات الموقع</p>
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
            <AlertDescription>تم حفظ إعدادات لوحة التحكم بنجاح.</AlertDescription>
          </Alert>
        )}

        {!settings.siteEnabled && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>تنبيه!</AlertTitle>
            <AlertDescription>الموقع حالياً في وضع الصيانة. لن يتمكن المستخدمون من الوصول إلى الموقع.</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="site" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 md:w-[400px]">
            <TabsTrigger value="site">الموقع</TabsTrigger>
            <TabsTrigger value="pages">الصفحات</TabsTrigger>
          </TabsList>
          <TabsContent value="site" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>حالة الموقع</CardTitle>
                <CardDescription>التحكم في حالة تشغيل الموقع</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="site-enabled">تشغيل الموقع</Label>
                    <p className="text-sm text-muted-foreground">عند إيقاف الموقع، سيتم عرض صفحة الصيانة للزوار</p>
                  </div>
                  <Switch
                    id="site-enabled"
                    checked={settings.siteEnabled}
                    onCheckedChange={(checked) => handleSettingChange("siteEnabled", checked)}
                  />
                </div>
                {!settings.siteEnabled && (
                  <div className="space-y-2 pt-4">
                    <Label htmlFor="maintenance-message">رسالة الصيانة</Label>
                    <Textarea
                      id="maintenance-message"
                      value={settings.maintenanceMessage}
                      onChange={(e) => handleSettingChange("maintenanceMessage", e.target.value)}
                      placeholder="أدخل رسالة الصيانة التي ستظهر للزوار"
                    />
                  </div>
                )}
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="registration-enabled">تفعيل التسجيل</Label>
                    <p className="text-sm text-muted-foreground">السماح للمستخدمين الجدد بالتسجيل في الموقع</p>
                  </div>
                  <Switch
                    id="registration-enabled"
                    checked={settings.registrationEnabled}
                    onCheckedChange={(checked) => handleSettingChange("registrationEnabled", checked)}
                  />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>الأقسام الرئيسية</CardTitle>
                <CardDescription>التحكم في تفعيل وإيقاف الأقسام الرئيسية</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="auctions-enabled">قسم المزادات</Label>
                    <p className="text-sm text-muted-foreground">تفعيل أو إيقاف قسم المزادات في الموقع</p>
                  </div>
                  <Switch
                    id="auctions-enabled"
                    checked={settings.auctionsEnabled}
                    onCheckedChange={(checked) => handleSettingChange("auctionsEnabled", checked)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="cars-listing-enabled">قسم عرض السيارات</Label>
                    <p className="text-sm text-muted-foreground">تفعيل أو إيقاف قسم عرض السيارات في الموقع</p>
                  </div>
                  <Switch
                    id="cars-listing-enabled"
                    checked={settings.carsListingEnabled}
                    onCheckedChange={(checked) => handleSettingChange("carsListingEnabled", checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="pages" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>الصفحات الثابتة</CardTitle>
                <CardDescription>التحكم في عرض وإخفاء الصفحات الثابتة</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="contact-page-enabled">صفحة اتصل بنا</Label>
                    <p className="text-sm text-muted-foreground">عرض أو إخفاء صفحة اتصل بنا في الموقع</p>
                  </div>
                  <Switch
                    id="contact-page-enabled"
                    checked={settings.contactPageEnabled}
                    onCheckedChange={(checked) => handleSettingChange("contactPageEnabled", checked)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="faq-page-enabled">صفحة الأسئلة الشائعة</Label>
                    <p className="text-sm text-muted-foreground">عرض أو إخفاء صفحة الأسئلة الشائعة في الموقع</p>
                  </div>
                  <Switch
                    id="faq-page-enabled"
                    checked={settings.faqPageEnabled}
                    onCheckedChange={(checked) => handleSettingChange("faqPageEnabled", checked)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="about-page-enabled">صفحة من نحن</Label>
                    <p className="text-sm text-muted-foreground">عرض أو إخفاء صفحة من نحن في الموقع</p>
                  </div>
                  <Switch
                    id="about-page-enabled"
                    checked={settings.aboutPageEnabled}
                    onCheckedChange={(checked) => handleSettingChange("aboutPageEnabled", checked)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="terms-page-enabled">صفحة الشروط والأحكام</Label>
                    <p className="text-sm text-muted-foreground">عرض أو إخفاء صفحة الشروط والأحكام في الموقع</p>
                  </div>
                  <Switch
                    id="terms-page-enabled"
                    checked={settings.termsPageEnabled}
                    onCheckedChange={(checked) => handleSettingChange("termsPageEnabled", checked)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="privacy-page-enabled">صفحة سياسة الخصوصية</Label>
                    <p className="text-sm text-muted-foreground">عرض أو إخفاء صفحة سياسة الخصوصية في الموقع</p>
                  </div>
                  <Switch
                    id="privacy-page-enabled"
                    checked={settings.privacyPageEnabled}
                    onCheckedChange={(checked) => handleSettingChange("privacyPageEnabled", checked)}
                  />
                </div>
              </CardContent>
            </Card>
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>ملاحظة</AlertTitle>
              <AlertDescription>
                إخفاء الصفحة لا يعني حذفها، بل يعني فقط عدم ظهورها في القائمة الرئيسية وعدم إمكانية الوصول إليها مباشرة.
              </AlertDescription>
            </Alert>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
