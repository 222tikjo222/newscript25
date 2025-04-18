import type { Metadata } from "next"
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form"

export const metadata: Metadata = {
  title: "استعادة كلمة المرور | معرض السيارات",
  description: "استعادة كلمة المرور الخاصة بك",
}

export default function ForgotPasswordPage() {
  return (
    <div className="container py-12">
      <div className="flex flex-col items-center justify-center space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">استعادة كلمة المرور</h1>
          <p className="text-muted-foreground">أدخل بريدك الإلكتروني لاستعادة كلمة المرور</p>
        </div>
        <ForgotPasswordForm />
      </div>
    </div>
  )
}
