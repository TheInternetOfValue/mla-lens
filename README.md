# MLA Lens

Evidence-first constituency intelligence for tracking what an MLA is actually delivering on the ground.

MLA Lens is a Next.js App Router prototype that turns public signals into a structured homepage covering:

- news and public reporting
- citizen sentiment
- project and funds visibility
- MLA profile and trust context

The current app is UI-first, but the data layer is now prepared for future ingestion jobs and API-driven sources.

## What The App Does

The homepage presents a dark-theme constituency intelligence view with:

- an overall MLA score and summary
- scorecards for funds, development, and sentiment
- tabbed panels for money, news, citizens, map, and profile
- a pipeline-ready server data loader behind the homepage

The current live data is still fixture-backed, but the UI no longer depends directly on those fixtures.

## Tech Stack

- Next.js 16 App Router
- React 19
- Tailwind CSS 4
- shadcn-style UI primitives
- TypeScript

## Project Structure

Key paths:

- `src/app/page.tsx`
  The homepage route. It now loads homepage data on the server.
- `src/app/api/mla-lens/homepage/route.ts`
  Read-only aggregate API route for the homepage payload.
- `src/components/home`
  Reusable homepage sections and UI composition.
- `src/data/mla-lens`
  Fixture data and fallback mock inputs.
- `src/lib/mla-lens/homepage`
  Shared homepage contract, server loader, and view-model builder.
- `src/lib/mla-lens/pipelines`
  Domain-level pipeline adapters for future real data sources.

## Current Data Flow

The current homepage flow is:

1. `src/app/page.tsx` calls `getHomepageData()`
2. `src/lib/mla-lens/homepage/get-homepage-data.ts` loads domain data from pipeline adapters
3. each pipeline adapter attempts a future real source and falls back to fixtures when unavailable
4. `build-homepage-view-model.ts` shapes the final `MLALensHomepageData` payload
5. the homepage components render that payload without importing fixture data directly

This keeps the UI stable while making room for future ingestion jobs.

## Homepage API

The app exposes one aggregate route for the homepage:

- `GET /api/mla-lens/homepage`

This route returns the same `MLALensHomepageData` payload used by the page itself. It is intended as the first stable contract for future API consumers and internal tooling.

## Fixtures And Fallbacks

`src/data/mla-lens` should be treated as fixture and fallback data, not the long-term production source of truth.

For now:

- fixtures keep the UI stable
- pipeline adapters own fallback behavior locally
- real scrapers and ingestion jobs can be added later without redesigning the homepage

## Product Evolution Log

Ongoing product-facing changes are tracked in `docs/product-evolution.md`.

## Development

Install dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Verification

Lint the project:

```bash
npm run lint
```

Create a production build:

```bash
npm run build
```

## Near-Term Roadmap

- replace fixture-backed pipeline adapters with real data sources
- add ingestion jobs for news, citizen sentiment, projects/funds, and MLA profile enrichment
- expand the homepage API contract only after real consumers need more granular endpoints
- preserve the current UI layout while increasing evidence quality and freshness
