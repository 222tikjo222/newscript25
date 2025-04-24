"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { UploadCloud } from "lucide-react"

// تعريف نموذج التحقق من البيانات
const auctionFormSchema = z.object({
  title: z.string().min(5, {
    message: "يجب أن يكون العنوان 5 أحرف على الأقل",
  }),
  make: z.string({
    required_error: "يرجى اختيار الشركة المصنعة",
  }),
  model: z.string().min(1, {
    message: "يرجى إدخال موديل السيارة",
  }),
  year: z.string().regex(/^\d{4}$/, {
    message: "يرجى إدخال سنة صنع صحيحة (4 أرقام)",
  }),
  mileage: z.string().min(1, {
    message: "يرجى إدخال عدد الكيلومترات",
  }),
  startPrice: z.string().min(1, {
    message: "يرجى إدخال سعر البداية",
  }),
  color: z.string().min(1, {
    message: "يرجى إدخال اللون",
  }),
  fuelType: z.string({
    required_error: "يرجى اختيار نوع الوقود",
  }),
  transmission: z.string({
    required_error: "يرجى اختيار نوع ناقل الحركة",
  }),
  description: z.string().min(20, {
    message: "يجب أن يكون الوصف 20 حرفًا على الأقل",
  }),
  features: z.array(z.string()).optional(),
  auctionEndDate: z.string().min(1, {
    message: "يرجى تحديد تاريخ انتهاء المزاد",
  }),
})

type AuctionFormValues = z.infer<typeof auctionFormSchema>

// القيم الافتراضية للنموذج
const defaultValues: Partial<AuctionFormValues> = {
  title: "",
  make: "",
  model: "",
  year: "",
  mileage: "",
  startPrice: "",
  color: "",
  fuelType: "",
  transmission: "",
  description: "",
  features: [],
  auctionEndDate: "",
}

// قائمة الشركات المصنعة
const carMakes = [
  { label: "تويوتا", value: "toyota" },
  { label: "هوندا", value: "honda" },
  { label: "نيسان", value: "nissan" },
  { label: "مرسيدس", value: "mercedes" },
  { label: "بي إم دبليو", value: "bmw" },
  { label: "أودي", value: "audi" },
  { label: "لكزس", value: "lexus" },
  { label: "فورد", value: "ford" },
  { label: "شيفروليه", value: "chevrolet" },
  { label: "هيونداي", value: "hyundai" },
  { label: "كيا", value: "kia" },
]

// قائمة أنواع الوقود
const fuelTypes = [
  { label: "بنزين", value: "petrol" },
  { label: "ديزل", value: "diesel" },
  { label: "كهرباء", value: "electric" },
  { label: "هجين", value: "hybrid" },
]

// قائمة أنواع ناقل الحركة
const transmissionTypes = [
  { label: "أوتوماتيك", value: "automatic" },
  { label: "يدوي", value: "manual" },
  { label: "نصف أوتوماتيك", value: "semi-automatic" },
]

// قائمة المميزات
const carFeatures = [
  { id: "leather_seats", label: "مقاعد جلد" },
  { id: "sunroof", label: "فتحة سقف" },
  { id: "navigation", label: "نظام ملاحة" },
  { id: "bluetooth", label: "بلوتوث" },
  { id: "cruise_control", label: "مثبت سرعة" },
  { id: "parking_sensors", label: "حساسات ركن" },
  { id: "camera", label: "كاميرا خلفية" },
  { id: "keyless", label: "دخول بدون مفتاح" },
  { id: "heated_seats", label: "مقاعد مدفأة" },
  { id: "air_conditioning", label: "تكييف" },
]

export default function NewAuctionPage() {
  // إعداد نموذج React Hook Form
  const form = useForm<AuctionFormValues>({
    resolver: zodResolver(auctionFormSchema),
    defaultValues,
    mode: "onChange",
  })

  // معالجة إرسال النموذج
  const onSubmit = async (data: AuctionFormValues) => {
    console.log("بيانات المزاد:", data)
    // هنا سيتم إرسال البيانات إلى الخادم
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">إنشاء مزاد جديد</h1>

      <Tabs defaultValue="details" className="mb-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="details">تفاصيل السيارة</TabsTrigger>
          <TabsTrigger value="features">المميزات</TabsTrigger>
          <TabsTrigger value="auction">إعدادات المزاد</TabsTrigger>
        </TabsList>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <TabsContent value="details" className="space-y-4 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>المعلومات الأساسية</CardTitle>
                  <CardDescription>أدخل المعلومات الأساسية للسيارة.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>عنوان المزاد</FormLabel>
                        <FormControl>
                          <Input placeholder="مثال: مرسيدس S-Class 2022 بحالة ممتازة" {...field} />
                        </FormControl>
                        <FormDescription>عنوان وصفي يظهر في نتائج البحث.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="make"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>الشركة المصنعة</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="اختر الشركة المصنعة" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {carMakes.map((make) => (
                                <SelectItem key={make.value} value={make.value}>
                                  {make.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="model"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>الموديل</FormLabel>
                          <FormControl>
                            <Input placeholder="مثال: كامري" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="year"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>سنة الصنع</FormLabel>
                          <FormControl>
                            <Input placeholder="مثال: 2022" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="mileage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>عدد الكيلومترات</FormLabel>
                          <FormControl>
                            <Input placeholder="مثال: 50000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="color"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>اللون</FormLabel>
                          <FormControl>
                            <Input placeholder="مثال: أسود" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="startPrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>سعر البداية (ريال)</FormLabel>
                          <FormControl>
                            <Input placeholder="مثال: 150000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="fuelType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>نوع الوقود</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="اختر نوع الوقود" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {fuelTypes.map((type) => (
                                <SelectItem key={type.value} value={type.value}>
                                  {type.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="transmission"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ناقل الحركة</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="اختر نوع ناقل الحركة" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {transmissionTypes.map((type) => (
                                <SelectItem key={type.value} value={type.value}>
                                  {type.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>الوصف</FormLabel>
                        <FormControl>
                          <Textarea placeholder="أدخل وصفًا تفصيليًا للسيارة" className="resize-none" {...field} />
                        </FormControl>
                        <FormDescription>
                          اذكر التفاصيل الهامة حول السيارة، مثل حالتها، تاريخ الصيانة، والميزات الإضافية.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="features" className="space-y-4 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>المميزات</CardTitle>
                  <CardDescription>اختر المميزات المتوفرة في السيارة.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {carFeatures.map((feature) => (
                      <FormField
                        key={feature.id}
                        control={form.control}
                        name="features"
                        render={({ field }) => {
                          return (
                            <FormItem className="flex flex-row items-center space-x-2 space-y-0 rtl:space-x-reverse">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(feature.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...(field.value || []), feature.id])
                                      : field.onChange(field.value?.filter((value) => value !== feature.id))
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">{feature.label}</FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="auction" className="space-y-4 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>إعدادات المزاد</CardTitle>
                  <CardDescription>حدد إعدادات المزاد الخاص بك.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="auctionEndDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>تاريخ انتهاء المزاد</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormDescription>
                          حدد تاريخ انتهاء المزاد. سيتم إغلاق المزاد تلقائيًا في هذا التاريخ.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Separator className="my-4" />

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">صور السيارة</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                        <UploadCloud className="h-8 w-8 mx-auto text-muted-foreground" />
                        <div className="mt-4">
                          <Button variant="outline" type="button">
                            اختر الصور
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">PNG, JPG, GIF حتى 10MB</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <CardFooter className="flex justify-end">
              <Button type="submit">إنشاء المزاد</Button>
            </CardFooter>
          </form>
        </Form>
      </Tabs>
    </div>
  )
}
