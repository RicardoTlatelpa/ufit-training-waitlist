# UFIT Training — Waitlist

Beta waitlist landing page for UFIT Training, built with Next.js and styled using the UFIT design system tokens.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Deploy to Netlify

This project is configured for [Netlify](https://www.netlify.com/) via [`netlify.toml`](./netlify.toml).

### Option 1: Connect GitHub (recommended)

1. Push this repo to GitHub.
2. In the [Netlify dashboard](https://app.netlify.com/), choose **Add new site → Import an existing project**.
3. Select the repository. Netlify auto-detects Next.js and uses:
   - **Build command:** `npm run build`
   - **Plugin:** `@netlify/plugin-nextjs` (from `netlify.toml`)
4. Deploy. Netlify sets `URL` automatically for Open Graph metadata.

Optional: set `NEXT_PUBLIC_SITE_URL` in **Site settings → Environment variables** if you use a custom domain (e.g. `https://ufittraining.com`).

### Option 2: Netlify CLI

```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

## Project structure

- `src/theme/` — Design tokens, typography, and fonts ported from the UFIT mobile app
- `src/components/ui/` — Reusable UI primitives (Button, Badge, Card, etc.)
- `src/components/sections/` — Landing page content sections
- `src/components/WaitlistForm.tsx` — Email signup form (UI only; API integration pending)

## Waitlist signup

The waitlist form validates email client-side and shows a success state. Backend integration is not yet wired — see the `TODO` in `WaitlistForm.tsx`.
