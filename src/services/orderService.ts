import { createOrder as persistOrder } from '@/repositories/orderRepository'
import type { CartItem, ShippingDetails } from '@/types'

const shippingCost = 0

export async function createCheckoutOrder(items: CartItem[], shipping: ShippingDetails, userId?: string | null) {
  if (items.length === 0) throw new Error('empty-cart')
  const currency = items[0].currency
  if (items.some((item) => item.currency !== currency)) throw new Error('mixed-currency-cart')
  const subtotal = items.reduce((total, item) => total + item.unitPrice * item.quantity, 0)
  const total = subtotal + shippingCost
  return persistOrder({ userId: userId ?? null, items: items.map((item) => ({ productId: item.productId, title: item.title, image: item.image, unitPrice: item.unitPrice, quantity: item.quantity, selectedVariants: item.selectedVariants })), shipping, currency, subtotal, shippingCost, total, status: 'pending' })
}