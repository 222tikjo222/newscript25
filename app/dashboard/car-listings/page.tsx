"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, Search, Filter, Download, MoreHorizontal } from "lucide-react"

// بيانات وهمية للسيارات
const cars = [
  {
    id: "CAR001",
    name: "مرسيدس S-Class",
    model: "2023",
    price: "450,000 ر.س",
    status: "متوفر",
    color: "أسود",
    views: 245,
    bids: 12,
  },
  {
    id: "CAR002",
    name: "بي إم دبليو X7",
    model: "2023",
    price: "420,000 ر.س",
    status: "متوفر",
    color: "أبيض",
    views: 189,
    bids: 8,
  },
  {
    id: "CAR003",
    name: "أودي A8",
    model: "2022",
    price: "380,000 ر.س",
    status: "محجوز",
    color: "فضي",
    views: 210,
    bids: 15,
  },
  {
    id: "CAR004",
    name: "لكزس LX600",
    model: "2023",
    price: "520,000 ر.س",
    status: "متوفر",
    color: "أبيض لؤلؤي",
    views: 302,
    bids: 20,
  },
  {
    id: "CAR005",
    name: "جينيسيس G90",
    model: "2023",
    price: "400,000 ر.س",
    status: "متوفر",
    color: "أسود",
    views: 178,
    bids: 6,
  },
]

export default function CarListingsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("")

  // تصفية السيارات بناءً على البحث والفلتر
  const filteredCars = cars.filter((car) => {
    const matchesSearch =
      searchTerm === "" ||
      car.name.includes(searchTerm) ||
      car.model.includes(searchTerm) ||
      car.id.includes(searchTerm)

    const matchesStatus = statusFilter === "" || car.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold">السيارات المعروضة</h1>
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
              <Input
                placeholder="بحث عن سيارة..."
                className="pl-10 pr-3"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="الحالة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">الكل</SelectItem>
                <SelectItem value="متوفر">متوفر</SelectItem>
                <SelectItem value="محجوز">محجوز</SelectItem>
                <SelectItem value="مباع">مباع</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setSearchTerm("")
                  setStatusFilter("")
                }}
              >
                <Filter className="mr-2 h-4 w-4" /> إعادة ضبط
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
                <TableHead>المشاهدات</TableHead>
                <TableHead>المزايدات</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCars.map((car) => (
                <TableRow key={car.id}>
                  <TableCell>{car.id}</TableCell>
                  <TableCell>{car.name}</TableCell>
                  <TableCell>{car.model}</TableCell>
                  <TableCell>{car.color}</TableCell>
                  <TableCell>{car.price}</TableCell>
                  <TableCell>{car.views}</TableCell>
                  <TableCell>{car.bids}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        car.status === "متوفر"
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : car.status === "محجوز"
                            ? "bg-amber-100 text-amber-800 hover:bg-amber-100"
                            : "bg-blue-100 text-blue-800 hover:bg-blue-100"
                      }
                    >
                      {car.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">القائمة</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>عرض</DropdownMenuItem>
                        <DropdownMenuItem>تعديل</DropdownMenuItem>
                        <DropdownMenuItem>تغيير الحالة</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">حذف</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
