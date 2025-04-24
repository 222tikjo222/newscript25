"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface InteractiveImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  magnifyOnHover?: boolean
  zoomable?: boolean
}

export function InteractiveImage({
  src,
  alt,
  width = 500,
  height = 300,
  className,
  magnifyOnHover = true,
  zoomable = true,
}: InteractiveImageProps) {
  const [isHovering, setIsHovering] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isOpen, setIsOpen] = useState(false)
  const imageRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return

    const { left, top, width, height } = imageRef.current.getBoundingClientRect()
    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100

    setPosition({ x, y })
  }

  return (
    <>
      <div
        ref={imageRef}
        className={cn(
          "relative overflow-hidden rounded-lg transition-all duration-300",
          magnifyOnHover && "cursor-zoom-in",
          isHovering && "shadow-lg",
          className,
        )}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onMouseMove={handleMouseMove}
        onClick={() => zoomable && setIsOpen(true)}
      >
        <div className="relative w-full h-full">
          <Image
            src={src || "/placeholder.svg"}
            alt={alt}
            width={width}
            height={height}
            className={cn("transition-transform duration-300", isHovering && magnifyOnHover && "scale-110")}
            style={isHovering && magnifyOnHover ? { transformOrigin: `${position.x}% ${position.y}%` } : undefined}
          />
          {isHovering && (
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-60" />
          )}
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-transparent border-none">
          <div className="relative w-full h-full">
            <Image
              src={src || "/placeholder.svg"}
              alt={alt}
              width={1200}
              height={800}
              className="w-full h-auto object-contain"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
