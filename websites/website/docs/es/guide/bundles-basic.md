# Bundle: Basic

`@tsparticles/basic` esta pensado para configuraciones muy ligeras con runtime minimo.

## Cuando elegir Basic

- El tamano del bundle es tu prioridad principal.
- Solo necesitas efectos base.
- No necesitas plugins avanzados.

## Instalacion

```bash
pnpm add @tsparticles/engine @tsparticles/basic
```

## Ejemplo de setup

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadBasic } from "@tsparticles/basic";

await loadBasic(tsParticles);

await tsParticles.load({
  id: "tsparticles",
  options: {
    particles: {
      number: { value: 50 },
      move: { enable: true, speed: 1.5 },
    },
  },
});
```

## Errores comunes

- Esperar funciones que dependen de plugins no incluidos.
- Llamar `tsParticles.load(...)` antes de `loadBasic(...)`.

## Paginas relacionadas

- Vista general: [`/guide/bundles`](/es/guide/bundles)
- Matriz de instalacion: [`/guide/installation`](/es/guide/installation)
