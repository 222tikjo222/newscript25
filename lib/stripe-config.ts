import { stripeConfig } from "@/config"

export const STRIPE_PUBLISHABLE_KEY = stripeConfig.publishableKey
export const STRIPE_SECRET_KEY = stripeConfig.secretKey
export const STRIPE_WEBHOOK_SECRET = stripeConfig.webhookSecret

export const CURRENCY = stripeConfig.currency
