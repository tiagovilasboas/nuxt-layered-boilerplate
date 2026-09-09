# Repository pattern

The catalog **port** is a TypeScript contract. Adapters implement it. UI depends on the port. Mapping DTO ⇄ model lives next to the port, not in Vue.

## Port

```ts
type CatalogRepository = {
  list: () => Promise<Result<CatalogItem[]>>
}
```

Defined in `shared/catalog/port.ts`. `CatalogItem` is the domain model (`id`, `title`, `summary`, `status: 'published' | 'draft'`). `CatalogItemDto` is the wire type (`status: string`). Never render a DTO in a component.

## Typed Result

```ts
type Result<T> = { ok: true; value: T } | { ok: false; error: AppError }
```

Adapters do not throw for expected failures (bad JSON, HTTP errors). They return `err({ code, message })`. `loadCatalog` unwraps to a throw so `useAsyncData` can fill `error`. Codes: `NETWORK` | `MAPPING` | `NOT_FOUND` | `UNKNOWN`.

Throwing from adapters hides the failure mode from callers and forces every test onto `try/catch`. Result keeps the seam explicit.

## Factory

```ts
createCatalogRepository() // memory + seed
createCatalogRepository({ kind: 'memory', items })
createCatalogRepository({ kind: 'http', request: (path) => $fetch(path) })
```

`createCatalogRepository` (`shared/catalog/factory.ts`) is the only place that `new`s or selects an adapter. Composables receive a `CatalogRepository`. Tests pass memory. The app composable passes http + Nuxt `$fetch` so SSR can hit the Nitro handler in-process.

## DTO ⇄ model

`toCatalogList` / `toCatalogItem` in `shared/catalog/mapper.ts` are type guards + mappers. Unknown `status` is `MAPPING`, not a silent default. The BFF emits DTOs; the http adapter maps them back. Round-trip is covered in `shared/catalog/factory.spec.ts`.

## Adapters

| Adapter | File | When |
| --- | --- | --- |
| memory | `memory-adapter.ts` | tests, offline proof, no network |
| http | `http-adapter.ts` | running app; calls `/api/catalog` |
| Nitro BFF | `server/api/catalog.get.ts` | server-side shaping + private config |

The BFF is **infra**, not a second domain layer. It must not grow into a service catalog of every use case.

## Do / don’t

**Do** inject the port into `useCatalog(repository)` and `loadCatalog(repository)`.

**Don’t** export Axios/ofetch instances from `shared/` for components to call. **Don’t** return `any`. **Don’t** put `window` or `useCookie` inside an adapter.

See the Vitest files next to each adapter and `app/composables/useCatalog.spec.ts` (contract: `loadCatalog` + injected port).
