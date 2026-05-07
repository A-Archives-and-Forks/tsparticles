# Bundle: Confetti

`@tsparticles/confetti` bietet eine fokussierte API fuer Konfetti-Effekte mit minimalem Setup.

## Wann Confetti waehlen

- Du willst Feier-Effekte mit einem Aufruf.
- Du willst die Engine nicht manuell verdrahten.
- Du bevorzugst eine kompakte API fuer UI-Events.

## Installation

```bash
pnpm add @tsparticles/confetti
```

## Setup-Beispiel

```ts
import { confetti } from "@tsparticles/confetti";

await confetti({
  count: 80,
  spread: 60,
});

await confetti("canvas-id", {
  count: 50,
  angle: 90,
  spread: 45,
});
```

## Haeufige Stolperfallen

- Annehmen, dass `tsParticles` aus `@tsparticles/confetti` exportiert wird.
- Dieselbe Canvas-ID unbeabsichtigt wiederverwenden.

## Verwandte Seiten

- Ueberblick: [`/guide/bundles`](/de/guide/bundles)
- Bundle-Playground: [`/playground/bundles`](/de/playground/bundles)
