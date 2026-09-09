# AGENTS.md — Nuxt Layered Guide

Contract for any coding agent (Cursor, Copilot, Claude Code, Codex, etc.).
This file is the **source of truth**. Docs under `docs/` are the RAG corpus. Code is a **thin proof**, not the product.

> Retrieval: `AGENTS.md` → [`docs/INDEX.md`](docs/INDEX.md) → one topic file. Also [`llms.txt`](llms.txt). Prompts: [`docs/prompts.md`](docs/prompts.md).

## What this repo is

Staff-grade **AI-assisted Nuxt layered architecture guide**. English docs. Owner: Tiago Montanha ([tiagovilasboas](https://github.com/tiagovilasboas)). No employer IP. Clone for the contract + one runnable catalog slice.

## Stack

- **Nuxt 4** + **Vue 3** + **TypeScript `strict`** + **Nitro**
- **Vitest** (repository + composable contract) · **ESLint** (`@nuxt/eslint`) · **Node 22.19+**
- Layout: `app/` (pages, components, composables) · `shared/catalog/` (port + adapters) · `server/api/` (BFF) · `layers/platform/` (layer sketch)

## Dependency Rule

Dependencies point inward:

`pages` → `components` → `composables` → **repository (port)** → infra (`memory` | `http` | Nitro BFF)

- **pages** — composition only (`index.vue` wires `useCatalog` → `CatalogList`).
- **components** — presentational; **no** `$fetch`, no repository import, no private `runtimeConfig`.
- **composables** — `useAsyncData` + `loadCatalog(repository)`. Inject the port in tests.
- **port** — `CatalogRepository.list(): Promise<Result<CatalogItem[]>>`. DTO ⇄ model in `mapper.ts`.
- **factory** — `createCatalogRepository({ kind: 'memory' | 'http' })`. App uses http + `$fetch`; tests use memory.
- **BFF** — one route `server/api/catalog.get.ts`. Private config stays on the server. No domain monolith under `server/`.

## Commands

| Command | Use |
| --- | --- |
| `npm run dev` | Nuxt dev server (http://localhost:3000) |
| `npm run build` | Production Nitro build |
| `npm run type-check` | `nuxt typecheck` |
| `npm run lint` | ESLint |
| `npm test` / `npm run test:ci` | Vitest once (CI includes coverage) |

## Do

- New features: page compose → presentational component → composable → port → adapter. Follow [`docs/architecture.md`](docs/architecture.md).
- Public functions on the port: explicit types, `Result` or JSON-serializable models. No `any`.
- Secrets: `.env.example` keys only, empty values. Private vs public runtimeConfig as in [`docs/practices.md`](docs/practices.md) and [`docs/bff-nitro.md`](docs/bff-nitro.md).
- MFE: extend `layers/platform` first. Do not add Federation remotes unless asked ([`docs/mfe-and-team-topology.md`](docs/mfe-and-team-topology.md)).
- Run `lint`, `type-check`, `test` before finishing. Prefer KISS/YAGNI — density in docs, not extra libraries.

## Don't

- Don't call `$fetch` / `fetch` from `.vue` files.
- Don't import `server/` from `app/components`.
- Don't put tokens in `runtimeConfig.public` or in docs examples.
- Don't invent `src/services`, a global Axios client, or empty feature folders.
- Don't break the Dependency Rule. Don't mix presentational and I/O in one component (SRP).

## Where to look

| Task | File |
| --- | --- |
| Retrieval map | `docs/INDEX.md` |
| Port / factory / mapper | `shared/catalog/` |
| SSR composable | `app/composables/useCatalog.ts` |
| BFF | `server/api/catalog.get.ts` |
| Layer sketch | `layers/platform/` |
| Agent prompts | `docs/prompts.md` |

## Ready prompts (short)

Full text: [`docs/prompts.md`](docs/prompts.md).

1. **Feature:** “Add F along pages → components → composables → `createFRepository` + mapper + Vitest. No `$fetch` in Vue.”
2. **BFF:** “Add one Nitro route; private runtimeConfig; DTO only; http adapter points at it.”
3. **SSR:** “Use `useAsyncData` + repository; JSON-serializable; no `onMounted` fetch for first paint.”

## Adapters

Thin harness files (`.cursor/rules/`, `.github/copilot-instructions.md`) **point here**. On conflict, **`AGENTS.md` wins**.
