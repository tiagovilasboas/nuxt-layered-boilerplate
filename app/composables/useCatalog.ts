import {
  createCatalogRepository,
  loadCatalog,
  type CatalogItem,
  type CatalogRepository,
} from '#shared/catalog'

function createDefaultRepository(): CatalogRepository {
  return createCatalogRepository({
    kind: 'http',
    request: (path: string): Promise<unknown> => $fetch(path),
  })
}

/**
 * SSR entry: `useAsyncData` + repository. The payload is serialized for
 * hydration — the client reuses it instead of refetching on mount.
 */
export function useCatalog(
  repository: CatalogRepository = createDefaultRepository(),
): ReturnType<typeof useAsyncData<CatalogItem[]>> {
  return useAsyncData('catalog', () => loadCatalog(repository))
}
