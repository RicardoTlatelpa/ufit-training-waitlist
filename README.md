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

### Custom domain (Namecheap)

Use this if your domain is registered at Namecheap and your site is already deployed on Netlify.

#### 1. Add the domain in Netlify

1. Open your site in the [Netlify dashboard](https://app.netlify.com/).
2. Go to **Domain management → Add a domain**.
3. Enter your domain (e.g. `ufittraining.com`) and add it.
4. Also add `www.ufittraining.com` if you want the www version.
5. Netlify will show the DNS records you need. Keep this page open.

#### 2. Configure DNS in Namecheap

1. Log in to [Namecheap](https://www.namecheap.com/) → **Domain List** → **Manage** next to your domain.
2. Set **Nameservers** to **Namecheap BasicDNS** (not Custom DNS).
3. Open the **Advanced DNS** tab.
4. Remove any conflicting records (old A records, parking page CNAMEs, etc.).
5. Add these records:

| Type | Host | Value | TTL |
|------|------|-------|-----|
| A Record | `@` | `75.2.60.5` | Automatic |
| CNAME Record | `www` | `your-site-name.netlify.app` | Automatic |

Replace `your-site-name.netlify.app` with your actual Netlify site URL (shown in Netlify → Domain management).

#### 3. Set environment variable in Netlify

In **Site settings → Environment variables**, add:

- **Key:** `NEXT_PUBLIC_SITE_URL`
- **Value:** `https://yourdomain.com` (your real domain, with `https://`)

Redeploy after adding this so Open Graph metadata uses the correct URL.

#### 4. Enable HTTPS and set primary domain

1. In Netlify **Domain management**, wait for DNS to verify (can take a few minutes to 48 hours).
2. Netlify will automatically provision a free SSL certificate once DNS propagates.
3. Set your preferred primary domain (apex or www) under **Domain management → Options**.

#### 5. Redirect www ↔ apex (recommended)

In Netlify **Domain management**, enable **Redirect www to apex** (or apex to www) so both URLs work consistently.

#### Troubleshooting

- **SSL not provisioning:** Ensure only one A record exists for `@` pointing to `75.2.60.5`. Remove duplicate A records.
- **DNS not updating:** Use [dnschecker.org](https://dnschecker.org/) to confirm `@` resolves to `75.2.60.5` globally.
- **Don't mix DNS providers:** Use either Namecheap DNS *or* Netlify DNS, not both. See [Netlify external DNS docs](https://docs.netlify.com/manage/domains/configure-domains/configure-external-dns/).

### Option 2: Netlify CLI

```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

## Waitlist signup (double opt-in)

The waitlist uses **email verification** before a signup is confirmed:

1. User submits their email on the landing page.
2. They receive a confirmation email via [Resend](https://resend.com/).
3. Clicking the link verifies the signup and stores it in Supabase.
4. A welcome email is sent after verification.

### Setup

#### 1. Create the Supabase tables

In your Supabase project, open **SQL Editor** and run, in order:

1. [`supabase/migrations/001_waitlist_signups.sql`](./supabase/migrations/001_waitlist_signups.sql)
2. [`supabase/migrations/002_waitlist_abuse_protection.sql`](./supabase/migrations/002_waitlist_abuse_protection.sql)

This creates the `waitlist_signups` table (with RLS) and abuse-protection columns/tables for rate limiting and verification resend cooldowns.

#### 2. Configure email (pick one)

You **do not need a UFIT inbox**. Emails are sent by a provider on your behalf.

##### Option A — Gmail SMTP (fastest to launch)

Use your existing Gmail account (e.g. `ricardotlatelpadev@gmail.com`):

1. Turn on [2-Step Verification](https://myaccount.google.com/security) for the Google account.
2. Create an [App Password](https://myaccount.google.com/apppasswords) for "Mail".
3. Set these Netlify env vars:

| Variable | Value |
|----------|-------|
| `SMTP_USER` | `ricardotlatelpadev@gmail.com` |
| `SMTP_PASS` | the 16-character app password |
| `WAITLIST_FROM_EMAIL` | `UFIT Training <ricardotlatelpadev@gmail.com>` |

Optional: `SMTP_HOST=smtp.gmail.com`, `SMTP_PORT=587` (defaults).

##### Option B — Resend + your waitlist domain (recommended later)

Use the domain that already points to your Netlify waitlist site. You only add DNS records in Namecheap — **no mailbox required**.

1. Create a free [Resend](https://resend.com/) account.
2. Add your waitlist domain in Resend and copy the DNS records it gives you into Namecheap **Advanced DNS**.
3. Create a Resend API key.
4. Set:

| Variable | Value |
|----------|-------|
| `RESEND_API_KEY` | `re_...` |
| `WAITLIST_FROM_EMAIL` | `UFIT Training <noreply@your-waitlist-domain.com>` |

Resend takes priority if both Resend and SMTP are configured.

#### 3. Environment variables

Copy [`.env.example`](./.env.example) to `.env.local` for local dev, and add the same variables in **Netlify → Site settings → Environment variables**:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Your live waitlist URL, e.g. `https://your-waitlist-domain.com` |
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server only) |
| `SMTP_USER` + `SMTP_PASS` | Gmail app password (Option A) |
| `RESEND_API_KEY` | Resend API key (Option B) |
| `WAITLIST_FROM_EMAIL` | Display name + sender address |
| `TURNSTILE_SITE_KEY` | Cloudflare Turnstile site key (public — use a plain Netlify env var, not secret scope) |
| `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile secret key (server only) |

Redeploy after adding env vars on Netlify.

### Spam and abuse protection

The waitlist uses layered defenses:

| Layer | What it does |
|-------|----------------|
| **Cloudflare Turnstile** | Bot CAPTCHA on signup (required in production) |
| **Honeypot field** | Silently discards naive bots that fill hidden fields |
| **Rate limits** | 5 signups/IP/hour, 3 signups/email/hour, 30 email checks/IP/hour (stored in Supabase) |
| **Disposable email block** | Rejects known throwaway email domains |
| **Verification resend cooldown** | Won't resend confirmation emails more than once per 15 minutes |
| **Double opt-in** | Only verified signups count |

**Turnstile setup:**

1. [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Turnstile** → **Add site**
2. Hostnames: your production domain (e.g. `ufittraining.com`) and `localhost`
3. Add `TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY` to Netlify env vars
4. Redeploy

In local dev without Turnstile keys, verification is skipped automatically (do not deploy to production without keys).

### Sending future beta emails

Verified signups are stored in Supabase (`verified_at IS NOT NULL`). You can:

- Export verified emails from the Supabase dashboard
- Send beta invite campaigns through Resend using that list
- Build an admin tool later if needed

### Routes

| Route | Purpose |
|-------|---------|
| `POST /api/waitlist` | Start signup, send verification email |
| `GET /api/waitlist/check?email=...` | Check email availability (rate limited) |
| `GET /api/waitlist/verify?token=...` | Confirm email |
| `/waitlist/confirmed` | Success page after verification |
| `/waitlist/verify-error` | Invalid/expired link page |

## Project structure

- `src/theme/` — Design tokens, typography, and fonts ported from the UFIT mobile app
- `src/components/ui/` — Reusable UI primitives (Button, Badge, Card, etc.)
- `src/components/sections/` — Landing page content sections
- `src/components/WaitlistForm.tsx` — Email signup form with verification flow
- `src/app/api/waitlist/` — Subscribe and verify API routes
- `supabase/migrations/` — Database schema for waitlist signups
