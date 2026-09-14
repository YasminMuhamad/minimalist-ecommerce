import type { AuthErrorCode, Currency } from '@/types'

/**
 * The five approved storefront categories. Navigation is keyed by these ids so
 * routes never depend on translated display text (Phase 2 §3.4 / Step 13).
 */
export type CategoryId = 'clothing' | 'personalCare' | 'home' | 'office' | 'accessories'

/**
 * The translation contract. Both locales are typed against it, so a key added
 * to one language fails the build until the other provides it.
 */
export interface TranslationResource {
  app: { name: string; tagline: string }
  announcement: { freeShipping: string; shopNow: string }
  nav: {
    home: string
    shop: string
    categories: string
    search: string
    openSearch: string
    cart: string
    cartItems: string
    account: string
    orders: string
    admin: string
    openMenu: string
    closeMenu: string
    menu: string
    primary: string
    mobile: string
    footer: string
    skipToContent: string
  }
  category: Record<CategoryId, string>
  auth: {
    loginTitle: string
    loginSubtitle: string
    registerTitle: string
    registerSubtitle: string
    email: string
    password: string
    confirmPassword: string
    emailPlaceholder: string
    passwordHint: string
    login: string
    register: string
    logout: string
    continueWithGoogle: string
    orContinueWithEmail: string
    noAccount: string
    haveAccount: string
    signingIn: string
    creatingAccount: string
    signingOut: string
    myAccount: string
    myOrders: string
    adminDashboard: string
    signedInAs: string
    guest: string
    checkingSession: string
  }
  authError: Record<AuthErrorCode, string>
  validation: {
    emailRequired: string
    emailInvalid: string
    passwordRequired: string
    passwordTooShort: string
    confirmRequired: string
    passwordMismatch: string
  }
  footer: {
    tagline: string
    quickLinks: string
    categories: string
    policies: string
    follow: string
    rights: string
    language: string
    currency: string
    privacy: string
    terms: string
    shipping: string
    returns: string
  }
  theme: { toggle: string; light: string; dark: string }
  language: { toggle: string; arabic: string; english: string }
  currency: Record<Currency, string>
  routes: {
    shop: string
    category: string
    product: string
    cart: string
    checkout: string
    login: string
    register: string
    account: string
    orders: string
    order: string
    admin: string
    dashboard: string
    products: string
    categories: string
    coupons: string
  }
}
