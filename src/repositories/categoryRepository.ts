import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'
import { getFirestoreService } from '@/lib/firebase/firestore'
import { mapCategory } from '@/mappers/categoryMapper'
import type { Category } from '@/types'

export async function getCategories(): Promise<Category[]> {
  const snapshot = await getDocs(query(collection(getFirestoreService(), 'categories'), where('isActive', '==', true), orderBy('sortOrder', 'asc')))
  return snapshot.docs.map((document) => mapCategory(document.id, document.data())).filter((category): category is Category => category !== null)
}