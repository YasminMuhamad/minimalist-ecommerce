import type { Currency, Locale } from '@/types'

export function formatCurrency(amount: number, currency: Currency, locale: Locale) {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount)
}