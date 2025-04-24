"use client"

import { useState, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Check, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { auctions, bids, getCarById, getAllCars } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import { AuctionWindow } from "@/components/auction-window"

export default function AuctionDetailsPage({ params }: { params: { id: string } }) {
  const auctionId = Number.parseInt(params.id)
  const auction = auctions.find((a) => a.id === auctionId)

  if (!auction) {
    notFound()
  }

  const car = getCarById(auction.car_id)
  const auctionBids = bids.filter((bid) => bid.car_id === auction.car_id)
  const similarCars = getAllCars()
    .filter((c) => c.id !== auction.car_id)
    .slice(0, 3)

  const [bidAmount, setBidAmount] = useState<number>(auction.current_price + 5000)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bidSuccess, setBidSuccess] = useState<boolean | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  if (!car) {
    notFound()
  }

  const handleBidSubmit = useCallback(
    async (amount: number) => {
      setIsSubmitting(true)
      setBidSuccess(null)
      setErrorMessage(null)

      try {
        // في تطبيق حقيقي، سنقوم بإرسال طلب API لتقديم المزايدة
        await new Promise((resolve) => setTimeout(resolve, 1500))

        if (amount <= auction.current_price) {
          setErrorMessage("يجب أن يكون مبلغ المزايدة أكبر من السعر الحالي")
          setBidSuccess(false)
          return
        }

        // محاكاة لنجاح المزايدة
        setBidSuccess(true)
      } catch (error) {
        setErrorMessage("حدث خطأ أثناء تقديم المزايدة. يرجى المحاولة مرة أخرى.")
        setBidSuccess(false)
      } finally {
        setIsSubmitting(false)
      }
    },
    [auction.current_price],
  )

  return (
    <div className="container py-8">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" asChild className="mr-2">
          <Link href="/auctions">
            <ArrowLeft className="h-4 w-4 ml-2" />
            العودة للمزادات
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="relative h-[400px] rounded-lg overflow-hidden mb-6">
            <Image src={car.image || "/placeholder.svg"} alt={car.title} fill className="object-cover" priority />
          </div>

          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">{car.title}</h1>
            <div className="flex items-center gap-4 text-muted-foreground">
              <div className="flex items-center">
                <Users className="h-4 w-4 ml-1" />
                <span>{auction.bids_count} مزايدة</span>
              </div>
              <div>السعر الابتدائي: {auction.start_price.toLocaleString()} ريال</div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-4">تفاصيل السيارة</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <span className="font-medium">الموديل:</span>
                  <span className="mr-2">{car.model}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium">سنة الصنع:</span>
                  <span className="mr-2">{car.year}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium">المسافة المقطوعة:</span>
                  <span className="mr-2">{car.mileage?.toLocaleString()} كم</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium">اللون:</span>
                  <span className="mr-2">{car.color}</span>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h2 className="text-xl font-bold mb-4">الوصف</h2>
              <p className="text-muted-foreground">{car.description}</p>
            </div>

            <Separator />

            <div>
              <h2 className="text-xl font-bold mb-4">المميزات</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {car.features?.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="h-4 w-4 text-primary ml-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <AuctionWindow auction={auction} onBidSubmit={handleBidSubmit} />
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">سجل المزايدات</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>المستخدم</TableHead>
              <TableHead>المبلغ</TableHead>
              <TableHead>التاريخ</TableHead>
              <TableHead>الحالة</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {auctionBids.length > 0 ? (
              auctionBids.map((bid) => (
                <TableRow key={bid.id}>
                  <TableCell>{bid.user?.username}</TableCell>
                  <TableCell>{bid.amount.toLocaleString()} ريال</TableCell>
                  <TableCell>{new Date(bid.created_at).toLocaleDateString("ar-SA")}</TableCell>
                  <TableCell>
                    <Badge
                      variant={bid.status === "won" ? "success" : bid.status === "lost" ? "destructive" : "default"}
                    >
                      {bid.status === "active" ? "نشط" : bid.status === "won" ? "فائز" : "خاسر"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  لا توجد مزايدات حتى الآن
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">سيارات مشابهة</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {similarCars.map((similarCar) => (
            <div key={similarCar.id} className="border rounded-lg overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={similarCar.image || "/placeholder.svg"}
                  alt={similarCar.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold mb-2">{similarCar.title}</h3>
                <p className="text-primary font-bold mb-2">{similarCar.price.toLocaleString()} ريال</p>
                <Button asChild size="sm" className="w-full">
                  <Link href={`/cars/${similarCar.id}`}>التفاصيل</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
