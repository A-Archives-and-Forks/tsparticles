# Bundle: Basic

`@tsparticles/basic` ist fuer extra-leichte Setups mit minimaler Laufzeit gedacht.

## Wann Basic waehlen

- Bundle-Groesse hat oberste Prioritaet.
- Du brauchst nur grundlegende Effekte.
- Erweiterte Plugins sind nicht erforderlich.

## Installation

```bash
pnpm add @tsparticles/engine @tsparticles/basic
```

## Setup-Beispiel

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

## Haeufige Stolperfallen

- Features erwarten, die nur in nicht enthaltenen Plugins stecken.
- `tsParticles.load(...)` vor `loadBasic(...)` aufrufen.

## Verwandte Seiten

- Ueberblick: [`/guide/bundles`](/de/guide/bundles)
- Installationsmatrix: [`/guide/installation`](/de/guide/installation)
