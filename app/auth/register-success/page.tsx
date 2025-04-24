import type { Metadata } from "next"
import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "تم التسجيل بنجاح | معرض السيارات",
  description: "تم إنشاء حسابك بنجاح",
}

export default function RegisterSuccessPage() {
  return (
    <div className="container py-12">
      <div className="flex flex-col items-center justify-center space-y-6">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <CardTitle className="text-2xl">تم التسجيل بنجاح!</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground">
              شكراً لتسجيلك في موقعنا. تم إنشاء حسابك بنجاح ويمكنك الآن الاستفادة من جميع خدماتنا.
            </p>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button asChild className="w-full">
              <Link href="/auth/login">تسجيل الدخول</Link>
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link href="/">العودة إلى الصفحة الرئيسية</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
