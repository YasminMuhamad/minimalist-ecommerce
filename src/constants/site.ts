import type { Currency } from '@/types'

/**
 * Configurable site chrome. The announcement message lives here rather than
 * inside AnnouncementBar so copy changes never require touching a component
 * (Phase 2 Step 11).
 */
export const announcement = {
  messageKey: 'freeShipping',
  actionKey: 'shopNow',
  actionHref: '/shop',
} as const

/**
 * Social placeholders. Phase 2 delivers the links only — live feeds and real
 * profile URLs are out of scope (Step 16 / Risk 8).
 */
export interface SocialLink {
  id: string
  label: string
  href: string
}

export const socialLinks: readonly SocialLink[] = [
  { id: 'instagram', label: 'Instagram', href: '#' },
  { id: 'x', label: 'X', href: '#' },
  { id: 'facebook', label: 'Facebook', href: '#' },
  { id: 'pinterest', label: 'Pinterest', href: '#' },
]

/** Currency selection is a UI/state boundary only in Phase 2 — no conversion logic. */
export const supportedCurrencies: readonly Currency[] = ['USD', 'EUR', 'SAR']
export const defaultCurrency: Currency = 'USD'

/**
 * The cart badge's stand-in until the Cart phase lands. Kept as a single named
 * constant so replacing it with real cart state is a one-line change and the
 * Header never grows a dependency on unfinished cart logic (Risk 7).
 */
export const placeholderCartCount = 0
