import { useContext } from 'react'
import { AuthContext } from '@/contexts/auth-context'

/** The single consumption point for authentication state (Phase 2 §3.1 / Step 5). */
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside AuthProvider')
  return context
}
