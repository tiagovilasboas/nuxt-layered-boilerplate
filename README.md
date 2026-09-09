# Nuxt Layered Guide

[![Nuxt](https://img.shields.io/badge/Nuxt-4-00DC82.svg)](https://nuxt.com/)
[![Vue](https://img.shields.io/badge/Vue-3-42b883.svg)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**RAG corpus for coding agents** working on Nuxt layered architecture — dense docs, thin runnable proof (Dependency Rule, repository port, Nitro BFF).

## Contents

- [Start](#start)
- [Architecture](#architecture)
- [Docs (RAG)](#docs-rag)
- [Proof app](#proof-app)
- [Related](#related)
- [Contributing](#contributing)
- [License](#license)
- [Agents](#agents)

## Start

Requires [Node.js](https://nodejs.org/) **22.19+** (`.nvmrc` is `22`). Engines: `node >=22.19.0`, `npm >=10`. Nuxt 4.5 is aligned with that floor.

```bash
git clone https://github.com/tiagovilasboas/nuxt-layered-boilerplate.git
cd nuxt-layered-boilerplate
cp .env.example .env
npm install --legacy-peer-deps
npm run dev
```

`legacy-peer-deps` is required on current npm 10 + Nuxt 4.5 (arborist peer resolution). CI uses the same flag.

Dev server: [http://localhost:3000](http://localhost:3000). Copy `.env.example` → `.env` (empty secrets). The BFF serves in-process seed data until you set a private upstream URL.

| Command | What it does |
| --- | --- |
| `npm run dev` | Nuxt 4 dev server |
| `npm run build` | Production Nitro build (`.output/`) |
| `npm run preview` | Serve the production build |
| `npm test` / `npm run test:ci` | Vitest once (`test:ci` adds coverage) |
| `npm run lint` | ESLint |
| `npm run type-check` | `nuxt typecheck` |

## Architecture

Dependencies point inward:

`pages` → `components` → `composables` → **repository (port)** → infra (`memory` / `http` / Nitro BFF)

```
┌──────────┐   ┌─────────────┐   ┌─────────────┐   ┌────────────┐   ┌─────────┐
│  Page    │──▶│ Component   │──▶│ Composable  │──▶│ Repository │──▶│ Adapter │
│ compose  │   │ UI (props)  │   │ useAsyncData│   │   port     │   │ mem/http│
└──────────┘   └─────────────┘   └─────────────┘   └────────────┘   └─────────┘
                                                                   Nitro BFF
```

Full contract: [`docs/architecture.md`](docs/architecture.md). Factory: `createCatalogRepository`. SSR: [`docs/ssr-data-fetching.md`](docs/ssr-data-fetching.md). BFF: [`docs/bff-nitro.md`](docs/bff-nitro.md).

## Docs (RAG)

Structured for retrieval (stable paths, one topic per file). Map: [`docs/INDEX.md`](docs/INDEX.md). Machine index: [`llms.txt`](llms.txt).

| File | Topic |
| --- | --- |
| [architecture.md](docs/architecture.md) | Dependency Rule and layout |
| [repository-pattern.md](docs/repository-pattern.md) | Port–Adapter, DTO⇄model, `Result` |
| [bff-nitro.md](docs/bff-nitro.md) | One Nitro route, private config |
| [ssr-data-fetching.md](docs/ssr-data-fetching.md) | `useAsyncData` + hydration |
| [mfe-and-team-topology.md](docs/mfe-and-team-topology.md) | Layer sketch; Host / Feature / Platform |
| [practices.md](docs/practices.md) | SRP, KISS/YAGNI, AppSec |
| [prompts.md](docs/prompts.md) | Ready-made agent prompts |
| [impact-cases.md](docs/impact-cases.md) | Anonymized before/after stories |
| [references.md](docs/references.md) | Public links only |

## Proof app

One catalog feature. Not a kitchen-sink starter.

- `app/pages/index.vue` — composition root
- `app/components/catalog/CatalogList.vue` — presentational
- `app/composables/useCatalog.ts` — `useAsyncData` + port
- `shared/catalog/` — port, factory, mapper, memory/http
- `server/api/catalog.get.ts` — BFF
- `layers/platform/` — `PlatformBadge` via `extends`

## Related

- [react-layered-boilerplate](https://github.com/tiagovilasboas/react-layered-boilerplate) — Webpack-era React layers + repository factory
- [react-vite-boilerplate](https://github.com/tiagovilasboas/react-vite-boilerplate) — Vite React starter (sibling, different job)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). PRs against `main`.

## License

MIT. See [LICENSE](LICENSE).

## Agents

Coding agents: read [`AGENTS.md`](AGENTS.md) first. Thin Cursor/Copilot adapters defer to it.
