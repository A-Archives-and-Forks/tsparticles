# Background Mask

`backgroundMask` lets particles punch through or blend with a masked background layer.

## Example

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

- `enable`: activates background masking.
- `cover.color`: mask cover color.
- `cover.opacity`: cover alpha level.

## When to use it

- Spotlight-like effects.
- Contrast-heavy hero sections.
- Layered interactions on dark backgrounds.

## Source reference

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/BackgroundMask.md>
