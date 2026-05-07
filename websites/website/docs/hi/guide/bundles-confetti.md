# Bundle: Confetti

`@tsparticles/confetti` minimal setup के साथ confetti effects के लिए focused API देता है।

## Confetti कब चुनें

- आपको one-call celebration effects चाहिए।
- आपको engine को manually wire नहीं करना।
- UI events के लिए compact API चाहिए।

## इंस्टॉलेशन

```bash
pnpm add @tsparticles/confetti
```

## Setup example

```ts
import { confetti } from "@tsparticles/confetti";

await confetti({
  count: 80,
  spread: 60,
});

await confetti("canvas-id", {
  count: 50,
  angle: 90,
  spread: 45,
});
```

## Common pitfalls

- मान लेना कि `@tsparticles/confetti` से `tsParticles` export होता है।
- एक ही canvas id को अनजाने में reuse करना।

## Related pages

- Overview: [`/guide/bundles`](/hi/guide/bundles)
- Playground bundles: [`/playground/bundles`](/hi/playground/bundles)
