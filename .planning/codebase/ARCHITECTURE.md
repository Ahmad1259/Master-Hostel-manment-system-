# System Architecture

## Duality Design
1. **Public Showcase (`src/app/page.tsx`):**
   - High-end architectural landing view.
   - Interactive CSS 3D Portico gate transition (`DoorTransition`).
   - 2D Cadastral Floor Plan viewer (`FloorPlanPreview`).
   - 360° Panorama spatial inspection (`PanoramaViewer`).
   - Honeypot-shielded reservation inquiry action with Turnstile bot defense.

2. **Commercial ERP Core (`src/app/dashboard/`):**
   - Central state store (`src/lib/store.tsx`) providing responsive in-memory and client-side reactive state across all 8 modules.
   - Top-navigation multi-property branch switcher (`BranchSwitcher`) managing Gulberg Main Campus, DHA Phase 5, and Islamabad Margalla Vista.
   - Bilingual language controller (`LanguageSwitcher`) switching English & Urdu with RTL CSS flow.
   - Granular RBAC module access matrix.

## Security Architecture
- Server-side sliding-window rate limiters (`src/lib/rate-limiter.ts`).
- Dual-layer slip upload validation: client-side < 200 KB + server-side MIME and binary magic-byte inspection.
- Zero-exposure secrets strictly confined to server environment files.
