# E-commerce Web Application — App Roadmap

> **Project Type:** Modern Minimalist E-commerce Web Application  
> **Frontend:** React + TypeScript + Tailwind CSS + Shadcn UI  
> **Backend:** Firebase Auth + Firestore  
> **Media:** Cloudinary  
> **Theme:** Modern Minimalist / Premium Neutral  
> **Languages:** Arabic (AR) / English (EN)  
> **Direction:** RTL / LTR  
> **Scope:** Customer Storefront + Account + Orders + Admin Dashboard

---

## Project Principles

- Build the application incrementally from infrastructure to production-ready features.
- Keep every phase independently testable and deliverable.
- Avoid implementing features outside the current phase unless they are required as dependencies.
- Reuse components instead of duplicating UI or business logic.
- Keep customer-facing and admin-facing functionality clearly separated.
- Centralize configuration, types, constants, translations, validation, and Firebase access.
- Maintain responsive behavior across mobile, tablet, and desktop.
- Treat Arabic RTL support as a first-class requirement rather than a final adjustment.
- Use accessible semantic HTML and keyboard-friendly interactions.
- Keep the visual system consistent with the approved Modern Minimalist design.

---

# Phase 1 — Setup & Project Initialization

## Goal

Establish a stable and scalable technical foundation for the entire application.

## Scope

- Initialize React + TypeScript project.
- Configure Tailwind CSS.
- Configure Shadcn UI.
- Establish project directory structure.
- Configure global CSS and design tokens.
- Define the Modern Minimalist visual system:
  - White `#FFFFFF`
  - Off-white `#F8FAFC`
  - Charcoal `#0F172A`
  - Matte Black `#000000`
- Configure typography, spacing, borders, radius, shadows, and responsive breakpoints.
- Establish reusable UI primitives.
- Configure AR/EN localization architecture.
- Establish RTL/LTR support architecture.
- Establish Light/Dark theme architecture.
- Configure Firebase project integration.
- Prepare Firebase Auth integration.
- Prepare Firestore integration.
- Configure environment variables.
- Configure Cloudinary integration structure.
- Define initial TypeScript domain models/interfaces.
- Establish application-level providers/context where required.
- Establish routing structure for:
  - Storefront
  - Product
  - Cart
  - Checkout
  - Account
  - Order Tracking
  - Admin
- Configure linting/formatting and basic development standards.
- Add README/project setup documentation.

## Definition of Done

- Application runs successfully in development mode.
- TypeScript compilation succeeds without errors.
- Tailwind CSS is working.
- Shadcn UI is configured and reusable components can be created.
- Global design tokens are defined.
- AR and EN localization structure exists.
- RTL/LTR direction can be switched architecturally.
- Light/Dark theme architecture is established.
- Firebase configuration is loaded exclusively through environment variables.
- Firebase Auth and Firestore dependencies are ready for implementation.
- Cloudinary configuration structure is ready.
- Base routing exists without requiring final feature implementations.
- Core TypeScript models are defined.
- Project structure is documented.
- No secrets or API keys are committed to the repository.
- The project is ready for Phase 2 without restructuring the foundation.

## Known Risks

- Incorrect Firebase environment configuration can block authentication and database work.
- RTL/LTR implementation postponed too late may require expensive UI refactoring.
- Poor initial folder structure can cause duplicated logic in later phases.
- Over-customizing Shadcn UI may make future maintenance harder.
- Theme tokens must be centralized to prevent inconsistent colors and spacing.
- Cloudinary upload architecture should remain separated from Firestore data logic.

---

# Phase 2 — Design System & Core Storefront UI

## Goal

Build the reusable visual foundation and the primary customer-facing storefront shell.

## Scope

### Design System

- Finalize Tailwind design tokens.
- Establish typography hierarchy.
- Establish reusable:
  - Buttons
  - Inputs
  - Selects
  - Dialogs
  - Cards
  - Badges
  - Tabs
  - Accordion
  - Dropdowns
  - Toasts
  - Skeletons
  - Empty states
  - Loading states
- Implement responsive layout utilities.
- Implement Light/Dark mode.
- Implement AR/EN language toggle.
- Implement RTL/LTR switching.

### Global Layout

- Header.
- Top announcement bar.
- Navigation menus.
- Search trigger/interface.
- Cart trigger.
- Language toggle.
- Theme toggle.
- Mobile navigation.
- Footer.
- Newsletter section.

### Home Page

- Promotional Hero Banner.
- Five category cards:
  1. Clothing
  2. Personal Care
  3. Home Supplies
  4. Office Tools
  5. General Accessories
- Flash Sale section.
- Countdown timer UI.
- Deals of the Day.
- Instagram Feed section.
- FAQ Accordion.
- Newsletter subscription UI.

### Initial Data Layer

- Define category model.
- Define product model.
- Define coupon model.
- Define order model.
- Define user/account model.
- Define Firestore collection conventions.

## Definition of Done

- Storefront shell is responsive.
- Header and footer work across mobile and desktop.
- Theme switching works.
- Language switching works.
- RTL/LTR layouts render correctly.
- Home page contains all required sections.
- Five default categories are represented.
- Components are reusable and not duplicated unnecessarily.
- Loading, empty, and error states have reusable primitives.
- UI follows the approved neutral minimalist visual language.

## Known Risks

- Visual inconsistency can appear if pages bypass shared components.
- RTL issues may appear in icons, spacing, animations, and directional components.
- Countdown timers can create hydration/state issues if not designed carefully.
- Instagram Feed should remain a replaceable integration rather than tightly coupling the UI to a third-party source.
- Placeholder content must be structured so it can later be replaced by Firestore data.

---

# Phase 3 — Authentication, Catalog & Product Experience

## Goal

Connect the storefront to Firebase and implement the complete product browsing and authentication experience.

## Scope

### Authentication

- Firebase Email/Password authentication.
- Google authentication.
- Login page/modal.
- Registration flow.
- Logout.
- Authentication state persistence.
- Protected account routes.
- Authentication error handling.
- User profile creation/update in Firestore.

### Catalog

- Firestore-backed categories.
- Firestore-backed products.
- Category filtering.
- Product listing.
- Product search.
- Product sorting.
- Product availability/stock state.
- Product cards.
- Product image galleries.

### Product Details

- Single Product page.
- Product gallery.
- Product title.
- Price.
- Discounted price.
- Product description.
- Color options.
- Size options.
- Quantity selector.
- Specifications table.
- Availability state.
- Add to Cart.
- Related Products.

### Media

- Cloudinary product image upload.
- Cloudinary URL storage.
- Firestore product documents reference Cloudinary URLs.
- Image validation and upload states.

## Definition of Done

- Customers can register and log in.
- Google Auth works.
- Authentication state is available throughout the application.
- Protected account functionality requires authentication.
- Products can be loaded from Firestore.
- Categories can be loaded from Firestore.
- Product details render dynamically.
- Product variants can be selected.
- Product images come from Cloudinary URLs.
- Product search/filter/sort works according to the implemented requirements.
- Related products are displayed.
- Firestore models and frontend TypeScript models remain synchronized.

## Known Risks

- Firebase security rules must prevent unauthorized product/data modification.
- Google Auth configuration differs between development and production environments.
- Cloudinary upload failures require clear retry/error handling.
- Product variants can complicate stock management if the data model is not defined early.
- Search functionality may require a dedicated search strategy if Firestore querying becomes insufficient.
- Authentication redirects must preserve user intent where appropriate.

---

# Phase 4 — Cart, Coupons, Checkout & Orders

## Goal

Implement the complete shopping transaction flow using a Mock Payment experience.

## Scope

### Cart

- Add product to cart.
- Remove product.
- Update quantity.
- Variant-aware cart items.
- Cart subtotal.
- Discount amount.
- Final total.
- Empty cart state.
- Cart persistence.
- Cart drawer/page.

### Coupons

- Coupon input.
- Coupon validation.
- Percentage discounts.
- Fixed discounts.
- Minimum order requirements where applicable.
- Expiration handling.
- Invalid/expired coupon states.
- Applied coupon persistence during checkout.

### Checkout

- Customer information.
- Shipping information.
- Order summary.
- Coupon summary.
- Final total.
- Mock Payment interface.
- Explicit UI notice:
  - Payment gateway is simulated.
  - No real payment is processed.
- Order confirmation.

### Orders

- Create order in Firestore.
- Generate order identifier.
- Store purchased items and selected variants.
- Store pricing snapshot.
- Store customer/shipping information.
- Store coupon/discount information.
- Store order status.
- Order history.
- Order details.
- Track Your Order timeline.

### Account

- My Account page.
- Profile information.
- Order archive/history.
- Order details.
- Logout.

## Definition of Done

- Customer can add products to cart.
- Cart correctly handles variants and quantities.
- Coupon validation works.
- Checkout calculates totals correctly.
- Mock Payment clearly communicates that payment is simulated.
- Successful checkout creates a Firestore order.
- Order data contains a reliable historical pricing snapshot.
- Customer can view previous orders.
- Customer can open an order and view its details.
- Customer can track order status through a timeline.
- Unauthenticated customers cannot access protected order/account data.
- Cart and checkout have complete loading/error/empty states.

## Known Risks

- Client-side totals must not be trusted as authoritative financial data.
- Coupon abuse can occur if validation exists only in the frontend.
- Firestore security rules must isolate orders by authenticated user.
- Order creation should avoid partial/duplicate writes.
- Stock changes during checkout can cause inconsistencies.
- Mock Payment must never be presented as a real payment gateway.
- Cart persistence needs a clear strategy for guest-to-authenticated transitions.

---

# Phase 5 — Admin Dashboard & Store Management

## Goal

Provide administrators with a complete operational interface for managing the store.

## Scope

### Admin Access

- Admin route protection.
- Admin authorization model.
- Admin-only Firestore operations.
- Unauthorized access handling.

### Dashboard

- Sales statistics.
- Order statistics.
- Product statistics.
- Basic revenue overview.
- Recent orders.
- Recent activity.
- Dashboard loading/empty/error states.

### Product Management

- Product list.
- Search/filter.
- Add product.
- Edit product.
- Delete product.
- Product image upload via Cloudinary.
- Product image replacement/removal.
- Category assignment.
- Pricing.
- Discount pricing.
- Stock.
- Colors.
- Sizes.
- Specifications.
- Related product configuration.

### Category Management

- View categories.
- Create category.
- Edit category.
- Delete/deactivate category.
- Manage category display information.

### Coupon Management

- Create coupon.
- Edit coupon.
- Delete/deactivate coupon.
- Discount type.
- Discount value.
- Expiration date.
- Minimum order value.
- Coupon activation status.

### Order Management

- View all orders.
- Search/filter orders.
- Open order details.
- Update order status.
- Track status history.
- Customer/order summary.

## Definition of Done

- Only authorized admins can access the dashboard.
- Dashboard statistics are connected to Firestore data.
- Admin can perform complete CRUD operations on products.
- Admin can manage categories.
- Admin can manage coupons.
- Admin can update order statuses.
- Cloudinary uploads work from admin product forms.
- Form validation prevents invalid product/coupon data.
- Destructive operations require confirmation.
- Admin interface is responsive.
- Admin errors and permission failures are handled gracefully.
- Firestore security rules enforce admin permissions independently of frontend route guards.

## Known Risks

- Frontend admin guards alone are not security.
- Incorrect Firestore rules can expose sensitive data.
- Dashboard aggregation can become expensive as order volume grows.
- Deleting categories can orphan products.
- Hard deletion of products may break historical orders.
- Coupon changes after an order should not modify historical order totals.
- Cloudinary assets can become orphaned if product deletion is not coordinated with media management.

---

# Phase 6 — QA, Security, Optimization & Production Readiness

## Goal

Validate the complete application and prepare it for reliable production deployment.

## Scope

### Functional QA

- Authentication testing.
- Google Auth testing.
- Email authentication testing.
- Product browsing testing.
- Search/filter/sort testing.
- Product variant testing.
- Cart testing.
- Coupon testing.
- Checkout testing.
- Mock Payment testing.
- Order creation testing.
- Order tracking testing.
- Account testing.
- Admin CRUD testing.
- Category management testing.
- Order status management testing.

### Localization QA

- AR content verification.
- EN content verification.
- RTL layout audit.
- LTR layout audit.
- Directional icons and spacing.
- Mobile RTL behavior.
- Mixed-language content.

### Theme QA

- Light mode audit.
- Dark mode audit.
- Contrast validation.
- Interactive state validation.

### Responsive QA

- Mobile.
- Tablet.
- Desktop.
- Navigation breakpoints.
- Product grids.
- Checkout layout.
- Admin dashboard layout.

### Security

- Firebase Auth review.
- Firestore Security Rules review.
- Admin authorization review.
- User/order access isolation.
- Environment variable audit.
- Cloudinary upload restrictions.
- Validation of client/server trust boundaries.
- Remove development-only secrets and debugging data.

### Performance

- Image optimization.
- Cloudinary transformations.
- Lazy loading.
- Code splitting where useful.
- Firestore query optimization.
- Avoid unnecessary reads.
- Component rendering optimization.
- Loading skeletons.

### Accessibility

- Keyboard navigation.
- Focus states.
- Semantic HTML.
- Form labels.
- ARIA where required.
- Color contrast.
- Screen-reader-friendly controls.

### Production

- Production environment variables.
- Firebase production configuration.
- Firestore indexes.
- Firestore rules deployment.
- Cloudinary production configuration.
- Build verification.
- Error monitoring strategy.
- Deployment documentation.
- Final release checklist.

## Definition of Done

- All critical customer journeys pass QA.
- All critical admin workflows pass QA.
- No known critical security vulnerabilities remain.
- Firestore rules enforce intended access boundaries.
- Authentication and admin authorization are verified.
- AR/EN and RTL/LTR work throughout the application.
- Light/Dark themes work throughout the application.
- Responsive layouts work across supported breakpoints.
- Production build completes successfully.
- No secrets are exposed in source control.
- Images and Firestore queries are reasonably optimized.
- Accessibility issues affecting core workflows are resolved.
- Mock Payment is clearly identified as non-production payment functionality.
- Deployment and rollback documentation exists.
- Application is ready for production release.

## Known Risks

- Production Firebase configuration may differ from development.
- Firestore pricing can increase if queries/read patterns are inefficient.
- Third-party service limits may affect Cloudinary or authentication flows.
- Browser-specific issues can remain after local testing.
- Large product catalogs may require pagination and stronger search infrastructure.
- Analytics/statistics may require aggregation architecture as the store grows.
- Real payment integration, if introduced later, must be treated as a separate security-sensitive project phase.

---

# Phase Dependency Map

```text
Phase 1
  ↓
Project Foundation
  ↓
Phase 2
  ↓
Design System + Storefront Shell
  ↓
Phase 3
  ↓
Auth + Catalog + Product Experience
  ↓
Phase 4
  ↓
Cart + Coupons + Checkout + Orders
  ↓
Phase 5
  ↓
Admin Dashboard + Store Management
  ↓
Phase 6
  ↓
QA + Security + Optimization + Production
Global Definition of Done

The project is considered complete when:

Customer storefront is fully functional.
Authentication supports Google and Email/Password.
AR/EN switching works.
RTL/LTR switching works.
Light/Dark mode works.
Five editable store categories are supported.
Products are managed through Firestore.
Product images are hosted through Cloudinary.
Cart and variants work correctly.
Coupons work correctly.
Checkout uses an explicitly simulated Mock Payment flow.
Orders are persisted and trackable.
Customer accounts expose profile and order history.
Admin dashboard exposes sales/order statistics.
Admins can manage products, categories, coupons, and order statuses.
Firebase Security Rules protect application data.
Responsive behavior is validated.
Accessibility and performance have been reviewed.
Production build succeeds.
Documentation is sufficient for future maintenance.
Out of Scope Unless Explicitly Added Later
Real payment gateway processing.
Real financial transactions.
Advanced ERP/accounting integrations.
Full warehouse management.
Complex shipping-provider integrations.
Native mobile applications.
Advanced recommendation/AI systems.
Full social media publishing automation.
Multi-vendor marketplace functionality.

Any item above can be introduced later as a dedicated project scope rather than being silently added to the current roadmap.