# 插件和定制

tsParticles 可以通过自定义形状、预设和插件驱动的功能进行扩展。

## 自定义形状示例

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

## 自定义预设示例

```ts
tsParticles.addPreset("my-preset", {
  particles: {
    move: { enable: true, speed: 2 },
    number: { value: 80 },
  },
});
```

## 实用指导

- 在调用 `tsParticles.load(...)` 之前注册自定义形状/预设。
- 保持名称唯一（项目前缀有帮助）。
- 记录最小安装+注册+配置片段。

## 来源参考

- 插件接口文档：<https://particles.js.org/docs/modules/Core_Interfaces_IPlugin.html>
- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Plugins.md>
