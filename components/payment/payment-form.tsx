"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CreditCard, CheckCircle2, AlertCircle } from "lucide-react"
import type { PaymentMethod, Address } from "@/lib/types"

interface PaymentFormProps {
  amount: number
  paymentMethods: PaymentMethod[]
  addresses: Address[]
  onPaymentComplete: () => void
}

export function PaymentForm({ amount, paymentMethods, addresses, onPaymentComplete }: PaymentFormProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("credit-card")
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>(
    paymentMethods.find((pm) => pm.is_default)?.id || "",
  )
  const [selectedAddress, setSelectedAddress] = useState<number>(addresses.find((addr) => addr.is_default)?.id || 0)
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // بيانات بطاقة جديدة
  const [newCard, setNewCard] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
  })

  const handleNewCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewCard((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    setPaymentStatus("idle")
    setErrorMessage(null)

    try {
      // في تطبيق حقيقي، سنقوم بإرسال طلب API لمعالجة الدفع
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // محاكاة لنجاح الدفع
      setPaymentStatus("success")
      setTimeout(() => {
        onPaymentComplete()
      }, 1500)
    } catch (error) {
      setPaymentStatus("error")
      setErrorMessage("حدث خطأ أثناء معالجة الدفع. يرجى المحاولة مرة أخرى.")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        {paymentStatus === "success" && (
          <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900">
            <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
            <AlertTitle>تم الدفع بنجاح!</AlertTitle>
            <AlertDescription>تم معالجة الدفع بنجاح. سيتم توجيهك إلى صفحة تأكيد الطلب خلال لحظات.</AlertDescription>
          </Alert>
        )}

        {paymentStatus === "error" && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>فشل الدفع</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader>
            <CardTitle>تفاصيل الدفع</CardTitle>
            <CardDescription>اختر طريقة الدفع المناسبة لك</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="credit-card" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="credit-card">بطاقة ائتمانية</TabsTrigger>
                <TabsTrigger value="bank-transfer">تحويل بنكي</TabsTrigger>
              </TabsList>
              <TabsContent value="credit-card" className="space-y-4 pt-4">
                {paymentMethods.length > 0 && (
                  <>
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">البطاقات المحفوظة</h3>
                      <RadioGroup
                        value={selectedPaymentMethod}
                        onValueChange={setSelectedPaymentMethod}
                        className="space-y-2"
                      >
                        {paymentMethods.map((method) => (
                          <div
                            key={method.id}
                            className={`flex items-center space-x-2 space-x-reverse rounded-md border p-3 ${
                              selectedPaymentMethod === method.id ? "border-primary" : ""
                            }`}
                          >
                            <RadioGroupItem value={method.id} id={method.id} />
                            <Label htmlFor={method.id} className="flex-1 cursor-pointer">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                                  <span>
                                    {method.brand} **** {method.last4}
                                  </span>
                                </div>
                                <span className="text-sm text-muted-foreground">
                                  {method.expiry_month}/{method.expiry_year}
                                </span>
                              </div>
                            </Label>
                          </div>
                        ))}
                        <div
                          className={`flex items-center space-x-2 space-x-reverse rounded-md border p-3 ${
                            selectedPaymentMethod === "new" ? "border-primary" : ""
                          }`}
                        >
                          <RadioGroupItem value="new" id="new" />
                          <Label htmlFor="new" className="flex-1 cursor-pointer">
                            إضافة بطاقة جديدة
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {selectedPaymentMethod === "new" && (
                      <div className="space-y-4 pt-4 border-t">
                        <h3 className="text-sm font-medium">بيانات البطاقة الجديدة</h3>
                        <div className="grid gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="card-number">رقم البطاقة</Label>
                            <Input
                              id="card-number"
                              name="cardNumber"
                              placeholder="0000 0000 0000 0000"
                              value={newCard.cardNumber}
                              onChange={handleNewCardChange}
                              required={selectedPaymentMethod === "new"}
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="card-holder">اسم حامل البطاقة</Label>
                            <Input
                              id="card-holder"
                              name="cardHolder"
                              placeholder="الاسم كما يظهر على البطاقة"
                              value={newCard.cardHolder}
                              onChange={handleNewCardChange}
                              required={selectedPaymentMethod === "new"}
                            />
                          </div>
                          <div className="grid grid-cols-3 gap-4">
                            <div className="grid gap-2">
                              <Label htmlFor="expiry-month">شهر الانتهاء</Label>
                              <Input
                                id="expiry-month"
                                name="expiryMonth"
                                placeholder="MM"
                                maxLength={2}
                                value={newCard.expiryMonth}
                                onChange={handleNewCardChange}
                                required={selectedPaymentMethod === "new"}
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="expiry-year">سنة الانتهاء</Label>
                              <Input
                                id="expiry-year"
                                name="expiryYear"
                                placeholder="YY"
                                maxLength={2}
                                value={newCard.expiryYear}
                                onChange={handleNewCardChange}
                                required={selectedPaymentMethod === "new"}
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="cvv">رمز الأمان (CVV)</Label>
                              <Input
                                id="cvv"
                                name="cvv"
                                placeholder="123"
                                maxLength={3}
                                value={newCard.cvv}
                                onChange={handleNewCardChange}
                                required={selectedPaymentMethod === "new"}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}

                {paymentMethods.length === 0 && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">بيانات البطاقة</h3>
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="card-number">رقم البطاقة</Label>
                        <Input
                          id="card-number"
                          name="cardNumber"
                          placeholder="0000 0000 0000 0000"
                          value={newCard.cardNumber}
                          onChange={handleNewCardChange}
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="card-holder">اسم حامل البطاقة</Label>
                        <Input
                          id="card-holder"
                          name="cardHolder"
                          placeholder="الاسم كما يظهر على البطاقة"
                          value={newCard.cardHolder}
                          onChange={handleNewCardChange}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="expiry-month">شهر الانتهاء</Label>
                          <Input
                            id="expiry-month"
                            name="expiryMonth"
                            placeholder="MM"
                            maxLength={2}
                            value={newCard.expiryMonth}
                            onChange={handleNewCardChange}
                            required
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="expiry-year">سنة الانتهاء</Label>
                          <Input
                            id="expiry-year"
                            name="expiryYear"
                            placeholder="YY"
                            maxLength={2}
                            value={newCard.expiryYear}
                            onChange={handleNewCardChange}
                            required
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="cvv">رمز الأمان (CVV)</Label>
                          <Input
                            id="cvv"
                            name="cvv"
                            placeholder="123"
                            maxLength={3}
                            value={newCard.cvv}
                            onChange={handleNewCardChange}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="bank-transfer" className="space-y-4 pt-4">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">تفاصيل الحساب البنكي</h3>
                  <div className="rounded-md bg-muted p-4">
                    <p className="mb-2 font-medium">بنك الرياض</p>
                    <p className="text-sm text-muted-foreground">اسم الحساب: معرض السيارات</p>
                    <p className="text-sm text-muted-foreground">رقم الحساب: SA0380000000608010167519</p>
                    <p className="text-sm text-muted-foreground">رقم الآيبان: SA0380000000608010167519</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="transfer-receipt">إيصال التحويل</Label>
                    <Input id="transfer-receipt" type="file" className="cursor-pointer" />
                    <p className="text-xs text-muted-foreground">
                      يرجى إرفاق صورة لإيصال التحويل البنكي. الصيغ المدعومة: JPG، PNG، PDF.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>عنوان الفاتورة</CardTitle>
            <CardDescription>اختر عنوان الفاتورة</CardDescription>
          </CardHeader>
          <CardContent>
            {addresses.length > 0 ? (
              <RadioGroup value={String(selectedAddress)} onValueChange={(value) => setSelectedAddress(Number(value))}>
                <div className="space-y-3">
                  {addresses.map((address) => (
                    <div
                      key={address.id}
                      className={`flex items-center space-x-2 space-x-reverse rounded-md border p-3 ${
                        selectedAddress === address.id ? "border-primary" : ""
                      }`}
                    >
                      <RadioGroupItem value={String(address.id)} id={`address-${address.id}`} />
                      <Label htmlFor={`address-${address.id}`} className="flex-1 cursor-pointer">
                        <div>
                          <p className="font-medium">{address.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {address.address_line1}
                            {address.address_line2 && `, ${address.address_line2}`}, {address.city},{" "}
                            {address.postal_code}
                          </p>
                          <p className="text-sm text-muted-foreground">{address.phone}</p>
                        </div>
                      </Label>
                    </div>
                  ))}
                  <div
                    className={`flex items-center space-x-2 space-x-reverse rounded-md border p-3 ${
                      selectedAddress === 0 ? "border-primary" : ""
                    }`}
                  >
                    <RadioGroupItem value="0" id="address-new" />
                    <Label htmlFor="address-new" className="flex-1 cursor-pointer">
                      إضافة عنوان جديد
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">الاسم الكامل</Label>
                    <Input id="name" placeholder="أدخل الاسم الكامل" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">رقم الهاتف</Label>
                    <Input id="phone" placeholder="05xxxxxxxx" required />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="address-line1">العنوان</Label>
                  <Input id="address-line1" placeholder="الشارع، الحي" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="address-line2">العنوان (اختياري)</Label>
                  <Input id="address-line2" placeholder="شقة، مبنى، طابق" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="city">المدينة</Label>
                    <Input id="city" placeholder="المدينة" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="postal-code">الرمز البريدي</Label>
                    <Input id="postal-code" placeholder="الرمز البريدي" required />
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>ملخص الطلب</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>المبلغ الإجمالي</span>
                <span className="font-bold">{amount.toLocaleString()} ريال</span>
              </div>
              <div className="flex justify-between">
                <span>ضريبة القيمة المضافة (15%)</span>
                <span>{(amount * 0.15).toLocaleString()} ريال</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold">
                <span>الإجمالي</span>
                <span>{(amount * 1.15).toLocaleString()} ريال</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isProcessing}>
              {isProcessing ? "جاري معالجة الدفع..." : `إتمام الدفع - ${(amount * 1.15).toLocaleString()} ريال`}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </form>
  )
}
