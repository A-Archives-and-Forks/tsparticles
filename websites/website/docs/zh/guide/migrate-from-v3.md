# 从 v3.x 迁移

从 `v3.x` 迁移时，最常见的问题是选项兼容性。

## 优先变更

- `particles.color` -> `particles.paint.fill`
- `particles.stroke` -> `particles.paint.stroke`

## Load API 迁移

迁移前:

```ts
await tsParticles.load("tsparticles", options);
```

迁移后:

```ts
await tsParticles.load({
  id: "tsparticles",
  options,
});
```

## 参考

- 重命名矩阵: [`/guide/option-rename-matrix`](/zh/guide/option-rename-matrix)
- `particles.paint`: [`/options/particles-paint`](/zh/options/particles-paint)
