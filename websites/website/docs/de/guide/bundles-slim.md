# Bundle: Slim

`@tsparticles/slim` ist die empfohlene Standardwahl fuer die meisten Projekte.

## Wann Slim waehlen

- Du willst ein gutes Gleichgewicht aus Groesse und Funktionen.
- Du nutzt die `tsParticles`-Engine-API direkt.
- Du brauchst gaengige Formen/Interaktionen ohne alles zu laden.

## Installation

```bash
pnpm add @tsparticles/engine @tsparticles/slim
```

## Setup-Beispiel

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

## Haeufige Stolperfallen

- `tsParticles.load(...)` vor `loadSlim(...)` aufrufen.
- Unterschiedliche Versionen von Engine und Plugins mischen.

## Verwandte Seiten

- Ueberblick: [`/guide/bundles`](/de/guide/bundles)
- Installationsmatrix: [`/guide/installation`](/de/guide/installation)
