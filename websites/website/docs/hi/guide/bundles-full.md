# Bundle: tsparticles (Full)

`tsparticles` full bundle है, जो एक loader के साथ official features का बड़ा सेट देता है।

## tsparticles (Full) कब चुनें

- आपको कई official features चाहिए, बिना plugins manually चुनने के।
- आप fine-tuning से पहले production-ready complete base चाहते हैं।
- आप `tsParticles` API से engine को direct control करना चाहते हैं।

## इंस्टॉलेशन

```bash
pnpm add @tsparticles/engine tsparticles
```

## Setup उदाहरण

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadFull } from "tsparticles";

await loadFull(tsParticles);

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

- `loadFull(...)` से पहले `tsParticles.load(...)` कॉल करना।
- यह मान लेना कि यह `@tsparticles/all` जैसा ही पैकेज है (दोनों अलग bundles हैं)।

## संबंधित पेज

- ओवरव्यू: [`/guide/bundles`](/hi/guide/bundles)
- इंस्टॉलेशन मैट्रिक्स: [`/guide/installation`](/hi/guide/installation)
