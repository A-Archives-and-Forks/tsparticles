# Bundle: Confetti

`@tsparticles/confetti` espone un'API mirata per effetti coriandoli con setup minimo.

## Quando scegliere Confetti

- Vuoi effetti celebrativi in una sola chiamata.
- Non ti serve cablare direttamente l'engine.
- Preferisci un'API compatta per eventi UI.

## Installazione

```bash
pnpm add @tsparticles/confetti
```

## Esempio di setup

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

## Problemi comuni

- Pensare che `tsParticles` sia esportato da `@tsparticles/confetti`.
- Riutilizzare lo stesso id canvas senza volerlo.

## Pagine correlate

- Panoramica: [`/guide/bundles`](/it/guide/bundles)
- Bundle playground: [`/playground/bundles`](/it/playground/bundles)
