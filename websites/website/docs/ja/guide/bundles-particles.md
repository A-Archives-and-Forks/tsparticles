# Bundle: Particles

`@tsparticles/particles` は、シンプルな粒子背景向けの特化 API を提供します。

## Particles を選ぶタイミング

- 粒子背景をすばやく導入したい。
- engine/plugins を手動で配線したくない。
- コンパクトなアプリ向け API を使いたい。

## インストール

```bash
pnpm add @tsparticles/particles
```

## Setup example

```ts
import { particles } from "@tsparticles/particles";

await particles({
  count: 120,
  links: true,
  linksColor: "#0ff",
});

await particles("canvas-id", {
  count: 80,
  shape: ["circle", "square"],
});
```

## よくある落とし穴

- `@tsparticles/particles` から `tsParticles` が export されると思い込む。
- 同じ canvas id を意図せず再利用する。

## 関連ページ

- 概要: [`/guide/bundles`](/ja/guide/bundles)
- Playground bundles: [`/playground/bundles`](/ja/playground/bundles)
