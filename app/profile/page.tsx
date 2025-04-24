import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Car, Heart, ShoppingBag, User } from "lucide-react"

export const metadata: Metadata = {
  title: "الملف الشخصي | معرض السيارات",
  description: "إدارة حسابك الشخصي",
}

export default function ProfilePage() {
  // هذه بيانات وهمية - في التطبيق الحقيقي سيتم جلبها من قاعدة البيانات
  const user = {
    name: "أحمد محمد",
    email: "ahmed@example.com",
    phone: "0555123456",
    joinDate: "15 أكتوبر 2023",
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">الملف الشخصي</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* القائمة الجانبية */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>القائمة</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <nav className="flex flex-col">
              <Link href="/profile" className="flex items-center gap-2 px-4 py-2 hover:bg-muted text-primary">
                <User className="h-4 w-4" />
                <span>معلوماتي</span>
              </Link>
              <Link href="/profile/orders" className="flex items-center gap-2 px-4 py-2 hover:bg-muted">
                <ShoppingBag className="h-4 w-4" />
                <span>طلباتي</span>
              </Link>
              <Link href="/profile/favorites" className="flex items-center gap-2 px-4 py-2 hover:bg-muted">
                <Heart className="h-4 w-4" />
                <span>المفضلة</span>
              </Link>
              <Link href="/profile/bids" className="flex items-center gap-2 px-4 py-2 hover:bg-muted">
                <Car className="h-4 w-4" />
                <span>مزايداتي</span>
              </Link>
            </nav>
          </CardContent>
        </Card>

        {/* المحتوى الرئيسي */}
        <div className="md:col-span-3">
          <Tabs defaultValue="info">
            <TabsList className="mb-6">
              <TabsTrigger value="info">معلوماتي</TabsTrigger>
              <TabsTrigger value="security">الأمان</TabsTrigger>
            </TabsList>
            <TabsContent value="info">
              <Card>
                <CardHeader>
                  <CardTitle>المعلومات الشخصية</CardTitle>
                  <CardDescription>عرض وتعديل معلوماتك الشخصية</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">الاسم الكامل</p>
                      <p className="font-medium">{user.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">البريد الإلكتروني</p>
                      <p className="font-medium">{user.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">رقم الهاتف</p>
                      <p className="font-medium">{user.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">تاريخ الانضمام</p>
                      <p className="font-medium">{user.joinDate}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>تعديل المعلومات</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>الأمان</CardTitle>
                  <CardDescription>إدارة كلمة المرور وإعدادات الأمان</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">كلمة المرور</p>
                    <p className="font-medium">********</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>تغيير كلمة المرور</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
