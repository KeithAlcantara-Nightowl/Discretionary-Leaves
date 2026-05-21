# NightOwl FAQ — Versioned Onboarding Docs

A Next.js App Router project that serves dynamically versioned FAQ pages with automatic 60-day expiration, deployed on Vercel.

## How It Works

- Pages are served at `/v/YYYY-MM-DD` (e.g. `/v/2026-05-21`)
- Middleware checks if the date in the URL is older than 60 days — if so, it renders an "expired" page
- The `CURRENT_VERSION` env variable controls which slug is considered the "latest"

## Getting Started

```bash
npm install
npm run dev
```

Then visit: `http://localhost:3000/v/2026-05-21`

## Deployment (Vercel)

1. Push this repo to GitHub
2. Import into Vercel
3. Add environment variable: `CURRENT_VERSION=2026-05-21`
4. Deploy

## Updating the FAQ (Every ~30 Days)

1. Edit the `faqItems` array in `src/app/v/[slug]/page.tsx`
2. In Vercel Dashboard → Project Settings → Environment Variables, update `CURRENT_VERSION` to today's date
3. Push to main:
```bash
git add .
git commit -m "deploy: update to YYYY-MM-DD"
git push origin main
```
4. Share the new link: `your-domain.vercel.app/v/YYYY-MM-DD`
