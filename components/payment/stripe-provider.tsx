"use client"

import type React from "react"

import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { stripeConfig } from "@/config"

// تحميل Stripe مرة واحدة فقط
const stripePromise = loadStripe(stripeConfig.publishableKey)

export function StripeProvider({
  children,
  options,
}: {
  children: React.ReactNode
  options: { clientSecret: string }
}) {
  return (
    <Elements stripe={stripePromise} options={options}>
      {children}
    </Elements>
  )
}
