# The Grand Pavilion &amp; Scholars Residency ERP
### Commercial White-Label Hostel ERP &amp; Architectural Showcase Platform

[![Next.js](https://img.shields.io/badge/Next.js-15.1.7-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-5.22-teal?style=flat&logo=prisma)](https://www.prisma.io/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![PWA](https://img.shields.io/badge/PWA-Ready-orange?style=flat)](https://web.dev/progressive-web-apps/)

---

## 1. Zero-AI-Vibe &amp; Humanized Craft Manifesto
The application adheres strictly to institutional design principles:
- **Zero Emojis in UI:** Emojis are strictly barred in navigation, tables, buttons, cards, headings, and status pills. All iconography uses precision, monochrome, 1.25px-stroke SVG vector icons (`lucide-react`).
- **Strict 8px/4px Layout Rhythm:** Mathematical layout spacing tokens (`p-3`, `p-4`, `p-6`, `p-8`, `gap-4`, `gap-6`). Zero arbitrary values.
- **Bespoke Editorial Typography:**
  - Display Headers: High-end architectural serif (`Playfair Display`) with subtle `tracking-tight` kerning.
  - Body &amp; Interface: Geometric sans (`Inter`) with `leading-relaxed` line heights.
  - Urdu Interface: High-legibility Nastaleeq/Arabic script (`Noto Sans Arabic`).
  - Total Font Scale: Strictly maximum 4 operational font tiers (`caption`, `body`, `subhead`, `title`).
- **Palette &amp; Materiality:**
  - Background Canvas: Warm architectural ivory/stone (`#FAF9F6`).
  - Typography: Deep charcoal slate (`#18181B`).
  - Structural Rules: Ultra-fine 1px borders in neutral zinc (`#E4E4E7`).
  - Primary Accent: Antique Brass (`#B58544`). Zero neon or purple gradients.
- **Humanized Operational Microcopy:** Professional operational copy throughout ("Confirm Bed Allocation", "Download Bank Fee Challan", "Issue Official Gate Pass").

---

## 2. System Architecture &amp; Duality

```
┌────────────────────────────────────────────────────────────────────────┐
│                   GRAND PAVILION PLATFORM CORE                         │
├───────────────────────────────────┬────────────────────────────────────┤
│   1. PUBLIC SHOWCASE (DEMO)       │   2. COMMERCIAL ERP CORE           │
├───────────────────────────────────┼────────────────────────────────────┤
│ • 3D CSS Door Swing Entrance      │ • Multi-Property Branch Switcher   │
│ • Interactive 2D Blueprint Beds   │ • Floor & Chamber Inventory        │
│ • 360° Architectural Walkthrough  │ • Student Biodata Registry & CNIC  │
│ • Honeypot-Guarded Inquiries      │ • Automated Fees, Dues & Arrears   │
│ • Local Institution Proximity     │ • 3-Part Bank Challan Generator    │
│ • Turnstile Bot Defense           │ • Direct WhatsApp Billing Dispatch │
│ • PWA Offline Capabilities        │ • Staff Payroll & Duty Attendance  │
│ • Bilingual English & Urdu (RTL)  │ • Expense & Ancillary Revenue      │
│                                   │ • Real-Time P&L & Partner Equity   │
│                                   │ • Short-Stay Guests & Gate Passes  │
│                                   │ • Laundry Quota Management         │
│                                   │ • Granular Staff Permissions (RBAC)│
└───────────────────────────────────┴────────────────────────────────────┘
```

---

## 3. White-Label Rebranding Engine (`hostel.config.ts`)
A single root file controls:
- **Identity:** Hostel Name, Tagline, Monogram, Contact, Emergency Hotline, Email.
- **Local Geo Data:** Address, City, Neighborhood, Nearby Campuses (LUMS, FC College, FAST, PU), GPS Coordinates.
- **Banking Setup:** Bank Name (Meezan Bank Limited), Account Title, Account Number, IBAN for fee challans.
- **Billing Rules:** Monthly statutory due day, late surcharge percentage (5%), standard security deposit, monthly laundry quota.
- **Analytics:** GA4 Measurement ID (`G-XXXXXXXX`), Search Console Verification Token.

---

## 4. Complete ERP Module Specifications

### Module 1: Floor &amp; Room Inventory Builder
- Add/manage Floors and Chambers dynamically.
- Room configuration: Number, Floor, Type (Single, Double, Triple, Dormitory), Bed Capacity, Monthly Rate.
- Visual Occupancy Status: Vacant / Available, Partially Filled, Fully Occupied.
- Real-time Bed Allocation and Deallocation.

### Module 2: Student &amp; Member Records (Full Biodata)
- Profile: Legal Full Name, Father's Name, CNIC / B-Form, Phone, Guardian Emergency Phone, Institution/Company, Admission Date.
- Search &amp; Filter: Query by Name/CNIC/Room; filter by Status and Architectural Tier.
- Room Transfer Log: Live Chamber reassignments with automatic tariff adjustments.
- Instant CSV / Excel Export of verified student rolls.

### Module 3: Monthly Fees, Dues, Arrears &amp; WhatsApp Slips
- Auto-generates monthly fee records on a user-chosen day each month.
- Supports Full and Partial payments. Remaining balance rolls over as "Unpaid Dues / Arrears".
- Discounts &amp; Surcharges with mandatory reason logging.
- Multi-Channel Slips:
  - **Official 3-Part Bank Deposit Challan:** Print-ready format (Bank Copy, Hostel Bursar Copy, Resident Student Voucher) with Meezan Bank IBAN and barcode.
  - **Instant WhatsApp Billing Dispatch:** Direct pre-encoded bilingual invoice text with one-click dispatch to student or guardian.

### Module 4: Staff Management, Salaries &amp; Attendance
- Staff profiles: Name, Role (Cook, Cleaner, Warden, Guard, Accountant, Manager), Contact, Monthly Base Salary.
- Payroll: Full/partial salary disbursement with adjustments for bonuses or deductions.
- Printable salary pay slips with official bursar authorization lines.
- Daily duty attendance tracking (Present, Absent, Leave) with shift check-in/out timestamps.

### Module 5: Expense &amp; Auxiliary Income Engine
- Categorized Expenses: Rent, Electricity (LESCO), Gas (SNGPL), Water (WASA/RO), Groceries, Repairs, Internet (Fiber lines).
- Expense Ledgers: Category totals, Paid vs Unpaid status, and printable ledger sheets.
- Auxiliary Income: Tuck shop sales, Excess laundry care, Luggage vault lockers, Vending.

### Module 6: Financial Reports, Exports &amp; Partner Equity Ledger
- P&amp;L Real-time Dashboard: Monthly Income - Expenses = Net Operating Surplus / Margin.
- Comprehensive Statement of Operations with FBR audit standards.
- Managing Partner Ledger: Tracks multiple business partners with equity share %, capital invested, profit distributed, and drawings.
- Instant CSV export and print format.

### Module 7: Visitors &amp; Laundry Tracking
- Short-Stay Visitors: Record temporary guests with check-in/check-out timestamps, CNIC, and per-day billing charges.
- Official Ingress Clearance Gate Pass generation.
- Laundry Allowance: Track monthly quotas (30 pieces/month) and logging of laundry drops and clean pickups.

### Module 8: Public Showcase &amp; Interactive Booking (Demo)
- Minimalist Gate Entrance: Smooth CSS 3D door swing transition (`rotateY`) revealing the showcase home view.
- 2D Floor Plan Demo: Interactive preview of room layouts and bed slots.
- 360° / 3D Walkthrough: Spatial interactive room orbit with fixture hotspots.
- Online Booking Inquiry: Clean public form with Turnstile bot defense and honeypot protection.

---

## 5. 20-Point Technical SEO &amp; Search Engine Suite
1. **Server-Side Rendering (SSR):** Next.js App Router.
2. **Dynamic `robots.txt` (`src/app/robots.ts`):** Disallows private dashboard routes.
3. **Dynamic `sitemap.xml` (`src/app/sitemap.ts`):** Automated index of public pages.
4. **Unique Title Tags:** Formatted for local search (`[Hostel Name] | Student Hostel in [Area], [City]`).
5. **Meta Descriptions:** 150-160 characters highlighting USP, mess, backup power, and nearby colleges.
6. **Single `<h1>` per page:** Semantic heading structure.
7. **Canonical URLs:** Self-referential via `metadataBase`.
8. **Open Graph &amp; Twitter Cards:** Dynamic social preview graphics.
9. **Custom 404 Page:** Branded error recovery page (`src/app/not-found.tsx`).
10. **301 Redirects Engine:** Centralized redirect rules in `next.config.mjs`.
11. **Descriptive `alt` Tags:** Zero blank alt tags on all imagery.
12. **Next-Gen WebP/AVIF:** Native Next.js image optimization.
13. **Aggressive Lazy Loading:** Priority for above-the-fold hero; lazy for all others.
14. **JSON-LD Schema Markup:** `Hostel` / `LodgingBusiness`, `Organization`, `FAQPage`.
15. **Breadcrumbs:** Visual breadcrumbs with `BreadcrumbList` schema.
16. **Internal Linking Graph:** Strategic cross-links between sections.
17. **Google Analytics 4 (GA4):** Integrated via pluggable GA script with measurement ID from `hostel.config.ts`.
18. **Search Console Token:** Pluggable in `hostel.config.ts`.
19. **Legal Pages:** Compliant `/privacy` and `/terms` routes.
20. **Working Inquiry Form:** Honeypot-protected Server Action.

---

## 6. Strict Security Standard
- **Zero-Exposure Secrets:** Database credentials, JWT secrets, and API keys reside exclusively in server `.env.local`. Client code is strictly barred from importing private variables.
- **Bot Defense:** Cloudflare Turnstile integrated on Login, Inquiries, and Slip Upload.
- **Sliding-Window Rate Limiter:** Auth endpoints (max 5 OTPs/hour, max 10 failed logins/15 mins per IP, max 5 inquiries/10 mins).
- **Slip Upload Verification:** Double-validated: Client-side `< 200 KB` interceptor + Server-side MIME &amp; magic-byte inspection (allow `image/jpeg`, `image/png`, `image/webp` only).

---

## 7. Getting Started

### Prerequisites
- Node.js 18+ (tested on Node 24)
- npm 9+

### Installation &amp; Launch
```bash
# 1. Clone repository
git clone https://github.com/Ahmad1259/Master-Hostel-manment-system-.git
cd Master-Hostel-manment-system-

# 2. Install dependencies
npm install

# 3. Synchronize database schema & seed initial commercial data
npx prisma db push
node prisma/seed.js

# 4. Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the Public Architectural Showcase, or [http://localhost:3000/dashboard](http://localhost:3000/dashboard) to access the Commercial ERP Console.
