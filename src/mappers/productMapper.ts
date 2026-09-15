import type { DocumentData } from 'firebase/firestore'
import { timestampToIsoString } from '@/lib/firebase/firestore'
import type { Currency, Product, ProductImage } from '@/types'

const currencies: Currency[] = ['USD', 'EUR', 'SAR']

function localized(value: unknown, fallback = '') {
  if (typeof value === 'string') return { ar: value, en: value }
  if (!value || typeof value !== 'object') return { ar: fallback, en: fallback }
  const candidate = value as Record<string, unknown>
  return {
    ar: typeof candidate.ar === 'string' ? candidate.ar : typeof candidate.en === 'string' ? candidate.en : fallback,
    en: typeof candidate.en === 'string' ? candidate.en : typeof candidate.ar === 'string' ? candidate.ar : fallback,
  }
}

function image(value: unknown): ProductImage | null {
  if (typeof value === 'string' && value.length > 0) return { url: value }
  if (!value || typeof value !== 'object') return null
  const item = value as Record<string, unknown>
  if (typeof item.url !== 'string' || item.url.length === 0) return null
  return {
    url: item.url,
    publicId: typeof item.publicId === 'string' ? item.publicId : undefined,
    alt: item.alt && typeof item.alt === 'object' ? localized(item.alt) : undefined,
    width: typeof item.width === 'number' ? item.width : undefined,
    height: typeof item.height === 'number' ? item.height : undefined,
  }
}

export function mapProduct(id: string, data: DocumentData): Product | null {
  if (typeof data.categoryId !== 'string' || typeof data.price !== 'number') return null
  const images = Array.isArray(data.images) ? data.images.map(image).filter((item): item is ProductImage => item !== null) : []
  const legacyImages = Array.isArray(data.imageUrls) ? data.imageUrls.map(image).filter((item): item is ProductImage => item !== null) : []
  const currency = currencies.includes(data.currency) ? data.currency : 'USD'
  return {
    id,
    title: localized(data.title ?? data.name, 'Untitled product'),
    slug: typeof data.slug === 'string' ? data.slug : undefined,
    description: data.description ? localized(data.description) : undefined,
    categoryId: data.categoryId,
    price: data.price,
    compareAtPrice: typeof data.compareAtPrice === 'number' ? data.compareAtPrice : undefined,
    currency,
    images: images.length > 0 ? images : legacyImages,
    colors: Array.isArray(data.colors) ? data.colors : undefined,
    sizes: Array.isArray(data.sizes) ? data.sizes : undefined,
    specifications: data.specifications && typeof data.specifications === 'object' ? data.specifications as Record<string, string> : undefined,
    stock: typeof data.stock === 'number' ? data.stock : undefined,
    isActive: data.isActive !== false,
    createdAt: timestampToIsoString(data.createdAt),
    updatedAt: timestampToIsoString(data.updatedAt),
  }
}