# Complementos y personalización

tsParticles se puede ampliar con formas personalizadas, ajustes preestablecidos y funciones basadas en complementos.

## Ejemplo de forma personalizada

```ts
tsParticles.addShape("spiral", (context, particle, radius) => {
  const data = particle.shapeData as { innerRadius: number; lineSpacing: number };

  for (let i = 0; i < ((radius - data.innerRadius) / data.lineSpacing) * 10; i++) {
    const angle = 0.1 * i;
    const factor = data.innerRadius + data.lineSpacing * angle;

    context.lineTo(factor * Math.cos(angle), factor * Math.sin(angle));
  }
});
```

## Ejemplo de preajuste personalizado

```ts
tsParticles.addPreset("my-preset", {
  particles: {
    move: { enable: true, speed: 2 },
    number: { value: 80 },
  },
});
```

## Orientación práctica

- Registre formas/ajustes preestablecidos personalizados antes de llamar a `tsParticles.load(...)`.
- Mantenga los nombres únicos (los prefijos del proyecto ayudan).
- Documentar instalación mínima + registro + fragmentos de configuración.

## Referencia fuente

- Documentos de interfaz del complemento: <https://particles.js.org/docs/modules/Core_Interfaces_IPlugin.html>
- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Plugins.md>
