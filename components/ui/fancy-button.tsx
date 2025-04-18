"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

interface FancyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "glass" | "neomorphic"
  size?: "sm" | "md" | "lg"
  children: React.ReactNode
  className?: string
  glowColor?: string
}

export function FancyButton({
  variant = "default",
  size = "md",
  children,
  className,
  glowColor = "rgba(var(--color-primary), 0.5)",
  ...props
}: FancyButtonProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  }

  const variantClasses = {
    default:
      "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:shadow-lg hover:shadow-primary/20 transition-all duration-300",
    glass:
      "bg-background/30 backdrop-blur-md border border-white/20 text-foreground shadow-lg hover:shadow-primary/20 transition-all duration-300",
    neomorphic:
      "bg-background shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.7),_inset_2px_2px_5px_rgba(0,0,0,0.1)] hover:shadow-[inset_-1px_-1px_3px_rgba(255,255,255,0.7),_inset_1px_1px_3px_rgba(0,0,0,0.1)] text-foreground transition-all duration-300",
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return

    const rect = buttonRef.current.getBoundingClientRect()
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  useEffect(() => {
    if (!isHovering) return

    const button = buttonRef.current
    if (!button) return

    const handleMouseLeave = () => {
      setIsHovering(false)
    }

    button.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      button.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [isHovering])

  return (
    <button
      ref={buttonRef}
      className={cn(
        "relative overflow-hidden rounded-md font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2",
        sizeClasses[size],
        variantClasses[variant],
        className,
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      {...props}
    >
      {/* Gradient background for default variant */}
      {variant === "default" && (
        <span className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 transition-opacity duration-300" />
      )}

      {/* Glow effect on hover */}
      {isHovering && (
        <span
          className="absolute w-32 h-32 rounded-full pointer-events-none mix-blend-screen filter blur-xl opacity-70 animate-pulse"
          style={{
            left: position.x - 64,
            top: position.y - 64,
            backgroundColor: glowColor,
            transform: "translate(-50%, -50%)",
          }}
        />
      )}

      {/* Border glow */}
      {isHovering && <span className="absolute inset-0 rounded-md border border-primary/50 animate-border-glow" />}

      {/* Button content */}
      <span className="relative z-10">{children}</span>
    </button>
  )
}
