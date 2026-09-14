# Known Issues

Open defects and accepted debt. **Blocking** issues prevent the next phase from starting; **non-blocking** items are tracked but do not gate progress.

---

## Status as of 2026-09-14 (Phase 1 → Phase 2 handoff)

> **Blocking issues: 0**  
> **Phase 2 is clear to begin.**

All findings raised during the Phase 1 technical reviews have been resolved and re-verified. See `REVIEW_LOG.md` for the full history.

### Verification

Run on 2026-09-14 against the approved palette, using a forced full rebuild rather than the incremental cache:

| Gate | Command | Result |
| --- | --- | --- |
| Type safety (strict) | `tsc -b --force` | PASS — no errors |
| Lint | `npm run lint` | PASS — no errors, no warnings |
| Production build | `npm run build` | PASS — 34 modules, 335 ms |

### Closed during Phase 1

| # | Issue | Closed |
| --- | --- | --- |
| 1 | `strict` not declared in `tsconfig.app.json` / `tsconfig.node.json` | 2026-09-14 |
| 2 | Vite template CSS residue in `src/index.css` (purple accents, `--border` override, `color-scheme`, template layout rules) | 2026-09-14 |
| 3 | Unreferenced template stylesheet `src/App.css` | 2026-09-14 |
| 4 | `as unknown as T` coercion in the Firestore converter | 2026-09-14 |
| 5 | No timestamp conversion convention between Firestore and domain models | 2026-09-14 |
| 6 | Design tokens did not match the approved hex values | 2026-09-14 |

---

## Open — Non-blocking

These are tracked deliberately. None of them affects Phase 2, and none should be treated as a defect against Phase 1.

### NB-01 — Cloudinary uploads use an unsigned preset

**Severity:** Medium — production blocker, not a Phase 2 blocker  
**Location:** [src/lib/cloudinary/upload.ts](src/lib/cloudinary/upload.ts)

`uploadImage` posts to Cloudinary with an unsigned upload preset, so any client holding the public preset name can upload to the account. This is the expected shape for a Phase 1 infrastructure boundary and is fine for development.

It must not ship to production. Before launch, move to signed uploads or a server-side signing endpoint. Recorded as a consequence of ADR-002 in `DECISIONS.md`; scheduled for the Phase 5/6 hardening work.

### NB-02 — Unreferenced Vite template assets

**Severity:** Low — cosmetic  
**Location:** [src/assets/](src/assets/)

`hero.png`, `react.svg` and `vite.svg` are left over from the Vite template and are imported by nothing. They are not CSS, so they fell outside the scope of the Phase 1 styling cleanup. They add no runtime weight — Vite only emits referenced assets — so this is repository tidiness, not a build concern. Safe to delete whenever convenient.

### NB-03 — Per-collection Firestore parsers not yet written

**Severity:** Low — expected Phase 2/3 work, not a defect  
**Location:** [src/lib/firebase/firestore.ts](src/lib/firebase/firestore.ts)

`createDocumentConverter` now requires a `DocumentParser<T>` argument, which is what removed the unsafe cast. The parsers themselves are written per collection when the repository layer lands. This is by design — Phase 1 establishes the boundary, not the CRUD (§2.11 of `CURRENT_PHASE.md` explicitly excludes complete CRUD).

### NB-04 — Status and feedback colors not defined

**Severity:** Low — design gap to close in Phase 2  
**Location:** [src/index.css](src/index.css)

ADR-001 fixes the four base brand colors but deliberately does not cover error, success and warning states. Phase 2 needs these before building forms and the toast system. They require a new ADR rather than ad-hoc values inside components.

---

## Security Note (carried forward)

Route guards in React are UX protection, not a security boundary. Firestore Security Rules are **not** yet written — they are scheduled for a later phase per `APP_ROADMAP.md` Risk 8. This is a known, planned gap, not a regression: no real data is exposed while the application remains in placeholder state. It becomes blocking before any production deployment.
