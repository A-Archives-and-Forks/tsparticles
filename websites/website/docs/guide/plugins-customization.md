# Plugins & Customization

tsParticles can be extended with custom shapes, presets, and plugin-driven features.

## Custom shape example

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

## Custom preset example

```ts
tsParticles.addPreset("my-preset", {
  particles: {
    move: { enable: true, speed: 2 },
    number: { value: 80 },
  },
});
```

## Practical guidance

- Register custom shapes/presets before calling `tsParticles.load(...)`.
- Keep names unique (project prefixes help).
- Document minimal install + registration + config snippets.

## Source reference

- Plugin interface docs: <https://particles.js.org/docs/modules/Core_Interfaces_IPlugin.html>
- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Plugins.md>
