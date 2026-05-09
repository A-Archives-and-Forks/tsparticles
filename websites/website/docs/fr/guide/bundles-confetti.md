# Bundle: Confetti

`@tsparticles/confetti` expose une API ciblee pour les effets confettis avec setup minimal.

## Quand choisir Confetti

- Vous voulez des effets de celebration en un appel.
- Vous ne voulez pas cabler l'engine manuellement.
- Vous preferez une API compacte pour les evenements UI.

## Installation

```bash
pnpm add @tsparticles/confetti
```

## Exemple de configuration

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

## Pieges courants

- Penser que `tsParticles` est exporte par `@tsparticles/confetti`.
- Reutiliser le meme id de canvas sans le vouloir.

## Pages associees

- Vue d'ensemble: [`/guide/bundles`](/fr/guide/bundles)
- Bundles du playground: [`/playground/bundles`](/fr/playground/bundles)
