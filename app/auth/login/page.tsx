import type { Metadata } from "next"
import { LoginForm } from "@/components/auth/login-form"

export const metadata: Metadata = {
  title: "تسجيل الدخول | معرض السيارات",
  description: "قم بتسجيل الدخول للوصول إلى حسابك",
}

export default function LoginPage() {
  return (
    <div className="container py-12">
      <div className="flex flex-col items-center justify-center space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">تسجيل الدخول</h1>
          <p className="text-muted-foreground">قم بتسجيل الدخول للوصول إلى حسابك</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
