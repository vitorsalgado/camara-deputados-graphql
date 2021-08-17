import { PagedResult } from '../../utils/graphql/PagedResult'
import { ApiResult } from '../models/base/ApiResult'
import { extractPagination } from './extractPagination'

export function toPagedResult<T>(response: ApiResult<T[]>): PagedResult<T> {
  const pagination = extractPagination(response.links)

  return {
    pageInfo: pagination.pageInfo,
    edges: response.data.map((x: T) => ({ cursor: '', node: x }))
  }
}
