import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, Clock, ArrowLeft } from "lucide-react"

export default function MaintenancePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-6 text-center">
          <div className="mb-6 flex justify-center">
            <div className="relative h-24 w-24">
              <Image src="/abstract-automotive-emblem.png" alt="شعار معرض السيارات" fill className="object-contain" />
            </div>
          </div>
          <div className="mb-6 flex justify-center">
            <AlertTriangle className="h-12 w-12 text-yellow-500" />
          </div>
          <h1 className="mb-2 text-2xl font-bold">الموقع قيد الصيانة</h1>
          <p className="mb-6 text-muted-foreground">
            نعتذر عن الإزعاج، نحن نعمل حالياً على تحسين الموقع لتقديم تجربة أفضل لك. يرجى العودة لاحقاً.
          </p>
          <div className="mb-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>الوقت المتوقع للانتهاء: 2 ساعة</span>
          </div>
          <div className="flex flex-col gap-2">
            <Button variant="outline" className="w-full">
              <ArrowLeft className="mr-2 h-4 w-4" />
              العودة لاحقاً
            </Button>
            <p className="text-xs text-muted-foreground">
              إذا كنت بحاجة إلى مساعدة عاجلة، يرجى التواصل معنا عبر البريد الإلكتروني:{" "}
              <a href="mailto:support@example.com" className="text-primary hover:underline">
                support@example.com
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
