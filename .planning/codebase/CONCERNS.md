# Technical Concerns & Future Hardening

1. **Remote Cloud Database:**
   - Currently operating on local SQLite (`dev.db`). For multi-tenant production deployments on Vercel, migration to cloud PostgreSQL (e.g. Neon or Supabase) is recommended.
2. **Turnstile Production Keys:**
   - Currently using mock Turnstile keys for local development; production deployment requires setting `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY` in production secrets.
3. **Session Secret:**
   - Ensure a cryptographically secure 64-character random string is supplied for `NEXTAUTH_SECRET` upon live production deployment.
