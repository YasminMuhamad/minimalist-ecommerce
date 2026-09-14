import { ar } from './resources/ar'
import { en } from './resources/en'
import type { Locale } from '@/types'
import type { TranslationResource } from './types'

export type { CategoryId, TranslationResource } from './types'

export const localeResources: Record<Locale, TranslationResource> = { ar, en }
export const localeDirections = { ar: 'rtl', en: 'ltr' } as const

export function getResource(locale: Locale): TranslationResource {
  return localeResources[locale]
}
