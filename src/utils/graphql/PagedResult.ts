import { PageInfo } from './PageInfo'
import { Node } from './Node'

export interface PagedResult<T> {
  edges: Node<T>[]
  pageInfo?: PageInfo
}
