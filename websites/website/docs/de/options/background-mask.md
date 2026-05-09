# Hintergrundmaske

`backgroundMask` lässt Partikel eine maskierte Hintergrundebene durchdringen oder mit ihr verschmelzen.

## Beispiel

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

- `enable`: Aktiviert die Hintergrundmaskierung.
- `cover.color`: Farbe der Maskenabdeckung.
- `cover.opacity`: Alpha-Level abdecken.

## Wann man es verwenden sollte

- Spotlight-ähnliche Effekte.
- Kontrastreiche Heldenabschnitte.
- Mehrschichtige Interaktionen auf dunklem Hintergrund.

## Quellenangabe

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/BackgroundMask.md>
