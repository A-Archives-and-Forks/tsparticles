# Bundle: All

`@tsparticles/all` carica tutte le feature ufficiali, ideale per prototipare in fretta.

## Quando scegliere All

- Vuoi tutte le funzionalita subito disponibili.
- Stai esplorando opzioni rapidamente.
- La dimensione del bundle non e il vincolo principale.

## Installazione

```bash
pnpm add @tsparticles/engine @tsparticles/all
```

## Esempio di setup

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

## Problemi comuni

- Usarlo in produzione quando un bundle piu mirato sarebbe migliore.
- Chiamare `tsParticles.load(...)` prima di `loadAll(...)`.

## Pagine correlate

- Panoramica: [`/guide/bundles`](/it/guide/bundles)
- Matrice installazione: [`/guide/installation`](/it/guide/installation)
