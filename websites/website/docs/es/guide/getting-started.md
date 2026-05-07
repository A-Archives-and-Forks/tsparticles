# Empezando

Esta ruta es la configuración confiable más rápida para `tsParticles` en 2026.

## Lista de verificación rápida

1. Instale `@tsparticles/engine`.
2. Elija una ruta de tiempo de ejecución (`@tsparticles/slim`, `@tsparticles/all`, API enfocadas como `@tsparticles/particles` o solo paquetes personalizados).
3. Cargue su paquete una vez.
4. Comience con opciones manuales, un objeto de configuración o un ajuste preestablecido.

## 1) Instale el motor + un paquete preestablecido

Utilice `@tsparticles/engine` más `@tsparticles/slim` para obtener un excelente equilibrio predeterminado entre tamaño y funciones.

```bash
pnpm add @tsparticles/engine @tsparticles/slim
```

¿Necesita enlaces CDN, `npm`/`yarn` variantes o `require(...)` ejemplos?

- Ver [`/guide/installation`](/es/guide/installation).

## 2) Crear un contenedor en HTML

```html
<div id="tsparticles"></div>
```

## 3) Inicializar tsParticles

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const options = {
  background: {
    color: "#0b1020",
  },
  particles: {
    number: {
      value: 80,
    },
    links: {
      enable: true,
      distance: 150,
      opacity: 0.35,
    },
    move: {
      enable: true,
      speed: 2,
    },
  },
};

(async () => {
  await loadSlim(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    options,
  });
})();
```

## 4) Elija el paquete correcto

- `@tsparticles/slim`: la mayoría de las aplicaciones deberían comenzar aquí.
- `@tsparticles/basic`: conjunto de funciones más pequeño para configuraciones muy ligeras.
- `@tsparticles/all`: todo incluido, más fácil para crear prototipos rápidamente.

Si necesita una API enfocada en lugar de una configuración `tsParticles` directa:

- `@tsparticles/particles`: API de fondo de partículas simplificada
- `@tsparticles/confetti`: API de confeti en una sola llamada
- `@tsparticles/fireworks`: API de fuegos artificiales en una sola llamada

## 5) Utilice ajustes preestablecidos/configuraciones cuando necesite velocidad

Si prefieres efectos prediseñados:

```bash
pnpm add @tsparticles/configs
```

Luego cargue una configuración por clave, como la [aplicación `demo/vite`](https://github.com/tsparticles/tsparticles/blob/main/demo/vite/src/main.ts).

Si prefiere configuraciones basadas en nombres preestablecidos, utilice el catálogo de ajustes preestablecidos oficiales en [`/demos/presets`](/es/demos/presets).

## Mapa de documentación rápida

- Opciones de raíz: [`/options/`](/es/options/)
- Referencia de wrappers: [`/guide/wrappers`](/es/guide/wrappers)
- Catálogo de presets: [`/demos/presets`](/es/demos/presets)
- Catálogo de paletas: [`/demos/palettes`](/es/demos/palettes)
- Migración desde particles.js: [`/migration/`](/es/migration/)
- Formatos de color: [`/guide/color-formats`](/es/guide/color-formats)
- Ciclo de vida del contenedor: [`/guide/container-lifecycle`](/es/guide/container-lifecycle)
- Complementos y personalización: [`/guide/plugins-customization`](/es/guide/plugins-customization)

## Solución de problemas

- Pantalla en blanco: verifique que `#tsparticles` exista antes de llamar a `tsParticles.load`.
- Funcionalidad faltante: probablemente necesites otro complemento/paquete (forma, interacción, actualizador).
- Errores de tipo en las opciones: mantenga sus paquetes alineados con la misma versión principal/menor.
