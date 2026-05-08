# Migrar de v3.x

Em `v3.x`, o maior risco de migracao costuma ser a compatibilidade das opcoes.

## Mudancas prioritarias

- `particles.color` -> `particles.paint.fill`
- `particles.stroke` -> `particles.paint.stroke`

## Migracao da Load API

Antes:

```ts
await tsParticles.load("tsparticles", options);
```

Depois:

```ts
await tsParticles.load({
  id: "tsparticles",
  options,
});
```

## Recursos

- Matriz de renomeacao: [`/guide/option-rename-matrix`](/pt/guide/option-rename-matrix)
- `particles.paint`: [`/options/particles-paint`](/pt/options/particles-paint)
