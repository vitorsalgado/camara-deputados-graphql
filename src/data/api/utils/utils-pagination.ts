import { ApiResult, Link } from '@app/data/api'
import { encode } from '@app/utils/encoding/base64'
import Querystring from 'querystring'
import { PagedResult } from '@app/utils/base/gql'

export interface Pagination {
  current: string
  pageInfo: {
    startCursor: string | null
    endCursor: string | null
    hasPreviousPage: boolean
    hasNextPage: boolean
  }
}

export function toPagedResult<T>(response: ApiResult<T[]>): PagedResult<T> {
  const pagination = extractPagination(response.links)

  return {
    pageInfo: pagination.pageInfo,
    edges: response.data.map((x: T) => ({ cursor: '', node: x }))
  }
}

export function extractPagination(links: Link[]): Pagination {
  const self = links.find(item => item.rel === 'self')
  const current = self ? pageFromLink(self, '1') : '1'

  const previous = links.find(item => item.rel === 'previous')
  const startCursor = previous ? encode(pageFromLink(previous, null)) : null

  const next = links.find(item => item.rel === 'next')
  const endCursor = next ? encode(pageFromLink(next, null)) : null

  const hasNextPage = !!next
  const hasPreviousPage = !!previous

  return {
    current: encode(current),
    pageInfo: {
      endCursor,
      startCursor,
      hasNextPage,
      hasPreviousPage
    }
  }
}

function simplifyArray(value: string | string[]): string {
  if (Array.isArray(value)) {
    return value.join()
  }

  return value
}

function pageFromLink(link: Link, defaultValue: any): string {
  return simplifyArray(Querystring.parse(link.href.split('?')[1]).pagina || defaultValue)
}
