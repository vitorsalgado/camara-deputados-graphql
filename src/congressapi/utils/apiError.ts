import { AppError } from '../../AppError'

export function apiError(error: Error): AppError {
  return new AppError(error.message, 'ERR_HTTP')
}
