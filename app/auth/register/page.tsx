import type { Metadata } from "next"
import { RegisterForm } from "@/components/auth/register-form"

export const metadata: Metadata = {
  title: "إنشاء حساب جديد | معرض السيارات",
  description: "قم بإنشاء حساب جديد للوصول إلى جميع خدماتنا",
}

export default function RegisterPage() {
  return (
    <div className="container py-12">
      <div className="flex flex-col items-center justify-center space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">إنشاء حساب جديد</h1>
          <p className="text-muted-foreground">قم بإنشاء حساب للوصول إلى جميع خدماتنا</p>
        </div>
        <RegisterForm />
      </div>
    </div>
  )
}
