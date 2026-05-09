# Bundle: Fireworks

`@tsparticles/fireworks` minimal setup के साथ fireworks effects के लिए focused API देता है।

## Fireworks कब चुनें

- आपको one-call fireworks animations चाहिए।
- आपको direct engine wiring की जरूरत नहीं है।
- celebration moments के लिए compact API चाहिए।

## इंस्टॉलेशन

```bash
pnpm add @tsparticles/fireworks
```

## Setup example

```ts
import { fireworks } from "@tsparticles/fireworks";

const instance = await fireworks({
  colors: ["#ffffff", "#ff0000"],
  sounds: false,
});

instance?.pause();
instance?.play();

await fireworks("canvas-id", {
  rate: 3,
  speed: { min: 10, max: 25 },
});
```

## Common pitfalls

- मान लेना कि `@tsparticles/fireworks` से `tsParticles` export होता है।
- returned instance को manage किए बिना `fireworks(...)` बार-बार कॉल करना।

## Related pages

- Overview: [`/guide/bundles`](/hi/guide/bundles)
- Playground bundles: [`/playground/bundles`](/hi/playground/bundles)
