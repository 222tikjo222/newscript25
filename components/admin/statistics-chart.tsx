"use client"

import { useEffect, useRef } from "react"

// هذا مكون وهمي لرسم البياني - في التطبيق الحقيقي يمكن استخدام مكتبة مثل Chart.js أو Recharts
export function AdminStatisticsChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    // رسم مخطط بياني بسيط
    const width = canvasRef.current.width
    const height = canvasRef.current.height
    const padding = 40
    const dataPoints = [25, 40, 30, 50, 60, 70, 65, 75, 80, 90, 85, 95]
    const maxValue = Math.max(...dataPoints)

    // تنظيف الكانفاس
    ctx.clearRect(0, 0, width, height)

    // رسم المحاور
    ctx.beginPath()
    ctx.moveTo(padding, padding)
    ctx.lineTo(padding, height - padding)
    ctx.lineTo(width - padding, height - padding)
    ctx.strokeStyle = "#ccc"
    ctx.stroke()

    // رسم البيانات
    const barWidth = (width - padding * 2) / dataPoints.length - 10

    dataPoints.forEach((value, index) => {
      const x = padding + index * (barWidth + 10)
      const barHeight = ((height - padding * 2) * value) / maxValue
      const y = height - padding - barHeight

      // رسم العمود
      ctx.fillStyle = "rgba(37, 99, 235, 0.8)"
      ctx.fillRect(x, y, barWidth, barHeight)

      // رسم القيمة
      ctx.fillStyle = "#888"
      ctx.font = "10px Arial"
      ctx.fillText(value.toString(), x + barWidth / 2 - 5, y - 5)

      // رسم الشهر
      const months = [
        "يناير",
        "فبراير",
        "مارس",
        "أبريل",
        "مايو",
        "يونيو",
        "يوليو",
        "أغسطس",
        "سبتمبر",
        "أكتوبر",
        "نوفمبر",
        "ديسمبر",
      ]
      ctx.fillText(months[index], x + barWidth / 2 - 15, height - padding + 15)
    })
  }, [])

  return (
    <div className="w-full h-[300px] relative">
      <canvas ref={canvasRef} width={800} height={300} className="w-full h-full" />
    </div>
  )
}
