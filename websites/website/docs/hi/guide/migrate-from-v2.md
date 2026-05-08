# v2.x से माइग्रेट करें

`v2.x` से माइग्रेशन में मुख्य points हैं: `load(...)` API और options rename.

## Load API migration

पहले:

```ts
await tsParticles.load("tsparticles", {
  particles: {
    number: { value: 80 },
  },
});
```

अब:

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

## मुख्य renames

- `particles.color` -> `particles.paint.fill`
- `particles.stroke` -> `particles.paint.stroke`

## Resources

- Option rename matrix: [`/guide/option-rename-matrix`](/hi/guide/option-rename-matrix)
- v1 migration: [`/guide/migrate-from-v1`](/hi/guide/migrate-from-v1)
