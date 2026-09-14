# Architecture Decisions

Record of decisions that are binding for later phases. Each entry states the decision, why it was taken, and what it commits the project to. Decisions are not revisited casually — a reversal requires a new entry that supersedes the old one.

---

## ADR-001 — Official Modern Minimalist Color Palette

**Date:** 2026-09-14  
**Status:** Accepted  
**Phase:** 1

### Decision

The design system is built on exactly four base colors. No additional brand hues are introduced.

| Token       | Hex       | Role                                                           |
| ----------- | --------- | -------------------------------------------------------------- |
| White       | `#FFFFFF` | Light-mode background, dark-mode primary action                |
| Off White   | `#F8FAFC` | Light-mode muted surfaces, dark-mode foreground                |
| Charcoal    | `#0F172A` | Light-mode muted text, dark-mode muted surfaces                |
| Matte Black | `#000000` | Light-mode foreground and primary action, dark-mode background |

These are declared once in `src/index.css` as `--white`, `--off-white`, `--charcoal`, `--matte-black`. Semantic tokens (`--background`, `--foreground`, `--muted`, `--muted-foreground`, `--primary`, `--primary-foreground`, `--ring`) reference the base tokens; Light and Dark differ only in which base each semantic token points at.

### Rationale

- A four-color palette is what makes the design read as minimalist; it removes per-component color decisions.
- Declaring base values once and deriving semantic tokens means a palette change is a four-line edit, not a find-and-replace across components.
- Light/Dark is a token remap rather than a parallel stylesheet, so the two modes cannot drift apart.

### Consequences

- Components must consume semantic tokens (`var(--primary)`, `var(--muted)`), never raw hex. This is a review criterion, per §2.3 of `CURRENT_PHASE.md`.
- Accent colors for status and feedback (error, success, warning) are **not** covered by this decision. They are deferred to Phase 2 and require a new ADR — they should not be improvised inside components.
- `--border` (`#e4e4e4` light / `#303030` dark) is a derived neutral, not a fifth brand color. It exists because neither Off White nor Charcoal gives an acceptable separator contrast in both modes.
- `#F8FAFC` and `#0F172A` carry a slight cool cast rather than being pure greys. This is intentional and approved; it is the reason the palette reads as considered rather than flat.

### History

An earlier implementation used an independently chosen neutral ramp (`#f5f5f5`, `#2b2b2b`, `#121212`). This was rejected in review cycle 2 and corrected to the values above. See `REVIEW_LOG.md`.

---

## ADR-002 — Cloudinary for Image Storage Instead of Firebase Storage

**Date:** 2026-09-14  
**Status:** Accepted  
**Phase:** 1

### Decision

All product and category imagery is uploaded to, stored in, and delivered from **Cloudinary**. **Firebase Storage is not used.** Firestore stores only the resulting Cloudinary URLs and image metadata — never binary data.

The media boundary lives in `src/lib/cloudinary/` (`config.ts`, `upload.ts`) and is kept independent of product CRUD logic.

```
Cloudinary → Image Upload → Image URL → Firestore Product Document
```

### Rationale

- **Transformations are the deciding factor.** Product imagery needs per-context resizing, format negotiation and quality tuning. Cloudinary does this at the URL level; Firebase Storage would require building and hosting a transformation pipeline.
- **Delivery.** Cloudinary serves through a CDN with automatic format selection (WebP/AVIF) by default. Firebase Storage serves original bytes.
- **Separation of concerns.** Media and application data stay in separate systems with separate failure modes, so an image problem cannot degrade Firestore reads.
- Using both Firebase Storage and Cloudinary would mean two media paths and two sets of security rules for no gain.

### Consequences

- `VITE_FIREBASE_STORAGE_BUCKET` remains in `.env.example` and in `appEnv.firebase` because it is part of the standard Firebase app config object. Its presence does **not** mean Firebase Storage is in use, and no Storage SDK is imported.
- Firebase Security Rules cover Firestore only. Media access control is Cloudinary's concern and must be configured there.
- Uploads currently use an **unsigned upload preset** (`VITE_CLOUDINARY_UPLOAD_PRESET`), which means the browser can upload without authenticating. This is acceptable for Phase 1 infrastructure but is not acceptable in production — signed uploads or a server-side signing endpoint are required before launch. Tracked in `KNOWN_ISSUES.md` and scheduled for the Phase 5/6 hardening work.
- Deleting a product does not delete its Cloudinary assets. Asset lifecycle must be coordinated explicitly or images will be orphaned — flagged as a risk in `APP_ROADMAP.md`.
- Cloudinary free-tier transformation and bandwidth limits apply and should be checked before production rollout.

## ADR-003 — Client-Side Role Immutability and User Deletion Protection

**Date:** 2026-09-14  
**Status:** Accepted  
**Phase:** 2

### Decision

Client-side Firestore operations must never write, modify, add, or remove the
`role` field in `users/{userId}` documents. Client-side deletion of user
documents is also prohibited unconditionally, including for authenticated
administrators. Role assignment and user document deletion are performed only
through the Firebase Admin SDK or Firebase Console.

### Rationale

- A browser-controlled admin flag is not a trusted authorization boundary.
- Keeping role changes outside client rules prevents privilege escalation and
  protects the role field from accidental profile updates.
- Preventing client deletion avoids irreversible account-data loss from the
  storefront and keeps account lifecycle operations in a trusted environment.

### Consequences

- Client-created profiles omit `role`; application reads fall back to the
  least-privilege `user` role until trusted administration assigns a role.
- `firestore.rules` enforces role immutability and contains `allow delete: if false;`
  for the `users` collection.
- Any future admin role-management or account-deletion workflow must use a
  trusted server/Admin SDK boundary and must not weaken these client rules.
