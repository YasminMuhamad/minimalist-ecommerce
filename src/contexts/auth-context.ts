import { createContext } from 'react'
import type { AppRole, AuthResult, AuthUser, UserProfile } from '@/types'

export interface AuthContextValue {
  user: AuthUser | null
  profile: UserProfile | null
  role: AppRole | null
  /** True until Firebase has restored the initial session (Risk 2). */
  loading: boolean
  isAuthenticated: boolean
  isAdmin: boolean
  login: (email: string, password: string) => Promise<AuthResult>
  register: (email: string, password: string) => Promise<AuthResult>
  loginWithGoogle: () => Promise<AuthResult>
  logout: () => Promise<AuthResult>
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined)
