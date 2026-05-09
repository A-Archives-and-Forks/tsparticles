# Bundle: All

`@tsparticles/all` charge toutes les fonctionnalites officielles et convient au prototypage rapide.

## Quand choisir All

- Vous voulez toutes les fonctionnalites immediatement.
- Vous explorez rapidement plusieurs options.
- La taille du bundle est moins importante que la vitesse de setup.

## Installation

```bash
pnpm add @tsparticles/engine @tsparticles/all
```

## Exemple de configuration

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

## Pieges courants

- L'utiliser en production quand un bundle plus cible serait preferable.
- Appeler `tsParticles.load(...)` avant `loadAll(...)`.

## Pages associees

- Vue d'ensemble: [`/guide/bundles`](/fr/guide/bundles)
- Matrice d'installation: [`/guide/installation`](/fr/guide/installation)
