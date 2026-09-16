import { createContext } from 'react'
import type { CartItem, Currency, Product } from '@/types'

export interface CartContextValue {
  items: CartItem[]
  totalItems: number
  subtotal: number
  currency: Currency | null
  addItem: (product: Product, quantity: number, selectedVariants?: Record<string, string | undefined>) => void
  updateQuantity: (lineId: string, quantity: number) => void
  incrementItem: (lineId: string) => void
  decrementItem: (lineId: string) => void
  removeItem: (lineId: string) => void
  clearCart: () => void
}

export const CartContext = createContext<CartContextValue | undefined>(undefined)