import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Filter, Download, Mail, Phone } from "lucide-react"

const customers = [
  {
    id: "CUST001",
    name: "أحمد محمد",
    email: "ahmed@example.com",
    phone: "0555123456",
    purchases: 3,
    lastPurchase: "2023-10-15",
    status: "نشط",
  },
  {
    id: "CUST002",
    name: "سارة عبدالله",
    email: "sara@example.com",
    phone: "0555789012",
    purchases: 1,
    lastPurchase: "2023-09-22",
    status: "نشط",
  },
  {
    id: "CUST003",
    name: "خالد العمري",
    email: "khalid@example.com",
    phone: "0555456789",
    purchases: 2,
    lastPurchase: "2023-08-30",
    status: "نشط",
  },
  {
    id: "CUST004",
    name: "نورة السعيد",
    email: "noura@example.com",
    phone: "0555234567",
    purchases: 1,
    lastPurchase: "2023-07-15",
    status: "غير نشط",
  },
  {
    id: "CUST005",
    name: "فهد الحربي",
    email: "fahad@example.com",
    phone: "0555345678",
    purchases: 4,
    lastPurchase: "2023-11-01",
    status: "نشط",
  },
]

export default function CustomersPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold">إدارة العملاء</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> إضافة عميل جديد
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
              <Input placeholder="بحث عن عميل..." className="pl-10 pr-3" />
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
                <TableHead>رقم العميل</TableHead>
                <TableHead>الاسم</TableHead>
                <TableHead>معلومات الاتصال</TableHead>
                <TableHead>عدد المشتريات</TableHead>
                <TableHead>آخر شراء</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>{customer.id}</TableCell>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center">
                        <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{customer.email}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{customer.phone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{customer.purchases}</TableCell>
                  <TableCell>{customer.lastPurchase}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                        customer.status === "نشط" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {customer.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        عرض
                      </Button>
                      <Button variant="outline" size="sm">
                        تعديل
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
