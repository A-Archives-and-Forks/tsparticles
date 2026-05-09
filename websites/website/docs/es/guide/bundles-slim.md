# Bundle: Slim

`@tsparticles/slim` es la opcion recomendada para la mayoria de proyectos.

## Cuando elegir Slim

- Quieres buen equilibrio entre peso y funciones.
- Usas la API de engine `tsParticles` directamente.
- Necesitas formas/interacciones comunes sin cargar todo.

## Instalacion

```bash
pnpm add @tsparticles/engine @tsparticles/slim
```

## Ejemplo de setup

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

await loadSlim(tsParticles);

await tsParticles.load({
  id: "tsparticles",
  options: {
    particles: {
      number: { value: 80 },
      move: { enable: true, speed: 2 },
      links: { enable: true },
    },
  },
});
```

## Errores comunes

- Llamar `tsParticles.load(...)` antes de `loadSlim(...)`.
- Mezclar versiones entre engine y plugins.

## Paginas relacionadas

- Vista general: [`/guide/bundles`](/es/guide/bundles)
- Matriz de instalacion: [`/guide/installation`](/es/guide/installation)
