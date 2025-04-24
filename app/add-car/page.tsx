"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
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
import { toast } from "@/components/ui/use-toast"
import { UploadCloud, Info, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// تعريف نموذج التحقق من البيانات
const carFormSchema = z.object({
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
  price: z.string().min(1, {
    message: "يرجى إدخال السعر",
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
  isAuction: z.boolean().default(false),
  startingBid: z.string().optional(),
  auctionEndDate: z.string().optional(),
})

type CarFormValues = z.infer<typeof carFormSchema>

// القيم الافتراضية للنموذج
const defaultValues: Partial<CarFormValues> = {
  title: "",
  make: "",
  model: "",
  year: "",
  mileage: "",
  price: "",
  color: "",
  fuelType: "",
  transmission: "",
  description: "",
  features: [],
  isAuction: false,
  startingBid: "",
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

export default function AddCarPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [images, setImages] = useState<File[]>([])
  const [previewUrls, setPreviewUrls] = useState<string[]>([])

  // إعداد نموذج React Hook Form
  const form = useForm<CarFormValues>({
    resolver: zodResolver(carFormSchema),
    defaultValues,
    mode: "onChange",
  })

  // مراقبة تغيير خيار المزاد
  const isAuction = form.watch("isAuction")

  // معالجة تحميل الصور
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const newImages: File[] = []
    const newPreviewUrls: string[] = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      if (file.type.startsWith("image/")) {
        newImages.push(file)
        newPreviewUrls.push(URL.createObjectURL(file))
      }
    }

    setImages([...images, ...newImages])
    setPreviewUrls([...previewUrls, ...newPreviewUrls])
  }

  // حذف صورة
  const removeImage = (index: number) => {
    const newImages = [...images]
    const newPreviewUrls = [...previewUrls]

    // إلغاء عنوان URL المؤقت لتحرير الذاكرة
    URL.revokeObjectURL(newPreviewUrls[index])

    newImages.splice(index, 1)
    newPreviewUrls.splice(index, 1)

    setImages(newImages)
    setPreviewUrls(newPreviewUrls)
  }

  // معالجة إرسال النموذج
  const onSubmit = async (data: CarFormValues) => {
    try {
      setIsSubmitting(true)

      // في تطبيق حقيقي، هنا سنقوم بإرسال البيانات والصور إلى الخادم
      // مثال: await uploadCarWithImages(data, images)

      console.log("بيانات السيارة:", data)
      console.log("الصور:", images)

      // محاكاة تأخير الشبكة
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "تم إرسال السيارة بنجاح",
        description: "سيتم مراجعة السيارة من قبل الإدارة قبل نشرها.",
      })

      // توجيه المستخدم إلى صفحة السيارات المعلقة
      router.push("/dashboard/pending-cars")
    } catch (error) {
      console.error("خطأ في إرسال النموذج:", error)
      toast({
        variant: "destructive",
        title: "حدث خطأ",
        description: "لم نتمكن من إرسال بيانات السيارة. يرجى المحاولة مرة أخرى.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">إضافة سيارة جديدة</h1>

        <Alert className="mb-6">
          <Info className="h-4 w-4" />
          <AlertTitle>قبل البدء</AlertTitle>
          <AlertDescription>
            تأكد من توفير معلومات دقيقة وصور واضحة للسيارة. سيتم مراجعة جميع السيارات المضافة من قبل الإدارة قبل نشرها.
          </AlertDescription>
        </Alert>

        <Tabs defaultValue="details" className="mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">تفاصيل السيارة</TabsTrigger>
            <TabsTrigger value="features">المميزات</TabsTrigger>
            <TabsTrigger value="auction">خيارات المزاد</TabsTrigger>
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
                          <FormLabel>عنوان الإعلان</FormLabel>
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
                        name="price"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>السعر (ريال)</FormLabel>
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
                              <FormItem className="flex flex-row items-center space-x-2 space-y-0">
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
                    <CardTitle>خيارات المزاد</CardTitle>
                    <CardDescription>إذا كنت ترغب في عرض السيارة في مزاد، قم بتحديد الخيارات المناسبة.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="isAuction"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">عرض في مزاد</FormLabel>
                            <FormDescription>ضع علامة إذا كنت ترغب في عرض السيارة في مزاد.</FormDescription>
                          </div>
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    {isAuction && (
                      <>
                        <Separator />

                        <Alert variant="secondary">
                          <AlertCircle className="h-4 w-4" />
                          <AlertTitle>معلومات هامة</AlertTitle>
                          <AlertDescription>
                            عند تفعيل خيار المزاد، يجب عليك تحديد سعر البداية وتاريخ انتهاء المزاد.
                          </AlertDescription>
                        </Alert>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="startingBid"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>سعر البداية (ريال)</FormLabel>
                                <FormControl>
                                  <Input placeholder="مثال: 50000" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="auctionEndDate"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>تاريخ انتهاء المزاد</FormLabel>
                                <FormControl>
                                  <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <Card>
                <CardHeader>
                  <CardTitle>صور السيارة</CardTitle>
                  <CardDescription>قم بتحميل صور واضحة للسيارة من جميع الزوايا.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    id="upload"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />

                  <Button asChild variant="outline">
                    <label htmlFor="upload" className="flex items-center space-x-2">
                      <UploadCloud className="h-4 w-4" />
                      <span>تحميل الصور</span>
                    </label>
                  </Button>

                  {previewUrls.length > 0 && (
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      {previewUrls.map((url, index) => (
                        <div key={index} className="relative">
                          <img src={url || "/placeholder.svg"} alt={`Preview ${index + 1}`} className="rounded-md" />
                          <Button
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2"
                            onClick={() => removeImage(index)}
                          >
                            <span className="sr-only">حذف</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-4 h-4"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              <CardFooter className="justify-end">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "جاري الإرسال..." : "إرسال"}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Tabs>
      </div>
    </div>
  )
}
