# Plugins und Anpassungen

tsParticles kann mit benutzerdefinierten Formen, Voreinstellungen und Plugin-gesteuerten Funktionen erweitert werden.

## Beispiel für eine benutzerdefinierte Form

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

## Beispiel für eine benutzerdefinierte Voreinstellung

```ts
tsParticles.addPreset("my-preset", {
  particles: {
    move: { enable: true, speed: 2 },
    number: { value: 80 },
  },
});
```

## Praktische Anleitung

- Registrieren Sie benutzerdefinierte Formen/Voreinstellungen, bevor Sie `tsParticles.load(...)` aufrufen.

- Halten Sie Namen eindeutig (Projektpräfixe helfen).
- Dokumentieren Sie minimale Installations-, Registrierungs- und Konfigurationsausschnitte.

## Quellenangabe

- Dokumentation zur Plugin-Schnittstelle: <https://particles.js.org/docs/modules/Core_Interfaces_IPlugin.html>
- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Plugins.md>
