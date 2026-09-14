/** Application roles. Resolved from the Firestore user document, never from the client. */
export type AppRole = 'user' | 'admin'

/** The `users/{uid}` Firestore document. */
export interface UserProfile {
  id: string
  uid: string
  email: string
  displayName: string
  photoUrl: string
  role: AppRole
  createdAt?: string
  updatedAt?: string
}

/** Firebase's `User` mapped to the shape components are allowed to see. */
export interface AuthUser {
  uid: string
  email: string | null
  displayName: string | null
  photoUrl: string | null
}

/**
 * Normalized authentication failures. Raw Firebase error codes are translated
 * into these at the service boundary so the UI never reads `auth/...` strings.
 */
export type AuthErrorCode =
  | 'invalid-credentials'
  | 'invalid-email'
  | 'email-in-use'
  | 'weak-password'
  | 'user-disabled'
  | 'too-many-requests'
  | 'network'
  | 'popup-closed'
  | 'popup-blocked'
  | 'unauthorized-domain'
  | 'provider-disabled'
  | 'unknown'

export type AuthResult = { ok: true } | { ok: false; code: AuthErrorCode }
