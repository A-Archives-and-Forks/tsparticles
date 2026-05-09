# Maschera di sfondo

`backgroundMask` consente alle particelle di penetrare o fondersi con un livello di sfondo mascherato.

## Esempio

```ts
backgroundMask: {
  enable: true,
  cover: {
    color: {
      value: "#0b1020",
    },
    opacity: 1,
  },
}
```

- `enable`: attiva il mascheramento dello sfondo.
- `cover.color`: colore rivestimento maschera.
- `cover.opacity`: livello di copertura alfa.

## Quando usarlo

- Effetti simili a Spotlight.
- Sezioni degli eroi ad alto contrasto.
- Interazioni a più livelli su sfondi scuri.

## Riferimento alla fonte

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/BackgroundMask.md>
