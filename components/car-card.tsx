"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface CarCardProps {
  car: {
    id: number
    title: string
    year: number
    price: number
    type: string
    saleType: string
    image: string
    images: string[]
  }
}

export function CarCard({ car }: CarCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handleImageHover = (e: React.MouseEvent<HTMLImageElement>) => {
    // يمكنك إضافة تأثير تحريك الصورة هنا
  }

  const handleImageClick = () => {
    setIsDialogOpen(true)
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % car.images.length)
  }

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + car.images.length) % car.images.length)
  }

  return (
    <Card className="overflow-hidden">
      <div className="relative h-60">
        <Image
          src={car.images[currentImageIndex] || car.image || "/placeholder.svg"}
          alt={car.title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-110 cursor-pointer"
          onMouseEnter={handleImageHover}
          onClick={handleImageClick}
        />
        {car.images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-1/2 -translate-y-1/2 left-2"
              onClick={handlePrevImage}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-chevron-left"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
              <span className="sr-only">السابق</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-1/2 -translate-y-1/2 right-2"
              onClick={handleNextImage}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-chevron-right"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
              <span className="sr-only">التالي</span>
            </Button>
          </>
        )}
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-2">{car.title}</h3>
        <div className="flex justify-between items-center">
          <span className="font-bold text-lg">{car.price.toLocaleString()} ريال</span>
          <Button asChild>
            <Link href={`/cars/${car.id}`}>التفاصيل</Link>
          </Button>
        </div>
      </CardContent>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[75%]">
          <DialogHeader>
            <DialogTitle>{car.title}</DialogTitle>
            <DialogDescription>تفاصيل السيارة الكاملة</DialogDescription>
          </DialogHeader>
          <Image
            src={car.images[currentImageIndex] || car.image || "/placeholder.svg"}
            alt={car.title}
            width={800}
            height={600}
            className="object-cover"
          />
        </DialogContent>
      </Dialog>
    </Card>
  )
}
