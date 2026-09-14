export type Currency = 'USD' | 'EUR' | 'SAR'
export type Locale = 'ar' | 'en'
export type Theme = 'light' | 'dark'
export type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'

export interface Address {
  id?: string
  fullName: string
  line1: string
  line2?: string
  city: string
  country: string
  postalCode?: string
  phone?: string
}

export interface User {
  id: string
  email: string
  displayName?: string
  photoUrl?: string
  phoneNumber?: string
  addresses?: Address[]
  createdAt?: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  imageUrl?: string
  isActive: boolean
}

export interface ProductVariant {
  id: string
  name: string
  value: string
  stock: number
}

export interface Product {
  id: string
  categoryId: string
  name: string
  slug: string
  description?: string
  price: number
  compareAtPrice?: number
  currency: Currency
  imageUrls: string[]
  variants?: ProductVariant[]
  stock: number
  isActive: boolean
}

export interface CartItem {
  productId: string
  quantity: number
  selectedVariants?: Record<string, string>
  unitPrice: number
}

export interface Coupon {
  id: string
  code: string
  discountPercentage?: number
  discountAmount?: number
  expiresAt?: string
  isActive: boolean
}

export interface OrderItem extends CartItem {
  productName: string
}

export interface Order {
  id: string
  userId: string
  items: OrderItem[]
  subtotal: number
  total: number
  currency: Currency
  status: OrderStatus
  shippingAddress: Address
  createdAt?: string
}