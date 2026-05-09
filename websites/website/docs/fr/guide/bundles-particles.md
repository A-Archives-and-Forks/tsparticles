# Bundle: Particles

`@tsparticles/particles` expose une API ciblee pour des fonds de particules simples.

## Quand choisir Particles

- Vous voulez une API rapide pour des fonds de particules.
- Vous ne voulez pas brancher engine/plugins manuellement.
- Vous preferez une API compacte orientee application.

## Installation

```bash
pnpm add @tsparticles/particles
```

## Exemple de configuration

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

## Pieges courants

- Penser que `tsParticles` est exporte par `@tsparticles/particles`.
- Reutiliser le meme id de canvas sans le vouloir.

## Pages associees

- Vue d'ensemble: [`/guide/bundles`](/fr/guide/bundles)
- Bundles du playground: [`/playground/bundles`](/fr/playground/bundles)
