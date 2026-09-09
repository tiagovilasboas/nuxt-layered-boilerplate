export type CatalogStatus = 'published' | 'draft'

export type CatalogItem = {
  id: string
  title: string
  summary: string
  status: CatalogStatus
}

/** Wire shape from the Nitro BFF (or an upstream). Not a domain model. */
export type CatalogItemDto = {
  id: string
  title: string
  summary: string
  status: string
}

export type CatalogListResponseDto = {
  items: CatalogItemDto[]
  source: string
  hasUpstreamToken: boolean
}
