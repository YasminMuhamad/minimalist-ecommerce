import { getProductById, getProductPage, type ProductPageRequest } from '@/repositories/productRepository'
import type { CatalogFilters } from '@/types'

export function normalizeFilters(filters: CatalogFilters): CatalogFilters {
  const minPrice = typeof filters.minPrice === 'number' && filters.minPrice >= 0 ? filters.minPrice : undefined
  const maxPrice = typeof filters.maxPrice === 'number' && filters.maxPrice >= 0 ? filters.maxPrice : undefined
  return { categoryId: filters.categoryId || undefined, minPrice: minPrice !== undefined && maxPrice !== undefined && minPrice > maxPrice ? maxPrice : minPrice, maxPrice, sort: filters.sort }
}

export function getCatalogPage(filters: CatalogFilters, cursor?: ProductPageRequest['cursor']): ReturnType<typeof getProductPage> {
  return getProductPage({ ...normalizeFilters(filters), cursor })
}

export { getProductById }