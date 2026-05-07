# Plugin e personalizzazione

tsParticles può essere esteso con forme personalizzate, preimpostazioni e funzionalità basate su plug-in.

## Esempio di forma personalizzata

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

## Esempio di preimpostazione personalizzata

```ts
tsParticles.addPreset("my-preset", {
  particles: {
    move: { enable: true, speed: 2 },
    number: { value: 80 },
  },
});
```

## Guida pratica

- Registra forme/preimpostazioni personalizzate prima di chiamare `tsParticles.load(...)`.
- Mantieni i nomi univoci (aiuto per i prefissi del progetto).
- Documento di installazione minima + registrazione + frammenti di configurazione.

## Riferimento alla fonte

- Documenti sull'interfaccia del plugin: <https://particles.js.org/docs/modules/Core_Interfaces_IPlugin.html>
- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Plugins.md>
