import { useCallback, useEffect, useRef, useState } from 'react'
import type { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore'
import { catalogPageSize } from '@/constants/catalog'
import { fallbackCategories } from '@/constants/categories'
import { getCategories } from '@/services/categoryService'
import { getCatalogPage } from '@/services/productService'
import type { CatalogFilters, Category, Product } from '@/types'

export function useProducts(filters: CatalogFilters) {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>(fallbackCategories)
  const [cursor, setCursor] = useState<QueryDocumentSnapshot<DocumentData> | undefined>()
  const [hasMore, setHasMore] = useState(false)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const requestId = useRef(0)

  const loadInitial = useCallback(async () => {
    const currentRequest = ++requestId.current
    setLoading(true)
    setError(null)
    setCursor(undefined)
    try {
      const page = await getCatalogPage(filters)
      if (currentRequest !== requestId.current) return
      setProducts(page.products)
      setHasMore(page.hasMore)
      setCursor(page.cursor)
    } catch (reason) {
      if (currentRequest === requestId.current) setError(reason instanceof Error ? reason.message : 'catalog-error')
    } finally {
      if (currentRequest === requestId.current) setLoading(false)
    }
  }, [filters])

  const loadMore = useCallback(async () => {
    if (!cursor || loadingMore || !hasMore) return
    const currentRequest = requestId.current
    setLoadingMore(true)
    setError(null)
    try {
      const page = await getCatalogPage(filters, cursor)
      if (currentRequest !== requestId.current) return
      setProducts((current) => [...current, ...page.products])
      setHasMore(page.hasMore)
      setCursor(page.cursor)
    } catch (reason) {
      if (currentRequest === requestId.current) setError(reason instanceof Error ? reason.message : 'catalog-error')
    } finally {
      if (currentRequest === requestId.current) setLoadingMore(false)
    }
  }, [cursor, filters, hasMore, loadingMore])

  useEffect(() => {
    const frame = requestAnimationFrame(() => { void loadInitial() })
    return () => cancelAnimationFrame(frame)
  }, [loadInitial])

  useEffect(() => {
    let active = true
    void getCategories().then((items) => { if (active && items.length > 0) setCategories(items) }).catch(() => undefined)
    return () => { active = false }
  }, [])

  return { products, categories, loading, loadingMore, error, hasMore, loadMore, refresh: loadInitial, pageSize: catalogPageSize }
}