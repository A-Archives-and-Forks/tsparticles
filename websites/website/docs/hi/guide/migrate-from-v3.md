# v3.x से माइग्रेट करें

`v3.x` से माइग्रेशन में सबसे common issue options compatibility है।

## प्राथमिक बदलाव

- `particles.color` -> `particles.paint.fill`
- `particles.stroke` -> `particles.paint.stroke`

## Load API migration

पहले:

```ts
await tsParticles.load("tsparticles", options);
```

अब:

```ts
await tsParticles.load({
  id: "tsparticles",
  options,
});
```

## Resources

- Option rename matrix: [`/guide/option-rename-matrix`](/hi/guide/option-rename-matrix)
- `particles.paint`: [`/options/particles-paint`](/hi/options/particles-paint)
