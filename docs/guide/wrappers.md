# Wrappers

This page collects official `tsParticles` wrappers from the monorepo and links to their source docs.

Source folder: <https://github.com/tsparticles/tsparticles/tree/main/wrappers>

## Common integration flow

No matter the framework:

1. install wrapper + `@tsparticles/engine`
2. load features once (`@tsparticles/slim`, `@tsparticles/all`, or custom plugins)
3. render the wrapper component with options

## Official wrappers (alphabetical)

Ordering rule for this section:

- alphabetical by package name
- exceptions are explicitly called out in mapping notes (for example WordPress requires a full WordPress installation)

- `@tsparticles/angular`: Angular component wrapper (`<ngx-particles />`)  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/angular#readme>
- `@tsparticles/astro`: Astro component wrapper  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/astro#readme>
- `@tsparticles/ember`: Ember wrapper  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/ember#readme>
- `@tsparticles/inferno`: Inferno component wrapper  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/inferno#readme>
- `@tsparticles/jquery`: jQuery plugin wrapper  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/jquery#readme>
- `@tsparticles/lit`: Lit component package  
  Source: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/lit>
- `@tsparticles/nextjs`: Next.js wrapper around `@tsparticles/react`  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/nextjs#readme>
- `@tsparticles/nuxt2`: Nuxt 2 module (client-side registration)  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/nuxt2#readme>
- `@tsparticles/nuxt3`: Nuxt 3 module (client-side registration)  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/nuxt3#readme>
- `@tsparticles/nuxt4`: Nuxt 4 module (client-side registration)  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/nuxt4#readme>
- `@tsparticles/preact`: Preact component wrapper  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/preact#readme>
- `@tsparticles/qwik`: Qwik component wrapper  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/qwik#readme>
- `@tsparticles/react`: React component wrapper  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/react#readme>
- `@tsparticles/riot`: Riot wrapper  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/riot#readme>
- `@tsparticles/solid`: Solid component wrapper  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/solid#readme>
- `@tsparticles/svelte`: Svelte component wrapper  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/svelte#readme>
- `@tsparticles/vue2`: Vue 2 component wrapper  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/vue2#readme>
- `@tsparticles/vue3`: Vue 3 component wrapper  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/vue3#readme>
- `@tsparticles/webcomponents`: Web Components wrapper (`<web-particles />`)  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/webcomponents#readme>
- `@tsparticles/wordpress`: official WordPress plugin package  
  Source: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/wordpress>
- `angular-confetti`: Angular wrapper for `@tsparticles/confetti`  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/angular-confetti#readme>
- `angular-fireworks`: Angular wrapper for `@tsparticles/fireworks`  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/angular-fireworks#readme>

## WordPress and Elementor notes

- `@tsparticles/wordpress` is the official plugin package and requires a full WordPress setup.
- Elementor does not have an official standalone `tsParticles` plugin package.
- The README references integration through Premium Addons for Elementor:
  <https://premiumaddons.com/particles-section-addon-for-elementor-page-builder/>

## Wrapper to demo mapping

Use this quick matrix to jump from a wrapper package to a runnable monorepo demo.

Ordering rule for this table:

- alphabetical by wrapper package name
- explicit exceptions for wrappers without a dedicated demo (`no dedicated demo yet`) and wrappers that are not demo-applicable (`@tsparticles/wordpress`)

Source demos folder: <https://github.com/tsparticles/tsparticles/tree/main/demo>

| Wrapper package              | Demo project                                          |
| ---------------------------- | ----------------------------------------------------- |
| `@tsparticles/angular`       | `demo/angular`                                        |
| `@tsparticles/astro`         | `demo/astro`                                          |
| `@tsparticles/ember`         | no dedicated demo yet                                 |
| `@tsparticles/inferno`       | `demo/inferno`                                        |
| `@tsparticles/jquery`        | `demo/jquery`                                         |
| `@tsparticles/lit`           | `demo/lit`                                            |
| `@tsparticles/nextjs`        | `demo/nextjs`, `demo/nextjs-legacy`                   |
| `@tsparticles/nuxt2`         | `demo/nuxt2`                                          |
| `@tsparticles/nuxt3`         | `demo/nuxt3`                                          |
| `@tsparticles/nuxt4`         | `demo/nuxt4`                                          |
| `@tsparticles/preact`        | `demo/preact`                                         |
| `@tsparticles/qwik`          | no dedicated demo yet                                 |
| `@tsparticles/react`         | `demo/react`                                          |
| `@tsparticles/riot`          | `demo/riot`                                           |
| `@tsparticles/solid`         | `demo/solid`                                          |
| `@tsparticles/svelte`        | `demo/svelte`, `demo/svelte-kit`                      |
| `@tsparticles/vue2`          | `demo/vue2`                                           |
| `@tsparticles/vue3`          | `demo/vue3`                                           |
| `@tsparticles/webcomponents` | `demo/webcomponents`                                  |
| `@tsparticles/wordpress`     | not applicable (requires full WordPress installation) |
| `angular-confetti`           | `demo/angular`                                        |
| `angular-fireworks`          | `demo/angular`                                        |

## Minimal patterns

### React / Next.js-style provider

```tsx
import Particles, { ParticlesProvider } from "@tsparticles/react";
import type { Engine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const init = async (engine: Engine): Promise<void> => {
  await loadSlim(engine);
};

export function Background() {
  return (
    <ParticlesProvider init={init}>
      <Particles id="tsparticles" options={{ particles: { move: { enable: true } } }} />
    </ParticlesProvider>
  );
}
```

### Vue / Nuxt-style register function

```ts
import type { Engine } from "@tsparticles/engine";

export async function registerParticles(engine: Engine): Promise<void> {
  const [{ loadSlim }] = await Promise.all([import("@tsparticles/slim")]);

  await loadSlim(engine);
}
```

### Angular one-time initialization

```ts
import { NgParticlesService } from "@tsparticles/angular";
import { loadSlim } from "@tsparticles/slim";

constructor(private readonly particlesService: NgParticlesService) {}

ngOnInit(): void {
  void this.particlesService.init(async engine => {
    await loadSlim(engine);
  });
}
```

## Related pages

- [`/guide/frameworks`](/guide/frameworks)
- [`/guide/getting-started`](/guide/getting-started)
- [`/demos/`](/demos/)
