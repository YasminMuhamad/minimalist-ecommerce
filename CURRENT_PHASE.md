````md
# CURRENT_PHASE.md

# E-commerce Web App — Current Phase

**Phase:** Phase 4 — Product Details, Cart & Checkout Flow
**Status:** Completed (100%)
**Approved On:** 2026-09-16
**Previous Phase:** Phase 3 — Product Catalog, Cloudinary Integration, & Filtering `[PASS]`
**Next Phase:** Phase 5 — Admin Dashboard & Store Management

---

## 1. Goals

The goal of Phase 4 is to transform the catalog browsing experience into a complete purchasing flow:

1. Build the Product Details page at `/product/:id`.
2. Provide an advanced Cloudinary-powered product image gallery.
3. Support product variants such as size and color.
4. Display accurate stock/availability state.
5. Allow direct add-to-cart from the Product Details page.
6. Implement centralized cart state management.
7. Persist cart data locally for guests.
8. Synchronize cart state for authenticated users where supported by the approved architecture.
9. Provide quantity modification and item removal.
10. Implement a global Cart Drawer/Modal accessible from the application shell.
11. Build the Checkout flow with shipping details and order summary.
12. Create orders in Firestore after successful checkout.
13. Clear the cart only after successful order creation.
14. Preserve the existing AR/EN, RTL/LTR, Light/Dark, responsive, and Modern Minimalist design systems.
15. Keep payment processing mocked/placeholder-only unless a separate payment integration is explicitly approved.

---

# 2. Scope & File Boundaries

## 2.1 In Scope

### A. Product Details Page

Route:

```text
/product/:id
```
````

Responsibilities:

- Load a single product by ID.
- Display localized product title and description.
- Display category information.
- Display current price and compare-at/original price where available.
- Display discount information where applicable.
- Display stock/availability state.
- Display Cloudinary product image gallery.
- Support primary image + thumbnails.
- Support enlarged/preview image interaction where appropriate.
- Support responsive gallery behavior.
- Support product variants:
  - Size
  - Color
  - Other approved variant structures if already present in the product model.

- Validate required variant selection before adding to cart.
- Prevent adding quantities greater than available stock.
- Provide quantity selector.
- Provide direct **Add to Cart** action.
- Provide appropriate loading, error, unavailable, and missing-product states.
- Preserve AR/EN localization and RTL/LTR behavior.

---

## 2.2 Cart State Management

A centralized cart state layer must be introduced.

The implementation may use:

- React Context + reducer, or
- Zustand,

based on the architecture already established by the project.

The cart must support:

- Add item.
- Remove item.
- Increase quantity.
- Decrease quantity.
- Set quantity directly where appropriate.
- Clear cart.
- Calculate item subtotal.
- Calculate cart subtotal.
- Track total item quantity.
- Preserve selected product variants.
- Persist guest cart in `localStorage`.
- Restore cart after page refresh.
- Handle authenticated-user synchronization according to the approved persistence strategy.

### Cart Item Concept

A cart item should contain enough immutable product information to render the cart safely without relying exclusively on the current Product Details page.

Conceptual structure:

```ts
CartItem {
  productId: string;
  title: {
    ar: string;
    en: string;
  };
  image?: ProductImage;
  unitPrice: number;
  quantity: number;
  selectedVariants?: {
    size?: string;
    color?: string;
    [key: string]: string | undefined;
  };
  stock?: number;
}
```

A unique cart-line identity must account for variants.

Example:

```text
productId + selected size + selected color
```

Therefore, the same product with two different colors/sizes may exist as separate cart lines.

---

## 2.3 Cart Drawer / Modal

The cart must be accessible globally from the application header.

Responsibilities:

- Open from the cart icon/badge.
- Display current cart items.
- Display product thumbnail.
- Display localized product title.
- Display selected variants.
- Display quantity controls.
- Display remove action.
- Display line subtotal.
- Display cart subtotal.
- Display total item count.
- Provide CTA to Checkout.
- Provide CTA to continue shopping where appropriate.
- Display empty-cart state.
- Work correctly in both LTR and RTL.
- Work correctly in Light and Dark themes.
- Work correctly on mobile and desktop.

The drawer must not duplicate cart business logic.

All calculations and mutations must come from the centralized cart state layer.

---

## 2.4 Checkout Flow

Checkout route should follow the project's established routing convention, for example:

```text
/checkout
```

The checkout page must include:

### Shipping Details

Minimum conceptual fields:

```text
fullName
phone
email
address
city
country
postalCode
additionalNotes?
```

Exact required fields should follow the approved project UX and localization requirements.

Requirements:

- Form validation.
- Clear validation messages.
- AR/EN labels and messages.
- RTL/LTR support.
- Preserve entered values during normal UI state changes.
- Prevent checkout with an empty cart.
- Prevent order submission while already processing.

### Order Summary

Display:

- Cart items.
- Selected variants.
- Quantities.
- Unit prices.
- Item subtotals.
- Cart subtotal.
- Shipping amount if the project currently defines one.
- Discount amount if a future-compatible field is needed.
- Grand total.

**Important:** Coupon business logic is not part of this phase unless already required by the existing approved implementation. Phase 4 should not expand into the complete coupon system.

---

## 2.5 Order Processing & Firestore Integration

After successful checkout validation, create an order document in:

```text
orders
```

Conceptual order structure:

```ts
Order {
  id: string;
  userId?: string | null;

  items: OrderItem[];

  shipping: {
    fullName: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    country: string;
    postalCode: string;
    additionalNotes?: string;
  };

  subtotal: number;
  shippingCost: number;
  discount?: number;
  total: number;

  status: "pending";

  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

`OrderItem` should preserve the purchasing snapshot:

```ts
OrderItem {
  productId: string;
  title: {
    ar: string;
    en: string;
  };
  image?: ProductImage;
  unitPrice: number;
  quantity: number;
  selectedVariants?: Record<string, string>;
}
```

### Important Data Principle

Orders should preserve the product/price/variant information used at checkout.

The order must not depend on future product changes to render its historical contents.

---

## 2.6 Cart Clearing Rule

The cart must be cleared **only after successful order creation**.

Expected sequence:

```text
Validate Checkout
      ↓
Build Order Payload
      ↓
Create Firestore Order
      ↓
Confirm Success
      ↓
Clear Cart
      ↓
Navigate to Success/Order Confirmation
```

If order creation fails:

```text
Do NOT clear cart
```

The user must be able to retry without losing their cart.

---

# 3. File Boundaries

## 3.1 Allowed New Files

### Product Details

```text
src/components/product/
  ProductGallery.tsx
  ProductInfo.tsx
  ProductVariants.tsx
  ProductStockStatus.tsx
  ProductQuantitySelector.tsx
  AddToCartButton.tsx
```

### Cart

```text
src/components/cart/
  CartDrawer.tsx
  CartItem.tsx
  CartSummary.tsx
  CartEmptyState.tsx
  CartQuantityControl.tsx
```

### Checkout

```text
src/components/checkout/
  ShippingForm.tsx
  OrderSummary.tsx
  CheckoutItem.tsx
  CheckoutSubmit.tsx
  OrderSuccess.tsx
```

### State

```text
src/context/CartContext.tsx
```

or, if Zustand is selected:

```text
src/store/cartStore.ts
```

Additional cart selectors/helpers may be created where necessary.

### Hooks

```text
src/hooks/useCart.ts
src/hooks/useProduct.ts
```

Additional hooks may be created only when they represent a real reusable responsibility.

### Services / Repositories

```text
src/repositories/orderRepository.ts
src/services/orderService.ts
```

Product repository/service files from Phase 3 may be reused.

### Mappers

```text
src/mappers/orderMapper.ts
```

### Types

```text
src/types/cart.ts
src/types/order.ts
src/types/checkout.ts
```

### Pages

```text
src/pages/storefront/ProductDetails.tsx
src/pages/storefront/Checkout.tsx
```

An order confirmation page may also be added if required by the approved UX:

```text
src/pages/storefront/OrderSuccess.tsx
```

---

## 3.2 Allowed Modifications

Phase 4 may modify existing:

```text
src/components/
src/context/
src/hooks/
src/pages/
src/repositories/
src/services/
src/mappers/
src/store/
src/types/
src/utils/
src/routes/
src/i18n/
src/constants/
src/index.css
```

Existing Header/Navigation components may be modified only to:

- Connect the cart badge.
- Open the Cart Drawer.
- Reflect cart item count.

Phase 4 must not redesign the global navigation.

---

## 3.3 Restricted / Out of Scope

Do not implement or expand:

```text
Admin Dashboard
Product CRUD
Category CRUD
Coupon Management
Advanced Coupon Engine
Order Management Dashboard
Order Tracking System
User Account/Order History
Real Payment Gateway
Payment Provider Integration
Inventory Management System
Shipping Provider Integration
```

The admin order-management layer belongs to a later phase.

---

# 4. Architecture & Data Flow

## 4.1 Product Details

```text
Route /product/:id
        ↓
useProduct()
        ↓
productService
        ↓
productRepository
        ↓
Firestore
        ↓
Product Mapper
        ↓
Product Details UI
        ↓
Variant Selection
        ↓
Cart State
```

---

## 4.2 Cart

```text
Product Details / Catalog
          ↓
       useCart()
          ↓
    Cart State Layer
          ↓
 ┌────────┴─────────┐
 ↓                  ↓
LocalStorage     Auth Sync
Guest Cart       Registered User
```

The UI must never implement independent cart state.

---

## 4.3 Checkout

```text
Cart State
    ↓
Checkout Page
    ↓
Shipping Validation
    ↓
Order Payload
    ↓
orderService
    ↓
orderRepository
    ↓
Firestore /orders
    ↓
Success
    ↓
Clear Cart
```

---

# 5. Step-by-Step Execution Steps

## Step 1 — Review Phase 3 Output

Before implementation:

- Verify Phase 3 `[PASS]`.
- Inspect existing Product and Category models.
- Reuse existing Product Repository/Service/Mappers.
- Reuse Cloudinary image model and optimized image component.
- Verify existing routing structure.
- Verify existing i18n and theme architecture.
- Verify existing Firebase configuration.

**Do not duplicate existing Phase 3 infrastructure.**

---

## Step 2 — Define Product Details Data Contract

Confirm the final Product model supports:

- Localized title.
- Localized description.
- Category.
- Price.
- Compare-at price.
- Images.
- Variants.
- Stock.
- Active state.

Define any missing optional fields without breaking existing products.

---

## Step 3 — Implement Single Product Retrieval

Create/reuse:

```text
useProduct()
productService.getById()
productRepository.getById()
```

Requirements:

- Retrieve by route ID.
- Map Firestore document into the application Product model.
- Handle missing product.
- Handle inactive/unavailable product appropriately.
- Handle loading/error states.

---

## Step 4 — Build Product Details Layout

Create the Modern Minimalist Product Details page.

Desktop:

```text
┌────────────────────┬────────────────────────────┐
│                    │ Product Information        │
│   Image Gallery    │ Title                      │
│                    │ Price                      │
│                    │ Stock                      │
│                    │ Variants                   │
│                    │ Quantity                   │
│                    │ Add to Cart                │
└────────────────────┴────────────────────────────┘
```

Mobile layout should naturally collapse into a single-column experience.

---

## Step 5 — Implement Cloudinary Product Gallery

Use the Cloudinary image references already established in Phase 3.

Support:

- Optimized primary image.
- Thumbnail navigation.
- Responsive dimensions.
- Lazy loading where appropriate.
- Proper aspect-ratio handling.
- Fallback image/error state.
- Accessible alt text.
- RTL-compatible navigation controls.

Do not store or transmit binary image data through Firestore.

---

## Step 6 — Implement Variant Selection

Support available product variants.

Examples:

```text
Size:
[ S ] [ M ] [ L ] [ XL ]

Color:
[ Black ] [ White ] [ Beige ]
```

Requirements:

- Clear selected state.
- Accessible controls.
- Required variant validation.
- Variant-aware cart identity.
- Prevent invalid combinations where product data defines availability.
- Preserve selected variant when adding to cart.

---

## Step 7 — Implement Stock Handling

Display appropriate states:

```text
In Stock
Low Stock
Out of Stock
Unavailable
```

Exact thresholds should be centralized rather than hard-coded throughout components.

When stock is unavailable:

- Disable Add to Cart.
- Explain availability state.
- Do not allow invalid quantities.

---

## Step 8 — Design Cart State Contract

Implement centralized cart actions such as:

```ts
addItem();
removeItem();
updateQuantity();
incrementItem();
decrementItem();
clearCart();
getItemQuantity();
getSubtotal();
getTotalItems();
```

The API should remain independent of the UI.

---

## Step 9 — Implement LocalStorage Persistence

For guest users:

```text
Cart State
   ↓
serialize
   ↓
localStorage
```

On application initialization:

```text
localStorage
   ↓
validate/parse
   ↓
Cart State
```

Requirements:

- Handle malformed localStorage safely.
- Avoid runtime crashes.
- Avoid storing unnecessary application state.
- Keep persisted structure versionable where practical.

---

## Step 10 — Implement Authenticated Cart Synchronization

For authenticated users, establish the approved synchronization strategy.

Minimum requirements:

- Detect authentication state changes.
- Prevent accidental cart loss during login/logout.
- Merge guest cart with authenticated cart according to defined business rules.
- Avoid duplicate cart lines when the same product/variant exists.
- Keep synchronization deterministic.

If Firestore-backed cart persistence is used, introduce the required repository/service boundary rather than writing Firestore calls directly inside React components.

---

## Step 11 — Integrate Add-to-Cart

Connect:

```text
Product Details
      ↓
Variant Validation
      ↓
Stock Validation
      ↓
addItem()
      ↓
Cart State
      ↓
Cart Badge Update
```

After successful addition:

- Update cart count immediately.
- Provide clear user feedback.
- Optionally open Cart Drawer according to the approved UX.

---

## Step 12 — Build Global Cart Drawer

Integrate Cart Drawer with the existing Header.

Requirements:

- Global accessibility.
- No duplicated cart state.
- Item list.
- Quantity controls.
- Remove action.
- Subtotal.
- Checkout CTA.
- Empty state.
- Responsive behavior.
- AR/EN.
- RTL/LTR.
- Light/Dark.

---

## Step 13 — Build Checkout Route

Create:

```text
/checkout
```

Behavior:

- If cart is empty, do not allow normal checkout submission.
- Display checkout layout.
- Display Shipping Details form.
- Display Order Summary.
- Preserve cart state while completing the form.

---

## Step 14 — Implement Shipping Validation

Implement typed form state and validation.

Validate:

- Required fields.
- Valid email where applicable.
- Valid phone format according to project requirements.
- Required address/location fields.
- Reasonable field lengths.

Validation messages must be localized.

---

## Step 15 — Build Order Summary

The summary must be derived from the centralized cart state.

Show:

```text
Products
Variants
Quantities
Subtotal
Shipping
Discount (if applicable)
Total
```

All monetary calculations should use a single centralized utility.

Avoid duplicated arithmetic across Product, Cart, and Checkout components.

---

## Step 16 — Define Order Repository & Service

Create:

```text
orderRepository.create()
orderService.createOrder()
```

Responsibilities:

### Service

- Validate/normalize order input.
- Construct order payload.
- Add timestamps.
- Apply business-level defaults.

### Repository

- Perform Firestore write.
- Remain isolated from UI components.

UI must not call Firestore directly.

---

## Step 17 — Create Firestore Order Document

On successful checkout:

```text
orders/{orderId}
```

Persist:

- User ID when authenticated.
- Guest order indicator/reference when supported.
- Order items.
- Product snapshots.
- Selected variants.
- Quantities.
- Prices.
- Shipping details.
- Subtotal.
- Shipping cost.
- Discount if supported by the current phase.
- Total.
- Status.
- Created/updated timestamps.

---

## Step 18 — Implement Order Submission State

The checkout submit flow must support:

```text
idle
→ submitting
→ success
```

and:

```text
idle
→ submitting
→ error
```

During submission:

- Disable duplicate submission.
- Show progress/loading state.
- Preserve cart if the operation fails.
- Display localized error feedback.

---

## Step 19 — Clear Cart After Successful Order

Only after Firestore confirms successful order creation:

```ts
await createOrder(...)
clearCart()
navigateToSuccess(...)
```

Never:

```ts
clearCart()
await createOrder(...)
```

This prevents cart loss when the order write fails.

---

## Step 20 — Build Order Success State

After successful order creation, display:

- Success confirmation.
- Order ID/reference.
- Order total.
- Basic next-step information.
- Continue Shopping CTA.

A future Order Tracking/Account system may consume this order later, but must not be implemented as part of this phase.

---

## Step 21 — Security & Firestore Rules Review

Review Firestore access patterns for the new `orders` collection.

Minimum principle:

- Clients should not gain unrestricted access to all orders.
- Users should only be able to create/read records permitted by the approved security model.
- Admin access must remain separately controlled.
- Client-side authorization is not a security boundary.

Any required Firestore Rules changes must be reviewed before being considered complete.

---

## Step 22 — Localization & Theme Verification

Verify every new UI state in:

### Arabic

```text
AR + RTL + Light
AR + RTL + Dark
```

### English

```text
EN + LTR + Light
EN + LTR + Dark
```

Verify:

- Product information.
- Variant labels.
- Cart labels.
- Checkout form.
- Validation messages.
- Order confirmation.
- Error messages.
- Empty states.
- Buttons.
- Drawer direction.

---

## Step 23 — Responsive Verification

Test at minimum:

```text
Mobile
Tablet
Desktop
```

Verify:

- Product gallery.
- Variant controls.
- Cart Drawer.
- Checkout form.
- Order summary.
- Long product titles.
- Large/small images.
- RTL layouts.

---

## Step 24 — Regression & Quality Checks

Run:

```text
Lint
Typecheck
Build
```

Then test the full purchasing journey:

```text
Catalog
  ↓
Product Details
  ↓
Select Variant
  ↓
Add to Cart
  ↓
Cart Drawer
  ↓
Checkout
  ↓
Shipping Details
  ↓
Order Summary
  ↓
Create Order
  ↓
Clear Cart
  ↓
Success
```

---

# 6. Definition of Done (DoD)

Phase 4 is considered complete only when all applicable items below are `[PASS]`.

## Product Details

- [ ] `/product/:id` route is implemented.
- [ ] Product loads from the existing Firestore product data layer.
- [ ] Product title and description support AR/EN.
- [ ] Price and compare-at price display correctly.
- [ ] Cloudinary gallery works correctly.
- [ ] Optimized/responsive images are used.
- [ ] Image fallback/error states work.
- [ ] Product variants can be selected.
- [ ] Required variant validation works.
- [ ] Stock state is displayed.
- [ ] Out-of-stock products cannot be added.
- [ ] Quantity cannot exceed valid stock.
- [ ] Add to Cart works from Product Details.

## Cart State

- [ ] Centralized cart state is implemented.
- [ ] Add item works.
- [ ] Variant-aware cart lines work.
- [ ] Quantity increase works.
- [ ] Quantity decrease works.
- [ ] Quantity validation works.
- [ ] Item removal works.
- [ ] Clear cart works.
- [ ] Total item count is correct.
- [ ] Subtotal calculation is correct.
- [ ] Guest cart persists through LocalStorage.
- [ ] Cart restores correctly after refresh.
- [ ] Authenticated-user synchronization follows the approved strategy.
- [ ] Login/logout does not unexpectedly destroy cart data.

## Cart Drawer

- [ ] Cart Drawer is accessible from the global header.
- [ ] Cart badge reflects current quantity.
- [ ] Items display correctly.
- [ ] Selected variants display correctly.
- [ ] Quantity controls work.
- [ ] Remove action works.
- [ ] Subtotal is correct.
- [ ] Empty-cart state works.
- [ ] Checkout CTA works.
- [ ] Responsive behavior works.
- [ ] RTL/LTR behavior works.
- [ ] Light/Dark themes work.

## Checkout

- [ ] `/checkout` route is implemented.
- [ ] Empty carts cannot complete checkout.
- [ ] Shipping Details form is implemented.
- [ ] Required validation works.
- [ ] Validation messages are localized.
- [ ] Order Summary reflects cart state.
- [ ] Product variants appear in the summary.
- [ ] Quantity and pricing calculations are correct.
- [ ] Shipping amount is handled consistently.
- [ ] Duplicate order submission is prevented.
- [ ] Loading/submitting state works.
- [ ] Failure state preserves the cart.

## Firestore Orders

- [ ] `orders` collection integration is implemented.
- [ ] Order repository/service boundary exists.
- [ ] UI does not directly write to Firestore.
- [ ] Order items contain purchasing snapshots.
- [ ] Selected variants are persisted.
- [ ] Shipping details are persisted.
- [ ] Totals are persisted.
- [ ] Order status is initialized correctly.
- [ ] Timestamps are persisted.
- [ ] Authenticated user association works where applicable.
- [ ] Firestore security rules are reviewed.
- [ ] Order creation succeeds with valid checkout data.
- [ ] Order failure does not clear the cart.
- [ ] Cart clears only after confirmed order creation.
- [ ] Order success state is displayed.

## UX / Design

- [ ] Modern Minimalist visual language is preserved.
- [ ] Neutral palette is preserved.
- [ ] AR/EN toggle works.
- [ ] RTL/LTR layouts are correct.
- [ ] Light/Dark themes are correct.
- [ ] Mobile layout works.
- [ ] Tablet layout works.
- [ ] Desktop layout works.
- [ ] Loading states exist.
- [ ] Empty states exist.
- [ ] Error states exist.
- [ ] Accessibility basics are covered for interactive controls.

## Engineering Quality

- [ ] TypeScript typecheck passes.
- [ ] Lint passes.
- [ ] Production build passes.
- [ ] No direct Firestore access from presentation components.
- [ ] No duplicated cart business logic.
- [ ] No unnecessary product refetching.
- [ ] No duplicate order submissions.
- [ ] No cart loss on failed order creation.
- [ ] Existing Phase 3 catalog functionality remains intact.
- [ ] No unrelated Phase 5/admin functionality has been introduced.

---

# 7. Test Matrix

| Area        | Test                               |
| ----------- | ---------------------------------- |
| Product     | Valid product loads                |
| Product     | Missing product                    |
| Product     | Inactive product                   |
| Gallery     | Multiple Cloudinary images         |
| Gallery     | Single image                       |
| Gallery     | Broken image fallback              |
| Variants    | Size selection                     |
| Variants    | Color selection                    |
| Variants    | Missing required variant           |
| Stock       | In stock                           |
| Stock       | Low stock                          |
| Stock       | Out of stock                       |
| Cart        | Add product                        |
| Cart        | Add same product/variant           |
| Cart        | Add same product/different variant |
| Cart        | Increase quantity                  |
| Cart        | Decrease quantity                  |
| Cart        | Remove item                        |
| Cart        | Clear cart                         |
| Persistence | Refresh with guest cart            |
| Persistence | Login with existing cart           |
| Persistence | Logout                             |
| Drawer      | Open/close                         |
| Drawer      | Empty cart                         |
| Drawer      | Checkout navigation                |
| Checkout    | Valid shipping details             |
| Checkout    | Invalid required fields            |
| Checkout    | Empty cart                         |
| Order       | Successful Firestore write         |
| Order       | Firestore failure                  |
| Order       | Duplicate submit                   |
| Order       | Cart clears after success          |
| Order       | Cart remains after failure         |
| Locale      | English/LTR                        |
| Locale      | Arabic/RTL                         |
| Theme       | Light                              |
| Theme       | Dark                               |
| Responsive  | Mobile                             |
| Responsive  | Tablet                             |
| Responsive  | Desktop                            |

---

# 8. Known Risks

## 8.1 Cart Persistence Conflicts

Guest and authenticated carts can conflict during login.

**Mitigation:** define deterministic merge rules before implementing synchronization.

---

## 8.2 Variant Identity

Using only `productId` as the cart key can incorrectly merge different variants.

**Mitigation:** generate a deterministic cart-line key from product ID + selected variants.

---

## 8.3 Stale Stock

Product stock can change between catalog browsing and checkout.

**Mitigation:** Phase 4 must prevent obvious client-side over-selection, while recognizing that true transactional inventory enforcement may require a trusted backend/server-side mechanism in a future phase.

---

## 8.4 Price Integrity

Client-side prices must not be treated as a secure source of truth for financial transactions.

**Mitigation:** preserve the architecture so server/trusted backend validation can be introduced before real payment processing.

---

## 8.5 Order Duplication

Network retries can result in duplicate order creation attempts.

**Mitigation:** disable repeated submission and design the order service so future idempotency support can be added cleanly.

---

## 8.6 Firestore Security

Client-side checks are not sufficient for protecting order data.

**Mitigation:** review Firestore Security Rules and keep authorization logic outside presentation components.

---

## 8.7 Cart Clearing

Clearing before confirmed order creation can cause irreversible user data loss.

**Mitigation:** clear the cart only after successful Firestore confirmation.

---

# 9. Phase Boundary

## Included in Phase 4

```text
Product Details
Cloudinary Product Gallery Consumption
Product Variants
Stock State
Add to Cart
Cart State Management
LocalStorage Cart Persistence
Authenticated Cart Synchronization
Cart Drawer
Quantity Management
Cart Removal
Checkout
Shipping Details
Order Summary
Firestore Order Creation
Order Success State
Cart Clearing After Success
```

## Explicitly Excluded

```text
Admin Order Management
Order Tracking
Account Order History
Coupon Engine
Advanced Inventory Management
Real Payment Gateway
Payment Provider Integration
Shipping Provider API
Refunds
Returns
Advanced Tax Engine
```

These features must not be implemented merely because they are adjacent to checkout.

---

# 10. Exit Criteria

Phase 4 may be marked:

```text
[PASS]
```

only when:

1. Product Details is fully functional.
2. Cloudinary gallery is integrated through the existing optimized image architecture.
3. Variants and stock states work correctly.
4. Cart state is centralized and persistent.
5. Cart Drawer works globally.
6. Checkout validates shipping details.
7. Order Summary accurately reflects the cart.
8. Firestore order creation works.
9. Cart clears only after successful order creation.
10. Failure states preserve user cart data.
11. AR/EN + RTL/LTR are verified.
12. Light/Dark themes are verified.
13. Mobile/tablet/desktop layouts are verified.
14. Lint/typecheck/build pass.
15. Firestore security rules are reviewed.
16. Phase 3 functionality remains regression-free.
17. No Phase 5/admin or unrelated functionality has leaked into the implementation.

---

# 11. Handoff to Next Phase

After `[PASS]`, the project is ready for:

**Phase 5 — Admin Dashboard & Store Management**

The next phase may build on the `orders` collection and existing product/category infrastructure to provide administrative management.

Phase 4 must leave clean service/repository boundaries so that future admin functionality can consume:

```text
products
categories
orders
users
```

without coupling the Admin UI directly to Firestore implementation details.

---

## Current Status

```text
Phase 1 — Setup & Project Initialization                 [PASS]
Phase 2 — Authentication & Modern Navigation Layout     [PASS]
Phase 3 — Product Catalog & Cloudinary Integration       [PASS]
Phase 4 — Product Details, Cart & Checkout Flow          [PASS]
Phase 5 — Admin Dashboard & Store Management             [PENDING]
Phase 6 — QA, Security, Optimization & Production        [PENDING]
```

**Phase Owner:** Project Manager / Work Agent
**Current Phase:** Phase 4 `[PASS]` — approved 2026-09-16
**Previous Phase:** Phase 3 `[PASS]`
**Next Phase:** Phase 5

```

```
