import { createContext } from 'react'
import type { TranslationResource } from '@/i18n'
import type { Locale } from '@/types'

interface LocaleContextValue {
  locale: Locale
  direction: 'rtl' | 'ltr'
  setLocale: (locale: Locale) => void
  t: TranslationResource
}

export const LocaleContext = createContext<LocaleContextValue | undefined>(undefined)