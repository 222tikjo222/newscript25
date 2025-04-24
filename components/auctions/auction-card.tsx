"use client"

import Image from "next/image"
import Link from "next/link"
import { Gavel, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AuctionCountdown } from "./auction-countdown"
import type { Car, Auction } from "@/lib/types"

interface AuctionCardProps {
  car: Car
  auction: Auction
}

export function AuctionCard({ car, auction }: AuctionCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-60">
        <Image src={car.image || "/placeholder.svg"} alt={car.title} fill className="object-cover" />
        <div className="absolute top-2 left-2 bg-primary text-primary-foreground px-2 py-1 rounded-md text-sm font-medium">
          مزاد نشط
        </div>
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-2">{car.title}</h3>
        <p className="text-muted-foreground mb-4 line-clamp-2">{car.description}</p>

        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-sm text-muted-foreground">السعر الحالي</p>
            <p className="font-bold text-lg">{auction.current_price.toLocaleString()} ريال</p>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{auction.bids_count} مزايدة</span>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm text-muted-foreground mb-1">ينتهي في</p>
          <AuctionCountdown endDate={auction.end_date} />
        </div>

        <div className="flex justify-between items-center">
          <Button asChild>
            <Link href={`/auctions/${auction.id}`}>
              <Gavel className="h-4 w-4 ml-2" />
              المزايدة
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href={`/cars/${car.id}`}>التفاصيل</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
