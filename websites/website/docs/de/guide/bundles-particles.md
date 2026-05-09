# Bundle: Particles

`@tsparticles/particles` bietet eine fokussierte API fuer einfache Partikel-Hintergruende.

## Wann Particles waehlen

- Du willst eine schnelle API fuer Partikel-Hintergruende.
- Du willst Engine/Plugins nicht manuell verdrahten.
- Du bevorzugst eine kompakte, app-aehnliche API.

## Installation

```bash
pnpm add @tsparticles/particles
```

## Setup-Beispiel

```ts
import { particles } from "@tsparticles/particles";

await particles({
  count: 120,
  links: true,
  linksColor: "#0ff",
});

await particles("canvas-id", {
  count: 80,
  shape: ["circle", "square"],
});
```

## Haeufige Stolperfallen

- Annehmen, dass `tsParticles` aus `@tsparticles/particles` exportiert wird.
- Dieselbe Canvas-ID unbeabsichtigt wiederverwenden.

## Verwandte Seiten

- Ueberblick: [`/guide/bundles`](/de/guide/bundles)
- Bundle-Playground: [`/playground/bundles`](/de/playground/bundles)
