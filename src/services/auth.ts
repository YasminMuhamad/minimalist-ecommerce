import { FirebaseError } from 'firebase/app'
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import * as firebaseAuth from '@/lib/firebase/auth'
import type { FirebaseUser } from '@/lib/firebase/auth'
import { createDocumentConverter, getFirestoreService, timestampToIsoString } from '@/lib/firebase/firestore'
import type { AppRole, AuthErrorCode, AuthResult, AuthUser, UserProfile } from '@/types'

const USERS_COLLECTION = 'users'

/**
 * The authentication service (Phase 2 §3.1).
 *
 *   UI → Auth Context / useAuth → this service → Firebase Auth → Firestore profile
 *
 * Components never call Firebase directly and never see raw `auth/...` codes.
 */

// ---------------------------------------------------------------------------
// Error normalization (Step 2)
// ---------------------------------------------------------------------------

const firebaseErrorCodes: Record<string, AuthErrorCode> = {
  'auth/invalid-credential': 'invalid-credentials',
  'auth/wrong-password': 'invalid-credentials',
  'auth/user-not-found': 'invalid-credentials',
  'auth/invalid-email': 'invalid-email',
  'auth/email-already-in-use': 'email-in-use',
  'auth/weak-password': 'weak-password',
  'auth/user-disabled': 'user-disabled',
  'auth/too-many-requests': 'too-many-requests',
  'auth/network-request-failed': 'network',
  'auth/popup-closed-by-user': 'popup-closed',
  'auth/cancelled-popup-request': 'popup-closed',
  'auth/popup-blocked': 'popup-blocked',
  'auth/unauthorized-domain': 'unauthorized-domain',
  'auth/operation-not-allowed': 'provider-disabled',
}

export function normalizeAuthError(error: unknown): AuthErrorCode {
  if (error instanceof FirebaseError) return firebaseErrorCodes[error.code] ?? 'unknown'
  return 'unknown'
}

// ---------------------------------------------------------------------------
// User mapping
// ---------------------------------------------------------------------------

export function toAuthUser(user: FirebaseUser): AuthUser {
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoUrl: user.photoURL,
  }
}

function isAppRole(value: unknown): value is AppRole {
  return value === 'user' || value === 'admin'
}

const userProfileConverter = createDocumentConverter<UserProfile>((id, data) => ({
  id,
  uid: typeof data.uid === 'string' ? data.uid : id,
  email: typeof data.email === 'string' ? data.email : '',
  displayName: typeof data.displayName === 'string' ? data.displayName : '',
  photoUrl: typeof data.photoUrl === 'string' ? data.photoUrl : '',
  // Anything that is not a recognized role degrades to the least privilege.
  role: isAppRole(data.role) ? data.role : 'user',
  createdAt: timestampToIsoString(data.createdAt),
  updatedAt: timestampToIsoString(data.updatedAt),
}))

// ---------------------------------------------------------------------------
// Profile synchronization (Step 3)
// ---------------------------------------------------------------------------

/**
 * Reads `users/{uid}`, creating it on first sign-in and refreshing the profile
 * fields Google may have changed.
 *
 * The `role` field is written exactly once, at creation, always as `user`. It is
 * never included in the update path, so an administrator's role cannot be
 * downgraded by a later sign-in, and the browser can never ask for a higher one
 * (§3.3 / Risk 1). Granting `admin` is an out-of-band operation performed
 * through the Firebase console or a trusted backend, and Firestore Security
 * Rules must independently forbid clients from writing this field.
 */
export async function syncUserProfile(user: FirebaseUser): Promise<UserProfile | null> {
  const db = getFirestoreService()
  const plainRef = doc(db, USERS_COLLECTION, user.uid)
  const typedRef = plainRef.withConverter(userProfileConverter)

  const snapshot = await getDoc(typedRef)

  if (!snapshot.exists()) {
    await setDoc(plainRef, {
      uid: user.uid,
      email: user.email ?? '',
      displayName: user.displayName ?? '',
      photoUrl: user.photoURL ?? '',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })

    const created = await getDoc(typedRef)
    return created.data() ?? null
  }

  const existing = snapshot.data()

  // Refresh provider-owned fields only. `role` is deliberately absent.
  await setDoc(
    plainRef,
    {
      email: user.email ?? existing.email,
      displayName: user.displayName ?? existing.displayName,
      photoUrl: user.photoURL ?? existing.photoUrl,
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  )

  return existing
}

/**
 * Resolves the signed-in user's role. Falls back to `user` when the profile is
 * unreachable, so a failed read can never escalate privileges.
 */
export async function resolveUserProfile(user: FirebaseUser): Promise<UserProfile | null> {
  try {
    return await syncUserProfile(user)
  } catch {
    return null
  }
}

// ---------------------------------------------------------------------------
// Authentication actions (Steps 2, 7, 8)
// ---------------------------------------------------------------------------

async function run(action: () => Promise<unknown>): Promise<AuthResult> {
  try {
    await action()
    return { ok: true }
  } catch (error) {
    return { ok: false, code: normalizeAuthError(error) }
  }
}

export const signIn = (email: string, password: string): Promise<AuthResult> =>
  run(() => firebaseAuth.loginWithEmail(email, password))

export const signInWithGoogle = (): Promise<AuthResult> => run(() => firebaseAuth.loginWithGoogle())

export const signOutUser = (): Promise<AuthResult> => run(() => firebaseAuth.logout())

/**
 * Registers an account and creates its profile with the default `user` role
 * before resolving, so the caller never observes an authenticated user without
 * a profile (Step 7).
 */
export async function signUp(email: string, password: string): Promise<AuthResult> {
  try {
    const credential = await firebaseAuth.registerWithEmail(email, password)
    await syncUserProfile(credential.user)
    return { ok: true }
  } catch (error) {
    return { ok: false, code: normalizeAuthError(error) }
  }
}
