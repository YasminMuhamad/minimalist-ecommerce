import type { Currency, Locale } from './domain'

export interface LocalizedText {
  ar: string
  en: string
}

export interface ProductImage {
  url: string
  publicId?: string
  alt?: Partial<Record<Locale, string>>
  width?: number
  height?: number
}

export interface ProductOption {
  id: string
  label: LocalizedText
  value: string
}

export interface Product {
  id: string
  title: LocalizedText
  slug?: string
  description?: LocalizedText
  categoryId: string
  price: number
  compareAtPrice?: number
  currency: Currency
  images: ProductImage[]
  colors?: ProductOption[]
  sizes?: ProductOption[]
  specifications?: Record<string, string>
  stock?: number
  isActive: boolean
  createdAt?: string
  updatedAt?: string
}