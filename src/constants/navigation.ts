import type { CategoryId, TranslationResource } from '@/i18n'

/**
 * Single source of navigation truth (Phase 2 §3.4 / §3.5).
 *
 * Desktop header, mobile drawer and footer all render from these definitions —
 * they must never redeclare categories locally, or the two menus will drift.
 * Items carry translation keys rather than display text, so routing stays
 * independent of the active locale.
 */

export interface CategoryNavItem {
  id: CategoryId
  href: string
  labelKey: CategoryId
}

export interface NavItem {
  href: string
  labelKey: keyof TranslationResource['nav']
}

export interface FooterLink {
  href: string
  labelKey: keyof TranslationResource['footer']
}

export const categoryNavigation: readonly CategoryNavItem[] = [
  { id: 'clothing', href: '/category/clothing', labelKey: 'clothing' },
  { id: 'personalCare', href: '/category/personal-care', labelKey: 'personalCare' },
  { id: 'home', href: '/category/home', labelKey: 'home' },
  { id: 'office', href: '/category/office', labelKey: 'office' },
  { id: 'accessories', href: '/category/accessories', labelKey: 'accessories' },
]

/** Quick links shown in the footer's first column. */
export const quickNavigation: readonly NavItem[] = [
  { href: '/', labelKey: 'home' },
  { href: '/shop', labelKey: 'shop' },
  { href: '/account', labelKey: 'account' },
  { href: '/orders', labelKey: 'orders' },
]

/** Store policy links. Policy content itself is out of Phase 2 scope (Step 16). */
export const policyNavigation: readonly FooterLink[] = [
  { href: '/policies/privacy', labelKey: 'privacy' },
  { href: '/policies/terms', labelKey: 'terms' },
  { href: '/policies/shipping', labelKey: 'shipping' },
  { href: '/policies/returns', labelKey: 'returns' },
]
