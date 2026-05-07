# Bundle: Particles

`@tsparticles/particles` expone una API enfocada para fondos de particulas simples.

## Cuando elegir Particles

- Quieres una API rapida para fondos de particulas.
- No necesitas configurar engine/plugins manualmente.
- Prefieres una API compacta tipo app.

## Instalacion

```bash
pnpm add @tsparticles/particles
```

## Ejemplo de setup

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

## Errores comunes

- Asumir que `tsParticles` se exporta desde `@tsparticles/particles`.
- Reusar el mismo id de canvas sin querer.

## Paginas relacionadas

- Vista general: [`/guide/bundles`](/es/guide/bundles)
- Bundles del playground: [`/playground/bundles`](/es/playground/bundles)
