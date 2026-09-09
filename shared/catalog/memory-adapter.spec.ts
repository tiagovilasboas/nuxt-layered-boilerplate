import { describe, expect, it } from 'vitest'
import { createCatalogMemoryAdapter } from './memory-adapter'
import { CATALOG_SEED } from './seed'

describe('createCatalogMemoryAdapter', () => {
  it('returns a copy of the seed items', async () => {
    const repository = createCatalogMemoryAdapter()
    const result = await repository.list()
    expect(result.ok).toBe(true)
    if (!result.ok) {
      return
    }
    expect(result.value).toEqual(CATALOG_SEED)
    const first = result.value[0]
    expect(first).toBeDefined()
    if (!first) {
      return
    }
    first.title = 'mutated'
    const again = await repository.list()
    const seedTitle = CATALOG_SEED[0]?.title
    expect(again.ok && again.value[0]?.title).toBe(seedTitle)
  })

  it('accepts injected items for tests', async () => {
    const repository = createCatalogMemoryAdapter([
      { id: '1', title: 'Only', summary: 'One', status: 'published' },
    ])
    const result = await repository.list()
    expect(result.ok && result.value).toHaveLength(1)
  })
})
