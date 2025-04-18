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
import { CreditCard, DollarSign, Save, Check, AlertCircle, Eye, EyeOff } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function AdminPaymentGatewaysPage() {
  const [activeTab, setActiveTab] = useState("paypal")
  const [isSaving, setIsSaving] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [showSecrets, setShowSecrets] = useState({
    paypal: false,
    stripe: false,
  })

  const [paymentGateways, setPaymentGateways] = useState({
    paypal: {
      enabled: true,
      clientId: "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVv",
      clientSecret: "EeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz",
      sandbox: true,
    },
    stripe: {
      enabled: true,
      publishableKey: "pk_test_AbCdEfGhIjKlMnOpQrStUvWxYz",
      secretKey: "sk_test_AbCdEfGhIjKlMnOpQrStUvWxYz",
      testMode: true,
    },
  })

  const handlePaymentGatewayChange = (gateway: string, key: string, value: any) => {
    setPaymentGateways({
      ...paymentGateways,
      [gateway]: {
        ...paymentGateways[gateway as keyof typeof paymentGateways],
        [key]: value,
      },
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

  const toggleShowSecret = (gateway: keyof typeof showSecrets) => {
    setShowSecrets({
      ...showSecrets,
      [gateway]: !showSecrets[gateway],
    })
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar isAdmin className="hidden lg:flex" />
      <div className="flex-1 space-y-6 p-6 lg:pr-80">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">بوابات الدفع</h1>
            <p className="text-muted-foreground">إدارة وتكوين بوابات الدفع الإلكتروني</p>
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
            <AlertDescription>تم حفظ إعدادات بوابات الدفع بنجاح.</AlertDescription>
          </Alert>
        )}

        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>ملاحظة هامة</AlertTitle>
          <AlertDescription>
            تأكد من إدخال بيانات صحيحة لبوابات الدفع. البيانات الخاطئة قد تؤدي إلى فشل عمليات الدفع.
          </AlertDescription>
        </Alert>

        <Tabs defaultValue="paypal" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 md:w-[400px]">
            <TabsTrigger value="paypal" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              PayPal
            </TabsTrigger>
            <TabsTrigger value="stripe" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Stripe
            </TabsTrigger>
          </TabsList>
          <TabsContent value="paypal" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>إعدادات PayPal</CardTitle>
                <CardDescription>تكوين بوابة الدفع PayPal</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="paypal-enabled">تفعيل PayPal</Label>
                    <p className="text-sm text-muted-foreground">تفعيل الدفع عبر PayPal في الموقع</p>
                  </div>
                  <Switch
                    id="paypal-enabled"
                    checked={paymentGateways.paypal.enabled}
                    onCheckedChange={(checked) => handlePaymentGatewayChange("paypal", "enabled", checked)}
                  />
                </div>
                <Separator />
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="paypal-client-id">Client ID</Label>
                    <Input
                      id="paypal-client-id"
                      value={paymentGateways.paypal.clientId}
                      onChange={(e) => handlePaymentGatewayChange("paypal", "clientId", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="paypal-client-secret">Client Secret</Label>
                    <div className="relative">
                      <Input
                        id="paypal-client-secret"
                        type={showSecrets.paypal ? "text" : "password"}
                        value={paymentGateways.paypal.clientSecret}
                        onChange={(e) => handlePaymentGatewayChange("paypal", "clientSecret", e.target.value)}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        type="button"
                        className="absolute left-2 top-1/2 -translate-y-1/2"
                        onClick={() => toggleShowSecret("paypal")}
                      >
                        {showSecrets.paypal ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Switch
                      id="paypal-sandbox"
                      checked={paymentGateways.paypal.sandbox}
                      onCheckedChange={(checked) => handlePaymentGatewayChange("paypal", "sandbox", checked)}
                    />
                    <Label htmlFor="paypal-sandbox">وضع الاختبار (Sandbox)</Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="stripe" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>إعدادات Stripe</CardTitle>
                <CardDescription>تكوين بوابة الدفع Stripe</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="stripe-enabled">تفعيل Stripe</Label>
                    <p className="text-sm text-muted-foreground">تفعيل الدفع عبر Stripe في الموقع</p>
                  </div>
                  <Switch
                    id="stripe-enabled"
                    checked={paymentGateways.stripe.enabled}
                    onCheckedChange={(checked) => handlePaymentGatewayChange("stripe", "enabled", checked)}
                  />
                </div>
                <Separator />
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="stripe-publishable-key">Publishable Key</Label>
                    <Input
                      id="stripe-publishable-key"
                      value={paymentGateways.stripe.publishableKey}
                      onChange={(e) => handlePaymentGatewayChange("stripe", "publishableKey", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stripe-secret-key">Secret Key</Label>
                    <div className="relative">
                      <Input
                        id="stripe-secret-key"
                        type={showSecrets.stripe ? "text" : "password"}
                        value={paymentGateways.stripe.secretKey}
                        onChange={(e) => handlePaymentGatewayChange("stripe", "secretKey", e.target.value)}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        type="button"
                        className="absolute left-2 top-1/2 -translate-y-1/2"
                        onClick={() => toggleShowSecret("stripe")}
                      >
                        {showSecrets.stripe ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Switch
                      id="stripe-test-mode"
                      checked={paymentGateways.stripe.testMode}
                      onCheckedChange={(checked) => handlePaymentGatewayChange("stripe", "testMode", checked)}
                    />
                    <Label htmlFor="stripe-test-mode">وضع الاختبار (Test Mode)</Label>
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
