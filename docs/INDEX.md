# Docs index

Retrieval map for this repository. One topic per file. Read `AGENTS.md` first, then this index, then the file that matches the task.

| Path | Summary |
| --- | --- |
| [architecture.md](architecture.md) | Dependency Rule: pages → components → composables → repository → infra. |
| [repository-pattern.md](repository-pattern.md) | Port–Adapter, DTO⇄model, `createCatalogRepository`, typed `Result`. |
| [bff-nitro.md](bff-nitro.md) | One Nitro `server/api` route, private runtimeConfig, no domain monolith. |
| [ssr-data-fetching.md](ssr-data-fetching.md) | `useAsyncData` + repository; payload hydration; no client waterfall. |
| [mfe-and-team-topology.md](mfe-and-team-topology.md) | Nuxt Layer sketch vs host/remote; stream-aligned Host / Feature / Platform. |
| [practices.md](practices.md) | Clean Code, SRP, KISS/YAGNI, light AppSec (public vs private config). |
| [prompts.md](prompts.md) | Ready-made prompts agents must follow when changing this repo. |
| [impact-cases.md](impact-cases.md) | Anonymized before/after leverage stories (illustrative metrics). |
| [references.md](references.md) | Curated public links only (Nuxt, Nitro, architecture, AppSec). |

Proof code (thin, not the product): `app/pages/index.vue`, `app/composables/useCatalog.ts`, `shared/catalog/`, `server/api/catalog.get.ts`, `layers/platform/`.
