# 背景マスク

`backgroundMask` を使用すると、パーティクルがマスクされた背景レイヤーを突き抜けたり、ブレンドしたりできます。

## 例

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

- `enable`: 背景マスキングを有効にします。
- `cover.color`: マスク カバーの色。
- `cover.opacity`: アルファ レベルをカバーします。

## いつ使用するか

- スポットライトのような効果。
- コントラストの強いヒーローセクション。
- 暗い背景でのレイヤー化されたインタラクション。

## ソース参照

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/BackgroundMask.md>
