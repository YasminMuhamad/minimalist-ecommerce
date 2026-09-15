import type { ProductImage, LocalizedText } from './product'

export interface Category {
  id: string
  name: LocalizedText
  slug: string
  image?: ProductImage
  isActive: boolean
  sortOrder?: number
  createdAt?: string
  updatedAt?: string
}