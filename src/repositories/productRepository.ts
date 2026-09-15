import { collection, getDocs, limit, orderBy, query, startAfter, where, type DocumentData, type QueryConstraint, type QueryDocumentSnapshot } from 'firebase/firestore'
import { getFirestoreService } from '@/lib/firebase/firestore'
import { mapProduct } from '@/mappers/productMapper'
import type { CatalogFilters, ProductPage } from '@/types'

export interface ProductPageRequest extends CatalogFilters {
  pageSize?: number
  cursor?: QueryDocumentSnapshot<DocumentData>
}

export async function getProductPage({ categoryId, minPrice, maxPrice, sort, pageSize = 12, cursor }: ProductPageRequest): Promise<ProductPage & { cursor?: QueryDocumentSnapshot<DocumentData> }> {
  const constraints: QueryConstraint[] = [where('isActive', '==', true)]
  if (categoryId) constraints.push(where('categoryId', '==', categoryId))
  const hasPriceRange = typeof minPrice === 'number' || typeof maxPrice === 'number'

  // Firestore cannot combine a price range with global newest ordering because
  // the range field must be the first orderBy. Query newest first instead and
  // filter price in memory while walking cursors.
  if (hasPriceRange && sort === 'newest') {
    const products: NonNullable<ReturnType<typeof mapProduct>>[] = []
    let nextCursor = cursor

    while (products.length < pageSize) {
      const pageConstraints: QueryConstraint[] = [...constraints, orderBy('createdAt', 'desc')]
      if (nextCursor) pageConstraints.push(startAfter(nextCursor))
      pageConstraints.push(limit(pageSize))
      const snapshot = await getDocs(query(collection(getFirestoreService(), 'products'), ...pageConstraints))

      let lastMatchedDoc: QueryDocumentSnapshot<DocumentData> | undefined
      for (const document of snapshot.docs) {
        const product = mapProduct(document.id, document.data())
        if (!product || (minPrice !== undefined && product.price < minPrice) || (maxPrice !== undefined && product.price > maxPrice)) continue
        products.push(product)
        lastMatchedDoc = document
        if (products.length === pageSize) {
          return { products, hasMore: true, cursor: lastMatchedDoc, nextCursor: lastMatchedDoc.id }
        }
      }

      nextCursor = snapshot.docs.at(-1)
      if (snapshot.docs.length < pageSize) break
    }

    return { products, hasMore: false, cursor: nextCursor, nextCursor: nextCursor?.id }
  }

  if (typeof minPrice === 'number') constraints.push(where('price', '>=', minPrice))
  if (typeof maxPrice === 'number') constraints.push(where('price', '<=', maxPrice))
  if (hasPriceRange) {
    // Firestore requires the range-filtered field to be the first orderBy.
    constraints.push(orderBy('price', sort === 'price-desc' ? 'desc' : 'asc'))
    if (sort === 'newest') constraints.push(orderBy('createdAt', 'desc'))
  } else {
    constraints.push(orderBy(sort === 'newest' ? 'createdAt' : 'price', sort === 'price-desc' ? 'desc' : 'asc'))
  }
  if (cursor) constraints.push(startAfter(cursor))
  constraints.push(limit(pageSize))
  const snapshot = await getDocs(query(collection(getFirestoreService(), 'products'), ...constraints))
  const products = snapshot.docs.map((document) => mapProduct(document.id, document.data())).filter((product): product is NonNullable<typeof product> => product !== null)
  return { products, hasMore: snapshot.docs.length === pageSize, cursor: snapshot.docs.at(-1), nextCursor: snapshot.docs.at(-1)?.id }
}

export const getProducts = (request: ProductPageRequest = { sort: 'newest' }) => getProductPage(request)
export const getProductsByCategory = (categoryId: string, request: Omit<ProductPageRequest, 'categoryId'> = { sort: 'newest' }) => getProductPage({ ...request, categoryId })