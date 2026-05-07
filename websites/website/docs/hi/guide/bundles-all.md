# Bundle: All

`@tsparticles/all` सभी official features लोड करता है और तेज prototyping के लिए ideal है।

## All कब चुनें

- आपको सभी features तुरंत चाहिए।
- आप जल्दी-जल्दी options explore कर रहे हैं।
- bundle size से ज्यादा setup speed महत्वपूर्ण है।

## इंस्टॉलेशन

```bash
pnpm add @tsparticles/engine @tsparticles/all
```

## Setup example

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadAll } from "@tsparticles/all";

await loadAll(tsParticles);

await tsParticles.load({
  id: "tsparticles",
  options: {
    particles: {
      number: { value: 100 },
      move: { enable: true, speed: 2 },
    },
  },
});
```

## Common pitfalls

- production में `all` इस्तेमाल करना जबकि smaller focused bundle बेहतर हो।
- `loadAll(...)` से पहले `tsParticles.load(...)` कॉल करना।

## Related pages

- Overview: [`/guide/bundles`](/hi/guide/bundles)
- Installation matrix: [`/guide/installation`](/hi/guide/installation)
