"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Filter, Download, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { auctions, cars } from "@/lib/data"
import { AuctionCountdown } from "@/components/auctions/auction-countdown"

export default function AuctionsManagementPage() {
  const [searchTerm, setSearchTerm] = useState("")

  // دمج بيانات المزادات مع بيانات السيارات
  const auctionsWithCars = auctions.map((auction) => {
    const car = cars.find((c) => c.id === auction.car_id)
    return { ...auction, car }
  })

  // فلترة المزادات حسب البحث
  const filteredAuctions = auctionsWithCars.filter((auction) => {
    if (!searchTerm) return true
    return (
      auction.car?.title.toLowerCase().includes(searchTerm.toLowerCase()) || auction.id.toString().includes(searchTerm)
    )
  })

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold">إدارة المزادات</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> إضافة مزاد جديد
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>تصفية وبحث</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="بحث عن مزاد..."
                className="pl-10 pr-3"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="w-full">
                <Filter className="mr-2 h-4 w-4" /> تصفية
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>رقم المزاد</TableHead>
                <TableHead>السيارة</TableHead>
                <TableHead>السعر الحالي</TableHead>
                <TableHead>عدد المزايدات</TableHead>
                <TableHead>الوقت المتبقي</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAuctions.map((auction) => (
                <TableRow key={auction.id}>
                  <TableCell>{auction.id}</TableCell>
                  <TableCell>{auction.car?.title || "غير معروف"}</TableCell>
                  <TableCell>{auction.current_price.toLocaleString()} ريال</TableCell>
                  <TableCell>{auction.bids_count}</TableCell>
                  <TableCell>
                    {auction.status === "active" ? (
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 ml-1 text-muted-foreground" />
                        <AuctionCountdown endDate={auction.end_date} />
                      </div>
                    ) : auction.status === "upcoming" ? (
                      "لم يبدأ بعد"
                    ) : (
                      "انتهى"
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        auction.status === "active"
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : auction.status === "upcoming"
                            ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                      }
                    >
                      {auction.status === "active" ? "نشط" : auction.status === "upcoming" ? "قادم" : "منتهي"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/auctions/${auction.id}`}>عرض</Link>
                      </Button>
                      <Button variant="outline" size="sm">
                        تعديل
                      </Button>
                      <Button variant="outline" size="sm" className="text-destructive">
                        إلغاء
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
