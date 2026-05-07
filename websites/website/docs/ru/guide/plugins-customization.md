# Плагины и настройка

tsParticles можно расширить с помощью пользовательских фигур, предустановок и функций, управляемых плагинами.

## Пример пользовательской формы

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

## Пример пользовательской предустановки

```ts
tsParticles.addPreset("my-preset", {
  particles: {
    move: { enable: true, speed: 2 },
    number: { value: 80 },
  },
});
```

## Практическое руководство

- Зарегистрируйте пользовательские формы/предустановки перед вызовом `tsParticles.load(...)`.
- Сохраняйте уникальные имена (в этом помогают префиксы проектов).
- Минимальная документация по установке + регистрации + фрагменты конфигурации.

## Ссылка на источник

- Документация по интерфейсу плагина: <https://particles.js.org/docs/modules/Core_Interfaces_IPlugin.html>.
- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Plugins.md>
