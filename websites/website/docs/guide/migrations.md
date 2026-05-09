# Migrations

Use this section to migrate between major `tsParticles` versions.

- [`Migrate from v3.x`](/guide/migrate-from-v3)
- [`Migrate from v2.x`](/guide/migrate-from-v2)
- [`Migrate from v1.x`](/guide/migrate-from-v1)

## Where migrations usually break

Most major migrations break in two places:

1. **Load API shape** (old positional params vs new object params).
2. **Options schema** (renamed/moved keys).

If your app compiles but renders wrong visuals, start from option mappings first.

## Quick route

- Coming from `v3.x`: start with [`/guide/migrate-from-v3`](/guide/migrate-from-v3) (focus: option key changes).
- Coming from `v2.x`: start with [`/guide/migrate-from-v2`](/guide/migrate-from-v2) (focus: `load(...)` API + options).
- Coming from `v1.x`: start with [`/guide/migrate-from-v1`](/guide/migrate-from-v1) (focus: packages, loaders, options audit).

## Fast lookup

- Option rename matrix: [`/guide/option-rename-matrix`](/guide/option-rename-matrix)

## Also useful

- Legacy `particles.js` migration: [`/migration/`](/migration/)
- Releases and versioning: [`/releases/`](/releases/)
- Latest release notes: [`/changelog`](/changelog)
