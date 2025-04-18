"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      })
    }, 1500)
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">اتصل بنا</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-6">تواصل معنا</h2>
          <p className="text-muted-foreground mb-8">
            نحن هنا للإجابة على جميع استفساراتك. يمكنك التواصل معنا عبر النموذج أدناه أو من خلال معلومات الاتصال
            المتوفرة.
          </p>

          {isSubmitted ? (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-green-800 dark:text-green-300 mb-2">تم إرسال رسالتك بنجاح!</h3>
              <p className="text-green-700 dark:text-green-400">
                شكراً للتواصل معنا. سيقوم فريقنا بالرد عليك في أقرب وقت ممكن.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">الاسم</Label>
                  <Input id="name" name="name" value={formState.name} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">البريد الإلكتروني</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">رقم الهاتف</Label>
                  <Input id="phone" name="phone" value={formState.phone} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">الموضوع</Label>
                  <Select value={formState.subject} onValueChange={(value) => handleSelectChange("subject", value)}>
                    <SelectTrigger id="subject">
                      <SelectValue placeholder="اختر الموضوع" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="استفسار عام">استفسار عام</SelectItem>
                      <SelectItem value="شراء سيارة">شراء سيارة</SelectItem>
                      <SelectItem value="بيع سيارة">بيع سيارة</SelectItem>
                      <SelectItem value="خدمة الصيانة">خدمة الصيانة</SelectItem>
                      <SelectItem value="شكوى">شكوى</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">الرسالة</Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formState.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "جاري الإرسال..." : "إرسال"}
              </Button>
            </form>
          )}
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">معلومات الاتصال</h2>

          <div className="bg-muted p-6 rounded-lg mb-8">
            <div className="space-y-6">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-primary ml-4 mt-1" />
                <div>
                  <h3 className="font-bold mb-1">العنوان</h3>
                  <p className="text-muted-foreground">
                    شارع الملك فهد، حي العليا
                    <br />
                    الرياض، المملكة العربية السعودية
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="h-5 w-5 text-primary ml-4 mt-1" />
                <div>
                  <h3 className="font-bold mb-1">الهاتف</h3>
                  <p className="text-muted-foreground">
                    +966 12 345 6789
                    <br />
                    +966 12 345 6780
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Mail className="h-5 w-5 text-primary ml-4 mt-1" />
                <div>
                  <h3 className="font-bold mb-1">البريد الإلكتروني</h3>
                  <p className="text-muted-foreground">
                    info@cardealership.com
                    <br />
                    support@cardealership.com
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="h-5 w-5 text-primary ml-4 mt-1" />
                <div>
                  <h3 className="font-bold mb-1">ساعات العمل</h3>
                  <p className="text-muted-foreground">
                    السبت - الخميس: 9:00 صباحاً - 9:00 مساءً
                    <br />
                    الجمعة: 4:00 مساءً - 9:00 مساءً
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg overflow-hidden h-[300px] border">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.674457218805!2d46.67252287536825!3d24.713552278564354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f03890d489399%3A0xa7f29cd43a8ffccf!2sKing%20Fahd%20Rd%2C%20Riyadh%20Saudi%20Arabia!5e0!3m2!1sen!2sus!4v1650123456789!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  )
}
