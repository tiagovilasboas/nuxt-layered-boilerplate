import { describe, expect, it, vi } from 'vitest'
import { createCatalogHttpAdapter } from './http-adapter'
import { CATALOG_SEED } from './seed'
import { toCatalogItemDto } from './mapper'

describe('createCatalogHttpAdapter', () => {
  it('maps a valid BFF payload to domain items', async () => {
    const request = vi.fn().mockResolvedValue({
      items: CATALOG_SEED.map(toCatalogItemDto),
      source: 'nitro-bff',
      hasUpstreamToken: false,
    })
    const repository = createCatalogHttpAdapter(request)
    const result = await repository.list()
    expect(request).toHaveBeenCalledWith('/api/catalog')
    expect(result.ok && result.value).toEqual(CATALOG_SEED)
  })

  it('returns NETWORK when the request throws', async () => {
    const repository = createCatalogHttpAdapter(async () => {
      throw new Error('ECONNREFUSED')
    })
    const result = await repository.list()
    expect(result.ok).toBe(false)
    if (result.ok) {
      return
    }
    expect(result.error.code).toBe('NETWORK')
    expect(result.error.message).toContain('ECONNREFUSED')
  })

  it('returns MAPPING when the payload is malformed', async () => {
    const repository = createCatalogHttpAdapter(async () => ({ items: 'nope' }))
    const result = await repository.list()
    expect(result.ok).toBe(false)
    if (result.ok) {
      return
    }
    expect(result.error.code).toBe('MAPPING')
  })
})
