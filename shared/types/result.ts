export type AppErrorCode = 'NETWORK' | 'MAPPING' | 'NOT_FOUND' | 'UNKNOWN'

export type AppError = {
  code: AppErrorCode
  message: string
}

export type Result<T> = { ok: true; value: T } | { ok: false; error: AppError }

export function ok<T>(value: T): Result<T> {
  return { ok: true, value }
}

export function err<T>(error: AppError): Result<T> {
  return { ok: false, error }
}
