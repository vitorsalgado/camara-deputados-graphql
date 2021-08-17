import { Order } from '../../congressapi/models/base/Order'
import { PartyRepository } from '../PartyRepository'
import { PagedQuery } from '../../base'
import { PartySimple } from '../../congressapi/models/party'
import { toPagedResult } from '../../congressapi/utils/toPagedResult'
import { PagedCriteria } from '../../utils/graphql/PagedCriteria'

export class SearchPartiesArgs implements PagedCriteria {
  constructor(
    public readonly acronym: string = '',
    public readonly startDate: string = '',
    public readonly endDate: string = '',
    public readonly termId: number | null = null,
    public readonly after: number = 1,
    public readonly first: number = 100,
    public readonly before: number = 1,
    public readonly last: number = 100,
    public readonly order: Order = Order.ASC,
    public readonly orderBy: string = 'sigla'
  ) {}
}

export function parties(partyRepository: PartyRepository): PagedQuery<SearchPartiesArgs, PartySimple> {
  return function (parent: unknown, args: SearchPartiesArgs) {
    return partyRepository.search(args).then(toPagedResult)
  }
}
