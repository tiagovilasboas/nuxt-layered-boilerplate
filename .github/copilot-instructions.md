# Adapter for GitHub coding agent

**Primary source:** [`AGENTS.md`](../AGENTS.md). Read it first. This file is a thin adapter.

## Stack (excerpt)

Nuxt 4 + Vue 3 + TypeScript strict + Nitro BFF. Docs are the product; `app/` + `shared/catalog` are the proof.

## Dependency Rule

`pages` → `components` → `composables` → repository port → infra (memory / http / Nitro)

- Pages compose only.
- Components must not `$fetch` or import adapters.
- Factory: `createCatalogRepository`.
- Private runtimeConfig never goes to the client.

## Do not

- Do not commit secrets.
- Do not break the Dependency Rule.
- Do not add Module Federation remotes or extra UI kits unless asked.

Run lint, type-check, and test before finishing.
