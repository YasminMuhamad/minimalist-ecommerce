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
  catalog: {
    title: string
    subtitle: string
    results: string
    filters: string
    clearFilters: string
    allProducts: string
    minPrice: string
    maxPrice: string
    apply: string
    sort: string
    newest: string
    priceRangeNewestNote: string
    priceAsc: string
    priceDesc: string
    loading: string
    loadingMore: string
    empty: string
    emptyFiltered: string
    error: string
    retry: string
    loadMore: string
    end: string
    imageUnavailable: string
    inStock: string
    soldOut: string
    discount: string
  }
  productDetails: {
    backToShop: string
    description: string
    size: string
    color: string
    selectOption: string
    inStock: string
    lowStock: string
    soldOut: string
    addToCart: string
    addedToCart: string
    quantity: string
    unavailable: string
    notFound: string
    loadError: string
  }
  cart: {
    title: string
    empty: string
    continueShopping: string
    checkout: string
    remove: string
    subtotal: string
    decrease: string
    increase: string
    selected: string
  }
  checkout: {
    title: string
    shipping: string
    orderSummary: string
    fullName: string
    phone: string
    email: string
    address: string
    city: string
    country: string
    postalCode: string
    notes: string
    placeOrder: string
    placingOrder: string
    required: string
    invalidEmail: string
    orderError: string
    emptyCart: string
    successTitle: string
    successText: string
    orderReference: string
    continue: string
  }
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
