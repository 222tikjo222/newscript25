export interface Seller {
  id: string
  name: string
  rating: number
  verified: boolean
}

export interface Car {
  id: string
  name: string
  price: number
  description: string
  images: string[]
  features: string[]
  year: number
  mileage: number
  condition: string
  seller: Seller
}
