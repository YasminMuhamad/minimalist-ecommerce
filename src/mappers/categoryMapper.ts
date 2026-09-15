import type { DocumentData } from 'firebase/firestore'
import { timestampToIsoString } from '@/lib/firebase/firestore'
import type { Category, ProductImage } from '@/types'

function mapImage(value: unknown): ProductImage | undefined {
  if (!value || typeof value !== 'object') return undefined
  const item = value as Record<string, unknown>
  return typeof item.url === 'string' && item.url.length > 0 ? { url: item.url, publicId: typeof item.publicId === 'string' ? item.publicId : undefined } : undefined
}

export function mapCategory(id: string, data: DocumentData): Category | null {
  if (typeof data.slug !== 'string') return null
  const value = data.name ?? ''
  const name = typeof value === 'string' ? { ar: value, en: value } : value as { ar?: string; en?: string }
  return {
    id,
    name: { ar: name.ar ?? name.en ?? id, en: name.en ?? name.ar ?? id },
    slug: data.slug,
    image: mapImage(data.image),
    isActive: data.isActive !== false,
    sortOrder: typeof data.sortOrder === 'number' ? data.sortOrder : undefined,
    createdAt: timestampToIsoString(data.createdAt),
    updatedAt: timestampToIsoString(data.updatedAt),
  }
}