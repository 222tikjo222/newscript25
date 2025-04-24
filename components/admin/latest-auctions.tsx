"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatDistanceToNow } from "date-fns"
import { ar } from "date-fns/locale"

// بيانات وهمية للمزادات - في التطبيق الحقيقي ستأتي من API
const auctions = [
  {
    id: 1,
    carName: "مرسيدس S-Class",
    startPrice: 450000,
    currentPrice: 520000,
    bidsCount: 12,
    status: "نشط",
    endDate: new Date(Date.now() + 86400000 * 2), // بعد يومين
    highestBidder: "أحمد محمد",
  },
  {
    id: 2,
    carName: "بي إم دبليو X7",
    startPrice: 420000,
    currentPrice: 450000,
    bidsCount: 8,
    status: "نشط",
    endDate: new Date(Date.now() + 86400000 * 3), // بعد ثلاثة أيام
    highestBidder: "خالد العمري",
  },
  {
    id: 3,
    carName: "أودي A8",
    startPrice: 380000,
    currentPrice: 410000,
    bidsCount: 15,
    status: "نشط",
    endDate: new Date(Date.now() + 86400000 * 1), // بعد يوم واحد
    highestBidder: "سارة عبدالله",
  },
  {
    id: 4,
    carName: "لكزس LX600",
    startPrice: 520000,
    currentPrice: 580000,
    bidsCount: 20,
    status: "نشط",
    endDate: new Date(Date.now() + 86400000 * 4), // بعد أربعة أيام
    highestBidder: "فهد الحربي",
  },
]

export function AdminLatestAuctions() {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>السيارة</TableHead>
            <TableHead>السعر الابتدائي</TableHead>
            <TableHead>السعر الحالي</TableHead>
            <TableHead>عدد المزايدات</TableHead>
            <TableHead>أعلى مزايد</TableHead>
            <TableHead>تاريخ الانتهاء</TableHead>
            <TableHead>الحالة</TableHead>
            <TableHead>الإجراءات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {auctions.map((auction) => (
            <TableRow key={auction.id}>
              <TableCell className="font-medium">{auction.carName}</TableCell>
              <TableCell>{auction.startPrice.toLocaleString()} ريال</TableCell>
              <TableCell>{auction.currentPrice.toLocaleString()} ريال</TableCell>
              <TableCell>{auction.bidsCount}</TableCell>
              <TableCell>{auction.highestBidder}</TableCell>
              <TableCell>{formatDistanceToNow(auction.endDate, { addSuffix: true, locale: ar })}</TableCell>
              <TableCell>
                <Badge variant={auction.status === "نشط" ? "success" : "secondary"}>{auction.status}</Badge>
              </TableCell>
              <TableCell>
                <Button variant="outline" size="sm">
                  عرض
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-4 flex justify-end">
        <Button variant="outline">عرض جميع المزادات</Button>
      </div>
    </div>
  )
}
