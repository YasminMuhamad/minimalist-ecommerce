import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, type User as FirebaseUser } from 'firebase/auth'
import { getFirebaseApp } from './config'

/**
 * Thin Firebase Auth boundary. Error normalization, profile synchronization and
 * role resolution belong to `src/services/auth.ts`, not here (Phase 2 §3.1).
 */
export const getAuthService = () => getAuth(getFirebaseApp())
export const googleProvider = new GoogleAuthProvider()
export const observeAuthState = (callback: (user: FirebaseUser | null) => void) => onAuthStateChanged(getAuthService(), callback)
export const loginWithEmail = (email: string, password: string) => signInWithEmailAndPassword(getAuthService(), email, password)
export const registerWithEmail = (email: string, password: string) => createUserWithEmailAndPassword(getAuthService(), email, password)
export const loginWithGoogle = () => signInWithPopup(getAuthService(), googleProvider)
export const logout = () => signOut(getAuthService())

export type { FirebaseUser }
