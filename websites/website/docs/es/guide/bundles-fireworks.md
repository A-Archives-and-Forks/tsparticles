# Bundle: Fireworks

`@tsparticles/fireworks` expone una API enfocada para efectos de fuegos artificiales con setup minimo.

## Cuando elegir Fireworks

- Quieres animaciones fireworks en una sola llamada.
- No necesitas wiring directo del engine.
- Prefieres una API compacta para momentos de celebracion.

## Instalacion

```bash
pnpm add @tsparticles/fireworks
```

## Ejemplo de setup

```ts
import { fireworks } from "@tsparticles/fireworks";

const instance = await fireworks({
  colors: ["#ffffff", "#ff0000"],
  sounds: false,
});

instance?.pause();
instance?.play();

await fireworks("canvas-id", {
  rate: 3,
  speed: { min: 10, max: 25 },
});
```

## Errores comunes

- Asumir que `tsParticles` se exporta desde `@tsparticles/fireworks`.
- Llamar `fireworks(...)` repetidamente sin manejar la instancia.

## Paginas relacionadas

- Vista general: [`/guide/bundles`](/es/guide/bundles)
- Bundles del playground: [`/playground/bundles`](/es/playground/bundles)
