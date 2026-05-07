# Bundle: Basic

`@tsparticles/basic` extra-light setups के लिए है, जहां runtime बहुत minimal रखना है।

## Basic कब चुनें

- bundle size आपकी top priority है।
- आपको सिर्फ core effects चाहिए।
- advanced plugins की जरूरत नहीं है।

## इंस्टॉलेशन

```bash
pnpm add @tsparticles/engine @tsparticles/basic
```

## Setup example

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadBasic } from "@tsparticles/basic";

await loadBasic(tsParticles);

await tsParticles.load({
  id: "tsparticles",
  options: {
    particles: {
      number: { value: 50 },
      move: { enable: true, speed: 1.5 },
    },
  },
});
```

## Common pitfalls

- उन features की उम्मीद करना जो basic bundle में शामिल नहीं हैं।
- `loadBasic(...)` से पहले `tsParticles.load(...)` कॉल करना।

## Related pages

- Overview: [`/guide/bundles`](/hi/guide/bundles)
- Installation matrix: [`/guide/installation`](/hi/guide/installation)
