# Bundle: Particles

`@tsparticles/particles` espone un'API mirata per sfondi particellari semplici.

## Quando scegliere Particles

- Vuoi un'API rapida per sfondi con particelle.
- Non ti serve configurare engine/plugin manualmente.
- Preferisci un'API compatta in stile app.

## Installazione

```bash
pnpm add @tsparticles/particles
```

## Esempio di setup

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

## Problemi comuni

- Pensare che `tsParticles` sia esportato da `@tsparticles/particles`.
- Riutilizzare lo stesso id canvas senza volerlo.

## Pagine correlate

- Panoramica: [`/guide/bundles`](/it/guide/bundles)
- Bundle playground: [`/playground/bundles`](/it/playground/bundles)
