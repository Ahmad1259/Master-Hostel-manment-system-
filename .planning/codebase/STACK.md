# Tech Stack Documentation

## Core Framework
- Next.js 15.1.7 (React 19, App Router)
- TypeScript 5.7.3
- Tailwind CSS 3.4.17
- PostCSS 8.4.49 & Autoprefixer 10.4.20

## Database & ORM
- Prisma ORM 5.22.0
- SQLite (`file:./dev.db`) for zero-dependency standalone local execution
- PostgreSQL connection-string compatible via `DATABASE_URL`

## UI & Icons
- Lucide React 1.70.0 (monochrome precision vector icons, stroke 1.25px)
- clsx 2.1.1 & tailwind-merge 3.0.2

## PWA & Web Standards
- Web App Manifest (`/manifest.webmanifest`)
- Service Worker (`/sw.js`)
- Google Fonts: Playfair Display, Inter, Noto Sans Arabic
