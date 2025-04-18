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
import { Textarea } from "@/components/ui/textarea"
import { Save, Check, Facebook, Instagram, Twitter, Youtube, Phone, MessageCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ContactSettingsPage() {
  const [activeTab, setActiveTab] = useState("social")
  const [settings, setSettings] = useState({
    facebook: "https://facebook.com/carauction",
    twitter: "https://twitter.com/carauction",
    instagram: "https://instagram.com/carauction",
    youtube: "https://youtube.com/carauction",
    whatsapp: "+966555123456",
    telegram: "@carauction",
    showContactButton: true,
    contactButtonText: "تواصل معنا",
    defaultContactMessage: "أحتاج إلى مساعدة بخصوص...",
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
            <h1 className="text-3xl font-bold tracking-tight">إعدادات التواصل</h1>
            <p className="text-muted-foreground">إدارة روابط التواصل الاجتماعي وخيارات التواصل</p>
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
            <AlertDescription>تم حفظ إعدادات التواصل بنجاح.</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="social" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 md:w-[400px]">
            <TabsTrigger value="social">التواصل الاجتماعي</TabsTrigger>
            <TabsTrigger value="contact">خيارات التواصل</TabsTrigger>
          </TabsList>
          <TabsContent value="social" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>روابط التواصل الاجتماعي</CardTitle>
                <CardDescription>إدارة روابط حسابات التواصل الاجتماعي</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="facebook" className="flex items-center gap-2">
                    <Facebook className="h-4 w-4" />
                    فيسبوك
                  </Label>
                  <Input
                    id="facebook"
                    value={settings.facebook}
                    onChange={(e) => handleSettingChange("facebook", e.target.value)}
                    placeholder="https://facebook.com/yourpage"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitter" className="flex items-center gap-2">
                    <Twitter className="h-4 w-4" />
                    تويتر
                  </Label>
                  <Input
                    id="twitter"
                    value={settings.twitter}
                    onChange={(e) => handleSettingChange("twitter", e.target.value)}
                    placeholder="https://twitter.com/youraccount"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instagram" className="flex items-center gap-2">
                    <Instagram className="h-4 w-4" />
                    انستغرام
                  </Label>
                  <Input
                    id="instagram"
                    value={settings.instagram}
                    onChange={(e) => handleSettingChange("instagram", e.target.value)}
                    placeholder="https://instagram.com/youraccount"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="youtube" className="flex items-center gap-2">
                    <Youtube className="h-4 w-4" />
                    يوتيوب
                  </Label>
                  <Input
                    id="youtube"
                    value={settings.youtube}
                    onChange={(e) => handleSettingChange("youtube", e.target.value)}
                    placeholder="https://youtube.com/yourchannel"
                  />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>روابط المراسلة</CardTitle>
                <CardDescription>إدارة روابط المراسلة الفورية</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="whatsapp" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    واتساب
                  </Label>
                  <Input
                    id="whatsapp"
                    value={settings.whatsapp}
                    onChange={(e) => handleSettingChange("whatsapp", e.target.value)}
                    placeholder="+966555123456"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telegram" className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4" />
                    تيليجرام
                  </Label>
                  <Input
                    id="telegram"
                    value={settings.telegram}
                    onChange={(e) => handleSettingChange("telegram", e.target.value)}
                    placeholder="@yourusername"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="contact" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>زر التواصل</CardTitle>
                <CardDescription>إعدادات زر التواصل الذي يظهر في أعلى الموقع</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="show-contact-button">إظهار زر التواصل</Label>
                    <p className="text-sm text-muted-foreground">عرض زر التواصل في أعلى الموقع</p>
                  </div>
                  <Switch
                    id="show-contact-button"
                    checked={settings.showContactButton}
                    onCheckedChange={(checked) => handleSettingChange("showContactButton", checked)}
                  />
                </div>
                {settings.showContactButton && (
                  <>
                    <Separator />
                    <div className="space-y-2">
                      <Label htmlFor="contact-button-text">نص زر التواصل</Label>
                      <Input
                        id="contact-button-text"
                        value={settings.contactButtonText}
                        onChange={(e) => handleSettingChange("contactButtonText", e.target.value)}
                        placeholder="تواصل معنا"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="default-contact-message">الرسالة الافتراضية</Label>
                      <Textarea
                        id="default-contact-message"
                        value={settings.defaultContactMessage}
                        onChange={(e) => handleSettingChange("defaultContactMessage", e.target.value)}
                        placeholder="أحتاج إلى مساعدة بخصوص..."
                      />
                      <p className="text-xs text-muted-foreground">
                        هذه الرسالة ستظهر تلقائياً عند الضغط على زر التواصل
                      </p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
