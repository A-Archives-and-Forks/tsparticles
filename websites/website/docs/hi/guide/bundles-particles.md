# Bundle: Particles

`@tsparticles/particles` simple particles backgrounds के लिए focused API देता है।

## Particles कब चुनें

- आपको particles background के लिए quick API चाहिए।
- आप engine/plugins manually wire नहीं करना चाहते।
- आप compact app-like API पसंद करते हैं।

## इंस्टॉलेशन

```bash
pnpm add @tsparticles/particles
```

## Setup example

```ts
import { particles } from "@tsparticles/particles";

await particles({
  count: 120,
  links: true,
  linksColor: "#0ff",
});

await particles("canvas-id", {
  count: 80,
  shape: ["circle", "square"],
});
```

## Common pitfalls

- मान लेना कि `@tsparticles/particles` से `tsParticles` export होता है।
- एक ही canvas id को अनजाने में reuse करना।

## Related pages

- Overview: [`/guide/bundles`](/hi/guide/bundles)
- Playground bundles: [`/playground/bundles`](/hi/playground/bundles)
