import { err, type Result } from '../types/result'
import { toCatalogList } from './mapper'
import type { CatalogRequest, CatalogRepository } from './port'
import type { CatalogItem } from './types'

export function createCatalogHttpAdapter(request: CatalogRequest): CatalogRepository {
  return {
    async list(): Promise<Result<CatalogItem[]>> {
      try {
        const payload = await request('/api/catalog')
        return toCatalogList(payload)
      } catch (cause: unknown) {
        const message = cause instanceof Error ? cause.message : 'Catalog request failed'
        return err({ code: 'NETWORK', message })
      }
    },
  }
}
