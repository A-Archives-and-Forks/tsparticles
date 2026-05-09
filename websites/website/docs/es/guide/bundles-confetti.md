# Bundle: Confetti

`@tsparticles/confetti` expone una API enfocada para efectos de confeti con setup minimo.

## Cuando elegir Confetti

- Quieres efectos de celebracion en una sola llamada.
- No necesitas cablear el engine manualmente.
- Prefieres una API compacta para eventos de UI.

## Instalacion

```bash
pnpm add @tsparticles/confetti
```

## Ejemplo de setup

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

## Errores comunes

- Asumir que `tsParticles` se exporta desde `@tsparticles/confetti`.
- Reusar el mismo id de canvas sin querer.

## Paginas relacionadas

- Vista general: [`/guide/bundles`](/es/guide/bundles)
- Bundles del playground: [`/playground/bundles`](/es/playground/bundles)
