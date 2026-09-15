# Review Log

Chronological record of technical reviews. One entry per review cycle, newest phase last.

Outcome values: `FAIL` (findings must be fixed and re-submitted) / `PASS` (phase accepted).

---

## Phase 1 — Setup & Project Initialization

**Final Outcome:** PASS  
**Approved On:** 2026-09-14  
**Review Cycles:** 3 (2 × FAIL → 1 × PASS)

---

### Cycle 1 — 2026-09-14 — FAIL

Three findings raised by the technical reviewer.

**1. TypeScript strictness not declared**

`strict` was never set in `tsconfig.app.json` or `tsconfig.node.json`, so the project compiled under loose defaults despite §2.15 of `CURRENT_PHASE.md` requiring TypeScript strictness. The build passing was not evidence of type safety.

_Resolution:_ `"strict": true` added explicitly to both configs. Verified with a forced full rebuild (`tsc -b --force`) rather than the incremental build, to confirm existing source genuinely compiles under strict rather than reusing stale build info. Zero errors.

**2. Vite template styling residue in `src/index.css`**

The stylesheet contained a second `:root` block inherited from the default Vite template: purple accent colors (`#aa3bff` light / `#c084fc` dark), a `--border` override that silently replaced the design-token border, `color-scheme: light dark`, a `prefers-color-scheme` block competing with the app's own theme toggle, and template layout rules (`#root`, `#next-steps`, `.ticks`, heading and `code` styling). This violated §2.3 and §2.5 — design tokens were not the single source of truth.

_Resolution:_ The entire template block was removed and the palette reduced to the four approved base tokens with semantic tokens referencing them. The explicit `color-scheme: light` / `html.dark { color-scheme: dark }` pair was deliberately **kept** — it is project code, not template residue, and is what makes native scrollbars and form controls follow the app's theme. The template's `light dark` value would have let the OS override the in-app toggle.

`src/App.css` was also deleted: it was the remainder of the same template stylesheet, keyed to the now-deleted `--accent` variables, and imported by nothing.

**3. Unsafe type coercion in the Firestore data layer**

`createDocumentConverter` in `src/lib/firebase/firestore.ts` returned `({ id, ...snapshot.data() } as unknown) as T`. The double cast disabled all type checking on reads, so every domain model returned from Firestore was an unverified assertion. §2.11 additionally required explicit timestamp-handling conventions, which did not exist.

_Resolution:_ The cast was removed entirely. `createDocumentConverter<T>` now accepts a per-collection `DocumentParser<T>`; `fromFirestore` returns `T` because the parser constructs it, not because a cast silenced the compiler. Added `timestampToIsoString` (`Timestamp` / `Date` / epoch number / string → ISO 8601, returning `undefined` for absent or unparsable input so optional fields such as `createdAt?` stay optional instead of carrying `Invalid Date`) and its write-side counterpart `isoStringToTimestamp`.

_Accepted trade-off:_ the converter can no longer be called as `createDocumentConverter<Product>()` with no argument — each collection must supply its mapping once. That is the intended cost: the parser is where untyped snapshot data is actually validated.

---

### Cycle 2 — 2026-09-14 — FAIL

**1. Design token hex codes did not match the approved palette**

The rewritten `src/index.css` used an independently chosen neutral ramp (`#f5f5f5`, `#2b2b2b`, `#121212`) instead of the Modern Minimalist values specified in §2.3 of `CURRENT_PHASE.md`. The structure was correct but the values were not the approved brand colors.

_Resolution:_ Base tokens corrected to the official palette — White `#FFFFFF`, Off White `#F8FAFC`, Charcoal `#0F172A`, Matte Black `#000000`. Recorded in `DECISIONS.md` so the values are traceable to a decision rather than to a stylesheet.

---

### Cycle 3 — 2026-09-14 — PASS

All findings from cycles 1 and 2 verified as resolved. Phase 1 accepted at 100%.

**Verification run:** `npm run typecheck && npm run lint && npm run build` — all three pass.

| Gate                               | Result                                      |
| ---------------------------------- | ------------------------------------------- |
| `npm run typecheck` (strict)       | PASS — no errors                            |
| `npm run lint`                     | PASS — no errors, no warnings               |
| `npm run build`                    | PASS — 34 modules, built in 344 ms          |
| Built CSS free of template residue | PASS — verified against `dist/assets/*.css` |

No open blocking issues remain. See `KNOWN_ISSUES.md`. Phase 2 may begin.

## Phase 2 — Authentication & Modern Navigation Layout

**Final Outcome:** PASS  
**Approved On:** 2026-09-14  
**Review Cycles:** Final approval

Phase 2 was accepted after completing and verifying the authentication foundation,
the responsive modern navigation layout, and the shared application shell.

**Accepted areas:**

- `AuthContext` with persistent auth state, loading protection, profile
  synchronization, role resolution, normalized errors, and race-condition
  protection.
- Announcement bar, responsive header, five-category navigation, mobile Sheet,
  account actions, language/theme controls, cart badge, and responsive footer.
- Firestore Security Rules that prevent clients, including admins, from writing
  or changing `role`, and prevent all client-side deletion of `users` documents.
  Role administration and account deletion remain exclusive to Firebase Admin
  SDK or Firebase Console.

**Verification run:** `npm run typecheck && npm run lint && npm run build` — all pass.

## Phase 3 — Product Catalog, Cloudinary Integration, & Filtering

**Final Outcome:** PASS  
**Approved On:** 2026-09-15  
**Review Cycles:** Final approval

Phase 3 was accepted after completing and verifying the Firestore-backed product
catalog, optimized Cloudinary image delivery, and the responsive discovery UI.

**Accepted areas:**

- Typed product/category models, Firestore repositories, mappers, services, and
  catalog page/grid/card boundaries.
- Cloudinary upload validation, optimized transformation URLs, and reusable
  image rendering.
- Category and price filtering, newest/price sorting, URL-synchronized filter
  state, loading/empty/error states, and cursor pagination.
- Composite-query handling for Firestore range constraints and the hybrid newest
  query cursor fix using `lastMatchedDoc`, preventing filtered products from
  being skipped between pages.

**Verification run:** `npm run typecheck && npm run lint && npm run build` — all pass.
