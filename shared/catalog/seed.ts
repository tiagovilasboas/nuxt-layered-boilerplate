import type { CatalogItem } from './types'

export const CATALOG_SEED: CatalogItem[] = [
  {
    id: 'arch-dependency-rule',
    title: 'Dependency Rule',
    summary: 'Pages compose; composables orchestrate; repositories own I/O.',
    status: 'published',
  },
  {
    id: 'repo-port-adapter',
    title: 'Port and adapter',
    summary: 'Swap memory, HTTP, or BFF without touching Vue components.',
    status: 'published',
  },
  {
    id: 'nitro-bff',
    title: 'Nitro BFF',
    summary: 'One server route keeps tokens private and shapes the DTO.',
    status: 'published',
  },
  {
    id: 'ssr-hydration',
    title: 'SSR hydration',
    summary: 'useAsyncData serializes the payload so the client does not refetch.',
    status: 'draft',
  },
]
