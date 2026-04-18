//types/index.ts
export interface Product {
  id: string
  name: string
  brand: string
  skinType?: string
  price: number
  description: string
  images: string[]
  video?: string
  notes?: {
    top: string[]
    heart: string[]
    base: string[]
  }
  ingredients?: Array<{
    name: string
    description: string
    icon?: string
  }>
  category: string
  inStock: boolean
  isBestSeller?: boolean
  isClean?: boolean
  reviewCount?: number
  created_at?: string // for sorting new arrivals
  isNew?: boolean // optional badge
  rating?: number // optional star rating
}

export interface CartItem {
  product: Product
  quantity: number
  giftWrap?: boolean
  giftMessage?: string
}

export interface QuizResult {
  occasion?: string
  mood?: string
  intensity?: string
  notes?: string[]
}

export interface TrackingEvent {
  name: string
  properties?: Record<string, any>
  timestamp?: Date
}
