import { describe, expect, it } from 'vitest'
import { createCatalogRepository, loadCatalog } from '#shared/catalog'

/**
 * Composable contract test: `useCatalog` is a thin `useAsyncData` wrapper
 * around `loadCatalog`. The Vue/Nitro runtime is not required here.
 */
describe('useCatalog contract', () => {
  it('loads published items through the injected repository', async () => {
    const repository = createCatalogRepository({
      items: [
        {
          id: 'bff',
          title: 'BFF',
          summary: 'Private config stays on the server',
          status: 'published',
        },
      ],
    })
    const items = await loadCatalog(repository)
    expect(items.map((item) => item.id)).toEqual(['bff'])
  })
})
