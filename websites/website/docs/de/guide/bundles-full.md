# Bundle: tsparticles (Full)

`tsparticles` ist das Full-Bundle und enthaelt einen breiten Satz offizieller Features mit nur einem Loader.

## Wann tsparticles (Full) waehlen

- Du brauchst viele offizielle Features ohne manuelle Plugin-Auswahl.
- Du willst eine komplette, produktionsreife Basis vor dem Feintuning.
- Du bevorzugst Engine-Kontrolle ueber die `tsParticles`-API.

## Installation

```bash
pnpm add @tsparticles/engine tsparticles
```

## Setup-Beispiel

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

## Haeufige Stolperfallen

- `tsParticles.load(...)` vor `loadFull(...)` aufrufen.
- Annehmen, dass es dasselbe Paket wie `@tsparticles/all` ist (es sind verschiedene Bundles).

## Verwandte Seiten

- Ueberblick: [`/guide/bundles`](/de/guide/bundles)
- Installationsmatrix: [`/guide/installation`](/de/guide/installation)
