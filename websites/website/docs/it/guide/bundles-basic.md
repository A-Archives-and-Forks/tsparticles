# Bundle: Basic

`@tsparticles/basic` e pensato per setup molto leggeri con runtime minimo.

## Quando scegliere Basic

- La dimensione del bundle e la priorita principale.
- Ti servono solo effetti base.
- Non ti servono plugin avanzati.

## Installazione

```bash
pnpm add @tsparticles/engine @tsparticles/basic
```

## Esempio di setup

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

## Problemi comuni

- Aspettarsi feature disponibili solo in plugin non inclusi.
- Chiamare `tsParticles.load(...)` prima di `loadBasic(...)`.

## Pagine correlate

- Panoramica: [`/guide/bundles`](/it/guide/bundles)
- Matrice installazione: [`/guide/installation`](/it/guide/installation)
