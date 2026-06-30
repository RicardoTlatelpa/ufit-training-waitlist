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

## Project structure

- `src/theme/` — Design tokens, typography, and fonts ported from the UFIT mobile app
- `src/components/ui/` — Reusable UI primitives (Button, Badge, Card, etc.)
- `src/components/sections/` — Landing page content sections
- `src/components/WaitlistForm.tsx` — Email signup form (UI only; API integration pending)

## Waitlist signup

The waitlist form validates email client-side and shows a success state. Backend integration is not yet wired — see the `TODO` in `WaitlistForm.tsx`.
