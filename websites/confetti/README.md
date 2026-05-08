# tsParticles confetti website

tsParticles official confetti website

<https://confetti.js.org>

## Development

Install dependencies (uses pnpm):

```bash
pnpm install
```

Common commands:

- `pnpm run build` — generate `public/js/confetti-modes.js` from `confetti-modes.handlebars`
- `pnpm run deploy` — run the deploy script (`deploy.js`)
- `pnpm run lint` — run ESLint for `public/js`
- `pnpm run lint:fix` — run ESLint with `--fix` on `public/js`
- `pnpm run format` — run Prettier to format the repository

## CI

CI is now managed by the main `tsparticles` monorepo workflows.

## Privacy and consent

The website uses an integrated consent manager in `public/js/cookie-consent.js`.

- Visitors can reject all, accept all, or save granular choices for analytics and ads.
- Consent is stored locally and can be changed later via the footer "Cookie preferences" button.
- AdSense can run in non-personalized mode when ad consent is not granted.

### Analytics events

When analytics consent is granted, social share actions emit these events:

- `share_click` for social/email share buttons
- `share_copy_link` for the copy link button

Shared parameters:

- `method` (for example `x`, `linkedin`, `copy_link`)
- `page_path`
- `page_title`

## Contributing

Quick checklist for contributors:

- Fork the repo and create a feature branch: `git checkout -b feat/your-change`
- Install dependencies: `pnpm install`
- Before committing run:
  - `pnpm run format` to apply Prettier formatting
  - `pnpm run lint` to run ESLint (fix issues with `pnpm run lint:fix`)
- Commit changes with a clear message and push your branch
- Open a Pull Request describing the change and linking relevant issues

Notes:

- Generated files (e.g. `public/js/confetti-modes.js`) are ignored by ESLint and should not be edited directly; update the source `confetti-modes.handlebars` and run the build.
- Maintain code style by running `pnpm run format` and `pnpm run lint` locally.

## Node version

This project requires a Node.js LTS release. We recommend using `nvm` to manage Node versions and to install the current LTS:

```bash
nvm install --lts
nvm use --lts
```

After switching Node versions, run `pnpm install` to ensure dependencies are installed for the correct environment.
