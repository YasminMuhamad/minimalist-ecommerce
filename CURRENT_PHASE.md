````markdown
# CURRENT_PHASE.md

# Current Phase — Phase 3: Product Catalog, Cloudinary Integration, & Filtering

> **Status:** Completed (100%)  
> **Phase:** 3 / 6  
> **Approved On:** 2026-09-15  
> **Previous Phase:** Phase 2 — Authentication & Modern Navigation Layout `[PASS]`  
> **Primary Objective:** Build the complete Firestore-backed product catalog, integrate Cloudinary for optimized product imagery, and provide performant filtering, sorting, and pagination/infinite-scroll capabilities.

---

# 1. Goal

Phase 3 transforms the application from a navigation/authentication shell into a functional **product discovery experience**.

The phase must establish a clean separation between:

```text
Firestore
    ↓
Repositories
    ↓
Data Transformers / Mappers
    ↓
Product Services
    ↓
Catalog State
    ↓
Product Grid / Filters / Sorting
```
````

and:

```text
Product Image
    ↓
Cloudinary
    ↓
Optimization / Resizing
    ↓
Optimized Delivery URL
    ↓
Product UI
```

The completed phase must allow customers to:

- Browse products from Firestore.
- Browse products by category.
- View optimized product images.
- Filter products by category and price.
- Switch between AR/EN translated product content.
- Sort products by:
  - Newest.
  - Price: Low → High.
  - Price: High → Low.

- Navigate through product results efficiently.
- Use the catalog comfortably on mobile, tablet, and desktop.
- Experience consistent Neutral Minimalist styling.

Phase 3 must establish the catalog/data foundation required by the Product Details, Cart, Checkout, and Admin phases without implementing those later-stage business features prematurely.

---

# 2. Scope & File Boundaries

## 2.1 Scope

### Included

- Cloudinary image integration.
- Product image upload service foundation.
- Cloudinary transformation/optimization utilities.
- Firestore product repository.
- Firestore category repository.
- Product/category data mappers.
- Typed product/category models.
- Product catalog page.
- Product grid.
- Product cards.
- Category filtering.
- Price filtering.
- Sorting.
- AR/EN product content.
- Pagination and/or infinite scrolling.
- Loading states.
- Empty states.
- Error states.
- Responsive catalog layout.
- RTL/LTR support.
- Light/Dark support.
- Catalog query/state synchronization.

---

### Explicitly Excluded

The following are **not** part of Phase 3:

```text
Product Details business implementation
Cart business logic
Checkout
Coupons
Order creation
Order tracking
Customer account management
Admin dashboard
Admin product CRUD UI
Admin category CRUD UI
Admin coupon management
Admin order management
Real payment processing
```

Where later phases require a foundation from Phase 3, create only the necessary abstraction/interface rather than implementing the later feature.

---

# 2.2 File Boundaries

## Allowed to Create

Create files only within the following areas unless an existing shared file must be updated as a direct dependency:

```text
src/
├── components/
│   ├── catalog/
│   │   ├── ProductCard.*
│   │   ├── ProductGrid.*
│   │   ├── ProductFilters.*
│   │   ├── ProductSort.*
│   │   ├── ProductToolbar.*
│   │   ├── ProductPagination.*
│   │   ├── ProductInfiniteScroll.*
│   │   ├── CatalogEmptyState.*
│   │   └── CatalogSkeleton.*
│   │
│   └── cloudinary/
│       └── OptimizedImage.*
│
├── hooks/
│   ├── useProducts.*
│   ├── useCategories.*
│   └── useCatalogFilters.*
│
├── lib/
│   └── cloudinary/
│       ├── config.*
│       ├── upload.*
│       └── transformations.*
│
├── repositories/
│   ├── productRepository.*
│   └── categoryRepository.*
│
├── services/
│   ├── productService.*
│   └── categoryService.*
│
├── mappers/
│   ├── productMapper.*
│   └── categoryMapper.*
│
├── pages/
│   └── storefront/
│       ├── Catalog.*
│       └── Category.*
│
├── types/
│   ├── product.*
│   ├── category.*
│   ├── catalog.*
│   └── cloudinary.*
│
├── constants/
│   ├── catalog.*
│   └── categories.*
│
└── utils/
    ├── product.*
    └── pricing.*
```

> Exact filenames/extensions may follow the conventions already established by the project. The important constraint is maintaining the responsibility boundaries.

---

## Allowed to Modify

Only modify existing files directly related to:

```text
src/components/
src/hooks/
src/lib/
src/repositories/
src/services/
src/mappers/
src/pages/storefront/
src/types/
src/constants/
src/utils/
src/routes/
src/i18n/
src/index.css
```

Environment configuration may be updated only to add the required Cloudinary configuration.

---

## Project-Level Administrative Files

Do not modify unrelated administrative documents as part of implementation.

After successful review, the project manager may update:

```text
CURRENT_PHASE.md
REVIEW_LOG.md
DECISIONS.md
```

according to the project's established approval process.

---

# 2.3 Cloudinary Boundary

Cloudinary is responsible for:

```text
Image Upload
Image Delivery
Image Transformation
Image Resizing
Image Optimization
```

Firestore is responsible for:

```text
Product Metadata
Product Image URLs / References
```

The architecture must remain:

```text
Cloudinary
    ↓
Optimized Image URL
    ↓
Firestore Product Document
    ↓
Product Repository
    ↓
Product Mapper
    ↓
Catalog UI
```

Do not store image binary data inside Firestore.

---

# 2.4 Product Data Boundary

The repository layer owns Firestore communication.

The UI must not directly execute Firestore queries.

Preferred architecture:

```text
ProductGrid
    ↓
useProducts
    ↓
productService
    ↓
productRepository
    ↓
Firestore
```

The mapper layer converts Firestore documents into application-safe TypeScript models.

---

# 3. Product Model Requirements

The Phase 3 product model must support the catalog and future product-detail/admin requirements.

Conceptual structure:

```ts
Product {
  id: string;

  title: {
    ar: string;
    en: string;
  };

  slug?: string;

  description?: {
    ar: string;
    en: string;
  };

  categoryId: string;

  price: number;

  compareAtPrice?: number;

  images: ProductImage[];

  colors?: ProductOption[];

  sizes?: ProductOption[];

  specifications?: Record<string, string>;

  stock?: number;

  isActive: boolean;

  createdAt: Timestamp | Date;
  updatedAt: Timestamp | Date;
}
```

Image model:

```ts
ProductImage {
  url: string;
  publicId?: string;
  alt?: {
    ar?: string;
    en?: string;
  };
  width?: number;
  height?: number;
}
```

> The exact model may follow the existing project's established types. Do not duplicate fields unnecessarily.

---

# 4. Category Model Requirements

The category model must support the five approved store categories and future Admin management.

Required conceptual structure:

```ts
Category {
  id: string;

  name: {
    ar: string;
    en: string;
  };

  slug: string;

  image?: ProductImage;

  isActive: boolean;

  sortOrder?: number;

  createdAt: Timestamp | Date;
  updatedAt: Timestamp | Date;
}
```

The initial five categories are:

```text
1. Clothing
   الملابس

2. Personal Care
   العناية والشخصية

3. Home Supplies
   مستلزمات المنزل

4. Office Tools
   أدوات المكتب

5. General Accessories
   إكسسوارات عامة
```

Category display labels must come from the localization/data model rather than being hard-coded into the Product Grid.

---

# 5. Detailed Execution Steps

# Step 1 — Verify Phase 2 Foundation

Before implementation:

- Confirm Phase 2 is `[PASS]`.
- Confirm Auth Context works.
- Confirm routing works.
- Confirm AR/EN switching works.
- Confirm RTL/LTR works.
- Confirm Light/Dark themes work.
- Confirm shared Header/Footer work.
- Confirm Firebase configuration is centralized.

Do not restructure Phase 2 unless a blocking dependency is discovered.

---

# Step 2 — Review Existing Firebase Data Contracts

Inspect the existing Firestore configuration and determine:

- Product collection name.
- Category collection name.
- Timestamp conventions.
- Document ID conventions.
- Existing data shape.
- Existing indexes.
- Existing Security Rules.

If no product/category schema exists yet, establish the Phase 3 schema according to the models above.

Do not silently introduce incompatible duplicate schemas.

---

# Step 3 — Establish Product Repository

Create a repository responsible exclusively for product data access.

Required operations for this phase:

```text
getProducts()
getProductsByCategory()
getProductPage()
```

Where appropriate, support query parameters for:

```text
category
price range
sort
page/cursor
limit
```

The repository must not know about React components or UI state.

---

# Step 4 — Establish Category Repository

Create the category repository.

Required responsibilities:

- Fetch active categories.
- Fetch categories required by catalog filters.
- Map Firestore category documents.
- Handle missing/invalid documents safely.

The repository must not contain UI rendering logic.

---

# Step 5 — Implement Data Mappers

Create explicit transformation boundaries:

```text
Firestore Product
        ↓
productMapper
        ↓
Application Product
```

and:

```text
Firestore Category
        ↓
categoryMapper
        ↓
Application Category
```

Mappers should:

- Normalize timestamps.
- Validate required fields.
- Apply safe defaults where appropriate.
- Normalize image objects.
- Preserve AR/EN content.
- Prevent UI code from depending on raw Firestore document structure.

---

# Step 6 — Implement Product Service

The service layer coordinates repository calls and business-neutral catalog logic.

Responsibilities may include:

- Building catalog queries.
- Normalizing filters.
- Normalizing sort options.
- Validating price ranges.
- Coordinating pagination.
- Returning typed results.

Avoid putting presentation-specific logic in the service.

---

# Step 7 — Implement Cloudinary Configuration

Create a centralized Cloudinary configuration layer.

Required configuration should use environment variables.

Conceptual values:

```text
VITE_CLOUDINARY_CLOUD_NAME
VITE_CLOUDINARY_UPLOAD_PRESET
```

Do not expose private Cloudinary credentials in the frontend.

If an unsigned upload preset is used, configure Cloudinary restrictions appropriately.

---

# Step 8 — Implement Cloudinary Upload Service

Create a reusable image upload boundary.

Expected flow:

```text
File
 ↓
Validation
 ↓
Cloudinary Upload
 ↓
Upload Result
 ↓
Optimized URL / public ID
```

Validate at minimum:

- File type.
- File size.
- Upload response.
- Missing URL.
- Upload failure.

The service must return typed results rather than exposing raw HTTP responses to components.

---

# Step 9 — Implement Image Optimization

Create a utility for generating optimized Cloudinary URLs.

Support concepts such as:

```text
Width
Height
Crop
Quality
Format
```

Example conceptual transformations:

```text
Product Card
→ constrained width
→ automatic format
→ automatic quality
→ crop/fill where appropriate
```

```text
Product Listing
→ responsive dimensions
→ optimized delivery
```

Do not deliver unnecessarily large original images to small product cards.

---

# Step 10 — Create `OptimizedImage`

Create a reusable image component responsible for:

- Cloudinary URL transformation.
- Responsive sizing.
- Lazy loading where appropriate.
- Aspect ratio.
- Object-fit behavior.
- Alt text.
- Loading state.
- Error/fallback state.

The component must remain reusable outside the catalog.

---

# Step 11 — Define Catalog Filter State

Create a typed catalog filter model.

Conceptual structure:

```ts
CatalogFilters {
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  sort: CatalogSort;
}
```

Sort values:

```text
newest
price-asc
price-desc
```

Do not represent filters through arbitrary untyped strings.

---

# Step 12 — Implement Category Filtering

Provide a category filter capable of:

```text
All Products
Clothing
Personal Care
Home Supplies
Office Tools
General Accessories
```

Requirements:

- AR/EN labels.
- Correct category IDs.
- Active filter state.
- Reset option.
- Mobile-friendly controls.
- URL/query-state synchronization if supported by the existing routing architecture.

---

# Step 13 — Implement Price Filtering

Support:

```text
Minimum Price
Maximum Price
```

Requirements:

- Numeric validation.
- Prevent negative values.
- Prevent invalid ranges.
- Clear filter action.
- Responsive controls.
- Correct result updates.

If the product dataset uses a single currency, do not introduce currency-conversion logic in this phase.

---

# Step 14 — Implement Sorting

Required sorting:

```text
Newest
Price: Low → High
Price: High → Low
```

The sorting mechanism must be consistent between:

- Desktop.
- Mobile.
- Pagination/infinite-scroll states.

Do not sort only the currently visible page when the intended behavior requires server-side/query-level sorting.

---

# Step 15 — Implement Catalog Hook

Create:

```text
useProducts()
```

and, where appropriate:

```text
useCategories()
useCatalogFilters()
```

The hook/state layer should expose:

```text
products
loading
error
hasMore
filters
sort
setFilters
setSort
loadMore
refresh
```

The exact API may differ, but UI components should not need direct repository access.

---

# Step 16 — Build Product Card

Create a reusable Neutral Minimalist Product Card.

Required display:

- Product image.
- Product name.
- Localized title.
- Current price.
- Compare-at/original price when applicable.
- Discount indication when available.
- Category where appropriate.
- Availability indication when available.

The card should support future navigation to:

```text
/product/:productId
```

without implementing the complete Product Details page in Phase 3.

---

# Step 17 — Build Product Grid

Create the catalog grid.

Responsive target:

```text
Mobile
→ 2 columns where appropriate

Tablet
→ 2–3 columns

Desktop
→ 3–4 columns
```

The exact number may follow the approved design.

The grid must maintain:

- Consistent card dimensions.
- Consistent spacing.
- Image aspect ratio.
- Responsive behavior.
- RTL/LTR compatibility.

---

# Step 18 — Build Catalog Toolbar

Implement:

```text
Result Count
Filter Trigger
Sort Selector
```

Desktop may display filters alongside the grid.

Mobile should provide a compact filter/sort interaction.

Avoid overcrowding the toolbar.

---

# Step 19 — Build Filter UI

Desktop:

```text
Sidebar / Filter Panel
```

Mobile:

```text
Sheet / Drawer
```

Both must use the same filter state.

Required filters:

```text
Category
Price Range
```

Required sorting:

```text
Newest
Lowest Price
Highest Price
```

---

# Step 20 — Implement Pagination or Infinite Scroll

Support efficient product browsing.

The implementation may use either:

```text
Pagination
```

or:

```text
Infinite Scroll
```

based on the existing application architecture and dataset characteristics.

### Pagination Requirements

- Page size is controlled.
- Current page is tracked.
- Navigation state is clear.
- Filters reset pagination.
- Sorting resets pagination.

### Infinite Scroll Requirements

- Cursor-based loading where supported.
- Duplicate requests prevented.
- Loading indicator.
- `hasMore` handling.
- End-of-results state.
- Filters reset the loaded result set.
- Sorting resets the loaded result set.

Avoid loading the entire product collection into the browser.

---

# Step 21 — Handle Catalog States

Implement reusable states for:

### Initial Loading

Show product skeletons.

### Loading More

Show a smaller loading indicator without destroying existing products.

### Empty Results

Display a clear message such as:

```text
No products found.
```

and provide:

```text
Clear Filters
```

when filters caused the empty state.

### Error

Display a recoverable error state with:

```text
Try Again
```

where appropriate.

---

# Step 22 — Implement Localization

Every user-facing catalog string must support:

```text
AR
EN
```

Product titles and category names must select the active locale.

Conceptual:

```ts
product.title[locale];
```

Fallback behavior must be defined if a translation is missing.

Do not display:

```text
undefined
null
[object Object]
```

to users.

---

# Step 23 — RTL/LTR Validation

Verify:

```text
AR → RTL
EN → LTR
```

Check:

- Product card text.
- Filter sidebar.
- Filter controls.
- Sort controls.
- Price fields.
- Toolbar.
- Pagination.
- Drawer positioning.
- Icons.
- Badges.
- Product grid alignment.

Avoid directional assumptions in CSS.

---

# Step 24 — Theme Validation

Verify the catalog in:

```text
Light Mode
Dark Mode
```

Use the established palette and tokens.

The catalog must retain the intended Neutral Minimalist appearance:

```text
#FFFFFF
#F8FAFC
#0F172A
#000000
```

Avoid introducing unrelated colors unless required for semantic states such as errors or success.

---

# Step 25 — Responsive Validation

Test at minimum:

```text
Mobile
Tablet
Desktop
```

Validate:

- Product grid.
- Filter controls.
- Sort controls.
- Product image dimensions.
- Text wrapping.
- Toolbar.
- Pagination/infinite scrolling.
- Empty state.
- Error state.
- RTL/LTR.

There must be no unintended horizontal scrolling.

---

# Step 26 — Performance Pass

Verify:

- Product images are optimized.
- Images are lazy-loaded where appropriate.
- Firestore queries are limited.
- Pagination/cursors are used.
- Duplicate queries are avoided.
- Filter changes do not trigger unnecessary requests.
- Sorting does not reload unrelated application state.
- Existing products remain visible while loading additional pages.
- Large original Cloudinary assets are not unnecessarily delivered.

---

# Step 27 — Security Review

Verify:

- Firestore reads follow the intended access model.
- Product data cannot be modified through catalog APIs by unauthorized users.
- Cloudinary upload configuration does not expose private credentials.
- Product image URLs are treated as data, not executable content.
- Client-side filters are not considered security controls.

Admin mutation security remains part of later Admin implementation.

---

# Step 28 — Automated Validation

Run:

```text
npm run lint
npm run typecheck
npm run build
```

Use equivalent project commands if different.

Resolve all blocking errors before requesting Phase 3 review.

---

# 6. Definition of Done (DoD)

Phase 3 may be marked `[PASS]` only when all applicable requirements below are satisfied.

## Cloudinary

- [ ] Cloudinary configuration is centralized.
- [ ] Required environment variables are configured.
- [ ] Product image upload service exists.
- [ ] Upload validation exists.
- [ ] Upload errors are handled.
- [ ] Optimized Cloudinary URL generation exists.
- [ ] Image resizing is supported.
- [ ] Image quality/format optimization is supported.
- [ ] `OptimizedImage` or equivalent reusable abstraction exists.
- [ ] Original unnecessarily large images are not used by default for product cards.

---

## Product Data

- [ ] Product TypeScript model exists.
- [ ] Category TypeScript model exists.
- [ ] Product repository exists.
- [ ] Category repository exists.
- [ ] Product service exists.
- [ ] Category service exists where required.
- [ ] Product mapper exists.
- [ ] Category mapper exists.
- [ ] Raw Firestore structures are not leaked into presentation components.
- [ ] Product queries are typed.
- [ ] Category queries are typed.

---

## Product Catalog

- [ ] Catalog page exists.
- [ ] Products load from Firestore.
- [ ] Product Grid exists.
- [ ] Product Card exists.
- [ ] Product images render through optimized delivery.
- [ ] Product title is localized.
- [ ] Product pricing renders correctly.
- [ ] Discount/original price renders when available.
- [ ] Product card supports future product-detail navigation.
- [ ] Responsive grid works.

---

## Filtering

- [ ] Category filter works.
- [ ] Price minimum works.
- [ ] Price maximum works.
- [ ] Invalid price ranges are rejected/normalized.
- [ ] Filters can be cleared.
- [ ] Filter state is typed.
- [ ] Mobile filter UI works.
- [ ] Desktop filter UI works.
- [ ] Changing filters resets pagination/infinite-scroll state correctly.

---

## Sorting

- [ ] Newest sorting works.
- [ ] Lowest-price sorting works.
- [ ] Highest-price sorting works.
- [ ] Sorting is applied consistently to loaded results.
- [ ] Sorting resets pagination/infinite-scroll state correctly.
- [ ] Sorting works in AR/EN.
- [ ] Sorting works in RTL/LTR.

---

## Pagination / Infinite Scroll

- [ ] Product results are not loaded entirely at once.
- [ ] Page size/limit is controlled.
- [ ] Pagination or cursor mechanism works.
- [ ] Duplicate requests are prevented.
- [ ] Loading-more state exists.
- [ ] End-of-results state exists.
- [ ] Filters reset result pagination correctly.
- [ ] Sorting resets result pagination correctly.

---

## Localization & Direction

- [ ] AR catalog UI works.
- [ ] EN catalog UI works.
- [ ] Arabic product titles render correctly.
- [ ] English product titles render correctly.
- [ ] Category names are localized.
- [ ] RTL layout works.
- [ ] LTR layout works.
- [ ] No hard-coded directional assumptions remain in catalog components.

---

## Theme

- [ ] Light Mode works.
- [ ] Dark Mode works.
- [ ] Product cards are theme-compatible.
- [ ] Filters are theme-compatible.
- [ ] Catalog toolbar is theme-compatible.
- [ ] Empty/loading/error states are theme-compatible.
- [ ] Neutral Minimalist visual language is preserved.

---

## Quality

- [ ] Loading states exist.
- [ ] Empty states exist.
- [ ] Error states exist.
- [ ] Retry behavior exists where appropriate.
- [ ] Accessibility labels exist for interactive controls.
- [ ] Keyboard navigation works.
- [ ] No horizontal overflow exists.
- [ ] No unnecessary Phase 4/5 business logic was introduced.
- [ ] Lint passes.
- [ ] Typecheck passes.
- [ ] Production build passes.

---

# 7. Required Validation Matrix

## Product Data

| Scenario                   | Expected Result           |
| -------------------------- | ------------------------- |
| Firestore returns products | Products render           |
| Empty collection           | Empty state               |
| Firestore failure          | Error state + retry       |
| Invalid product document   | Mapper handles safely     |
| Missing optional image     | Image fallback            |
| Missing translation        | Defined fallback behavior |

---

## Filtering

| Scenario       | Expected Result             |
| -------------- | --------------------------- |
| All categories | All active products         |
| Clothing       | Clothing products only      |
| Personal Care  | Personal Care products only |
| Home Supplies  | Home products only          |
| Office Tools   | Office products only        |
| Accessories    | Accessories only            |
| Minimum price  | Products meet minimum       |
| Maximum price  | Products meet maximum       |
| Min > Max      | Invalid state prevented     |
| Clear filters  | Full catalog restored       |

---

## Sorting

| Scenario          | Expected Result             |
| ----------------- | --------------------------- |
| Newest            | Newest products first       |
| Low → High        | Lowest price first          |
| High → Low        | Highest price first         |
| Filter + Sort     | Both applied correctly      |
| Sort + Pagination | Ordering remains consistent |

---

## Localization

| Scenario    | Expected Result        |
| ----------- | ---------------------- |
| AR          | Arabic labels/content  |
| EN          | English labels/content |
| AR + Filter | RTL filter UI          |
| EN + Filter | LTR filter UI          |
| AR + Sort   | Arabic sort UI         |
| EN + Sort   | English sort UI        |

---

## Responsive

| Device      | Expected Result                  |
| ----------- | -------------------------------- |
| Mobile      | Compact toolbar + mobile filters |
| Tablet      | Responsive grid                  |
| Desktop     | Full catalog/filter layout       |
| Mobile RTL  | Correct drawer/direction         |
| Desktop RTL | Correct sidebar/direction        |

---

# 8. Known Risks

## Risk 1 — Firestore Query Limitations

### Problem

Firestore does not behave like a traditional SQL database for arbitrary multi-field filtering and sorting.

Combining category, price, and sorting requirements may require specific query/index strategies.

### Mitigation

- Design queries deliberately.
- Avoid fetching the complete collection and filtering in React.
- Add required Firestore indexes.
- Use query-compatible filter combinations.
- Document any unavoidable client-side transformation.

---

## Risk 2 — Incorrect Pagination

### Problem

Offset-based pagination can become inefficient or inconsistent when products are inserted/updated.

### Mitigation

Prefer Firestore cursor-based pagination where practical:

```text
limit()
startAfter()
```

Keep the cursor associated with the active query state.

---

## Risk 3 — Inconsistent Sorting Across Pages

### Problem

Sorting one page locally can result in globally incorrect ordering.

### Mitigation

Perform sorting at the Firestore/query layer whenever the data model and query constraints permit it.

---

## Risk 4 — Cloudinary Oversized Images

### Problem

Serving original images directly can increase bandwidth and reduce catalog performance.

### Mitigation

Use Cloudinary transformations for:

- Width.
- Height.
- Quality.
- Format.
- Responsive sizing.

---

## Risk 5 — Cloudinary Security

### Problem

Frontend applications cannot safely contain private Cloudinary API secrets.

### Mitigation

Use only appropriate client-side configuration such as an unsigned upload preset, with strict Cloudinary restrictions.

Private operations should use a trusted backend mechanism if required later.

---

## Risk 6 — Data Model Drift

### Problem

Firestore documents may evolve independently from TypeScript models.

### Mitigation

Use mappers as the explicit boundary between Firestore and application models.

Do not access arbitrary document properties throughout UI components.

---

## Risk 7 — Translation Fallbacks

### Problem

A product may contain an Arabic title but no English title, or vice versa.

### Mitigation

Define deterministic fallback behavior before rendering.

Never allow missing translations to render as raw `undefined`/`null`.

---

## Risk 8 — Filter State Complexity

### Problem

Category, price, sorting, pagination, and locale can create race conditions or stale result sets.

### Mitigation

Treat the complete catalog query as a derived state:

```text
Category
+
Price
+
Sort
+
Pagination Cursor
=
Catalog Query
```

Whenever the query-defining filters change, reset the pagination state.

---

## Risk 9 — Duplicate Infinite-Scroll Requests

### Problem

Rapid scrolling can trigger multiple simultaneous requests for the same page/cursor.

### Mitigation

Maintain an explicit loading guard and cursor state.

Do not request another page while the current page is being fetched.

---

## Risk 10 — Phase Scope Creep

### Problem

Product Catalog implementation can easily expand into Product Details, Cart, or Admin CRUD.

### Mitigation

Phase 3 ends at:

```text
Catalog Discovery
+
Cloudinary Image Infrastructure
+
Filtering
+
Sorting
+
Pagination / Infinite Scroll
```

Any deeper product management or purchasing functionality belongs to subsequent phases.

---

# 9. Phase Boundary

## Phase 3 WILL include

```text
Cloudinary
├── Configuration
├── Upload Service
├── Image Optimization
├── Resizing
└── Optimized Image Component

Data Layer
├── Product Repository
├── Category Repository
├── Product Service
├── Category Service
├── Product Mapper
└── Category Mapper

Catalog
├── Catalog Page
├── Product Grid
├── Product Card
├── Category Filter
├── Price Filter
├── Sort
├── Pagination / Infinite Scroll
├── Loading States
├── Empty States
└── Error States

Compatibility
├── AR / EN
├── RTL / LTR
├── Light / Dark
└── Responsive Mobile / Tablet / Desktop
```

---

## Phase 3 WILL NOT include

```text
Product Details Implementation
Cart
Checkout
Coupons
Orders
Order Tracking
Account Management
Admin Dashboard
Admin Product CRUD
Admin Category CRUD
Admin Coupon CRUD
Admin Order Management
Real Payment Gateway
```

---

# 10. Performance Acceptance Criteria

The catalog should follow these principles:

```text
DO:
- Query only required products.
- Use pagination/cursors.
- Optimize images through Cloudinary.
- Lazy-load appropriate images.
- Avoid duplicate requests.
- Cache/reuse category data where appropriate.
- Keep existing products visible during load-more operations.

DO NOT:
- Fetch the entire product collection by default.
- Download original high-resolution images for thumbnails.
- Filter thousands of products entirely in the browser.
- Trigger duplicate Firestore requests on every render.
- Reset the entire page unnecessarily when loading another page.
```

---

# 11. Security Acceptance Criteria

The following principles must remain enforced:

```text
Firestore
→ Catalog reads only expose intended product/category data.

Cloudinary
→ No private API secret is shipped to the browser.

Frontend
→ Filters and sorting are UX/query mechanisms, not security controls.

Admin mutations
→ Remain outside Phase 3 and must later be protected independently.
```

---

# 12. Phase Exit Criteria

Before requesting Phase 3 review, verify:

```text
[PASS] Product Model
[PASS] Category Model
[PASS] Product Repository
[PASS] Category Repository
[PASS] Product Mapper
[PASS] Category Mapper
[PASS] Product Service

[PASS] Cloudinary Configuration
[PASS] Cloudinary Upload Boundary
[PASS] Image Optimization
[PASS] Responsive Image Delivery

[PASS] Product Catalog Page
[PASS] Product Grid
[PASS] Product Card
[PASS] Category Filtering
[PASS] Price Filtering
[PASS] Newest Sorting
[PASS] Low-to-High Sorting
[PASS] High-to-Low Sorting

[PASS] Pagination / Infinite Scroll
[PASS] Loading States
[PASS] Empty States
[PASS] Error States

[PASS] AR
[PASS] EN
[PASS] RTL
[PASS] LTR
[PASS] Light Mode
[PASS] Dark Mode
[PASS] Mobile
[PASS] Tablet
[PASS] Desktop

[PASS] Lint
[PASS] Typecheck
[PASS] Production Build
[PASS] No Scope Leakage
```

---

# 13. Handoff to Phase 4

Once Phase 3 receives `[PASS]`, the project should provide Phase 4 with:

```text
Firestore-backed Product Catalog
        +
Typed Product/Category Models
        +
Repository/Data Access Layer
        +
Cloudinary Image Infrastructure
        +
Optimized Product Images
        +
Category Filtering
        +
Price Filtering
        +
Sorting
        +
Efficient Pagination/Infinite Scroll
        +
Responsive Product Grid
        +
AR/EN
        +
RTL/LTR
        +
Light/Dark
```

The next phase can then consume the product model and catalog infrastructure to implement the **Product Details, Cart, Coupons, Checkout, and Order flow** without rebuilding the catalog foundation.

---

# Phase 3 Status

```text
Current Status: IN PROGRESS

Previous Phase:
Phase 2 — Authentication & Modern Navigation Layout [PASS]

Current Phase:
Phase 3 — Product Catalog, Cloudinary Integration, & Filtering

Next Phase:
Phase 4 — Product Details, Cart, Checkout & Orders
```

```

```
