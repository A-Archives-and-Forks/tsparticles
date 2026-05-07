# プラグインとカスタマイズ

tsParticles は、カスタム形状、プリセット、プラグイン駆動の機能を使用して拡張できます。

## カスタム形状の例

```ts
tsParticles.addShape("spiral", (context, particle, radius) => {
  const data = particle.shapeData as { innerRadius: number; lineSpacing: number };

  for (let i = 0; i < ((radius - data.innerRadius) / data.lineSpacing) * 10; i++) {
    const angle = 0.1 * i;
    const factor = data.innerRadius + data.lineSpacing * angle;

    context.lineTo(factor * Math.cos(angle), factor * Math.sin(angle));
  }
});
```

## カスタムプリセットの例

```ts
tsParticles.addPreset("my-preset", {
  particles: {
    move: { enable: true, speed: 2 },
    number: { value: 80 },
  },
});
```

## 実践的な指導

- `tsParticles.load(...)` を呼び出す前に、カスタム形状/プリセットを登録します。
- 名前を一意に保ちます (プロジェクトの接頭辞が役に立ちます)。
- 最小限のインストール + 登録 + 構成スニペットを文書化します。

## ソース参照

- プラグイン インターフェースのドキュメント: <https://particles.js.org/docs/modules/Core_Interfaces_IPlugin.html>
- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Plugins.md>
