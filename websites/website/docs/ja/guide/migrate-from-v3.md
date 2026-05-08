# v3.x から移行

`v3.x` からの移行では、主にオプション互換が問題になります。

## 優先して確認する変更

- `particles.color` -> `particles.paint.fill`
- `particles.stroke` -> `particles.paint.stroke`

## Load API 移行

Before:

```ts
await tsParticles.load("tsparticles", options);
```

After:

```ts
await tsParticles.load({
  id: "tsparticles",
  options,
});
```

## リソース

- 改名マトリクス: [`/guide/option-rename-matrix`](/ja/guide/option-rename-matrix)
- `particles.paint`: [`/options/particles-paint`](/ja/options/particles-paint)
