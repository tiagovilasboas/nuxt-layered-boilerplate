import { describe, expect, it } from 'vitest'
import { toCatalogItem, toCatalogList } from './mapper'

describe('catalog mapper', () => {
  it('rejects unknown status values', () => {
    const result = toCatalogItem({
      id: '1',
      title: 'Bad',
      summary: 'Status',
      status: 'archived',
    })
    expect(result.ok).toBe(false)
    if (result.ok) {
      return
    }
    expect(result.error.code).toBe('MAPPING')
  })

  it('rejects a payload without items', () => {
    const result = toCatalogList({ source: 'x', hasUpstreamToken: false })
    expect(result.ok).toBe(false)
    if (result.ok) {
      return
    }
    expect(result.error.code).toBe('MAPPING')
  })
})
