"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cars } from "@/lib/data"
import type { Car } from "@/lib/types"

export default function CarsPage() {
  const [filteredCars, setFilteredCars] = useState<Car[]>(cars)
  const [searchTerm, setSearchTerm] = useState("")
  const [priceRange, setPriceRange] = useState("")
  const [sortBy, setSortBy] = useState("")

  const handleSearch = () => {
    let results = [...cars]

    // Filter by search term
    if (searchTerm) {
      results = results.filter(
        (car) =>
          car.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          car.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filter by price range
    if (priceRange) {
      const [min, max] = priceRange.split("-").map(Number)
      results = results.filter((car) => car.price >= min && car.price <= max)
    }

    // Sort results
    if (sortBy === "price-asc") {
      results.sort((a, b) => a.price - b.price)
    } else if (sortBy === "price-desc") {
      results.sort((a, b) => b.price - a.price)
    } else if (sortBy === "newest") {
      results.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    }

    setFilteredCars(results)
  }

  const resetFilters = () => {
    setSearchTerm("")
    setPriceRange("")
    setSortBy("")
    setFilteredCars(cars)
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">معرض السيارات</h1>

      {/* Filters */}
      <div className="bg-muted p-6 rounded-lg mb-8">
        <h2 className="text-xl font-bold mb-4">البحث والتصفية</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="search">البحث</Label>
            <Input
              id="search"
              placeholder="ابحث عن سيارة..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="price-range">نطاق السعر</Label>
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger id="price-range">
                <SelectValue placeholder="اختر نطاق السعر" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-300000">أقل من 300,000 ريال</SelectItem>
                <SelectItem value="300000-400000">300,000 - 400,000 ريال</SelectItem>
                <SelectItem value="400000-500000">400,000 - 500,000 ريال</SelectItem>
                <SelectItem value="500000-1000000">أكثر من 500,000 ريال</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="sort-by">ترتيب حسب</Label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger id="sort-by">
                <SelectValue placeholder="ترتيب حسب" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price-asc">السعر: من الأقل للأعلى</SelectItem>
                <SelectItem value="price-desc">السعر: من الأعلى للأقل</SelectItem>
                <SelectItem value="newest">الأحدث</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end gap-2">
            <Button onClick={handleSearch} className="flex-1">
              بحث
            </Button>
            <Button variant="outline" onClick={resetFilters}>
              إعادة ضبط
            </Button>
          </div>
        </div>
      </div>

      {/* Results */}
      {filteredCars.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <Card key={car.id} className="overflow-hidden">
              <div className="relative h-60">
                <Image src={car.image || "/placeholder.svg"} alt={car.title} fill className="object-cover" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">{car.title}</h3>
                <p className="text-muted-foreground mb-4 line-clamp-2">{car.description}</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg">{car.price.toLocaleString()} ريال</span>
                  <Button asChild>
                    <Link href={`/cars/${car.id}`}>التفاصيل</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-bold mb-2">لا توجد نتائج</h3>
          <p className="text-muted-foreground mb-4">لم يتم العثور على سيارات تطابق معايير البحث الخاصة بك</p>
          <Button onClick={resetFilters}>إعادة ضبط الفلاتر</Button>
        </div>
      )}
    </div>
  )
}
