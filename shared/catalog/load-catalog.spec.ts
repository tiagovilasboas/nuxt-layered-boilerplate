import { describe, expect, it } from 'vitest'
import { createCatalogRepository } from './factory'
import { loadCatalog } from './load-catalog'
import { err } from '../types/result'
import type { CatalogRepository } from './port'

describe('loadCatalog', () => {
  it('unwraps a successful repository result', async () => {
    const repository = createCatalogRepository({
      items: [{ id: 'a', title: 'A', summary: 'S', status: 'published' }],
    })
    const items = await loadCatalog(repository)
    expect(items).toHaveLength(1)
    expect(items[0]?.title).toBe('A')
  })

  it('throws so useAsyncData can surface error', async () => {
    const repository: CatalogRepository = {
      list: async () => err({ code: 'NETWORK', message: 'upstream down' }),
    }
    await expect(loadCatalog(repository)).rejects.toThrow('upstream down')
  })
})
