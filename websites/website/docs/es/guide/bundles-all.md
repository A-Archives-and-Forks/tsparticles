# Bundle: All

`@tsparticles/all` carga todas las funciones oficiales y es ideal para prototipado rapido.

## Cuando elegir All

- Quieres todas las funciones disponibles de inmediato.
- Estas explorando opciones rapidamente.
- El tamano del bundle no es el limite principal.

## Instalacion

```bash
pnpm add @tsparticles/engine @tsparticles/all
```

## Ejemplo de setup

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadAll } from "@tsparticles/all";

await loadAll(tsParticles);

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

- Usarlo en produccion cuando un bundle mas enfocado seria mejor.
- Llamar `tsParticles.load(...)` antes de `loadAll(...)`.

## Paginas relacionadas

- Vista general: [`/guide/bundles`](/es/guide/bundles)
- Matriz de instalacion: [`/guide/installation`](/es/guide/installation)
