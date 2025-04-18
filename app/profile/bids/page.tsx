"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Car, Gavel, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { bids, cars, auctions, getPaymentForBid } from "@/lib/data"

export default function ProfileBidsPage() {
  const [activeTab, setActiveTab] = useState("active")

  // في تطبيق حقيقي، سنقوم بجلب بيانات المستخدم من API
  const userId = 1 // مثال لمعرف المستخدم

  // فلترة المزايدات حسب المستخدم
  const userBids = bids.filter((bid) => bid.user_id === userId)

  // تصنيف المزايدات حسب الحالة
  const activeBids = userBids.filter((bid) => bid.status === "active")
  const wonBids = userBids.filter((bid) => bid.status === "won")
  const lostBids = userBids.filter((bid) => bid.status === "lost")

  // الحصول على بيانات السيارة والمزاد لكل مزايدة
  const getBidDetails = (bid: (typeof bids)[0]) => {
    const car = cars.find((c) => c.id === bid.car_id)
    const auction = auctions.find((a) => a.car_id === bid.car_id)
    return { car, auction }
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">مزايداتي</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* القائمة الجانبية */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>القائمة</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <nav className="flex flex-col">
              <Link href="/profile" className="flex items-center gap-2 px-4 py-2 hover:bg-muted">
                <User className="h-4 w-4" />
                <span>معلوماتي</span>
              </Link>
              <Link href="/profile/orders" className="flex items-center gap-2 px-4 py-2 hover:bg-muted">
                <Car className="h-4 w-4" />
                <span>طلباتي</span>
              </Link>
              <Link href="/profile/bids" className="flex items-center gap-2 px-4 py-2 hover:bg-muted text-primary">
                <Gavel className="h-4 w-4" />
                <span>مزايداتي</span>
              </Link>
            </nav>
          </CardContent>
        </Card>

        {/* المحتوى الرئيسي */}
        <div className="md:col-span-3">
          <Tabs defaultValue="active" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="active">المزايدات النشطة</TabsTrigger>
              <TabsTrigger value="won">المزايدات الفائزة</TabsTrigger>
              <TabsTrigger value="lost">المزايدات الخاسرة</TabsTrigger>
            </TabsList>
            <TabsContent value="active">
              {activeBids.length > 0 ? (
                <div className="space-y-4">
                  {activeBids.map((bid) => {
                    const { car, auction } = getBidDetails(bid)
                    if (!car || !auction) return null
                    return (
                      <Card key={bid.id}>
                        <CardContent className="p-4">
                          <div className="flex flex-col md:flex-row gap-4">
                            <div className="relative h-32 w-48 rounded-md overflow-hidden">
                              <Image
                                src={car.image || "/placeholder.svg"}
                                alt={car.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-lg font-bold">{car.title}</h3>
                              <div className="flex flex-wrap gap-4 mt-2">
                                <div>
                                  <p className="text-sm text-muted-foreground">مبلغ المزايدة</p>
                                  <p className="font-medium">{bid.amount.toLocaleString()} ريال</p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">السعر الحالي</p>
                                  <p className="font-medium">{auction.current_price.toLocaleString()} ريال</p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">حالة المزايدة</p>
                                  <Badge variant={bid.amount >= auction.current_price ? "success" : "default"}>
                                    {bid.amount >= auction.current_price ? "الأعلى" : "تم تجاوزها"}
                                  </Badge>
                                </div>
                              </div>
                              <div className="mt-4 flex gap-2">
                                <Button asChild size="sm">
                                  <Link href={`/auctions/${auction.id}`}>عرض المزاد</Link>
                                </Button>
                                {bid.amount < auction.current_price && (
                                  <Button variant="outline" size="sm" asChild>
                                    <Link href={`/auctions/${auction.id}`}>زيادة المزايدة</Link>
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>لا توجد مزايدات نشطة</CardTitle>
                    <CardDescription>لم تقم بأي مزايدات نشطة حتى الآن</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild>
                      <Link href="/auctions">تصفح المزادات</Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            <TabsContent value="won">
              {wonBids.length > 0 ? (
                <div className="space-y-4">
                  {wonBids.map((bid) => {
                    const { car, auction } = getBidDetails(bid)
                    const payment = getPaymentForBid(bid.id)
                    if (!car || !auction) return null
                    return (
                      <Card key={bid.id}>
                        <CardContent className="p-4">
                          <div className="flex flex-col md:flex-row gap-4">
                            <div className="relative h-32 w-48 rounded-md overflow-hidden">
                              <Image
                                src={car.image || "/placeholder.svg"}
                                alt={car.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-lg font-bold">{car.title}</h3>
                              <div className="flex flex-wrap gap-4 mt-2">
                                <div>
                                  <p className="text-sm text-muted-foreground">مبلغ المزايدة</p>
                                  <p className="font-medium">{bid.amount.toLocaleString()} ريال</p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">تاريخ الفوز</p>
                                  <p className="font-medium">{new Date(bid.created_at).toLocaleDateString("ar-SA")}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">حالة المزايدة</p>
                                  <Badge variant="success">فائز</Badge>
                                </div>
                                {payment && (
                                  <div>
                                    <p className="text-sm text-muted-foreground">حالة الدفع</p>
                                    <Badge
                                      variant={
                                        payment.status === "completed"
                                          ? "success"
                                          : payment.status === "pending"
                                            ? "default"
                                            : "destructive"
                                      }
                                    >
                                      {payment.status === "completed"
                                        ? "تم الدفع"
                                        : payment.status === "pending"
                                          ? "قيد المعالجة"
                                          : "فشل الدفع"}
                                    </Badge>
                                  </div>
                                )}
                              </div>
                              <div className="mt-4 flex gap-2">
                                <Button asChild size="sm">
                                  <Link href={`/cars/${car.id}`}>عرض السيارة</Link>
                                </Button>
                                {!payment && (
                                  <Button variant="outline" size="sm" asChild>
                                    <Link href={`/checkout/${bid.id}`}>إتمام الشراء</Link>
                                  </Button>
                                )}
                                {payment && payment.status === "pending" && (
                                  <Button variant="outline" size="sm" asChild>
                                    <Link href={`/checkout/${bid.id}`}>متابعة الدفع</Link>
                                  </Button>
                                )}
                                {payment && payment.status === "completed" && (
                                  <Button variant="outline" size="sm" asChild>
                                    <Link href={`/profile/orders`}>عرض الطلب</Link>
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>لا توجد مزايدات فائزة</CardTitle>
                    <CardDescription>لم تفز بأي مزادات حتى الآن</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild>
                      <Link href="/auctions">تصفح المزادات</Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            <TabsContent value="lost">
              {lostBids.length > 0 ? (
                <div className="space-y-4">
                  {lostBids.map((bid) => {
                    const { car, auction } = getBidDetails(bid)
                    if (!car || !auction) return null
                    return (
                      <Card key={bid.id}>
                        <CardContent className="p-4">
                          <div className="flex flex-col md:flex-row gap-4">
                            <div className="relative h-32 w-48 rounded-md overflow-hidden">
                              <Image
                                src={car.image || "/placeholder.svg"}
                                alt={car.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-lg font-bold">{car.title}</h3>
                              <div className="flex flex-wrap gap-4 mt-2">
                                <div>
                                  <p className="text-sm text-muted-foreground">مبلغ المزايدة</p>
                                  <p className="font-medium">{bid.amount.toLocaleString()} ريال</p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">تاريخ المزايدة</p>
                                  <p className="font-medium">{new Date(bid.created_at).toLocaleDateString("ar-SA")}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">حالة المزايدة</p>
                                  <Badge variant="destructive">خاسر</Badge>
                                </div>
                              </div>
                              <div className="mt-4 flex gap-2">
                                <Button asChild size="sm">
                                  <Link href={`/cars/${car.id}`}>عرض السيارة</Link>
                                </Button>
                                <Button variant="outline" size="sm" asChild>
                                  <Link href="/auctions">تصفح مزادات أخرى</Link>
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>لا توجد مزايدات خاسرة</CardTitle>
                    <CardDescription>لم تخسر أي مزادات حتى الآن</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild>
                      <Link href="/auctions">تصفح المزادات</Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
