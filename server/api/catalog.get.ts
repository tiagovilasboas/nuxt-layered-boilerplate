import { CATALOG_SEED, toCatalogItemDto, type CatalogListResponseDto } from '#shared/catalog'

/**
 * Thin BFF: one route, no domain monolith.
 * Private runtimeConfig stays on the server. The payload only admits whether
 * a token exists — never the token itself.
 */
export default defineEventHandler(async (): Promise<CatalogListResponseDto> => {
  const config = useRuntimeConfig()
  const token = config.upstreamApiToken
  const upstreamUrl = config.upstreamCatalogUrl

  if (typeof upstreamUrl === 'string' && upstreamUrl.length > 0) {
    const headers: Record<string, string> = {}
    if (typeof token === 'string' && token.length > 0) {
      headers.Authorization = `Bearer ${token}`
    }
    const upstream = await $fetch<unknown>(upstreamUrl, { headers })
    const items = Array.isArray(upstream) ? upstream : []
    return {
      items: items.filter(isLooseItemDto),
      source: 'upstream',
      hasUpstreamToken: Boolean(token),
    }
  }

  return {
    items: CATALOG_SEED.map(toCatalogItemDto),
    source: 'nitro-bff',
    hasUpstreamToken: Boolean(token),
  }
})

function isLooseItemDto(
  value: unknown,
): value is { id: string; title: string; summary: string; status: string } {
  if (typeof value !== 'object' || value === null) {
    return false
  }
  const record = value as Record<string, unknown>
  return (
    typeof record.id === 'string' &&
    typeof record.title === 'string' &&
    typeof record.summary === 'string' &&
    typeof record.status === 'string'
  )
}
