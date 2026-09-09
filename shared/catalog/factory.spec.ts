import { describe, expect, it } from 'vitest'
import { createCatalogRepository } from './factory'
import { CATALOG_SEED } from './seed'
import { toCatalogItemDto } from './mapper'

describe('createCatalogRepository', () => {
  it('defaults to the memory adapter', async () => {
    const repository = createCatalogRepository()
    const result = await repository.list()
    expect(result.ok && result.value).toEqual(CATALOG_SEED)
  })

  it('builds the HTTP adapter when kind is http', async () => {
    const repository = createCatalogRepository({
      kind: 'http',
      request: async () => ({
        items: [
          {
            id: 'x',
            title: 'From HTTP',
            summary: 'Injected',
            status: 'published',
          },
        ],
        source: 'test',
        hasUpstreamToken: false,
      }),
    })
    const result = await repository.list()
    expect(result.ok && result.value[0]?.title).toBe('From HTTP')
  })

  it('round-trips seed DTOs through the HTTP adapter', async () => {
    const repository = createCatalogRepository({
      kind: 'http',
      request: async () => ({
        items: CATALOG_SEED.map(toCatalogItemDto),
        source: 'nitro-bff',
        hasUpstreamToken: true,
      }),
    })
    const result = await repository.list()
    expect(result.ok && result.value).toEqual(CATALOG_SEED)
  })
})
