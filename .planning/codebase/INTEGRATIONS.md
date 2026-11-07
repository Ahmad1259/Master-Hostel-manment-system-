# External Integrations

## Banking & Challans
- **Partner:** Meezan Bank Limited
- **IBAN:** PK72MEZN0001020108492011
- **Format:** 3-Voucher Interchange Format (Bank, Hostel Bursar, Resident Student)

## Messaging
- **WhatsApp API:** URL scheme encoding `https://wa.me/{cleanPhone}?text={encodedInvoice}`
- **Templates:** Pre-formatted bilingual Urdu and English invoice summaries

## Bot Shielding & Anti-Automation
- **Cloudflare Turnstile:** Non-interactive managed challenge simulation on auth, inquiries, and slip uploads
- **Honeypot:** Hidden field `company_title_trap` trapping automated form scrapers

## Analytics & Search
- **GA4:** Pluggable Google Analytics 4 Measurement ID
- **Search Console:** Automated verification token injection
