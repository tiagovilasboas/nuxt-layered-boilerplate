import type { Result } from '../types/result'
import type { CatalogItem } from './types'

/**
 * Catalog repository port. UI and composables depend on this contract,
 * never on memory, HTTP, or Nitro internals.
 */
export type CatalogRepository = {
  list: () => Promise<Result<CatalogItem[]>>
}

export type CatalogRequest = (path: string) => Promise<unknown>

export type CreateCatalogRepositoryOptions =
  | {
      kind?: 'memory'
      items?: CatalogItem[]
    }
  | {
      kind: 'http'
      request: CatalogRequest
    }
