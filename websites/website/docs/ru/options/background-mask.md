# Фоновая маска

`backgroundMask` позволяет частицам проникать сквозь маскированный фоновый слой или смешиваться с ним.

## Пример

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

- `enable`: активирует маскировку фона.
- `cover.color`: цвет крышки маски.
- `cover.opacity`: охват альфа-уровня.

## Когда это использовать

- Эффекты, похожие на прожектор.
- Контрастные главные разделы.
- Многоуровневое взаимодействие на темном фоне.

## Ссылка на источник

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/BackgroundMask.md>
