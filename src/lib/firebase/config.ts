import { getApp, getApps, initializeApp, type FirebaseApp } from 'firebase/app'
import { appEnv } from '@/config/env'

const config = appEnv.firebase

export const isFirebaseConfigured = Object.values(config).every(Boolean)

export function getFirebaseApp(): FirebaseApp {
  if (!isFirebaseConfigured) throw new Error('Firebase environment variables are not configured')
  return getApps().length > 0 ? getApp() : initializeApp(config)
}