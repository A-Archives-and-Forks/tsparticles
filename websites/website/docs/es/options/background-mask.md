# Máscara de fondo

`backgroundMask` permite que las partículas atraviesen o se mezclen con una capa de fondo enmascarada.

## Ejemplo

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

- `enable`: activa el enmascaramiento de fondo.
- `cover.color`: color de funda de mascarilla.
- `cover.opacity`: nivel alfa de cobertura.

## Cuándo usarlo

- Efectos tipo foco.
- Secciones de héroes con mucho contraste.
- Interacciones en capas sobre fondos oscuros.

## Referencia fuente

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/BackgroundMask.md>
