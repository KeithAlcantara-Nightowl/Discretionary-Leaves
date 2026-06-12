# NightOwl FAQ — Versioned Onboarding Docs

A Next.js App Router project that serves dynamically versioned FAQ pages with automatic 60-day expiration, deployed on Vercel.

## How It Works

- Pages are served at `/v/<slug>` where the slug is an enciphered timestamp (e.g. `/v/rpwwkqxzxf`)
- **Cipher:** Unix epoch seconds **+ 8675309** (secret offset), then each digit replaced by a letter:

  | digit | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
  |-------|---|---|---|---|---|---|---|---|---|---|
  | letter| k | r | d | x | m | q | z | p | w | f |

- To outsiders it's an opaque ID; the app decodes it, applies a 60-day expiry, and 404s anything expired or implausible (decoded date before 2024 or in the future)
- The `CURRENT_VERSION` env variable controls which slug is considered the "latest"

## Generating a Slug

### From Airtable (formula field)

Given a date field `{Version Date}` (or use `NOW()`):

```
SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(
SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(
  "" & (DATETIME_DIFF({Version Date}, DATETIME_PARSE("1970-01-01", "YYYY-MM-DD"), "seconds") + 8675309),
"0","k"),"1","r"),"2","d"),"3","x"),"4","m"),
"5","q"),"6","z"),"7","p"),"8","w"),"9","f")
```

Full URL variant:

```
"https://discretionary-leaves.vercel.app/v/" & <formula above>
```

### From the CLI

```bash
node scripts/new-slug.js                      # slug for right now
node scripts/new-slug.js 2026-06-12          # slug for a specific date
node scripts/new-slug.js --decode rpwwkqxzxf # decode an existing slug
```

## Getting Started

```bash
npm install
npm run dev
```

Then visit: `http://localhost:3000/v/<slug>` (generate one with the script or Airtable formula above)

## Deployment (Vercel)

1. Push this repo to GitHub
2. Import into Vercel
3. Add environment variable: `CURRENT_VERSION=<slug>`
4. Deploy

## Updating the FAQ (Every ~30 Days)

1. Edit the `faqItems` array in `src/app/v/[slug]/page.tsx`
2. Generate a fresh slug (Airtable formula or `node scripts/new-slug.js`)
3. In Vercel Dashboard → Project Settings → Environment Variables, update `CURRENT_VERSION` to the new slug
4. Push to main:
```bash
git add .
git commit -m "deploy: new version slug"
git push origin main
```
5. Share the new link: `your-domain.vercel.app/v/<slug>`

## Changing the Secret Offset

If the offset ever leaks, pick a new number and change it in **three** places so they stay in sync:
`src/app/v/[slug]/page.tsx`, `middleware.ts`, `scripts/new-slug.js` — plus the `+ 8675309` in the Airtable formula.
