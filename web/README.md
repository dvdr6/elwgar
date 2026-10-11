# ELWGAR web

This folder = the Next.js site. **Deploy this folder to Vercel**
(Root Directory: `web`). Full instructions live one level up in
[`../README.md`](../README.md); Supabase setup in
[`../supabase/README.md`](../supabase/README.md).

```bash
npm install
cp .env.local.example .env.local   # optional — fill Supabase keys
npm run dev
```

Env vars (optional — without them the site uses placeholder portfolio +
demo-mode contact form):

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (server-only, used by `/api/contact`)
