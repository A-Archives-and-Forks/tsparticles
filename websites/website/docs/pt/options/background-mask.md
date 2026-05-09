# Máscara de fundo

`backgroundMask` permite que as partículas perfurem ou se misturem com uma camada de fundo mascarada.

## Exemplo

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

- `enable`: ativa o mascaramento de fundo.
- `cover.color`: cor da capa da máscara.
- `cover.opacity`: cobertura nível alfa.

## Quando usar

- Efeitos semelhantes a holofotes.
- Seções de heróis com alto contraste.
- Interações em camadas em fundos escuros.

## Referência da fonte

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/BackgroundMask.md>
