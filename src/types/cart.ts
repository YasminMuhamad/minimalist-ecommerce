import type { Currency } from './domain'
import type { LocalizedText, ProductImage } from './product'

export interface CartItem {
  lineId: string
  productId: string
  title: LocalizedText
  image?: ProductImage
  unitPrice: number
  currency: Currency
  quantity: number
  stock?: number
  selectedVariants?: Record<string, string | undefined>
}

export interface CartState {
  version: 1
  items: CartItem[]
}