"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { AuctionCountdown } from "@/components/auctions/auction-countdown"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface AuctionWindowProps {
  auction: {
    id: number
    car_id: number
    start_price: number
    current_price: number
    start_date: string
    end_date: string
    status: "upcoming" | "active" | "ended"
    bids_count: number
    highest_bidder_id?: number
    highest_bidder?: {
      username: string
    }
  }
  onBidSubmit: (amount: number) => Promise<void>
}

export function AuctionWindow({ auction, onBidSubmit }: AuctionWindowProps) {
  const [bidAmount, setBidAmount] = useState<number>(auction.current_price + 5000)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bidSuccess, setBidSuccess] = useState<boolean | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onBidSubmit(bidAmount)
  }

  return (
    <div>
      <div className="bg-muted p-6 rounded-lg">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-bold mb-2">المزايدة</h2>
            <p className="text-muted-foreground">السعر الحالي: {auction.current_price.toLocaleString()} ريال</p>
          </div>
          <div>
            <Badge variant="outline">
              {auction.status === "active" ? "مفتوح" : auction.status === "upcoming" ? "قريباً" : "منتهي"}
            </Badge>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm text-muted-foreground mb-1">الوقت المتبقي</p>
          <AuctionCountdown endDate={auction.end_date} className="font-bold" />
        </div>

        <Separator className="my-4" />

        {bidSuccess === false && errorMessage && (
          <Alert variant="destructive">
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        {bidSuccess === true && (
          <Alert>
            <AlertDescription>تم تقديم مزايدتك بنجاح!</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="bid-amount" className="block text-sm font-medium text-muted-foreground">
              أدخل مبلغ المزايدة
            </label>
            <input
              type="number"
              id="bid-amount"
              className="w-full rounded-md border px-3 py-2 shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="أدخل مبلغ المزايدة"
              value={bidAmount}
              onChange={(e) => setBidAmount(Number(e.target.value))}
              min={auction.current_price + 1000}
              required
              disabled={isSubmitting}
            />
            <p className="text-xs text-muted-foreground mt-1">
              يجب أن يكون مبلغ المزايدة أكبر من {auction.current_price.toLocaleString()} ريال
            </p>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "جاري المزايدة..." : "تأكيد المزايدة"}
          </Button>
        </form>
      </div>
    </div>
  )
}
