# BFF via Nitro

A Backend-for-Frontend in this repo is **one** Nitro route that shapes a DTO for the catalog page. It is not a domain monolith, not a second Nuxt app, and not a place to reimplement the repository port.

## Route

`GET /api/catalog` → `server/api/catalog.get.ts`.

Response (`CatalogListResponseDto`):

- `items`: wire DTOs (not Vue models)
- `source`: `nitro-bff` or `upstream`
- `hasUpstreamToken`: boolean only

The handler reads `useRuntimeConfig()` (Nitro request context):

| Key | Visibility | Env |
| --- | --- | --- |
| `upstreamApiToken` | **private** (server) | `NUXT_UPSTREAM_API_TOKEN` |
| `upstreamCatalogUrl` | **private** (server) | `NUXT_UPSTREAM_CATALOG_URL` |
| `public.appName` | **public** (client payload) | `NUXT_PUBLIC_APP_NAME` |

If `upstreamCatalogUrl` is empty, the BFF maps `CATALOG_SEED` to DTOs. If set, it `$fetch`es upstream and may send `Authorization: Bearer <token>`. The token never appears in the JSON body, logs, or `runtimeConfig.public`.

## Why BFF here

- Browser must not hold upstream credentials.
- DTO can hide upstream fields the UI should never see.
- SSR `$fetch('/api/catalog')` runs in-process against Nitro — no extra public HTTP hop in local/prod Node.
- AppSec default: secrets stay in private runtimeConfig (see [practices.md](practices.md)).

## What not to put in `server/api`

- Vue components or Pinia
- A `services/` tree that duplicates `shared/catalog`
- Ten resource controllers “for completeness”
- Business rules that the mapper/port already own

Add a new route when a **page** needs a new shaped payload or a secret-backed call. Until then, YAGNI.

## Client path

`useCatalog` → `createCatalogRepository({ kind: 'http', request: $fetch })` → `GET /api/catalog`. Components never import the route file.

`nuxt.config.ts` sets `cache-control: no-store` on `/api/**` so a token-gated catalog is not cached at the edge by accident. Tune per route when you have a public cacheable resource.

See [ssr-data-fetching.md](ssr-data-fetching.md) for how this pairs with `useAsyncData`.
