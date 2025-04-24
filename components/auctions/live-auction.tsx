"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AuctionCountdown } from "@/components/auctions/auction-countdown"
import { Check, AlertCircle, Users, DollarSign, Clock, ArrowUp } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

interface LiveAuctionProps {
  auction: {
    id: number
    title: string
    current_price: number
    start_price: number
    min_increment: number
    end_date: string
    bids_count: number
    status: string
    car_id: number
  }
  car: {
    id: number
    title: string
    image: string
    description: string
  }
  onBidSubmit: (amount: number) => Promise<void>
}

export function LiveAuction({ auction, car, onBidSubmit }: LiveAuctionProps) {
  const router = useRouter()
  const [bidAmount, setBidAmount] = useState<number>(auction.current_price + auction.min_increment)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bidSuccess, setBidSuccess] = useState<boolean | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [liveBids, setLiveBids] = useState<Array<{ id: number; user: string; amount: number; time: Date }>>([])
  const [viewers, setViewers] = useState<number>(Math.floor(Math.random() * 50) + 10)

  // Simulate live viewers count
  useEffect(() => {
    const interval = setInterval(() => {
      setViewers((prev) => {
        const change = Math.floor(Math.random() * 3) - 1 // -1, 0, or 1
        return Math.max(5, prev + change)
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Simulate occasional new bids
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        // 30% chance of new bid
        const newBid = {
          id: Date.now(),
          user: `user${Math.floor(Math.random() * 1000)}`,
          amount: auction.current_price + Math.floor(Math.random() * 5 + 1) * auction.min_increment,
          time: new Date(),
        }

        setLiveBids((prev) => [newBid, ...prev].slice(0, 10))
      }
    }, 8000)

    return () => clearInterval(interval)
  }, [auction.current_price, auction.min_increment])

  const handleBid = async () => {
    if (bidAmount <= auction.current_price) {
      setErrorMessage(`يجب أن يكون مبلغ المزايدة أكبر من ${formatCurrency(auction.current_price)}`)
      setBidSuccess(false)
      return
    }

    setIsSubmitting(true)
    setBidSuccess(null)
    setErrorMessage(null)

    try {
      await onBidSubmit(bidAmount)

      // Add user's bid to the live bids
      const userBid = {
        id: Date.now(),
        user: "أنت",
        amount: bidAmount,
        time: new Date(),
      }

      setLiveBids((prev) => [userBid, ...prev].slice(0, 10))
      setBidSuccess(true)

      // Reset bid amount to minimum increment above current
      setBidAmount(bidAmount + auction.min_increment)
    } catch (error) {
      setErrorMessage("حدث خطأ أثناء تقديم المزايدة. يرجى المحاولة مرة أخرى.")
      setBidSuccess(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAuctionEnd = () => {
    // Redirect to results page or show winner
    router.push(`/auctions/${auction.id}/results`)
  }

  return (
    <Card className="w-full overflow-hidden border-2 border-primary/20">
      <CardHeader className="bg-primary/5">
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl">{auction.title}</CardTitle>
          <Badge variant={auction.status === "active" ? "success" : "secondary"} className="px-3 py-1">
            {auction.status === "active" ? "مزاد نشط" : "انتهى المزاد"}
          </Badge>
        </div>
        <CardDescription>
          <div className="flex items-center gap-2 mt-2">
            <Users className="h-4 w-4" />
            <span className="text-sm">{viewers} متابع الآن</span>
          </div>
        </CardDescription>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        <div className="flex flex-col gap-4">
          <div className="bg-muted p-4 rounded-lg flex flex-col items-center">
            <div className="text-sm text-muted-foreground mb-1">الوقت المتبقي</div>
            <AuctionCountdown endDate={auction.end_date} onEnd={handleAuctionEnd} className="text-xl font-bold" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted p-4 rounded-lg flex flex-col items-center">
              <div className="text-sm text-muted-foreground mb-1">السعر الحالي</div>
              <div className="text-xl font-bold text-primary flex items-center">
                <DollarSign className="h-5 w-5 mr-1" />
                {formatCurrency(auction.current_price)}
              </div>
            </div>

            <div className="bg-muted p-4 rounded-lg flex flex-col items-center">
              <div className="text-sm text-muted-foreground mb-1">عدد المزايدات</div>
              <div className="text-xl font-bold flex items-center">
                <ArrowUp className="h-5 w-5 mr-1" />
                {auction.bids_count}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor="bid-amount" className="text-sm font-medium">
                مبلغ المزايدة (الحد الأدنى للزيادة: {formatCurrency(auction.min_increment)})
              </label>
            </div>
            <div className="flex gap-2">
              <Input
                id="bid-amount"
                type="number"
                value={bidAmount}
                onChange={(e) => setBidAmount(Number(e.target.value))}
                min={auction.current_price + auction.min_increment}
                step={auction.min_increment}
                disabled={isSubmitting || auction.status !== "active"}
                className="text-left"
              />
              <Button
                onClick={handleBid}
                disabled={isSubmitting || auction.status !== "active"}
                className="min-w-[100px]"
              >
                {isSubmitting ? "جاري..." : "مزايدة"}
              </Button>
            </div>
          </div>

          {bidSuccess === true && (
            <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900">
              <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
              <AlertTitle>تمت المزايدة بنجاح!</AlertTitle>
              <AlertDescription>تم تسجيل مزايدتك بنجاح.</AlertDescription>
            </Alert>
          )}

          {bidSuccess === false && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>فشلت المزايدة</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}
        </div>

        <div className="border rounded-lg overflow-hidden">
          <div className="bg-muted px-4 py-2 font-medium">آخر المزايدات</div>
          <div className="max-h-[200px] overflow-y-auto">
            {liveBids.length > 0 ? (
              <div className="divide-y">
                {liveBids.map((bid) => (
                  <div key={bid.id} className="flex justify-between items-center p-3 hover:bg-muted/50">
                    <div className="flex items-center gap-2">
                      <span className={bid.user === "أنت" ? "font-bold text-primary" : ""}>{bid.user}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{formatCurrency(bid.amount)}</span>
                      <span className="text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 inline mr-1" />
                        {bid.time.toLocaleTimeString("ar-SA")}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-muted-foreground">لا توجد مزايدات حتى الآن</div>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="bg-muted/50 px-6 py-4">
        <Button variant="outline" className="w-full" onClick={() => window.open(`/cars/${car.id}`, "_blank")}>
          عرض تفاصيل السيارة
        </Button>
      </CardFooter>
    </Card>
  )
}
