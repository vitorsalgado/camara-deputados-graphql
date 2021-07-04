import { PagedCriteria } from '@app/utils/base/gql'
import { Order } from '@app/data/api'

export class SearchPartiesArgs implements PagedCriteria {
  constructor(
    public readonly acronym: string = '',
    public readonly startDate: string = '',
    public readonly endDate: string = '',
    public readonly termId: number | null = null,
    public readonly page: number = 1,
    public readonly limit: number = 100,
    public readonly order: Order = Order.ASC,
    public readonly orderBy: string = 'sigla'
  ) {}
}
