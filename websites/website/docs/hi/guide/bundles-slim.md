# Bundle: Slim

`@tsparticles/slim` ज्यादातर प्रोजेक्ट्स के लिए recommended default है।

## Slim कब चुनें

- आपको size और features का अच्छा balance चाहिए।
- आप `tsParticles` engine API सीधे इस्तेमाल करते हैं।
- आपको common shapes/interactions चाहिए, लेकिन सब कुछ लोड नहीं करना।

## इंस्टॉलेशन

```bash
pnpm add @tsparticles/engine @tsparticles/slim
```

## Setup example

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

await loadSlim(tsParticles);

await tsParticles.load({
  id: "tsparticles",
  options: {
    particles: {
      number: { value: 80 },
      move: { enable: true, speed: 2 },
      links: { enable: true },
    },
  },
});
```

## Common pitfalls

- `loadSlim(...)` से पहले `tsParticles.load(...)` कॉल करना।
- engine और plugins की अलग-अलग versions मिलाना।

## Related pages

- Overview: [`/guide/bundles`](/hi/guide/bundles)
- Installation matrix: [`/guide/installation`](/hi/guide/installation)
