# Architecture

Layered Nuxt architecture with the Dependency Rule pointing inward. Outer rings may depend on inner rings; inner rings must not know Vue pages, components, or Nitro route handlers.

## Rule

```
pages → components → composables → repository (port) → infra adapters
                                              ↘ memory | http | nitro BFF
```

| Layer | Owns | Must not |
| --- | --- | --- |
| **pages** | Route composition, wiring composables to presentational components | Fetch, DTO mapping, private config, business rules |
| **components** | Render + a11y. Props in, events out | Import repository, `$fetch`, `useRuntimeConfig` for secrets |
| **composables** | UI/async orchestration (`useAsyncData`) | Know which adapter is in use; parse raw JSON |
| **repository (port)** | `CatalogRepository` contract + `Result<T>` | Import Vue, components, or `server/api` |
| **infra** | memory / http / Nitro BFF adapters, DTO ⇄ model | Leak into components; own page-level state |

The factory `createCatalogRepository` is the only composition seam for I/O. Default in the running app is **http** against `/api/catalog`. Tests inject **memory**.

## Layout

```
app/
  pages/index.vue              # composition root
  components/catalog/          # presentational
  composables/useCatalog.ts    # useAsyncData + port
  assets/css/main.css
shared/catalog/                # port, adapters, mapper, Result usage
server/api/catalog.get.ts      # Nitro BFF (one route)
layers/platform/               # Host-extensible layer sketch
docs/                          # RAG corpus (this folder)
```

Nuxt 4 keeps UI under `app/`, isomorphic contracts under `shared/`, HTTP edge under `server/`. Do not invent `src/services/` or a global API client used by components.

## Why inward

- UI can be tested with a fake repository.
- SSR and client share the same port; only the adapter’s `request` function changes (`$fetch` in Nuxt).
- Replacing memory with HTTP does not touch `CatalogList.vue`.
- Nitro can change DTO shape without Vue knowing, as long as the mapper stays in `shared/catalog/mapper.ts`.

## Do / don’t

**Do** add a feature as: page (compose) → presentational component → composable → port method → adapter.

**Don’t** call `$fetch` from a `.vue` file. **Don’t** import `server/api` from `app/`. **Don’t** put domain types only inside a Nitro handler.

Proof: `app/pages/index.vue` composes `useCatalog` + `CatalogList`. `layers/platform` contributes `PlatformBadge` via `extends` — a slice of team topology, not ten remotes.

See [repository-pattern.md](repository-pattern.md), [bff-nitro.md](bff-nitro.md), [ssr-data-fetching.md](ssr-data-fetching.md).
