import Querystring from 'querystring'
import { encode } from '../../utils/encoding/base64'
import { Link } from '../models/base/Link'

export interface Pagination {
  current: string
  pageInfo: {
    startCursor: string | null
    endCursor: string | null
    hasPreviousPage: boolean
    hasNextPage: boolean
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
