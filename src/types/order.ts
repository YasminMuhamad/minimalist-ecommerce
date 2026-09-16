import type { LocalizedText, ProductImage } from './product'
import type { ShippingDetails } from './checkout'
import type { Currency } from './domain'

export type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'

export interface OrderItem {
  productId: string
  title: LocalizedText
  image?: ProductImage
  unitPrice: number
  quantity: number
  selectedVariants?: Record<string, string | undefined>
}

export interface Order {
  id: string
  userId?: string | null
  items: OrderItem[]
  shipping: ShippingDetails
  currency: Currency
  subtotal: number
  shippingCost: number
  discount?: number
  total: number
  status: OrderStatus
  createdAt?: string
  updatedAt?: string
}