import type { Category } from './category'
import type { Product } from './product'

export type CatalogSort = 'newest' | 'price-asc' | 'price-desc'

export interface CatalogFilters {
  categoryId?: string
  minPrice?: number
  maxPrice?: number
  sort: CatalogSort
}

export interface ProductPage {
  products: Product[]
  nextCursor?: string
  hasMore: boolean
}

export interface CatalogData {
  products: Product[]
  categories: Category[]
  loading: boolean
  error: string | null
  hasMore: boolean
}