import type { CatalogRepository } from './port'
import type { CatalogItem } from './types'

/**
 * Composable-layer helper: turn a typed Result into data or a thrown error
 * so `useAsyncData` can populate `error`. UI still never sees the adapter.
 */
export async function loadCatalog(repository: CatalogRepository): Promise<CatalogItem[]> {
  const result = await repository.list()
  if (!result.ok) {
    throw new Error(result.error.message)
  }
  return result.value
}
