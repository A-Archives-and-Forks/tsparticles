# Plugins et personnalisation

tsParticles peut être étendu avec des formes personnalisées, des préréglages et des fonctionnalités pilotées par des plugins.

## Exemple de forme personnalisée

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

## Exemple de préréglage personnalisé

```ts
tsParticles.addPreset("my-preset", {
  particles: {
    move: { enable: true, speed: 2 },
    number: { value: 80 },
  },
});
```

## Conseils pratiques

- Enregistrez des formes/préréglages personnalisés avant d'appeler `tsParticles.load(...)`.
- Gardez les noms uniques (aide sur les préfixes du projet).
- Documenter l'installation minimale + l'enregistrement + les extraits de configuration.

## Référence source

- Documentation de l'interface du plugin : <https://particles.js.org/docs/modules/Core_Interfaces_IPlugin.html>
- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Plugins.md>
