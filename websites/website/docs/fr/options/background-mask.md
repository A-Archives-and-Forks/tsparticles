# Masque de fond

`backgroundMask` permet aux particules de traverser ou de se mélanger à un calque d'arrière-plan masqué.

## Exemple

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

- `enable` : active le masquage du fond.
- `cover.color` : couleur du cache du masque.
- `cover.opacity` : couvre le niveau alpha.

## Quand l'utiliser

- Effets de type projecteur.
- Sections de héros riches en contraste.
- Interactions superposées sur fond sombre.

## Référence source

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/BackgroundMask.md>
