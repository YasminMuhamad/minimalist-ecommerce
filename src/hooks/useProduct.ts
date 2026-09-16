import { useEffect, useState } from 'react'
import { getProductById } from '@/services/productService'
import type { Product } from '@/types'

export function useProduct(id?: string) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    const frame = requestAnimationFrame(() => {
      setLoading(true)
      setError(null)
      if (!id) { setLoading(false); setError('missing-product'); return }
      void getProductById(id).then((value) => { if (active) setProduct(value) }).catch((reason) => { if (active) setError(reason instanceof Error ? reason.message : 'product-error') }).finally(() => { if (active) setLoading(false) })
    })
    return () => { active = false; cancelAnimationFrame(frame) }
  }, [id])

  return { product, loading, error, refresh: () => { if (id) { setLoading(true); void getProductById(id).then(setProduct).catch(() => setError('product-error')).finally(() => setLoading(false)) } } }
}