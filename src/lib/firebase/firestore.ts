import { getFirestore, Timestamp, type DocumentData, type FirestoreDataConverter, type QueryDocumentSnapshot, type SnapshotOptions } from 'firebase/firestore'
import { getFirebaseApp } from './config'

export const getFirestoreService = () => getFirestore(getFirebaseApp())
export const collectionNames = ['users', 'categories', 'products', 'coupons', 'orders'] as const
export type CollectionName = (typeof collectionNames)[number]

/**
 * Firestore stores dates as `Timestamp`, our domain models carry ISO 8601 strings.
 * Returns `undefined` for absent or unparsable values so optional model fields
 * (`createdAt?`, `expiresAt?`) stay optional instead of holding `Invalid Date`.
 */
export function timestampToIsoString(value: unknown): string | undefined {
  if (value instanceof Timestamp) return value.toDate().toISOString()
  if (value instanceof Date) return Number.isNaN(value.getTime()) ? undefined : value.toISOString()
  if (typeof value === 'number' || typeof value === 'string') {
    const parsed = new Date(value)
    return Number.isNaN(parsed.getTime()) ? undefined : parsed.toISOString()
  }
  return undefined
}

/** Write-side counterpart of {@link timestampToIsoString}. */
export function isoStringToTimestamp(value: string | Date | undefined): Timestamp | undefined {
  if (value === undefined) return undefined
  const date = value instanceof Date ? value : new Date(value)
  return Number.isNaN(date.getTime()) ? undefined : Timestamp.fromDate(date)
}

/**
 * Maps one raw Firestore document onto a domain model. Every collection supplies
 * its own parser: that is what keeps {@link createDocumentConverter} honest, since
 * the snapshot data is untyped and only the parser knows the document shape.
 */
export type DocumentParser<T> = (id: string, data: DocumentData) => T

export function createDocumentConverter<T extends DocumentData>(parseDocument: DocumentParser<T>): FirestoreDataConverter<T> {
  return {
    toFirestore: (model) => model,
    fromFirestore: (snapshot: QueryDocumentSnapshot<DocumentData, DocumentData>, options?: SnapshotOptions) =>
      parseDocument(snapshot.id, snapshot.data(options)),
  }
}
