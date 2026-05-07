# Bundle: tsparticles (Full)

`tsparticles` est le bundle full et inclut un large ensemble de fonctionnalites officielles avec un seul loader.

## Quand choisir tsparticles (Full)

- Vous avez besoin de nombreuses fonctionnalites officielles sans selection manuelle des plugins.
- Vous voulez une base complete prete pour la production avant d'affiner.
- Vous preferez le controle engine via l'API `tsParticles`.

## Installation

```bash
pnpm add @tsparticles/engine tsparticles
```

## Exemple de setup

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

## Erreurs courantes

- Appeler `tsParticles.load(...)` avant `loadFull(...)`.
- Penser que c'est le meme package que `@tsparticles/all` (ce sont des bundles differents).

## Pages associees

- Vue d'ensemble: [`/guide/bundles`](/fr/guide/bundles)
- Matrice d'installation: [`/guide/installation`](/fr/guide/installation)
