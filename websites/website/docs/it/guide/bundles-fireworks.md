# Bundle: Fireworks

`@tsparticles/fireworks` espone un'API mirata per effetti fuochi d'artificio con setup minimo.

## Quando scegliere Fireworks

- Vuoi animazioni fireworks in una sola chiamata.
- Non ti serve il wiring diretto dell'engine.
- Preferisci un'API compatta per momenti celebrativi.

## Installazione

```bash
pnpm add @tsparticles/fireworks
```

## Esempio di setup

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

## Problemi comuni

- Pensare che `tsParticles` sia esportato da `@tsparticles/fireworks`.
- Chiamare `fireworks(...)` ripetutamente senza gestire l'istanza.

## Pagine correlate

- Panoramica: [`/guide/bundles`](/it/guide/bundles)
- Bundle playground: [`/playground/bundles`](/it/playground/bundles)
