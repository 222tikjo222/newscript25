"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { InteractiveImage } from "@/components/interactive-image"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface Car {
  id: number
  title: string
  price: number
  image: string
  year: number
  type: string
}

interface CarCarouselProps {
  cars: Car[]
  title?: string
  className?: string
}

export function CarCarousel({ cars, title, className }: CarCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  const handleNext = () => {
    if (!carouselRef.current) return

    carouselRef.current.scrollBy({
      left: carouselRef.current.offsetWidth,
      behavior: "smooth",
    })

    setActiveIndex((prev) => Math.min(prev + 1, cars.length - 1))
  }

  const handlePrev = () => {
    if (!carouselRef.current) return

    carouselRef.current.scrollBy({
      left: -carouselRef.current.offsetWidth,
      behavior: "smooth",
    })

    setActiveIndex((prev) => Math.max(prev - 1, 0))
  }

  const handleDragEnd = (e: any, { offset, velocity }: { offset: { x: number }; velocity: { x: number } }) => {
    const swipe = Math.abs(offset.x) > 50 || Math.abs(velocity.x) > 800

    if (swipe) {
      if (offset.x > 0) {
        handlePrev()
      } else {
        handleNext()
      }
    }
  }

  return (
    <div className={cn("relative", className)}>
      {title && <h2 className="text-2xl font-bold mb-4">{title}</h2>}

      <div className="relative overflow-hidden rounded-lg">
        <motion.div
          ref={carouselRef}
          className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
        >
          {cars.map((car) => (
            <div key={car.id} className="min-w-full md:min-w-[50%] lg:min-w-[33.33%] p-2 snap-center">
              <div className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-border">
                <Link href={`/cars/${car.id}`}>
                  <InteractiveImage
                    src={car.image || "/placeholder.svg"}
                    alt={car.title}
                    width={400}
                    height={250}
                    className="w-full h-48 object-cover"
                  />
                </Link>

                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1 truncate">{car.title}</h3>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">{car.year}</span>
                    <span className="text-sm bg-primary/10 text-primary px-2 py-0.5 rounded-full">{car.type}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-primary">{car.price.toLocaleString()} ريال</span>
                    <Button size="sm" asChild>
                      <Link href={`/cars/${car.id}`}>التفاصيل</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        <Button
          variant="ghost"
          size="icon"
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background/90 rounded-full shadow-md"
          onClick={handlePrev}
          disabled={activeIndex === 0}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background/90 rounded-full shadow-md"
          onClick={handleNext}
          disabled={activeIndex === cars.length - 1}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      <div className="flex justify-center mt-4 gap-1">
        {cars.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              index === activeIndex ? "bg-primary w-4" : "bg-muted-foreground/30",
            )}
            onClick={() => {
              setActiveIndex(index)
              if (carouselRef.current) {
                carouselRef.current.scrollTo({
                  left: index * carouselRef.current.offsetWidth,
                  behavior: "smooth",
                })
              }
            }}
          />
        ))}
      </div>
    </div>
  )
}
