# Migration from particles.js

If you are migrating from `particles.js`, use this order:

1. replace old script/package with `@tsparticles/engine` + bundle (`@tsparticles/slim`)
2. move your old config and map unsupported fields incrementally
3. test interactions (hover/click/links) one by one

## Canonical migration notes

- Official migration guide source: [`tsparticles/markdown/pjsMigration.md`](https://github.com/tsparticles/tsparticles/blob/main/markdown/pjsMigration.md)
- Legacy compatibility examples are available in the demo folders.

## Compatibility package

If you need a bridge layer while migrating legacy configs:

- npm: <https://www.npmjs.com/package/@tsparticles/particles.js>
- jsDelivr: <https://www.jsdelivr.com/package/npm/@tsparticles/particles.js>

Further reading:

- Migration article: <https://dev.to/matteobruni/migrating-from-particles-js-to-tsparticles-2a6m>
- 5 reasons to switch: <https://dev.to/matteobruni/5-reasons-to-use-tsparticles-and-not-particles-js-1gbe>

## Common mapping tips

- Old `particlesJS(...)` init becomes `tsParticles.load({ id, options })`.
- Many legacy values still have direct equivalents under `particles`, `interactivity`, and `detectRetina`.
- New plugin-driven architecture means some advanced features require explicit package loading.

## Migration checklist for production

- Verify visual parity in desktop and mobile.
- Verify CPU/GPU impact on low-end devices.
- Verify no option keys are ignored silently.
- Pin exact package versions before release week.
