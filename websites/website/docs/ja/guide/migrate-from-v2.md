# v2.x から移行

`v2.x` からは、`load(...)` API とオプション改名が主な変更点です。

## Load API 移行

Before:

```ts
await tsParticles.load("tsparticles", {
  particles: {
    number: { value: 80 },
  },
});
```

After:

```ts
await tsParticles.load({
  id: "tsparticles",
  options: {
    particles: {
      number: { value: 80 },
    },
  },
});
```

## 主な改名

- `particles.color` -> `particles.paint.fill`
- `particles.stroke` -> `particles.paint.stroke`

## リソース

- 改名マトリクス: [`/guide/option-rename-matrix`](/ja/guide/option-rename-matrix)
- v1 移行: [`/guide/migrate-from-v1`](/ja/guide/migrate-from-v1)
