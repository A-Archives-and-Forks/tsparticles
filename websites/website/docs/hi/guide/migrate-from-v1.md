# v1.x से माइग्रेट करें

`v1.x` से आते समय 3-step approach बेहतर है: packages, `load(...)`, options.

## Modern Load API

पहले:

```ts
await tsParticles.load("tsparticles", oldOptions);
```

अब:

```ts
await tsParticles.load({
  id: "tsparticles",
  options: oldOptions,
});
```

## पहले validate करने वाले renames

- `particles.color` -> `particles.paint.fill`
- `particles.stroke` -> `particles.paint.stroke`

## Resources

- Option rename matrix: [`/guide/option-rename-matrix`](/hi/guide/option-rename-matrix)
- particles.js migration: [`/migration/`](/hi/migration/)
