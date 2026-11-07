# Codebase Directory Structure

```
master-hostel-app/
├── hostel.config.ts                     # Single root white-label rebranding engine
├── prisma/
│   ├── schema.prisma                    # Core 15-model Prisma database schema
│   └── seed.js                          # Commercial seed script for initial records
├── public/
│   ├── icons/                           # Monochrome SVG monograms & PWA icons
│   ├── manifest.webmanifest             # PWA web manifest
│   └── sw.js                            # Offline service worker
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/route.ts            # Rate-limited auth endpoint
│   │   │   ├── inquiries/route.ts       # Honeypot-shielded inquiries handler
│   │   │   └── upload/route.ts          # Magic-byte validated slip upload
│   │   ├── dashboard/
│   │   │   ├── expenses/page.tsx        # Module 5: Outflows & Ancillary Revenue
│   │   │   ├── fees/page.tsx            # Module 3: Fees, Dues, Arrears & Slips
│   │   │   ├── inventory/page.tsx       # Module 1: Floor & Room Inventory
│   │   │   ├── layout.tsx               # Enterprise ERP Shell & Sidebar
│   │   │   ├── page.tsx                 # Executive Telemetrics Overview
│   │   │   ├── permissions/page.tsx     # Staff RBAC Permission Matrix
│   │   │   ├── reports/page.tsx         # Module 6: P&L & Partner Equity
│   │   │   ├── settings/page.tsx        # White-Label Config Inspector
│   │   │   ├── staff/page.tsx           # Module 4: Staff Payroll & Attendance
│   │   │   ├── students/page.tsx        # Module 2: Resident Biodata Registry
│   │   │   └── visitors-laundry/page.tsx# Module 7: Guests & Laundry Quotas
│   │   ├── globals.css                  # Global Tailwind, RTL, and print styling
│   │   ├── layout.tsx                   # Root Layout with JSON-LD Schema & GA4
│   │   ├── not-found.tsx                # Custom branded 404 page
│   │   ├── page.tsx                     # Module 8: Public Showcase Landing Page
│   │   ├── privacy/page.tsx             # Legal Data Protection Charter
│   │   ├── robots.ts                    # Dynamic robots.txt
│   │   ├── sitemap.ts                   # Dynamic sitemap.xml
│   │   └── terms/page.tsx               # Terms of Academic Residency
│   ├── components/
│   │   ├── bank-challan-modal.tsx       # Official 3-part bank deposit challan
│   │   ├── branch-switcher.tsx          # Multi-property dropdown switcher
│   │   ├── door-transition.tsx          # 3D CSS door swing entrance
│   │   ├── floor-plan-preview.tsx       # Interactive 2D bed layout explorer
│   │   ├── language-switcher.tsx        # English / Urdu bilingual toggle
│   │   ├── panorama-viewer.tsx          # 360° virtual room walkthrough
│   │   ├── pwa-install-prompt.tsx       # Standalone PWA install banner
│   │   ├── turnstile-widget.tsx         # Cloudflare Turnstile bot shield
│   │   └── whatsapp-slip-modal.tsx      # Bilingual WhatsApp billing dispatcher
│   └── lib/
│       ├── db.ts                        # Prisma Client singleton
│       ├── i18n.ts                      # English and Urdu translation dictionary
│       ├── mock-data.ts                 # High-fidelity realistic commercial data
│       ├── rate-limiter.ts              # Sliding-window rate limiting engine
│       ├── store.tsx                    # React Context application state provider
│       └── utils.ts                     # Formatting helpers (Currency, CNIC, Phone)
└── tailwind.config.ts                   # Design system tokens and spacing rhythm
```
