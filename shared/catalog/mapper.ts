import { err, ok, type Result } from '../types/result'
import type { CatalogItem, CatalogItemDto, CatalogListResponseDto, CatalogStatus } from './types'

const STATUSES: readonly CatalogStatus[] = ['published', 'draft']

export function isCatalogStatus(value: unknown): value is CatalogStatus {
  return typeof value === 'string' && (STATUSES as readonly string[]).includes(value)
}

export function isCatalogItemDto(value: unknown): value is CatalogItemDto {
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

export function toCatalogItem(dto: CatalogItemDto): Result<CatalogItem> {
  if (!isCatalogStatus(dto.status)) {
    return err({
      code: 'MAPPING',
      message: `Unknown catalog status "${dto.status}" for item ${dto.id}`,
    })
  }
  return ok({
    id: dto.id,
    title: dto.title,
    summary: dto.summary,
    status: dto.status,
  })
}

export function toCatalogItemDto(item: CatalogItem): CatalogItemDto {
  return {
    id: item.id,
    title: item.title,
    summary: item.summary,
    status: item.status,
  }
}

export function toCatalogList(payload: unknown): Result<CatalogItem[]> {
  if (typeof payload !== 'object' || payload === null || !('items' in payload)) {
    return err({ code: 'MAPPING', message: 'Catalog payload is missing items' })
  }
  const items = (payload as CatalogListResponseDto).items
  if (!Array.isArray(items)) {
    return err({ code: 'MAPPING', message: 'Catalog items is not an array' })
  }
  const mapped: CatalogItem[] = []
  for (const entry of items) {
    if (!isCatalogItemDto(entry)) {
      return err({ code: 'MAPPING', message: 'Catalog item DTO is malformed' })
    }
    const result = toCatalogItem(entry)
    if (!result.ok) {
      return result
    }
    mapped.push(result.value)
  }
  return ok(mapped)
}
