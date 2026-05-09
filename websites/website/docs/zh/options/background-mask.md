# 背景蒙版

`backgroundMask` 让粒子穿透或与蒙版背景图层混合。

## 示例

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

- `enable`：激活背景屏蔽。
- `cover.color`：遮罩覆盖颜色。
- `cover.opacity`：覆盖 alpha 级别。

## 何时使用

- 类似聚光灯的效果。
- 对比强烈的英雄部分。
- 深色背景上的分层交互。

## 来源参考

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/BackgroundMask.md>
