# Plug-ins e personalização

tsParticles pode ser estendido com formas personalizadas, predefinições e recursos baseados em plug-ins.

## Exemplo de forma personalizada

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

## Exemplo de predefinição personalizada

```ts
tsParticles.addPreset("my-preset", {
  particles: {
    move: { enable: true, speed: 2 },
    number: { value: 80 },
  },
});
```

## Orientação prática

- Registre formas/predefinições personalizadas antes de chamar `tsParticles.load(...)`.
- Mantenha os nomes exclusivos (ajuda dos prefixos do projeto).
- Documente instalação mínima + registro + trechos de configuração.

## Referência da fonte

- Documentos da interface do plug-in: <https://particles.js.org/docs/modules/Core_Interfaces_IPlugin.html> - <https://github.com/tsparticles/tsparticles/blob/main/markdown/Plugins.md>
