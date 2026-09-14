import type { TranslationResource } from '@/i18n'

export interface AccountLink {
  href: string
  label: string
}

/**
 * Account destinations for an authenticated user, shared by the desktop user
 * menu and the mobile drawer so the admin entry point cannot appear in one and
 * not the other.
 *
 * `isAdmin` comes from the Firestore-resolved role, never from a client flag.
 */
export function getAccountLinks(t: TranslationResource, isAdmin: boolean): AccountLink[] {
  const links: AccountLink[] = [
    { href: '/account', label: t.auth.myAccount },
    { href: '/orders', label: t.auth.myOrders },
  ]

  if (isAdmin) links.push({ href: '/admin/dashboard', label: t.auth.adminDashboard })

  return links
}
