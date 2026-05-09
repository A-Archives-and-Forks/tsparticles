# @tsparticles/website

New docs-first website for tsParticles, built with VitePress and published to GitHub Pages.

## Goals

- make onboarding clear in a few minutes
- keep docs navigation simple and release-oriented
- centralize links to demos, options, migration notes, and package guidance

## Tech stack

- [VitePress](https://vitepress.dev/) for static site generation
- GitHub Pages deployment via GitHub Actions

## Project structure

- `docs/` - all website content
- `docs/.vitepress/config.ts` - site config, nav, sidebar, search, metadata
- `docs/.vitepress/theme/` - visual theme overrides

## Run locally

```bash
pnpm install
pnpm run dev
```

## Tracking and consent

The website uses an integrated consent manager in the VitePress theme.

- Visitors can reject all, accept all, or save granular choices for analytics and ads.
- Consent is stored locally and can be changed later through the "Privacy settings" button.
- AdSense can run in non-personalized mode when ad consent is not granted.

Related environment variables:

- `VITE_GA_MEASUREMENT_ID`
- `VITE_GOOGLE_ADSENSE_CLIENT_ID`
- `VITE_ADSENSE_NON_PERSONALIZED_ON_REJECT` (`true` by default)

### Analytics events

When analytics consent is granted, social share actions emit these events:

- `share_click` for social/email share buttons
- `share_copy_link` for the copy link button

Shared parameters:

- `method` (for example `x`, `linkedin`, `copy_link`)
- `page_path`
- `page_title`

## Build

```bash
pnpm run docs:build
pnpm run docs:preview
```

## Deploy to GitHub Pages

Deployment is now managed from the main `tsparticles` monorepo CI/CD setup.
