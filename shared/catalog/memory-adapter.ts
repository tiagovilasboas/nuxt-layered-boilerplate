import { ok, type Result } from '../types/result'
import type { CatalogRepository } from './port'
import { CATALOG_SEED } from './seed'
import type { CatalogItem } from './types'

export function createCatalogMemoryAdapter(
  items: CatalogItem[] = CATALOG_SEED,
): CatalogRepository {
  const store: CatalogItem[] = items.map((item) => ({ ...item }))
  return {
    list(): Promise<Result<CatalogItem[]>> {
      return Promise.resolve(ok(store.map((item) => ({ ...item }))))
    },
  }
}
