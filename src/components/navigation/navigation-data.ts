import type { TranslationResource } from '@/i18n'

export type NavigationKey = keyof TranslationResource['category']

export interface NavigationItem {
  labelKey: keyof TranslationResource['nav']
  to: string
}

export interface CategoryNavigationItem {
  id: NavigationKey
  to: string
}

export const primaryNavigation: NavigationItem[] = [
  { labelKey: 'home', to: '/' },
  { labelKey: 'shop', to: '/shop' },
]

export const categoryNavigation: CategoryNavigationItem[] = [
  { id: 'clothing', to: '/category/clothing' },
  { id: 'personalCare', to: '/category/personal-care' },
  { id: 'home', to: '/category/home-supplies' },
  { id: 'office', to: '/category/office-tools' },
  { id: 'accessories', to: '/category/accessories' },
]

export const footerNavigation: NavigationItem[] = [
  { labelKey: 'home', to: '/' },
  { labelKey: 'shop', to: '/shop' },
  { labelKey: 'categories', to: '/category/all' },
  { labelKey: 'account', to: '/account' },
  { labelKey: 'orders', to: '/orders' },
]

export const policyNavigation = [
  { labelKey: 'privacy', to: '/privacy' },
  { labelKey: 'terms', to: '/terms' },
  { labelKey: 'shipping', to: '/shipping' },
  { labelKey: 'returns', to: '/returns' },
] as const

export const socialLinks = [
  { label: 'Instagram', href: '#' },
  { label: 'Facebook', href: '#' },
  { label: 'Pinterest', href: '#' },
]