# ELWGAR — HTML, CSS and JavaScript

The original TSX website converted to static HTML, compiled plain CSS and vanilla JavaScript. No React, Next.js, TypeScript, Tailwind runtime, external CDN or build dependencies are required. Original logos and locally hosted Archivo / IBM Plex Mono fonts are included.

## Run

Requires Node.js 20+ for the optional API server:

```sh
cd web
npm start
```

Open http://localhost:3000. `PORT` overrides the port; the server binds to `0.0.0.0`. `npm run dev` restarts the server when edited. `npm run build` checks JavaScript syntax; no compilation is needed.

You can also serve this folder with any static web host or open `index.html` directly. On static-only hosting the page, language switch, links and consent controls work, but contact submission and visit logging need the API endpoints below. A failed submission shows the original error message and direct email link, never a false success.

## Files

- `index.html`: complete default Polish page; readable even without JavaScript.
- `styles.css`: ordinary CSS preserving the original utility rules, breakpoints, hover effects, animation and reduced-motion settings. Edit this file directly; no Tailwind tooling is needed.
- `app.js`: language persistence, contact form states, cookie consent and consent-gated visit logging.
- `translations.js`: original Polish/English page markup and dictionaries. When changing page content, update the default markup in `index.html` and corresponding language markup here.
- `brand/`, `fonts/`, `icon.svg`: original branding and self-hosted fonts with licenses.
- `server.js`: optional zero-dependency static/API server.

## Contact and visits

The server preserves `/api/contact` validation, honeypot, demo response and `/api/visit` explicit-consent requirement. Visits are attempted once per session after acceptance; failed requests can retry on a later page load. Declining does not send a visit request.

Set `SUPABASE_URL` (or the original `NEXT_PUBLIC_SUPABASE_URL`) and `SUPABASE_SERVICE_ROLE_KEY` in the server environment to insert into the existing `contact_messages` and `visits` tables. Never put the service role key into browser JavaScript. Without these variables, the APIs return `{ "ok": true, "demo": true }`, matching the original unconfigured demo behavior; **no messages or visits are saved**.

This conversion includes the original six fallback portfolio projects, contact email and placeholder social links. Live Supabase portfolio/settings fetching and the old Next.js `/api/status` diagnostic are not part of the static version. Edit the HTML and translations to publish real projects and social links. A static host must provide its own form/analytics backend if you do not run `server.js`.

The server only exposes an explicit allowlist of public assets, not environment files or server source. Configure deployment-specific rate limiting / spam controls at your hosting layer for a public contact endpoint.

## Verification

```sh
npm run build
node --test tests/server.test.js
```
