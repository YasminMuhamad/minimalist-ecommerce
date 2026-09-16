import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { getFirestoreService } from '@/lib/firebase/firestore'
import type { Order } from '@/types'

export async function createOrder(order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) {
  const reference = await addDoc(collection(getFirestoreService(), 'orders'), {
    ...order,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  return reference.id
}