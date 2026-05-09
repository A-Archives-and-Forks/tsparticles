# Migrar de v2.x

De `v2.x`, os pontos principais sao: API `load(...)` e renomeacao de opcoes.

## Migracao da Load API

Antes:

```ts
await tsParticles.load("tsparticles", {
  particles: {
    number: { value: 80 },
  },
});
```

Depois:

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

## Renomes principais

- `particles.color` -> `particles.paint.fill`
- `particles.stroke` -> `particles.paint.stroke`

## Recursos

- Matriz de renomeacao: [`/guide/option-rename-matrix`](/pt/guide/option-rename-matrix)
- Migracao v1: [`/guide/migrate-from-v1`](/pt/guide/migrate-from-v1)
