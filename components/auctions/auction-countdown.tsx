"use client"

import { useState, useEffect } from "react"

interface AuctionCountdownProps {
  endDate: string
  onEnd?: () => void
  className?: string
}

export function AuctionCountdown({ endDate, onEnd, className = "" }: AuctionCountdownProps) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number
    hours: number
    minutes: number
    seconds: number
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [isEnded, setIsEnded] = useState(false)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(endDate).getTime() - new Date().getTime()

      if (difference <= 0) {
        setIsEnded(true)
        if (onEnd) onEnd()
        return { days: 0, hours: 0, minutes: 0, seconds: 0 }
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }

    setTimeLeft(calculateTimeLeft())

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [endDate, onEnd])

  const formatNumber = (num: number) => {
    return num < 10 ? `0${num}` : num
  }

  if (isEnded) {
    return <div className={`text-red-500 font-bold ${className}`}>انتهى المزاد</div>
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="text-center">
        <div className="bg-primary/10 rounded-md px-2 py-1 min-w-[40px]">{formatNumber(timeLeft.days)}</div>
        <div className="text-xs text-muted-foreground">يوم</div>
      </div>
      <div className="text-center">
        <div className="bg-primary/10 rounded-md px-2 py-1 min-w-[40px]">{formatNumber(timeLeft.hours)}</div>
        <div className="text-xs text-muted-foreground">ساعة</div>
      </div>
      <div className="text-center">
        <div className="bg-primary/10 rounded-md px-2 py-1 min-w-[40px]">{formatNumber(timeLeft.minutes)}</div>
        <div className="text-xs text-muted-foreground">دقيقة</div>
      </div>
      <div className="text-center">
        <div className="bg-primary/10 rounded-md px-2 py-1 min-w-[40px]">{formatNumber(timeLeft.seconds)}</div>
        <div className="text-xs text-muted-foreground">ثانية</div>
      </div>
    </div>
  )
}
