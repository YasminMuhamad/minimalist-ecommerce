# CURRENT_PHASE.md

# Current Phase — Phase 2: Authentication & Modern Navigation Layout

> **Status:** Completed (100%)  
> **Phase:** 2 / 6  
> **Approved On:** 2026-09-14  
> **Previous Phase:** Phase 1 — Setup & Project Initialization `[PASS]`  
> **Primary Objective:** Implement the complete authentication foundation and establish the modern, responsive navigation shell shared across the entire application.

---

# 1. Goal

Build and stabilize the application's **Authentication Layer** and **Global Navigation Layout** without entering the product catalog, checkout, order management, or admin CRUD implementation.

Phase 2 has two tightly related objectives:

1. Establish a production-ready Firebase Authentication flow supporting:
   - Google Authentication.
   - Email/Password Authentication.
   - Persistent authentication state.
   - `user` and `admin` roles.
   - Protected-route readiness.

2. Build the complete **Modern Minimalist application shell**, including:
   - Announcement Bar.
   - Main Header.
   - Five category navigation links.
   - Search action.
   - Cart action with badge.
   - User/account action.
   - AR/EN language toggle.
   - Light/Dark theme toggle.
   - Responsive mobile navigation.
   - Footer.

The result of this phase should provide every subsequent phase with a stable authentication state and reusable global layout.

---

# 2. Scope & File Boundaries

## 2.1 Scope

### Authentication

Implement:

- Firebase Email/Password login.
- Firebase Email/Password registration.
- Google Sign-In.
- Logout.
- Authentication state listener.
- Persistent current-user state.
- Auth loading state.
- Authenticated/unauthenticated state.
- User role resolution.
- `user` role.
- `admin` role.
- Auth error normalization.
- Auth Context/provider.
- Protected-route foundation.
- User profile document synchronization with Firestore where required.

Authentication must use the Firebase foundation established in Phase 1.

---

### Global Navigation

Implement:

- Announcement Bar.
- Main Header.
- Desktop navigation.
- Five category links:
  1. الملابس / Clothing
  2. العناية والشخصية / Personal Care
  3. مستلزمات المنزل / Home Supplies
  4. أدوات المكتب / Office Tools
  5. إكسسوارات عامة / General Accessories
- Search button/action.
- Cart button/action.
- Cart item badge.
- User/account button.
- Login/Register entry point for guests.
- Account entry point for authenticated users.
- Admin entry point only when the authenticated user has `admin` role.
- Language toggle.
- Theme toggle.
- Responsive mobile navigation.
- Drawer/Sheet-based mobile menu.

Navigation must be implemented as reusable application-level components rather than duplicated inside individual pages.

---

### Footer

Implement:

- Quick navigation links.
- Category links.
- Social media links/placeholders.
- Store policy links.
- Language selector.
- Currency selector.
- Responsive footer layout.

The footer must support both Arabic RTL and English LTR layouts.

---

## 2.2 File Boundaries

### Allowed to Create

Only create files within the following Phase 2 areas unless a dependency requires an existing shared file to be updated:

```text
src/
├── components/
│   ├── auth/
│   ├── layout/
│   │   ├── AnnouncementBar.*
│   │   ├── Header.*
│   │   ├── MainNavigation.*
│   │   ├── MobileNavigation.*
│   │   ├── HeaderActions.*
│   │   ├── Footer.*
│   │   └── AppLayout.*
│   └── navigation/
├── contexts/
│   └── AuthContext.*
├── hooks/
│   └── useAuth.*
├── lib/
│   └── firebase/
│       └── auth.*
├── pages/
│   └── auth/
│       ├── Login.*
│       └── Register.*
├── routes/
│   ├── ProtectedRoute.*
│   └── AdminRoute.*
├── services/
│   └── auth.*
└── types/
    └── auth.*

Exact extensions depend on the project's existing conventions.

Allowed to Modify

Phase 2 may modify only existing files directly related to:

src/App.*
src/main.*
src/index.css

src/components/
src/contexts/
src/hooks/
src/lib/firebase/
src/pages/auth/
src/routes/
src/services/
src/types/

src/i18n/
src/constants/
src/config/

Additionally, update only the project-level files required to register Phase 2 changes:

CURRENT_PHASE.md
Explicitly Out of File Scope

Do not implement or modify unrelated business logic for:

Product CRUD
Product Details
Product Search Engine
Cart Business Logic
Checkout
Coupons
Orders
Order Tracking
Admin Statistics
Admin Product Management
Admin Coupon Management
Admin Order Management
Real Payment Gateway
Cloudinary Product Upload
Instagram Feed
Deals of the Day
Flash Sale Business Logic

These belong to later phases.

3. Architecture Rules
3.1 Authentication Boundary

React components must not directly contain scattered Firebase authentication calls.

Use the following conceptual flow:

UI
 ↓
Auth Context / Hook
 ↓
Auth Service
 ↓
Firebase Auth
 ↓
Firestore User Profile

Components should consume authentication state through:

useAuth()

rather than directly accessing Firebase Auth.

3.2 Authentication State

The Auth Context must expose a predictable state similar to:

user
role
loading
isAuthenticated
isAdmin
login()
register()
loginWithGoogle()
logout()

The exact API may differ according to the existing project architecture, but the responsibilities must remain centralized.

3.3 User Roles

Supported application roles:

user
admin

Default authenticated users must receive:

user

The admin role must not be granted based on a client-side flag supplied by the browser.

Role resolution must ultimately rely on trusted application data/configuration and Firebase security rules.

3.4 Navigation Data

Navigation items should be centralized rather than hard-coded repeatedly.

Conceptual structure:

navigation/
├── primaryNavigation
├── footerNavigation
└── socialLinks

Category names should be translation-key based.

Example:

category.clothing
category.personalCare
category.home
category.office
category.accessories
3.5 Responsive Architecture

Desktop and mobile navigation should use the same underlying navigation data.

Navigation Data
      ↓
 ┌────┴────┐
 ↓         ↓
Desktop   Mobile
Header    Drawer/Sheet

Do not duplicate category definitions between desktop and mobile components.

4. Detailed Execution Steps
Step 1 — Verify Phase 1 Foundation

Before writing Phase 2 code:

Confirm Firebase configuration from Phase 1 is working.
Confirm TypeScript passes.
Confirm Tailwind works.
Confirm Shadcn UI works.
Confirm i18n architecture exists.
Confirm RTL/LTR architecture exists.
Confirm theme architecture exists.
Confirm routing foundation exists.

If Phase 1 infrastructure is broken, fix the minimum required foundation before proceeding.

Do not silently redesign Phase 1 architecture.

Step 2 — Implement Firebase Auth Service

Create a dedicated authentication service.

Implement:

Email/Password Sign In
Email/Password Registration
Google Sign In
Sign Out
Auth State Listener

Normalize Firebase errors into application-friendly error states.

The UI must never need to understand raw Firebase error codes unless explicitly required.

Step 3 — Implement User Profile Synchronization

After authentication:

Identify the Firebase user.
Check the corresponding Firestore user document.
Create the profile when required.
Preserve existing user information.
Resolve the user's application role.

Conceptual document:

users/{uid}

Example structure:

{
  uid,
  email,
  displayName,
  photoURL,
  role: "user",
  createdAt,
  updatedAt
}

Do not overwrite an existing administrator role with the default user role.

Step 4 — Implement Auth Context

Create the application-level Auth Provider.

It must:

Subscribe to Firebase auth state changes.
Expose the current user.
Resolve role.
Expose authentication methods.
Expose loading state.
Clean up Firebase listeners.
Avoid rendering protected application content before authentication state is resolved.

The provider should be mounted at the appropriate application root.

Step 5 — Implement useAuth

Create a reusable authentication hook.

Expected usage:

const {
  user,
  role,
  loading,
  isAuthenticated,
  isAdmin,
  login,
  register,
  loginWithGoogle,
  logout
} = useAuth();

The exact API may be adjusted to project conventions.

The important requirement is that authentication state has one clear consumption point.

Step 6 — Implement Login UI

Create the login experience supporting:

Email.
Password.
Google Sign-In.
Loading state.
Validation errors.
Authentication errors.
Disabled submission while processing.
Link to registration.
RTL/LTR support.
Light/Dark support.

The interface must follow the Modern Minimalist visual language.

Do not implement password reset unless it already exists as an approved Phase 2 requirement.

Step 7 — Implement Registration UI

Create the registration experience supporting:

Email.
Password.
Password confirmation.
Validation.
Firebase registration.
User profile initialization.
Loading state.
Error state.
Link to login.

The default newly registered role must be:

user
Step 8 — Implement Google Authentication

Add Google Sign-In using Firebase Auth.

Verify:

Successful Google authentication.
Existing user handling.
New user profile creation.
Display name/photo synchronization.
Role preservation.
Logout after Google login.
Error handling.

Google Auth must use the Firebase configuration established in Phase 1.

Step 9 — Implement Protected Route Foundation

Create:

ProtectedRoute

Behavior:

Loading
   ↓
Auth resolved?
 ┌─┴──────────┐
No           Yes
 ↓            ↓
Loading    Authenticated?
             ┌──┴──┐
            No     Yes
            ↓       ↓
         Login     Route

The route guard must not create authentication loops.

Step 10 — Implement Admin Route Foundation

Create:

AdminRoute

It must verify:

authenticated
+
admin role

Unauthorized users must not be able to access admin-only routes.

Important:

Client-side route protection is not a security boundary. Firebase Security Rules must independently enforce permissions in later implementation/review.

Step 11 — Build Announcement Bar

Implement a reusable announcement bar.

Requirements:

Configurable message.
AR/EN translation support.
Optional link/action.
Responsive text.
Dismiss behavior only if approved by the existing design.
Light/Dark compatibility.

Example content:

Free shipping on orders over X

The message must not be hard-coded inside the component when it can be configured through constants/configuration.

Step 12 — Build Main Header

Implement the primary desktop header.

Required elements:

Logo
Navigation
Search
Language
Theme
Cart
User

Design characteristics:

Minimal.
Spacious.
Premium neutral palette.
Clear typography.
Subtle borders.
No unnecessary visual effects.
Strong focus/hover states.
Step 13 — Build Five-Category Navigation

Display the five approved categories:

Clothing
Personal Care
Home Supplies
Office Tools
General Accessories

Arabic labels must be provided through i18n.

Navigation must use category identifiers rather than relying only on translated display text.

Step 14 — Build Header Action Controls

Implement:

Language Toggle
AR ↔ EN

Requirements:

Persist selected locale.
Update document direction.
Update translated navigation labels.
Theme Toggle
Light ↔ Dark

Requirements:

Use existing theme architecture.
Persist theme.
Preserve accessibility and contrast.
Cart

Display:

Cart icon
+
Item count badge

Phase 2 does not implement cart business logic.

The badge may therefore use the existing cart state interface or a temporary zero/placeholder state until the Cart phase is implemented.

User

Unauthenticated:

Login / Register

Authenticated:

Account / Profile
Logout

Admin:

Admin Dashboard

The admin option must appear only when role resolution confirms admin.

Step 15 — Build Responsive Mobile Menu

Implement a Shadcn Sheet/Drawer-based mobile navigation.

Requirements:

Open/close behavior.
Smooth interaction.
Keyboard accessibility.
Overlay handling.
Five category links.
Search action.
Account action.
Language toggle.
Theme toggle.
Cart action.
Admin action when authorized.

The mobile menu must use the same navigation definitions as desktop.

Step 16 — Build Footer

Implement a responsive footer containing:

Quick Links
Home.
Shop.
Categories.
Account.
Orders where applicable.
Categories

The same five category definitions.

Social

Provide configurable social links/placeholders.

Store Policies

Prepare links for:

Privacy Policy.
Terms & Conditions.
Shipping Policy.
Return Policy.

The actual policy content is outside this phase.

Footer Controls
Language selector.
Currency selector.

Currency selection should establish the UI/state boundary only unless currency conversion/business logic has already been approved elsewhere.

Step 17 — Build Application Layout

Create a reusable global layout:

<AppLayout>
  <AnnouncementBar />
  <Header />

  <main>
    {page}
  </main>

  <Footer />
</AppLayout>

The layout must not force authentication-specific behavior into unrelated pages.

Step 18 — Integrate Routing

Connect:

Login.
Register.
Protected account placeholder.
Admin placeholder.
Storefront placeholder.

Verify navigation transitions.

Do not implement the actual account or admin business features in this phase.

Step 19 — Accessibility Pass

Verify:

Keyboard navigation.
Visible focus states.
Semantic navigation landmarks.
Button labels.
Accessible icon buttons.
Proper form labels.
Mobile drawer accessibility.
Dialog/Sheet focus management.
Sufficient color contrast.
Screen-reader-friendly authentication errors.
Step 20 — Responsive & RTL/LTR Pass

Test:

Mobile
Tablet
Desktop

and:

AR / RTL
EN / LTR

Check especially:

Header spacing.
Navigation order.
Icon placement.
Mobile drawer alignment.
Footer columns.
Search icon.
Cart badge position.
User icon.
Directional icons.
Step 21 — Final Validation

Run the project's available checks:

npm run lint
npm run typecheck
npm run build

Use the project's actual scripts if their names differ.

Manually verify the critical user flows before declaring Phase 2 complete.

5. Definition of Done (DoD)

Phase 2 can be marked [PASS] only when all applicable criteria below pass.

Authentication
 Email/password registration works.
 Email/password login works.
 Google Sign-In works.
 Logout works.
 Firebase auth state persists correctly.
 Auth loading state prevents premature protected-route decisions.
 Auth Context is globally available.
 useAuth() works consistently.
 Authenticated users receive a valid application role.
 New users default to user.
 Existing admin role is preserved.
 Auth errors are presented clearly.
 Protected route foundation works.
 Admin route foundation checks the admin role.
Header
 Announcement Bar exists.
 Announcement content is configurable.
 Logo is displayed.
 Five categories are displayed.
 Search action exists.
 Cart action exists.
 Cart badge is visually implemented.
 User/account action exists.
 Admin entry point is role-aware.
 Header works in Light Mode.
 Header works in Dark Mode.
 Header works in AR/RTL.
 Header works in EN/LTR.
Mobile Navigation
 Mobile navigation exists.
 Sheet/Drawer opens correctly.
 Sheet/Drawer closes correctly.
 Navigation uses the same category data as desktop.
 Search is accessible.
 Cart is accessible.
 Account is accessible.
 Theme toggle is accessible.
 Language toggle is accessible.
 Admin option is role-aware.
 Keyboard navigation works.
 No horizontal overflow occurs.
Footer
 Footer exists.
 Quick links exist.
 Category links exist.
 Social links/placeholders exist.
 Policy links exist.
 Language selector exists.
 Currency selector exists.
 Footer is responsive.
 Footer supports RTL/LTR.
 Footer supports Light/Dark themes.
Visual Quality
 Modern Minimalist design is maintained.
 Primary neutral palette is respected:
#FFFFFF
#F8FAFC
#0F172A
#000000
 No unnecessary gradients or decorative effects are introduced.
 Typography hierarchy is consistent.
 Borders and spacing are consistent.
 Interactive states are visually clear.
 Components use the shared design system.
Technical Quality
 No authentication logic is duplicated across components.
 Firebase calls are centralized appropriately.
 Navigation data is not duplicated between desktop/mobile.
 No unnecessary any types are introduced.
 No secrets are hard-coded.
 No unrelated Phase 3+ business logic is introduced.
 Lint passes.
 TypeScript/typecheck passes.
 Production build passes.
6. Required Test Matrix
Authentication Matrix
Scenario	Expected Result
Valid Email/Password Login	User authenticated
Invalid Email	Clear validation/error
Invalid Password	Clear authentication error
New Registration	User created with user role
Password Confirmation Mismatch	Registration blocked
Google Login	User authenticated
Existing Google User	Existing profile preserved
Logout	Auth state cleared
Auth Refresh	User state restored
Admin User	admin role resolved
Normal User	user role resolved
Unauthenticated Protected Route	Redirect to login
Non-admin Admin Route	Access denied/redirected
Auth Loading	Protected content not prematurely rendered
Navigation Matrix
Scenario	Expected Result
Desktop	Full navigation displayed
Mobile	Drawer/Sheet navigation displayed
AR	RTL navigation
EN	LTR navigation
Light	Light theme
Dark	Dark theme
Guest	Login/Register available
User	Account available
Admin	Admin entry available
Cart Empty	Badge shows empty/zero state
Navigation Link	Correct route transition
Menu Close	Drawer closes correctly
7. Known Risks
Risk 1 — Role Escalation
Problem

A malicious client could attempt to set:

role = "admin"

through the browser.

Mitigation

The frontend must never be the final authorization layer.

Use Firestore Security Rules and/or a trusted administrative mechanism to enforce admin permissions.

Risk 2 — Auth State Race Conditions
Problem

The application may initially interpret an authenticated user as logged out before Firebase finishes restoring the session.

Mitigation

Expose an explicit:

loading

state from Auth Context and delay protected-route decisions until Firebase resolves the initial auth state.

Risk 3 — Google Auth Configuration
Problem

Google authentication may work locally but fail in another environment due to Firebase authorized-domain configuration.

Mitigation

Verify the Firebase Authentication provider and authorized domains for every target environment.

Risk 4 — Duplicate Navigation Definitions
Problem

Desktop and mobile menus may develop different labels/routes over time.

Mitigation

Maintain one centralized navigation configuration and render it through both desktop and mobile components.

Risk 5 — RTL Layout Regressions
Problem

Icons, spacing, badges, and drawer positioning can remain visually incorrect after direction switching.

Mitigation

Use logical CSS properties and test both RTL and LTR during implementation rather than at the end only.

Risk 6 — Theme Inconsistency
Problem

New navigation components may use hard-coded colors that break Dark Mode.

Mitigation

Use shared design tokens and theme-aware classes instead of hard-coded component-specific colors.

Risk 7 — Cart Badge Coupling
Problem

The Header may become tightly coupled to unfinished cart business logic.

Mitigation

Define a simple cart-state interface for Phase 2 and allow the future Cart phase to replace its implementation without rewriting Header components.

Risk 8 — Footer Scope Creep
Problem

Implementing complete policy pages, social integrations, currency conversion, or external APIs would expand Phase 2 unnecessarily.

Mitigation

Implement only the Footer UI and integration boundaries. Full policy content, live social feeds, and currency/business logic remain outside this phase.

Risk 9 — Authentication Scope Creep
Problem

Password reset, email verification, profile editing, MFA, and advanced account settings may expand the phase unexpectedly.

Mitigation

Phase 2 is limited to:

Google Auth
Email/Password Auth
Auth State
Roles
Login
Registration
Logout
Route Protection Foundation

Additional authentication features require an explicit scope decision.

8. Phase 2 Boundary
Phase 2 WILL include
Authentication
├── Email/Password
├── Google Auth
├── Auth Context
├── Auth State
├── User/Admin Roles
├── Login
├── Registration
├── Logout
└── Route Protection Foundation

Navigation
├── Announcement Bar
├── Header
├── Five Categories
├── Search Action
├── Cart Action + Badge
├── User Action
├── Language Toggle
├── Theme Toggle
└── Responsive Mobile Menu

Footer
├── Quick Links
├── Categories
├── Social Links
├── Store Policies
├── Language Selector
└── Currency Selector
Phase 2 WILL NOT include
Product Catalog
Product CRUD
Product Details
Cloudinary Product Upload
Cart Business Logic
Coupons
Checkout
Payment Processing
Order Creation
Order Tracking
Account Management
Admin Statistics
Admin Product CRUD
Admin Coupon CRUD
Admin Order Management

These remain assigned to subsequent phases according to APP_ROADMAP.md.

9. Phase Exit Criteria

Before updating the phase status to:

Phase 2 [PASS]

confirm all of the following:

[PASS] Firebase Email/Password Authentication
[PASS] Firebase Google Authentication
[PASS] Auth Context
[PASS] Auth State Persistence
[PASS] User Role
[PASS] Admin Role
[PASS] Protected Route Foundation
[PASS] Admin Route Foundation

[PASS] Announcement Bar
[PASS] Main Header
[PASS] Five Category Navigation
[PASS] Search Action
[PASS] Cart Action + Badge
[PASS] User Action
[PASS] Language Toggle
[PASS] Theme Toggle
[PASS] Responsive Mobile Menu

[PASS] Footer
[PASS] Footer Navigation
[PASS] Social Links
[PASS] Policy Links
[PASS] Footer Language Selector
[PASS] Footer Currency Selector

[PASS] AR / RTL
[PASS] EN / LTR
[PASS] Light Mode
[PASS] Dark Mode
[PASS] Mobile
[PASS] Tablet
[PASS] Desktop

[PASS] Lint
[PASS] Typecheck
[PASS] Production Build
[PASS] No Phase 3+ Scope Leakage
10. Handoff to Phase 3

After Phase 2 receives [PASS], the project should have:

Stable Authentication
        +
User/Admin Role Foundation
        +
Protected Routes
        +
Global Application Layout
        +
Responsive Header
        +
Responsive Mobile Navigation
        +
Footer
        +
AR/EN
        +
RTL/LTR
        +
Light/Dark
        +
Shared Navigation Configuration

The project is then ready for:

Phase 3 — Catalog, Product Experience & Media Integration

Phase 3 will consume the authentication and layout foundations created here rather than replacing them.

Phase 2 Status
Current Status: IN PROGRESS

Previous Phase:
Phase 1 — Setup & Project Initialization [PASS]

Current Phase:
Phase 2 — Authentication & Modern Navigation Layout

Next Phase:
Phase 3 — Catalog, Product Experience & Media Integration
```
