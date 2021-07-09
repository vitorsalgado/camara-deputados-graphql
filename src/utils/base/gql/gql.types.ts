import { Order } from '@app/data/api'

export interface Node<T> {
  cursor: string
  node: T
}

export interface PageInfo {
  startCursor: string | null
  endCursor: string | null
  hasPreviousPage: boolean
  hasNextPage: boolean
}

export interface PagedResult<T> {
  edges: Node<T>[]
  pageInfo?: PageInfo
}

export interface LoaderArgs<T> {
  obj: T
  params: any
}

export interface PagedCriteria {
  after: number
  first: number
  before: number
  last: number
  order: Order
  orderBy: string
}

export interface BaseQry {
  first?: number
  after?: string
}
