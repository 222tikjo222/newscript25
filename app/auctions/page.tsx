import { getAuctionCars } from "@/lib/data"
import { AuctionCard } from "@/components/auctions/auction-card"
import { getAuctionByCar } from "@/lib/data"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AuctionsPage() {
  const auctionCars = getAuctionCars()

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">المزادات النشطة</h1>
          <p className="text-muted-foreground">شارك في مزاداتنا المباشرة واحصل على فرصة لشراء سيارة أحلامك بأفضل سعر</p>
        </div>
        <Button asChild>
          <Link href="/auctions/how-it-works">كيف تعمل المزادات؟</Link>
        </Button>
      </div>

      {auctionCars.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {auctionCars.map((car) => {
            const auction = getAuctionByCar(car.id)
            if (!auction) return null
            return <AuctionCard key={car.id} car={car} auction={auction} />
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-bold mb-2">لا توجد مزادات نشطة حالياً</h3>
          <p className="text-muted-foreground mb-4">يرجى التحقق لاحقاً للاطلاع على المزادات القادمة</p>
        </div>
      )}
    </div>
  )
}
