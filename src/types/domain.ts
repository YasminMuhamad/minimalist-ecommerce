export type Currency = 'USD' | 'EUR' | 'SAR'
export type Locale = 'ar' | 'en'
export type Theme = 'light' | 'dark'

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

export interface Coupon {
  id: string
  code: string
  discountPercentage?: number
  discountAmount?: number
  expiresAt?: string
  isActive: boolean
}
