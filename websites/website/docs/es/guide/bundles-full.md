# Bundle: tsparticles (Full)

`tsparticles` es el bundle full e incluye un conjunto amplio de funciones oficiales con un unico loader.

## Cuando elegir tsparticles (Full)

- Necesitas muchas funciones oficiales sin seleccionar plugins manualmente.
- Quieres una base completa lista para produccion antes de afinar.
- Prefieres control del engine con la API `tsParticles`.

## Instalacion

```bash
pnpm add @tsparticles/engine tsparticles
```

## Ejemplo de setup

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

## Errores comunes

- Llamar `tsParticles.load(...)` antes de `loadFull(...)`.
- Asumir que es el mismo paquete que `@tsparticles/all` (son bundles diferentes).

## Paginas relacionadas

- Vista general: [`/guide/bundles`](/es/guide/bundles)
- Matriz de instalacion: [`/guide/installation`](/es/guide/installation)
