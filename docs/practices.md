# Practices

Engineering defaults for this corpus: Clean Code, SRP, KISS/YAGNI, and light AppSec. Density belongs in **docs and contracts**, not in extra frameworks.

## Clean Code / SRP

- One reason to change per file. `CatalogList.vue` changes when markup changes. `mapper.ts` changes when the DTO changes. `catalog.get.ts` changes when the BFF contract changes.
- Names say what the thing is: `createCatalogRepository`, `loadCatalog`, `toCatalogList`.
- No commented-out code. No `TODO` that hides a second design.

## KISS / YAGNI

- One feature module (catalog). One BFF route. One layer.
- No TanStack Query, no auth stack, no i18n, no UI kit, no Module Federation runtime — unless the product you copy this into already needs them.
- Do not pre-create `shared/user`, `shared/billing`, empty `server/api` trees.

## TypeScript

- `strict` is on. Exported functions have explicit return types where they are public ports (`createCatalogRepository`, `loadCatalog`, mapper guards).
- Use `type` for contracts. Finite sets are unions (`CatalogStatus`). No `any`; parse `unknown` with guards.
- `Result<T>` for adapter outcomes; throw only at the `useAsyncData` boundary.

## AppSec (light)

- **Never** commit `.env` or tokens. `.env.example` documents keys with empty values.
- **Private** `runtimeConfig` (`upstreamApiToken`, `upstreamCatalogUrl`) is server-only. Prefix env with `NUXT_` **without** `PUBLIC`.
- **Public** `runtimeConfig.public` is in the HTML payload. Treat it as attacker-visible. No secrets, no internal URLs that bypass auth.
- The BFF may send `Authorization` upstream. The JSON to the browser only has `hasUpstreamToken: boolean`.
- Do not log tokens. Do not put secrets in `AGENTS.md` examples.

## UI split

Presentational vs container: `CatalogList` is presentational. `useCatalog` + the page are the container/composition side. Do not mix `$fetch` into the list component.

## Agent hygiene

Follow `AGENTS.md`. Thin adapters: `.cursor/rules/`, `.github/copilot-instructions.md`. If they drift, **AGENTS.md wins**. Ready prompts: [prompts.md](prompts.md).
