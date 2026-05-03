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


## Build

```bash
pnpm run docs:build
pnpm run docs:preview
```

## Deploy to GitHub Pages

Deployment is automatic on push to `main` via `website/.github/workflows/deploy.yml`, which builds and publishes `docs/.vitepress/dist` with GitHub Pages Actions.
