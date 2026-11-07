# System Requirements: Commercial Hostel ERP & Showcase

## Phase 1: Core Framework, White-Label Engine & Design System
- [x] Single root configuration `hostel.config.ts` controlling Identity, Geo, Banking, Billing Rules, Amenities, and Analytics.
- [x] Zero-AI-Vibe design system: Warm ivory `#FAF9F6`, charcoal `#18181B`, Antique Brass `#B58544`, zinc borders `#E4E4E7`.
- [x] Zero emojis in UI; precision 1.25px stroke `lucide-react` icons.
- [x] Maximum 4 font size tiers with Playfair Display, Inter, and Noto Sans Arabic.
- [x] Bilingual real-time i18n (English / Urdu) with dynamic `dir="rtl"` layout toggling.

## Phase 2: Public Showcase & Interactive Booking (Module 8)
- [x] Minimalist 3D CSS door swing entrance (`DoorTransition`).
- [x] Interactive 2D bed layout and floor plan cadastre (`FloorPlanPreview`).
- [x] 360° virtual room walkthrough with spatial hotspot annotations (`PanoramaViewer`).
- [x] Honeypot-protected booking inquiry form with Turnstile bot defense.

## Phase 3: Inventory & Student Biodata (Modules 1 & 2)
- [x] Dynamic Floor and Room Inventory Builder with Single/Double/Triple/Dormitory types.
- [x] Real-time visual bed occupancy status: Vacant, Partially Filled, Fully Occupied.
- [x] Student biodata registry with verified CNIC, guardian contact, and institutional affiliation.
- [x] Dynamic room reassignments and transfer logs.
- [x] Instant CSV export of resident rolls.

## Phase 4: Fiscal Directorate, Fees & Banking Challans (Module 3)
- [x] Automated monthly fee cycle generation.
- [x] Full and partial fee remittances with automated arrears rollover.
- [x] Discretionary discounts and surcharges with documented reason logging.
- [x] Official print-ready 3-part bank deposit challan (Bank, Hostel Bursar, Resident).
- [x] Direct pre-formatted bilingual WhatsApp billing dispatch.

## Phase 5: Personnel, Attendance & Payroll (Module 4)
- [x] Staff roster (Warden, Cook, Cleaner, Guard, Accountant) with base honorarium.
- [x] Daily duty attendance journal with shift in/out logging.
- [x] Salary disbursement with performance bonuses and advance deductions.
- [x] Official printable personnel honorarium vouchers.

## Phase 6: Expenditures, Ancillary Revenue & Reports (Modules 5 & 6)
- [x] Categorized operational expense ledger (LESCO power, SNGPL gas, groceries, leased fiber).
- [x] Ancillary revenue tracking (provisions tuck shop, excess laundry, luggage vault lockers).
- [x] Comprehensive Statement of Operations (P&L) with audited surplus calculation.
- [x] Managing Partner Equity Ledger (share %, capital invested, cumulative drawings).
- [x] Instant financial CSV export and print format.

## Phase 7: Short-Stay Guests, Laundry & RBAC (Modules 7 & Security)
- [x] Transient guest registry with daily charges and check-in/out timestamps.
- [x] Official Ingress Clearance Gate Pass generation.
- [x] Resident 30-piece monthly garment care quota and cycle status tracking.
- [x] Granular Staff RBAC permission matrix (`canManageFees`, `canManageRooms`, `canManageExpenses`, `canManageStaff`).

## Phase 8: 20-Point Technical SEO & Search Engine Suite
- [x] SSR Next.js App Router.
- [x] Dynamic `robots.ts` and `sitemap.ts`.
- [x] 301 redirects engine in `next.config.mjs`.
- [x] Custom 404 page (`not-found.tsx`).
- [x] Schema.org JSON-LD markup (`Hostel`, `Organization`, `FAQPage`).
- [x] Statutory compliance `/privacy` and `/terms` routes.
- [x] PWA standalone manifest, service worker caching, and vector monogram icons.
