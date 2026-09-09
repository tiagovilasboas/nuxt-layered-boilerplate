# SSR data fetching

Nuxt SSR plus a repository port: fetch on the server through the same contract the client would use, then **hydrate** from the payload instead of refetching on mount.

## Pattern

```ts
export function useCatalog(repository = createDefaultRepository()) {
  return useAsyncData('catalog', () => loadCatalog(repository))
}
```

- **Key** `'catalog'` is stable. Changing it busts the payload cache.
- **`loadCatalog`** unwraps `Result` to data or throw — `useAsyncData` owns `pending` / `error` / `data`.
- **Default repository** is HTTP + Nuxt `$fetch`, so the server handler runs in-process during SSR.
- **Tests** pass a memory repository; they do not boot Nitro.

The page (`app/pages/index.vue`) is the composition root: it calls `useCatalog()`, passes `items` / `pending` / `errorMessage` into presentational `CatalogList`.

## Hydration

1. Server runs the handler, serializes `data` into the Nuxt payload.
2. Client boots, `useAsyncData` reuses that payload for key `'catalog'`.
3. No second `/api/catalog` on first paint unless you call `refresh()` or set `server: false`.

Do **not** fetch in `onMounted` for the initial catalog. That duplicates SSR work and causes a flash. Do **not** read `window` during `loadCatalog` — it must run on the server.

## Mismatch risks

- Rendering `Date` or non-JSON values in the payload. Keep `CatalogItem` JSON-serializable (strings, unions).
- Using a random `Math.random()` in the mapper. Seeds must be deterministic for SSR HTML = client HTML.
- Calling private `runtimeConfig` keys from a composable. Private keys are `undefined` on the client and will diverge.

## Client-only exceptions

Interactive filters after hydration may call `refresh()` or a second port method. Still go through the repository. Still no `$fetch` in the Vue template.

See [repository-pattern.md](repository-pattern.md) and the live path: composable → http adapter → `server/api/catalog.get.ts`.
