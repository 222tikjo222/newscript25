export interface Car {
  id: number
  title: string
  description: string
  price: number
  image: string
  status: "available" | "sold" | "auction"
  created_at: string
  features?: string[]
  model?: string
  year?: number
  mileage?: number
  color?: string
}

export interface User {
  id: number
  username: string
  email: string
  created_at: string
}

export interface Bid {
  id: number
  car_id: number
  user_id: number
  amount: number
  status: "active" | "won" | "lost"
  created_at: string
  user?: User
}

export interface Auction {
  id: number
  car_id: number
  start_price: number
  current_price: number
  start_date: string
  end_date: string
  status: "upcoming" | "active" | "ended"
  bids_count: number
  highest_bidder_id?: number
  highest_bidder?: User
}

export interface Notification {
  id: number
  user_id: number
  title: string
  message: string
  type: "bid" | "outbid" | "won" | "ended" | "system"
  is_read: boolean
  created_at: string
  auction_id?: number
  car_id?: number
}

export interface PaymentMethod {
  id: string
  user_id: number
  brand: string
  last4: string
  expiry_month: string
  expiry_year: string
  is_default: boolean
}

export interface Address {
  id: number
  user_id: number
  name: string
  address_line1: string
  address_line2?: string
  city: string
  postal_code: string
  phone: string
  is_default: boolean
}

export interface Payment {
  id: number
  bid_id: number
  user_id: number
  amount: number
  status: "pending" | "completed" | "failed"
  payment_method: string
  created_at: string
}

export interface Order {
  id: number
  user_id: number
  bid_id: number
  payment_id: number
  status: "pending" | "processing" | "completed" | "cancelled"
  created_at: string
}
