# Bundle: All

`@tsparticles/all` laedt alle offiziellen Features und ist ideal fuer schnelles Prototyping.

## Wann All waehlen

- Du willst sofort alle Features verfuegbar haben.
- Du testest Optionen schnell.
- Bundle-Groesse ist weniger wichtig als Setup-Geschwindigkeit.

## Installation

```bash
pnpm add @tsparticles/engine @tsparticles/all
```

## Setup-Beispiel

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

## Haeufige Stolperfallen

- In Produktion nutzen, obwohl ein kleineres Bundle besser waere.
- `tsParticles.load(...)` vor `loadAll(...)` aufrufen.

## Verwandte Seiten

- Ueberblick: [`/guide/bundles`](/de/guide/bundles)
- Installationsmatrix: [`/guide/installation`](/de/guide/installation)
