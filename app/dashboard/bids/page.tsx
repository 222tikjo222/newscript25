import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Filter, Download, Check, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const bids = [
  {
    id: "BID001",
    car: "مرسيدس S-Class 2023",
    customer: "أحمد محمد",
    amount: "440,000 ر.س",
    date: "2023-10-15",
    status: "نشط",
  },
  {
    id: "BID002",
    car: "مرسيدس S-Class 2023",
    customer: "سارة عبدالله",
    amount: "445,000 ر.س",
    date: "2023-10-16",
    status: "نشط",
  },
  {
    id: "BID003",
    car: "بي إم دبليو X7 2023",
    customer: "خالد العمري",
    amount: "510,000 ر.س",
    date: "2023-10-10",
    status: "فائز",
  },
  {
    id: "BID004",
    car: "أودي A8 2023",
    customer: "نورة السعيد",
    amount: "470,000 ر.س",
    date: "2023-10-05",
    status: "خاسر",
  },
  {
    id: "BID005",
    car: "لكزس LX600 2023",
    customer: "فهد الحربي",
    amount: "540,000 ر.س",
    date: "2023-10-18",
    status: "نشط",
  },
]

export default function BidsPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold">إدارة المزايدات</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> تصدير البيانات
          </Button>
          <Button>إضافة مزايدة جديدة</Button>
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>تصفية وبحث</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="بحث عن مزايدة..." className="pl-10 pr-3" />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="w-full">
                <Filter className="mr-2 h-4 w-4" /> تصفية
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
                <TableHead>رقم المزايدة</TableHead>
                <TableHead>السيارة</TableHead>
                <TableHead>العميل</TableHead>
                <TableHead>المبلغ</TableHead>
                <TableHead>التاريخ</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bids.map((bid) => (
                <TableRow key={bid.id}>
                  <TableCell>{bid.id}</TableCell>
                  <TableCell>{bid.car}</TableCell>
                  <TableCell>{bid.customer}</TableCell>
                  <TableCell>{bid.amount}</TableCell>
                  <TableCell>{bid.date}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        bid.status === "نشط"
                          ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                          : bid.status === "فائز"
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : "bg-red-100 text-red-800 hover:bg-red-100"
                      }
                    >
                      {bid.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="text-green-600">
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600">
                        <X className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        عرض
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
