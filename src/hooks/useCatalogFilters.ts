import { useSearchParams } from 'react-router-dom'
import type { CatalogFilters, CatalogSort } from '@/types'

export function useCatalogFilters(initialCategoryId?: string) {
  const [searchParams, setSearchParams] = useSearchParams()
  const requestedSort = searchParams.get('sort')
  const sort: CatalogSort = requestedSort === 'price-asc' || requestedSort === 'price-desc' ? requestedSort : 'newest'
  const readPrice = (key: string) => {
    const parameter = searchParams.get(key)
    if (parameter === null || parameter.trim() === '') return undefined
    const value = Number(parameter)
    return Number.isNaN(value) || value < 0 ? undefined : value
  }
  const filters: CatalogFilters = {
    categoryId: searchParams.get('category') || initialCategoryId,
    minPrice: readPrice('min'),
    maxPrice: readPrice('max'),
    sort,
  }

  function setFilters(next: CatalogFilters) {
    const normalized = { ...next, minPrice: next.minPrice !== undefined && next.minPrice >= 0 ? next.minPrice : undefined, maxPrice: next.maxPrice !== undefined && next.maxPrice >= 0 ? next.maxPrice : undefined }
    const params = new URLSearchParams(searchParams)
    if (normalized.categoryId) params.set('category', normalized.categoryId)
    else params.delete('category')
    if (normalized.minPrice !== undefined) params.set('min', String(normalized.minPrice))
    else params.delete('min')
    if (normalized.maxPrice !== undefined) params.set('max', String(normalized.maxPrice))
    else params.delete('max')
    if (normalized.sort !== 'newest') params.set('sort', normalized.sort)
    else params.delete('sort')
    setSearchParams(params, { replace: true })
  }

  function setSort(nextSort: CatalogSort) { setFilters({ ...filters, sort: nextSort }) }
  function clearFilters() { setFilters({ sort: 'newest' }) }
  return { filters, setFilters, setSort, clearFilters }
}