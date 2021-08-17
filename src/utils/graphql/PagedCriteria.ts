export interface PagedCriteria {
  after: number
  first: number
  before: number
  last: number
  order: 'ASC' | 'DESC'
  orderBy: string
}
