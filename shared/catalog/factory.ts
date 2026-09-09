import { createCatalogHttpAdapter } from './http-adapter'
import { createCatalogMemoryAdapter } from './memory-adapter'
import type { CatalogRepository, CreateCatalogRepositoryOptions } from './port'

/**
 * Composition root for the catalog port. Callers pick an adapter; UI never does.
 */
export function createCatalogRepository(
  options: CreateCatalogRepositoryOptions = {},
): CatalogRepository {
  if (options.kind === 'http') {
    return createCatalogHttpAdapter(options.request)
  }
  return createCatalogMemoryAdapter(options.items)
}
