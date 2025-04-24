"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Save, Check, AlertTriangle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function FeaturesControlPage() {
  const [activeTab, setActiveTab] = useState("site")
  const [settings, setSettings] = useState({
    // Site Features
    siteEnabled: true,
    maintenanceMessage: "الموقع قيد الصيانة حالياً. يرجى العودة لاحقاً.",
    registrationEnabled: true,
    auctionsEnabled: true,
    carsListingEnabled: true,
    contactEnabled: true,
    chatbotEnabled: true,

    // Payment Features
    paypalEnabled: true,
    stripeEnabled: true,
    bankTransferEnabled: true,
    cashOnDeliveryEnabled: false,

    // API Features
    apiEnabled: true,
    partnershipEnabled: true,
    affiliateEnabled: true,

    // User Features
    twoFactorAuthEnabled: true,
    googleLoginEnabled: true,
    facebookLoginEnabled: false,
    userVerificationRequired: true,

    // Marketing Features
    couponsEnabled: true,
    referralEnabled: true,
    newsletterEnabled: true,
    adsEnabled: true,
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
            <h1 className="text-3xl font-bold tracking-tight">التحكم في ميزات الموقع</h1>
            <p className="text-muted-foreground">تفعيل وتعطيل ميزات الموقع المختلفة</p>
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
            <AlertDescription>تم حفظ إعدادات ميزات الموقع بنجاح.</AlertDescription>
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
          <TabsList className="grid grid-cols-4 md:w-[600px]">
            <TabsTrigger value="site">الموقع</TabsTrigger>
            <TabsTrigger value="payment">الدفع</TabsTrigger>
            <TabsTrigger value="api">API</TabsTrigger>
            <TabsTrigger value="users">المستخدمين</TabsTrigger>
          </TabsList>

          {/* Site Features Tab */}
          <TabsContent value="site" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>ميزات الموقع الأساسية</CardTitle>
                <CardDescription>التحكم في ميزات الموقع الأساسية</CardDescription>
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
                    <textarea
                      id="maintenance-message"
                      value={settings.maintenanceMessage}
                      onChange={(e) => handleSettingChange("maintenanceMessage", e.target.value)}
                      placeholder="أدخل رسالة الصيانة التي ستظهر للزوار"
                      className="w-full min-h-[100px] p-2 border rounded-md"
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

                <Separator />

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

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="contact-enabled">صفحة اتصل بنا</Label>
                    <p className="text-sm text-muted-foreground">تفعيل أو إيقاف صفحة اتصل بنا في الموقع</p>
                  </div>
                  <Switch
                    id="contact-enabled"
                    checked={settings.contactEnabled}
                    onCheckedChange={(checked) => handleSettingChange("contactEnabled", checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="chatbot-enabled">بوت المحادثة الذكي</Label>
                    <p className="text-sm text-muted-foreground">تفعيل أو إيقاف بوت المحادثة الذكي في الموقع</p>
                  </div>
                  <Switch
                    id="chatbot-enabled"
                    checked={settings.chatbotEnabled}
                    onCheckedChange={(checked) => handleSettingChange("chatbotEnabled", checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payment Features Tab */}
          <TabsContent value="payment" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>طرق الدفع</CardTitle>
                <CardDescription>التحكم في طرق الدفع المتاحة في الموقع</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="paypal-enabled">PayPal</Label>
                    <p className="text-sm text-muted-foreground">تفعيل أو إيقاف الدفع عبر PayPal</p>
                  </div>
                  <Switch
                    id="paypal-enabled"
                    checked={settings.paypalEnabled}
                    onCheckedChange={(checked) => handleSettingChange("paypalEnabled", checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="stripe-enabled">Stripe</Label>
                    <p className="text-sm text-muted-foreground">تفعيل أو إيقاف الدفع عبر Stripe</p>
                  </div>
                  <Switch
                    id="stripe-enabled"
                    checked={settings.stripeEnabled}
                    onCheckedChange={(checked) => handleSettingChange("stripeEnabled", checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="bank-transfer-enabled">التحويل البنكي</Label>
                    <p className="text-sm text-muted-foreground">تفعيل أو إيقاف الدفع عبر التحويل البنكي</p>
                  </div>
                  <Switch
                    id="bank-transfer-enabled"
                    checked={settings.bankTransferEnabled}
                    onCheckedChange={(checked) => handleSettingChange("bankTransferEnabled", checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="cash-on-delivery-enabled">الدفع عند الاستلام</Label>
                    <p className="text-sm text-muted-foreground">تفعيل أو إيقاف الدفع عند الاستلام</p>
                  </div>
                  <Switch
                    id="cash-on-delivery-enabled"
                    checked={settings.cashOnDeliveryEnabled}
                    onCheckedChange={(checked) => handleSettingChange("cashOnDeliveryEnabled", checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* API Features Tab */}
          <TabsContent value="api" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>ميزات API والشراكات</CardTitle>
                <CardDescription>التحكم في ميزات API والشراكات في الموقع</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="api-enabled">تفعيل API</Label>
                    <p className="text-sm text-muted-foreground">تفعيل أو إيقاف واجهة برمجة التطبيقات (API)</p>
                  </div>
                  <Switch
                    id="api-enabled"
                    checked={settings.apiEnabled}
                    onCheckedChange={(checked) => handleSettingChange("apiEnabled", checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="partnership-enabled">نظام الشراكة</Label>
                    <p className="text-sm text-muted-foreground">تفعيل أو إيقاف نظام الشراكة في الموقع</p>
                  </div>
                  <Switch
                    id="partnership-enabled"
                    checked={settings.partnershipEnabled}
                    onCheckedChange={(checked) => handleSettingChange("partnershipEnabled", checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="affiliate-enabled">نظام التسويق بالعمولة</Label>
                    <p className="text-sm text-muted-foreground">تفعيل أو إيقاف نظام التسويق بالعمولة في الموقع</p>
                  </div>
                  <Switch
                    id="affiliate-enabled"
                    checked={settings.affiliateEnabled}
                    onCheckedChange={(checked) => handleSettingChange("affiliateEnabled", checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* User Features Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>ميزات المستخدمين</CardTitle>
                <CardDescription>التحكم في ميزات المستخدمين في الموقع</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="two-factor-auth-enabled">المصادقة الثنائية</Label>
                    <p className="text-sm text-muted-foreground">تفعيل أو إيقاف المصادقة الثنائية للمستخدمين</p>
                  </div>
                  <Switch
                    id="two-factor-auth-enabled"
                    checked={settings.twoFactorAuthEnabled}
                    onCheckedChange={(checked) => handleSettingChange("twoFactorAuthEnabled", checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="google-login-enabled">تسجيل الدخول عبر Google</Label>
                    <p className="text-sm text-muted-foreground">تفعيل أو إيقاف تسجيل الدخول عبر Google</p>
                  </div>
                  <Switch
                    id="google-login-enabled"
                    checked={settings.googleLoginEnabled}
                    onCheckedChange={(checked) => handleSettingChange("googleLoginEnabled", checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="facebook-login-enabled">تسجيل الدخول عبر Facebook</Label>
                    <p className="text-sm text-muted-foreground">تفعيل أو إيقاف تسجيل الدخول عبر Facebook</p>
                  </div>
                  <Switch
                    id="facebook-login-enabled"
                    checked={settings.facebookLoginEnabled}
                    onCheckedChange={(checked) => handleSettingChange("facebookLoginEnabled", checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="user-verification-required">التحقق من المستخدمين</Label>
                    <p className="text-sm text-muted-foreground">
                      طلب التحقق من المستخدمين قبل السماح لهم بالمزايدة أو الشراء
                    </p>
                  </div>
                  <Switch
                    id="user-verification-required"
                    checked={settings.userVerificationRequired}
                    onCheckedChange={(checked) => handleSettingChange("userVerificationRequired", checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
