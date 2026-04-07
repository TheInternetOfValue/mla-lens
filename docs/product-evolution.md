# Product Evolution Log

This file tracks product-facing evolution for MLA Lens so the repo keeps a durable narrative of what changed, why it changed, and what still needs follow-up.

## Update Rule

After each product-affecting session, append or revise the latest entry before closing the work.

Include:

- date
- what changed
- why it changed
- product impact
- open follow-ups if any

## 2026-04-07

### Homepage Refactor

- Refactored the homepage from a single prototype component into reusable App Router-friendly sections under `src/components/home`.
- Moved fixture data into `src/data/mla-lens` with typed domain files for overview, news, citizen sentiment, projects, map pins, profile, and summary cards.
- Preserved the existing dark theme, layout, and overall product logic while making the codebase easier to evolve.

Product impact:

- The UI remained visually consistent.
- The homepage became easier to connect to future data pipelines without redesigning the surface.

### Pipeline-Ready Server Data Layer

- Added a server-side homepage loader in `src/lib/mla-lens/homepage/get-homepage-data.ts`.
- Introduced a stable homepage view-model contract in `src/lib/mla-lens/homepage/types.ts`.
- Added domain pipeline adapters under `src/lib/mla-lens/pipelines`.
- Added the aggregate route `GET /api/mla-lens/homepage`.
- Rewired the homepage so components consume injected data instead of importing fixture data directly.

Product impact:

- The homepage now has a stable backend-facing contract.
- Future ingestion jobs and API-backed data sources can be introduced without changing the UI layout.

### Live RSS News Pipeline

- Replaced the fixture-only news pipeline with a live Google News RSS-based server pipeline.
- Added deterministic normalization, category tagging, sentiment tagging, and constituency relevance scoring.
- Added fixture fallback with server-side logging when live fetches fail or produce no useful items.
- Configured timed server revalidation so the homepage can stay statically built while refreshing live news periodically.

Product impact:

- The news section can now render live news items when available.
- The homepage API route returns live news in the same contract used by the UI.

### News Quality Pass

- Tightened feed filtering to reduce non-civic and commercial noise.
- Added exclusion rules for vehicle-price spam, law-and-order noise, violent school incidents, and other low-signal locality matches.
- Added stronger governance and constituency relevance gating so district-level stories need clearer civic-delivery context to be included.

Product impact:

- The news feed is better aligned with constituency intelligence and MLA-delivery tracking.
- Remaining relevance issues are now mostly rule-tuning problems, not architectural blockers.

Open follow-ups:

- Improve news-source quality further with stronger publisher/source heuristics.
- Consider a recency bias strategy if older but relevant civic stories begin crowding out fresher items.
- Introduce persistent ingestion storage later if the feed needs ranking history or dedupe across runs.

### Pilot Scope Made Explicit

- Added a single config-driven active-scope source for the current live constituency.
- Updated the homepage to explicitly state that MLA Lens is starting with Palayamkottai and tracking the current MLA.
- Added a compact pilot-scope info block near the top of the homepage instead of implying multi-constituency support.
- Replaced the remaining CTA-style hero controls with passive rollout/status pills so the top-of-page UX no longer suggests a live constituency switch.

Product impact:

- The product now communicates its current rollout honestly.
- Users can clearly see the live constituency, the current MLA being tracked, and that more constituencies are planned.

### First Insight Layer

- Added a deterministic homepage insight layer that derives human-readable product insights from existing homepage data.
- Introduced a shared `Insight` type and `deriveHomepageInsights()` under `src/lib/mla-lens/homepage/insights.ts`.
- Integrated insights into the homepage view model and rendered them near the top of the page in a compact strip.
- Upgraded the insight cards to include an explicit implication layer so each insight now explains why the signal matters.

Product impact:

- MLA Lens now surfaces an explicit meaning layer above the raw panels without fetching new data.
- Insights respond to changes in news volume, sentiment mix, coverage distribution, missing civic categories, and tracked project progress.
- The insight layer is now more interpretation-driven, making the output more actionable without introducing AI-based inference.

### First Trend Layer

- Added a lightweight trend layer that compares current homepage signals against a prior snapshot.
- Introduced deterministic trend signals for civic news volume, negative sentiment share, category concentration, and visible project completion.
- Added a small trend strip near the insight strip without changing the overall page structure.

Product impact:

- MLA Lens now shows direction of change, not just current state.
- The trend layer is isolated and easy to swap later for persisted snapshot history without changing the homepage layout.

### Data Provenance And Source-Link Layer

- Added a shared provenance model to distinguish live, derived, tentative, and fixture-backed data across the homepage view model.
- Upgraded the live news pipeline so news items now carry source labels, source links, published timestamps, and explicit live or fixture provenance.
- Added section-level provenance badges for news, projects, citizen sentiment, and profile sections.
- Updated news cards so headlines and sources are clickable when live links exist.
- Updated project cards to show explicit trust status while keeping the current layout and styling intact.

Product impact:

- Users can now tell which homepage signals are live-sourced, derived from current signals, tentative proxies, or static fixtures.
- The trust layer is clearer without requiring a homepage redesign.
- News is now more auditable because users can click through to source coverage directly from the feed.
