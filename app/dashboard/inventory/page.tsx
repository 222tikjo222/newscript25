import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Filter, Download } from "lucide-react"

const cars = [
  {
    id: "CAR001",
    name: "مرسيدس S-Class",
    model: "2023",
    price: "450,000 ر.س",
    status: "متوفر",
    color: "أسود",
  },
  {
    id: "CAR002",
    name: "بي إم دبليو X7",
    model: "2023",
    price: "420,000 ر.س",
    status: "متوفر",
    color: "أبيض",
  },
  {
    id: "CAR003",
    name: "أودي A8",
    model: "2022",
    price: "380,000 ر.س",
    status: "محجوز",
    color: "فضي",
  },
  {
    id: "CAR004",
    name: "لكزس LX600",
    model: "2023",
    price: "520,000 ر.س",
    status: "متوفر",
    color: "أبيض لؤلؤي",
  },
  {
    id: "CAR005",
    name: "جينيسيس G90",
    model: "2023",
    price: "400,000 ر.س",
    status: "متوفر",
    color: "أسود",
  },
]

export default function InventoryPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold">إدارة المخزون</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> إضافة سيارة جديدة
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
              <Input placeholder="بحث عن سيارة..." className="pl-10 pr-3" />
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
                <TableHead>رقم السيارة</TableHead>
                <TableHead>الاسم</TableHead>
                <TableHead>الموديل</TableHead>
                <TableHead>اللون</TableHead>
                <TableHead>السعر</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cars.map((car) => (
                <TableRow key={car.id}>
                  <TableCell>{car.id}</TableCell>
                  <TableCell>{car.name}</TableCell>
                  <TableCell>{car.model}</TableCell>
                  <TableCell>{car.color}</TableCell>
                  <TableCell>{car.price}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                        car.status === "متوفر" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {car.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        تعديل
                      </Button>
                      <Button variant="outline" size="sm" className="text-destructive">
                        حذف
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
